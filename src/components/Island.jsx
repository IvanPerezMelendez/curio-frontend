export default function Island({ mode, streak, index, total, onExit }) {
  if (mode === 'streak') {
    return (
      <div className="island-wrap">
        <div className="island">
          <span className="island-num">{streak}</span>
          <span className="island-meta">días en racha</span>
        </div>
      </div>
    );
  }

  if (mode === 'progress') {
    const pct = ((index + 1) / total) * 100;
    return (
      <div className="session-top">
        <button className="icon-btn" onClick={onExit} aria-label="Salir">
          <svg width="14" height="14" viewBox="0 0 14 14">
            <path d="M3 3l8 8M11 3l-8 8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
          </svg>
        </button>
        <div className="progress-bar" aria-label={'Progreso ' + (index + 1) + ' de ' + total}>
          <div className="progress-fill" style={{ width: pct + '%' }} />
        </div>
        <div className="progress-count">
          <span className="progress-now">{Math.min(index + 1, total)}</span>
          <span className="progress-sep">/</span>
          <span>{total}</span>
        </div>
      </div>
    );
  }

  return null;
}
