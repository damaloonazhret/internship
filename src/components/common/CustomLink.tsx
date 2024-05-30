import { AnchorHTMLAttributes, CSSProperties, forwardRef } from "react";

interface CustomLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  className?: string;
  style?: CSSProperties;
}

export const CustomLink = forwardRef<HTMLAnchorElement, CustomLinkProps>(
  (
    {
      href,
      rel = "noreferrer",
      target = "_blank",
      onClick,
      className,
      style,
      children,
      ...props
    },
    ref,
  ) => {
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
  },
);
