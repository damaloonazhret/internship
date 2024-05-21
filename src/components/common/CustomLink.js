import { forwardRef } from "react";

export const CustomLink = forwardRef(
  ({ href, rel = 'noreferrer', target = '_blank', onClick, className, style, children, ...props }, ref) => {
    return (
      <a
        href={href}
        rel={rel}
        target={target}
        onClick={onClick}
        className={className}
        style={style}
        ref={ref}
        {...props}
      >
        {children}
      </a>
    );
  }
);
