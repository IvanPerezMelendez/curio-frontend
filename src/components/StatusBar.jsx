export default function StatusBar() {
  const now = new Date();
  const time = now.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });

  return (
    <div className="status-bar">
      <span>{time}</span>
      <div className="status-bar-r">
        <svg width="14" height="10" viewBox="0 0 14 10" fill="none">
          <path d="M0.5 5 L2.5 7 L5 3 L7.5 6 L10 2 L13.5 5" stroke="currentColor" strokeWidth="1.2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <span style={{ fontSize: 11, opacity: 0.7 }}>5G</span>
        <span>100%</span>
      </div>
    </div>
  );
}
