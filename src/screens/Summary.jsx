import { motion } from 'framer-motion';

export default function Summary({ session, results, streak, onRestart }) {
  const total   = results.length;
  const correct = results.filter(r => r === 'ok').length;

  const reviewExercises = session.exercises
    .map((ex, i) => ({ ex, status: results[i] }))
    .filter(x => x.ex.is_review);

  let mood = 'Sigue así';
  if (correct === total)             mood = 'Día redondo';
  else if (correct >= total * 0.7)   mood = 'Muy bien hecho';
  else if (correct >= total * 0.4)   mood = 'Has aprendido cosas nuevas';
  else                               mood = 'Mañana lo recordarás mejor';

  return (
    <motion.div
      className="summary"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="summary-head">
        <div className="eyebrow-line">Sesión terminada</div>
        <h1 className="summary-title"><em>{mood}</em>.</h1>
      </div>

      <div className="summary-stats">
        <div className="stat-block highlight">
          <div className="eyebrow">Aciertos</div>
          <div className="stat-num">
            <span>{correct}</span><span className="stat-of">/{total}</span>
          </div>
        </div>
        <div className="stat-block">
          <div className="eyebrow">Racha</div>
          <div className="stat-num"><em>{streak + 1}</em></div>
        </div>
        <div className="stat-block">
          <div className="eyebrow">Hoy</div>
          <div className="stat-num">~5<span className="stat-of">min</span></div>
        </div>
      </div>

      {reviewExercises.length > 0 && (
        <div className="summary-section">
          <div className="eyebrow-line">Tu memoria</div>
          <div className="review-list">
            {reviewExercises.map((r, i) => (
              <div key={i} className="review-row">
                <div className={'review-tick ' + (r.status === 'ok' ? 'rt-ok' : 'rt-no')}>
                  {r.status === 'ok' ? '✓' : '·'}
                </div>
                <div className="review-text">
                  <div className="review-q">{r.ex.explanation.title}</div>
                  <div className="review-meta">
                    {'Ejercicio de repaso'}
                    {' · '}
                    {r.status === 'ok' ? 'Lo recuerdas' : 'Vuelve pronto'}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="summary-section">
        <div className="summary-next">
          <div className="summary-next-meta">
            Vuelve mañana para mantener tu racha de {streak + 1} días.
          </div>
        </div>
      </div>

      <div className="summary-cta">
        <button className="btn btn-secondary btn-block" onClick={onRestart}>
          <span>Volver al inicio</span>
          <span className="btn-arrow">↩</span>
        </button>
      </div>
    </motion.div>
  );
}
