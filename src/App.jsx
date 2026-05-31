import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';

import { clearToken } from './api/client';
import { getTodaySession, submitAnswer, completeSession } from './api/session';
import Login      from './screens/Login';
import Home       from './screens/Home';
import Day1Intro  from './screens/Day1Intro';
import Question   from './screens/Question';
import Explanation from './screens/Explanation';
import Summary    from './screens/Summary';
import AlreadyDone from './screens/AlreadyDone';

export default function App() {
  const [authed, setAuthed]         = useState(() => !!localStorage.getItem('curio_token'));
  const [session, setSession]       = useState(null);
  const [loadError, setLoadError]   = useState('');

  // Phases: loading | home | day1 | question | explain | summary | alreadyDone
  const [phase, setPhase]           = useState('loading');
  const [idx, setIdx]               = useState(0);
  const [results, setResults]       = useState([]);
  const [locked, setLocked]         = useState(false);
  const [picked, setPicked]         = useState(null);
  const [lastStatus, setLastStatus] = useState(null);
  const [answerTimes, setAnswerTimes] = useState([]);
  const [questionStart, setQuestionStart] = useState(null);
  const [summaryStreak, setSummaryStreak] = useState(0);

  useEffect(() => {
    if (!authed) { setPhase('login'); return; }
    loadSession();
  }, [authed]);

  async function loadSession() {
    setPhase('loading');
    setLoadError('');
    try {
      const data = await getTodaySession();
      setSession(data);
      setPhase(data.already_done ? 'alreadyDone' : 'home');
    } catch (err) {
      if (err.status === 401) {
        clearToken();
        setAuthed(false);
      } else {
        setLoadError(err.message ?? 'Error al cargar la sesión');
        setPhase('error');
      }
    }
  }

  const start = (startIdx = 0) => {
    setPhase('question');
    setIdx(startIdx);
    setResults([]);
    setAnswerTimes([]);
    setLocked(false);
    setPicked(null);
    setLastStatus(null);
    setQuestionStart(Date.now());
  };

  const handleAnswer = (isCorrect, answer) => {
    const ms = questionStart ? Date.now() - questionStart : null;
    const ex = session.exercises[idx];
    setLocked(true);
    setPicked(answer);
    setLastStatus(isCorrect ? 'ok' : 'no');
    setAnswerTimes(prev => [...prev, ms]);

    // fire-and-forget; UX doesn't wait for server confirmation
    submitAnswer(session.session_id, ex.id, ex.type, answer, ms).catch(() => {});

    setTimeout(() => setPhase('explain'), 700);
  };

  const next = async () => {
    const updated = [...results, lastStatus];
    setResults(updated);

    if (idx + 1 >= session.exercises.length) {
      let streak = session.streak ?? 0;
      try {
        const res = await completeSession(session.session_id);
        if (res?.streak_current != null) streak = res.streak_current;
      } catch (_) {}
      setSummaryStreak(streak);
      setPhase('summary');
    } else {
      setIdx(idx + 1);
      setLocked(false);
      setPicked(null);
      setLastStatus(null);
      setQuestionStart(Date.now());
      setPhase('question');
    }
  };

  const exit    = () => setPhase('home');
  const restart = () => loadSession();

  const logout = () => {
    clearToken();
    setAuthed(false);
    setSession(null);
  };

  const ex = session?.exercises?.[idx];

  if (phase === 'login') {
    return <Login onAuth={() => setAuthed(true)} />;
  }

  if (phase === 'loading') {
    return (
      <div className="app-shell" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100dvh' }}>
        <div style={{ color: 'var(--muted)', fontSize: '0.95rem' }}>Cargando…</div>
      </div>
    );
  }

  if (phase === 'error') {
    return (
      <div className="app-shell" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '1rem', minHeight: '100dvh' }}>
        <div style={{ color: '#c44a2a', fontSize: '0.95rem' }}>{loadError}</div>
        <button className="btn btn-secondary" onClick={loadSession}><span>Reintentar</span></button>
      </div>
    );
  }

  return (
    <div className="app-shell">
      <AnimatePresence mode="wait">
        {phase === 'home' && session && (
          <Home key="home" session={session} categories={[]} onStart={() => start(0)} onLogout={logout} />
        )}

        {phase === 'day1' && session && (
          <Day1Intro key="day1" session={session} onStart={() => start(0)} />
        )}

        {phase === 'question' && ex && (
          <Question
            key={'q-' + ex.id}
            exercise={ex}
            idx={idx}
            total={session.exercises.length}
            onAnswer={handleAnswer}
            onExit={exit}
            locked={locked}
            picked={picked}
          />
        )}

        {phase === 'explain' && ex && (
          <Explanation
            key={'e-' + ex.id}
            exercise={ex}
            status={lastStatus}
            idx={idx}
            total={session.exercises.length}
            onContinue={next}
            onExit={exit}
          />
        )}

        {phase === 'summary' && session && (
          <Summary
            key="summary"
            session={session}
            results={results}
            streak={summaryStreak}
            onRestart={restart}
          />
        )}

        {phase === 'alreadyDone' && session && (
          <AlreadyDone key="done" session={session} onReview={() => start(0)} />
        )}
      </AnimatePresence>
    </div>
  );
}
