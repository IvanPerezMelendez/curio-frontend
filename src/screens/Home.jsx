import { motion } from 'framer-motion';

function Mark({ children }) {
  return <span className="mark">{children}</span>;
}

export default function Home({ session, onStart, onLogout }) {
  const today = new Date();
  const days   = ['DOM', 'LUN', 'MAR', 'MIÉ', 'JUE', 'VIE', 'SÁB'];
  const months = ['ENE', 'FEB', 'MAR', 'ABR', 'MAY', 'JUN', 'JUL', 'AGO', 'SEP', 'OCT', 'NOV', 'DIC'];
  const dateStr = days[today.getDay()] + ' · ' + today.getDate() + ' ' + months[today.getMonth()];

  const subtopicName     = session.subtopic?.name ?? '—';
  const subtopicSubtitle = session.subtopic?.subtitle ?? '';
  const categoryName     = session.category?.name ?? '—';
  const streak           = session.streak_current ?? 0;

  return (
    <motion.div
      className="home"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="home-bar">
        <div className="brand">
          <span className="brand-mark">✱</span>
          <span>curio</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div className="streak-badge">
            <span className="streak-num">{streak}</span>
            <span>en racha</span>
          </div>
          {onLogout && (
            <button
              onClick={onLogout}
              style={{ background: 'none', border: 'none', color: 'var(--muted)', cursor: 'pointer', fontSize: '0.8rem', fontFamily: 'inherit' }}
            >
              Salir
            </button>
          )}
        </div>
      </div>

      <div className="home-band">
        <span>{categoryName.toUpperCase()}</span>
        <span>{dateStr}</span>
        <span>{session.topic?.name ?? '—'}</span>
      </div>

      <div className="home-hero">
        <div className="home-date">Una jornada sobre</div>
        <h1 className="home-title">
          <span><Mark>{subtopicName}</Mark><em style={{ fontStyle: 'italic', opacity: 0.6 }}>.</em></span>
        </h1>
        {subtopicSubtitle && (
          <p className="home-subtitle">{subtopicSubtitle}</p>
        )}
      </div>

      <div className="home-actions">
        <button className="btn btn-primary btn-block" onClick={onStart}>
          <span>Empezar <em>la jornada</em></span>
          <span className="btn-arrow">→ 5 MIN</span>
        </button>
        <div className="home-meta">
          {session.exercises.length} ejercicios
        </div>
      </div>
    </motion.div>
  );
}
