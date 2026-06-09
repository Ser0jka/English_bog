import styles from "./Container.module.scss";

type ContainerProps = {
  children: React.ReactNode;
  className?: string;
};

export function Container({ children, className = "" }: ContainerProps) {
  return <div className={`${styles.container} ${className}`}>{children}</div>;
}

