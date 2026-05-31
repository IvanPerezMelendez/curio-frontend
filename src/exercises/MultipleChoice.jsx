export default function MultipleChoice({ exercise, onAnswer, locked, picked }) {
  const { options, correct } = exercise;

  return (
    <div className="mc">
      {options.map((opt, i) => {
        let cls = 'mc-opt';
        if (locked) {
          if (i === correct)     cls += ' mc-correct';
          else if (i === picked) cls += ' mc-wrong';
          else                   cls += ' mc-fade';
        } else if (i === picked) {
          cls += ' mc-pick';
        }
        return (
          <button
            key={i}
            className={cls}
            disabled={locked}
            onClick={() => onAnswer(i === correct, i)}
          >
            <span className="mc-letter">{String.fromCharCode(65 + i)}</span>
            <span className="mc-label">{opt}</span>
          </button>
        );
      })}
    </div>
  );
}
