"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import styles from "./RollingText.module.scss";

export function RollingText({ children }: { children: React.ReactNode }) {
  const topRef = useRef<HTMLSpanElement>(null);
  const botRef = useRef<HTMLSpanElement>(null);

  const onEnter = () => {
    gsap.killTweensOf([topRef.current, botRef.current]);
    // label выезжает вверх
    gsap.to(topRef.current, { yPercent: -100, duration: 0.28, ease: "power2.in" });
    // clone поднимается снизу (top:100% + yPercent:-100 → top:0)
    gsap.to(botRef.current, { yPercent: -100, duration: 0.28, ease: "power2.out" });
  };

  const onLeave = () => {
    gsap.killTweensOf([topRef.current, botRef.current]);
    gsap.to(botRef.current, { yPercent: 0, duration: 0.22, ease: "power2.in" });
    gsap.to(topRef.current, { yPercent: 0, duration: 0.22, ease: "power2.out" });
  };

  return (
    <span
      className={styles.wrap}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
    >
      <span ref={topRef} className={styles.label}>{children}</span>
      <span ref={botRef} className={styles.clone} aria-hidden="true">{children}</span>
    </span>
  );
}
