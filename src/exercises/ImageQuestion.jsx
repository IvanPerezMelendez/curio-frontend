export default function ImageQuestion({ exercise, onAnswer, locked, picked, status }) {
  const { options, correct, imageColor, imageLabel } = exercise;

  return (
    <div className="img-q">
      <div className="img-frame" style={{ background: imageColor || '#c44a2a' }}>
        <div className="img-grain" />
        <svg className="img-shape" viewBox="0 0 200 120" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
          <rect x="0" y="95" width="200" height="25" fill="rgba(0,0,0,0.35)" />
          <path d="M20 50 Q100 30 180 50 L180 56 Q100 38 20 56 Z" fill="#1a0e0a"/>
          <rect x="35" y="55" width="6" height="55" fill="#1a0e0a"/>
          <rect x="159" y="55" width="6" height="55" fill="#1a0e0a"/>
          <rect x="55" y="62" width="90" height="5" fill="#1a0e0a"/>
        </svg>
        <div className="img-caption">{imageLabel}</div>
      </div>
      <div className="mc mc-tight">
        {options.map((opt, i) => {
          let cls = 'mc-opt mc-opt-sm';
          if (locked) {
            if (i === correct)                        cls += ' mc-correct';
            else if (i === picked && status === 'ok') cls += ' mc-correct';
            else if (i === picked && status === 'no') cls += ' mc-wrong';
            else if (i === picked)                    cls += ' mc-pick';
            else                                      cls += ' mc-fade';
          } else if (i === picked) cls += ' mc-pick';
          return (
            <button
              key={i}
              className={cls}
              disabled={locked}
              onClick={() => onAnswer(null, i)}
            >
              <span className="mc-label">{opt}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
