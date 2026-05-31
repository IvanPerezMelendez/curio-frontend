function ExerciseTag({ label, review }) {
  let cls = 'ex-tag';
  if (review === 'recent') cls += ' ex-tag-review';
  if (review === 'far')    cls += ' ex-tag-review-far';
  return <div className={cls}>{label}</div>;
}

export default function QuestionHeader({ tag, review, question }) {
  return (
    <div className="q-head">
      <ExerciseTag label={tag} review={review} />
      <h2 className="q-text">{question}</h2>
    </div>
  );
}
