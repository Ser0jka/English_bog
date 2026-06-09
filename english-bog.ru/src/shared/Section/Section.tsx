import styles from "./Section.module.scss";

type SectionProps = {
  id?: string;
  children: React.ReactNode;
  className?: string;
  ariaLabel?: string;
};

export function Section({ id, children, className = "", ariaLabel }: SectionProps) {
  return (
    <section id={id} className={`${styles.section} ${className}`} aria-label={ariaLabel}>
      {children}
    </section>
  );
}

