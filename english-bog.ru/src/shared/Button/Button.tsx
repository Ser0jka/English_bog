import Link from "next/link";
import styles from "./Button.module.scss";

type ButtonVariant = "primary" | "secondary" | "ghost";

type ButtonProps = {
  href: string;
  children: React.ReactNode;
  variant?: ButtonVariant;
  ariaLabel?: string;
};

export function Button({
  href,
  children,
  variant = "primary",
  ariaLabel,
}: ButtonProps) {
  const className = `${styles.button} ${styles[variant]}`;

  return (
    <Link className={className} href={href} aria-label={ariaLabel}>
      {children}
    </Link>
  );
}

