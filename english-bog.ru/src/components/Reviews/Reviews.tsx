"use client";

import { useRef, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, CheckCircle2 } from "lucide-react";
import { siteContent } from "@/data/content";
import { Container } from "@/shared/Container/Container";
import styles from "./Reviews.module.scss";

const cardVariant = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.48, ease: "easeOut" as const, delay: i * 0.07 },
  }),
};

export function Reviews() {
  const { reviews } = siteContent;
  const total = reviews.items.length;
  const trackRef = useRef<HTMLDivElement>(null);
  const [idx, setIdx] = useState(0);

  const getStep = useCallback((): number => {
    const track = trackRef.current;
    if (!track || !track.children.length) return 340;
    const card = track.children[0] as HTMLElement;
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
        <motion.div
          className={styles.ratingBadge}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.45, ease: "easeOut" as const }}
        >
          <span className={styles.ratingStars} aria-hidden="true">★★★★★</span>
          <span className={styles.ratingScore}>4.9</span>
          <span className={styles.ratingSep} aria-hidden="true" />
          <span className={styles.ratingCount}>50+ довольных учеников</span>
        </motion.div>

        <div className={styles.header}>
          <motion.h2
            className={styles.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, ease: "easeOut" as const }}
          >
            {reviews.headingStart}
            <em className={styles.titleAccent}>{reviews.headingAccent}</em>
            {reviews.headingEnd}
          </motion.h2>
          <div className={styles.nav} aria-label="Навигация по отзывам">
            <button
              className={styles.arrow}
              onClick={prev}
              disabled={idx === 0}
              aria-label="Предыдущий отзыв"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              className={styles.arrow}
              onClick={next}
              disabled={idx >= total - getShow()}
              aria-label="Следующий отзыв"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        <div className={styles.viewport}>
          <div ref={trackRef} className={styles.track}>
            {reviews.items.map((item, i) => (
              <motion.article
                key={i}
                className={styles.card}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-40px" }}
                variants={cardVariant}
                whileHover={{ y: -4, transition: { duration: 0.18 } }}
              >
                <div className={styles.cardHead}>
                  <span className={styles.avatar} aria-hidden="true">
                    {item.author.charAt(0)}
                  </span>
                  <div className={styles.cardMeta}>
                    <p className={styles.author}>
                      {item.author}
                      <CheckCircle2
                        size={14}
                        color="#34a853"
                        className={styles.verified}
                        aria-hidden="true"
                      />
                    </p>
                    <span className={styles.stars} aria-label={`${item.stars} из 5`}>
                      {"★".repeat(item.stars)}
                    </span>
                  </div>
                </div>
                <p className={styles.text}>{item.text}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
