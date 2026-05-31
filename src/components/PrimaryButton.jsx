export default function PrimaryButton({ children, onClick, disabled, secondary, arrow }) {
  return (
    <button
      className={'btn btn-block ' + (secondary ? 'btn-secondary' : 'btn-primary')}
      onClick={onClick}
      disabled={disabled}
    >
      <span>{children}</span>
      {arrow && (
        <span className="btn-arrow">
          <svg width="11" height="11" viewBox="0 0 11 11">
            <path d="M2 5.5h7M6 2l3.5 3.5L6 9" stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </span>
      )}
    </button>
  );
}
