import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Island from '../components/Island';
import ChatPanel from '../components/ChatPanel';

export default function Explanation({ exercise, status, idx, total, onContinue, onExit }) {
  const [chatOpen, setChatOpen]         = useState(false);
  const [chatMessages, setChatMessages] = useState([]);
  const exp = exercise.explanation;
  if (!exp) return null;

  return (
    <div className="session-screen">
      <Island mode="progress" index={idx} total={total} onExit={onExit} />
      <motion.div
        className="session-body"
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="exp">
          <div className="exp-status-row">
            <div className={'exp-status ' + (status === 'ok' ? 'exp-ok' : 'exp-no')}>
              {status === 'ok' ? 'Correcto' : 'No exactamente'}
            </div>
          </div>

          <div className="exp-card">
            <h3 className="exp-title">{exp.title}</h3>
            <p className="exp-body">{exp.body}</p>
            {exp.fact && (
              <>
                <div className="divider-dotted" />
                <div className="exp-fact">
                  <span className="exp-fact-eyebrow">¿Sabías que…?</span>
                  <span className="exp-fact-text">{exp.fact}</span>
                </div>
              </>
            )}
          </div>

          <div className="exp-cta">
            <button className="btn btn-primary btn-block" onClick={onContinue}>
              <span>Continuar</span>
              <span className="btn-arrow">→</span>
            </button>
            <button className="chat-trigger" onClick={() => setChatOpen(true)}>
              <span>Preguntar al tutor</span>
              <span className="chat-trigger-icon">✱</span>
            </button>
          </div>
        </div>
      </motion.div>

      <AnimatePresence>
        {chatOpen && (
          <ChatPanel
            exercise={exercise}
            messages={chatMessages}
            setMessages={setChatMessages}
            onClose={() => setChatOpen(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
