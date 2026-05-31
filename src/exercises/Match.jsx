import { useState, useEffect, useMemo } from 'react';

export default function Match({ exercise, onAnswer, locked }) {
  const lefts = useMemo(
    () => exercise.pairs.map((p, i) => ({ id: i, label: p.left })),
    [exercise]
  );
  const rights = useMemo(() => {
    const arr = exercise.pairs.map((p, i) => ({ id: i, label: p.right }));
    return [...arr].sort((a, b) => ((a.id * 7 + 3) % 5) - ((b.id * 7 + 3) % 5));
  }, [exercise]);

  const [picked, setPicked] = useState(null);
  const [matches, setMatches] = useState({});
  const [errorId, setErrorId] = useState(null);

  const allDone = Object.keys(matches).length === exercise.pairs.length;

  useEffect(() => {
    if (allDone && !locked) {
      const allCorrect = Object.entries(matches).every(([l, r]) => Number(l) === Number(r));
      setTimeout(() => onAnswer(allCorrect, matches), 400);
    }
  }, [allDone, locked]);

  const handleLeft = (id) => {
    if (matches[id] != null) return;
    setPicked(id);
  };

  const handleRight = (id) => {
    if (picked == null) return;
    if (picked === id) {
      setMatches(prev => ({ ...prev, [picked]: id }));
      setPicked(null);
    } else {
      setErrorId(id);
      setTimeout(() => setErrorId(null), 350);
    }
  };

  const rightUsed = new Set(Object.values(matches));

  return (
    <div className="match">
      <div className="match-col">
        {lefts.map((it) => {
          const done = matches[it.id] != null;
          const sel  = picked === it.id;
          let cls = 'match-item match-left';
          if (done) cls += ' match-done';
          else if (sel) cls += ' match-sel';
          return (
            <button key={it.id} className={cls} disabled={done || locked} onClick={() => handleLeft(it.id)}>
              <span className="match-dot" />
              {it.label}
            </button>
          );
        })}
      </div>
      <div className="match-col">
        {rights.map((it) => {
          const used = rightUsed.has(it.id);
          let cls = 'match-item match-right';
          if (used) cls += ' match-done';
          if (errorId === it.id) cls += ' shake';
          return (
            <button key={it.id} className={cls} disabled={used || locked} onClick={() => handleRight(it.id)}>
              {it.label}
              <span className="match-dot" />
            </button>
          );
        })}
      </div>
    </div>
  );
}
