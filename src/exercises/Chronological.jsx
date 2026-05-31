import { useState, useMemo } from 'react';
import PrimaryButton from '../components/PrimaryButton';

export default function Chronological({ exercise, onAnswer, locked }) {
  const sortedIds = useMemo(
    () => [...exercise.items].sort((a, b) => a.year - b.year).map(x => x.id),
    [exercise]
  );

  const [order, setOrder] = useState(() => {
    const arr = [...exercise.items];
    return arr.sort((a, b) => ((a.id.charCodeAt(0) * 13) % 7) - ((b.id.charCodeAt(0) * 13) % 7));
  });

  const move = (idx, dir) => {
    const j = idx + dir;
    if (j < 0 || j >= order.length) return;
    const next = [...order];
    [next[idx], next[j]] = [next[j], next[idx]];
    setOrder(next);
  };

  const submit = () => {
    const correct = order.every((it, i) => it.id === sortedIds[i]);
    onAnswer(correct, order.map(x => x.id));
  };

  return (
    <div className="chrono">
      <div className="chrono-list">
        {order.map((it, i) => {
          let cls = 'chrono-item';
          if (locked) {
            cls += sortedIds[i] === it.id ? ' chrono-correct' : ' chrono-wrong';
          }
          return (
            <div key={it.id} className={cls}>
              <div className="chrono-rank">{i + 1}</div>
              <div className="chrono-label">{it.label}</div>
              {!locked && (
                <div className="chrono-controls">
                  <button onClick={() => move(i, -1)} disabled={i === 0} aria-label="Subir">▲</button>
                  <button onClick={() => move(i, +1)} disabled={i === order.length - 1} aria-label="Bajar">▼</button>
                </div>
              )}
              {locked && <div className="chrono-year">{it.year}</div>}
            </div>
          );
        })}
      </div>
      {!locked && (
        <PrimaryButton onClick={submit}>Comprobar orden</PrimaryButton>
      )}
    </div>
  );
}
