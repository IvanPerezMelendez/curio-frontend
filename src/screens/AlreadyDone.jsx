import { motion } from 'framer-motion';

export default function AlreadyDone({ session, onReview }) {
  return (
    <motion.div
      className="done-state"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
    >
      <div>
        <div className="eyebrow-line">Día completado</div>
        <h1 className="done-title" style={{ marginTop: 16 }}>Te veo mañana.</h1>
        <p className="done-sub">«Aprender es como remar contra corriente: en cuanto se deja, se retrocede».</p>
      </div>

      <div className="done-cards">
        <div className="done-card-big">
          <div className="stat-num">{session.streak_current ?? 0}</div>
          <div className="stat-label">Días aprendiendo seguidos</div>
        </div>

        <div className="done-bottom-cards">
          <div className="done-tomorrow">
            <div className="done-tomorrow-label">Hoy</div>
            <div className="done-tomorrow-title">{session.subtopic?.name ?? '—'}</div>
            <div className="done-tomorrow-meta">{session.exercises.length}/{session.exercises.length} piezas</div>
          </div>
        </div>
      </div>

      <div className="done-cta-wrap">
        <button className="btn btn-secondary btn-block" onClick={onReview}>
          <span>Repasar el día de hoy</span>
          <span className="btn-arrow">↩</span>
        </button>
      </div>
    </motion.div>
  );
}
