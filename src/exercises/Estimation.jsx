import { useState } from 'react';
import PrimaryButton from '../components/PrimaryButton';

export default function Estimation({ exercise, onAnswer, locked, picked }) {
  const [val, setVal] = useState(picked != null ? picked : exercise.defaultValue);

  const submit = () => {
    const diff = Math.abs(val - exercise.correct) / exercise.correct;
    onAnswer(diff <= exercise.tolerance, val);
  };

  const pct        = ((val - exercise.min) / (exercise.max - exercise.min)) * 100;
  const correctPct = ((exercise.correct - exercise.min) / (exercise.max - exercise.min)) * 100;

  return (
    <div className="est">
      <div className="est-readout">
        <div className="est-num">{Number(val).toLocaleString('es-ES')}</div>
        <div className="est-unit">{exercise.unit}</div>
      </div>

      <div className="est-track-wrap">
        <div className="est-track">
          <div className="est-fill" style={{ width: pct + '%' }} />
          {locked && (
            <div className="est-correct-mark" style={{ left: correctPct + '%' }}>
              <span className="est-correct-label">{Number(exercise.correct).toLocaleString('es-ES')}</span>
            </div>
          )}
          <div className="est-thumb" style={{ left: pct + '%' }} />
        </div>
        <input
          type="range"
          min={exercise.min}
          max={exercise.max}
          step={exercise.step}
          value={val}
          disabled={locked}
          onChange={e => setVal(Number(e.target.value))}
          className="est-input"
        />
        <div className="est-axis">
          <span>{exercise.min.toLocaleString('es-ES')}</span>
          <span>{exercise.max.toLocaleString('es-ES')}</span>
        </div>
      </div>

      {!locked && <PrimaryButton onClick={submit}>Confirmar estimación</PrimaryButton>}
    </div>
  );
}
