"use client";

import { useRef, useEffect, useCallback } from "react";
import { siteContent } from "@/data/content";
import { Container } from "@/shared/Container/Container";
import styles from "./Blessed.module.scss";

const RISE_OFFSET = 240;

export function Blessed() {
  const { blessed } = siteContent;
  const stageRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const blessImgRef = useRef<HTMLDivElement>(null);

  const update = useCallback(() => {
    const stage = stageRef.current;
    const bottom = bottomRef.current;
    if (!stage || !bottom) return;

    const vh = window.innerHeight;
    const anchor = stage.getBoundingClientRect().top;
    // raw=0 когда верх сцены на 85% вьюпорта (только показался), raw=1 когда на 15%
    const raw = (vh * 0.85 - anchor) / (vh * 0.7);
    const p = Math.min(1, Math.max(0, raw));
    const eased = 1 - Math.pow(1 - p, 2);

    bottom.style.transform = `translateY(${(1 - eased) * RISE_OFFSET}px)`;

    if (blessImgRef.current) {
      const offset = (1 - eased) * 110;
      blessImgRef.current.style.transform = `translateX(-50%) translateY(${offset}px)`;
      blessImgRef.current.style.opacity = String(eased);
    }
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    update();
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [update]);

  return (
    <section id="directions" className={styles.section} aria-label="Направления занятий">
      <Container className={styles.intro}>
        <h2 className={styles.heading}>
          {blessed.heading}{" "}
          <em className={styles.headingAccent}>{blessed.headingAccent}</em>{" "}
          <span aria-hidden="true">{blessed.headingEmoji}</span>
        </h2>
        <p className={styles.subtitle}>{blessed.subtitle}</p>
      </Container>

      {/* Сцена: 3 абсолютных фото-плейсхолдера + CSS-текст */}
      <div className={styles.stage} ref={stageRef}>

        {/*
          Плейсхолдер 1 — фон: флаг США
          Заменить на <Image fill style={{objectFit:'cover'}} />
        */}
        <div className={styles.photoBg} aria-hidden="true" />

        {/* Фоновое фото (флаг + Дейв) — скейл-параллакс при скролле */}
        <div className={styles.blessImgWrap} ref={blessImgRef} aria-hidden="true">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/bless.webp" alt="" className={styles.blessImg} />
        </div>

        {/*
          Плейсхолдер 3 — облачко с цитатой (PNG)
          Заменить на <Image>, встанет ровно
        */}
        <div className={styles.photoBubble} aria-hidden="true" />

        {/* CSS-часть верстки: звёзды + золотой текст. Выезжает снизу вверх при скролле */}
        <div className={styles.stageBottom} ref={bottomRef}>
          <div className={styles.stars} aria-hidden="true">
            <span>★</span><span>★</span><span>★</span>
          </div>
          <p className={styles.godBless}>{blessed.bigText}</p>
        </div>

      </div>
    </section>
  );
}
