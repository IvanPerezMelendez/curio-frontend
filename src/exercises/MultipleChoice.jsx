export default function MultipleChoice({ exercise, onAnswer, locked, picked, status }) {
  const { options, correct } = exercise;

  return (
    <div className="mc">
      {options.map((opt, i) => {
        let cls = 'mc-opt';
        if (locked) {
          if (i === correct)                        cls += ' mc-correct';
          else if (i === picked && status === 'ok') cls += ' mc-correct';
          else if (i === picked && status === 'no') cls += ' mc-wrong';
          else if (i === picked)                    cls += ' mc-pick';
          else                                      cls += ' mc-fade';
        } else if (i === picked) {
          cls += ' mc-pick';
        }
        return (
          <button
            key={i}
            className={cls}
            disabled={locked}
            onClick={() => onAnswer(null, i)}
          >
            <span className="mc-letter">{String.fromCharCode(65 + i)}</span>
            <span className="mc-label">{opt}</span>
          </button>
        );
      })}
    </div>
  );
}
