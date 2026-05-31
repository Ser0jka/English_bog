"use client";

import { useRef, useState, useCallback } from "react";
import { siteContent } from "@/data/content";
import { Container } from "@/shared/Container/Container";
import styles from "./Reviews.module.scss";

export function Reviews() {
  const { reviews } = siteContent;
  const total = reviews.items.length;
  const trackRef = useRef<HTMLDivElement>(null);
  const [idx, setIdx] = useState(0);

  const getStep = useCallback((): number => {
    const track = trackRef.current;
    if (!track || !track.children.length) return 340;
    const card = track.children[0] as HTMLElement;
    // gap-20 is our CSS gap; read actual rendered gap
    const cs = window.getComputedStyle(track);
    const gap = parseFloat(cs.gap) || 20;
    return card.offsetWidth + gap;
  }, []);

  const getShow = useCallback((): number => {
    const track = trackRef.current;
    if (!track) return 3;
    const vp = track.parentElement;
    if (!vp) return 3;
    const step = getStep();
    return step > 0 ? Math.round(vp.offsetWidth / step) : 1;
  }, [getStep]);

  const goTo = useCallback((newIdx: number) => {
    const maxI = Math.max(0, total - getShow());
    const clamped = Math.max(0, Math.min(maxI, newIdx));
    const track = trackRef.current;
    if (!track) return;
    track.style.transform = `translateX(-${clamped * getStep()}px)`;
    setIdx(clamped);
  }, [total, getShow, getStep]);

  const prev = useCallback(() => goTo(idx - 1), [idx, goTo]);
  const next = useCallback(() => goTo(idx + 1), [idx, goTo]);

  return (
    <section id="reviews" className={styles.section} aria-label="Отзывы учеников">
      <Container>
        <div className={styles.header}>
          <h2 className={styles.title}>
            {reviews.headingStart}
            <em className={styles.titleAccent}>{reviews.headingAccent}</em>
            {reviews.headingEnd}
          </h2>
          <div className={styles.nav} aria-label="Навигация по отзывам">
            <button
              className={styles.arrow}
              onClick={prev}
              disabled={idx === 0}
              aria-label="Предыдущий отзыв"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>
            <button
              className={styles.arrow}
              onClick={next}
              disabled={idx >= total - getShow()}
              aria-label="Следующий отзыв"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </div>
        </div>

        <div className={styles.viewport}>
          <div ref={trackRef} className={styles.track}>
            {reviews.items.map((item, i) => (
              <article key={i} className={styles.card}>
                <div className={styles.cardHead}>
                  <span className={styles.avatar} aria-hidden="true">
                    {item.author.charAt(0)}
                  </span>
                  <div className={styles.cardMeta}>
                    <p className={styles.author}>
                      {item.author}
                      <svg className={styles.verified} viewBox="0 0 24 24" width="14" height="14" aria-hidden="true">
                        <circle cx="12" cy="12" r="11" fill="#34a853" />
                        <path d="M7 12.5l3 3 7-7" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </p>
                    <span className={styles.stars} aria-label={`${item.stars} из 5`}>
                      {"★".repeat(item.stars)}
                    </span>
                  </div>
                </div>
                <p className={styles.text}>{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
