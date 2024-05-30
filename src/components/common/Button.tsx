import {MouseEventHandler, ReactNode} from "react";

interface ButtonProps {
  onClick: MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
  className?: string;
  children: ReactNode;
}

export const Button = ({ onClick, disabled = false, className = 'btn', children }: ButtonProps) => {
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
