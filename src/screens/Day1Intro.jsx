import { motion } from 'framer-motion';

export default function Day1Intro({ session, onStart }) {
  return (
    <motion.div
      className="intro"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="intro-hero">
        <div className="intro-pretitle">Primera sesión · {session.category}</div>
        <h1 className="intro-title">{session.subtopic.name}</h1>
        <p className="intro-sub">{session.subtopic.subtitle}</p>
      </div>

      <div className="intro-card">
        <p className="intro-card-body">
          Asia oriental concentra a más de 1.600 millones de personas, cinco husos horarios y algunas de las civilizaciones continuas más antiguas del mundo. Empezamos hoy en <strong>Japón</strong> — un archipiélago de 14.125 islas que durante 250 años se cerró al exterior y luego, en una sola generación, se transformó en potencia industrial.
        </p>
      </div>

      <div className="intro-cta-wrap">
        <button className="btn btn-primary btn-block" onClick={onStart}>
          <span>Comenzar</span>
          <span className="btn-arrow">→</span>
        </button>
        <div className="intro-cta-meta">~5 min · {session.exercises?.length ?? 10} piezas</div>
      </div>
    </motion.div>
  );
}
