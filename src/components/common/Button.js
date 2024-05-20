export const Button = ({ onClick, disabled, className = 'btn', children }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={className}
    >
      {children}
    </button>
  );
};
