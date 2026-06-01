"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./StatsStrip.module.scss";

const STATS = [
  { value: 50, suffix: "+", label: "учеников занимаются" },
  { value: 98, suffix: "%", label: "довольны результатом" },
  { value: 10, suffix: "+", label: "занимаюсь репетиторством" },
  { value: 7, suffix: "+", label: "беру на обучение школьников" },
];

function StatCounter({
  value,
  suffix,
  label,
}: {
  value: number;
  suffix: string;
  label: string;
}) {
  const [display, setDisplay] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (!ref.current) return;
    const obj = { val: 0 };
    const tween = gsap.to(obj, {
      val: value,
      duration: 2,
      ease: "power3.out",
      snap: { val: 1 },
      onUpdate: () => setDisplay(Math.round(obj.val)),
      scrollTrigger: {
        trigger: ref.current,
        start: "top 85%",
        once: true,
      },
    });
    return () => {
      tween.kill();
    };
  }, [value]);

  return (
    <div ref={ref} className={styles.stat}>
      <p className={styles.statNum}>
        <span className={styles.statVal}>{display}</span>
        <span className={styles.statSuffix}>{suffix}</span>
      </p>
      <p className={styles.statLabel}>{label}</p>
    </div>
  );
}

export function StatsStrip() {
  return (
    <div className={styles.strip} aria-label="Статистика курса">
      <div className={styles.inner}>
        {STATS.map((s) => (
          <StatCounter key={s.label} value={s.value} suffix={s.suffix} label={s.label} />
        ))}
      </div>
    </div>
  );
}
