export default function TrueFalse({ exercise, onAnswer, locked, picked, status }) {
  const { correct } = exercise;

  const cls = (val) => {
    let c = 'tf-card';
    if (locked) {
      if (val === correct)                          c += ' tf-correct';
      else if (picked === val && status === 'ok')   c += ' tf-correct';
      else if (picked === val && status === 'no')   c += ' tf-wrong';
      else if (picked === val)                      c += ' tf-pick';
      else                                          c += ' tf-fade';
    } else if (picked === val)                      c += ' tf-pick';
    return c;
  };

  return (
    <div className="tf">
      <button className={cls(true)}  disabled={locked} onClick={() => onAnswer(null, true)}>
        <div className="tf-glyph">✓</div>
        <div className="tf-word">Verdadero</div>
      </button>
      <button className={cls(false)} disabled={locked} onClick={() => onAnswer(null, false)}>
        <div className="tf-glyph">✗</div>
        <div className="tf-word">Falso</div>
      </button>
    </div>
  );
}
