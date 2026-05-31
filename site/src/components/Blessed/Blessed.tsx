"use client";

import { useRef, useEffect, useCallback } from "react";
import { siteContent } from "@/data/content";
import { Container } from "@/shared/Container/Container";
import styles from "./Blessed.module.scss";

// На сколько px блок «GOD BLESS DAVE» опущен вниз в старте — чем больше, тем заметнее «выезд»
const RISE_OFFSET = 240;

export function Blessed() {
  const { blessed } = siteContent;
  const stageRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  const update = useCallback(() => {
    const stage = stageRef.current;
    const bottom = bottomRef.current;
    if (!stage || !bottom) return;

    const vh = window.innerHeight;
    // Якорь — нижняя кромка сцены (там и живёт GOD BLESS). transform не двигает layout,
    // поэтому замер стабилен и не уходит в самоподдув.
    const anchor = stage.getBoundingClientRect().bottom;

    // 0 — блок только входит снизу экрана; 1 — уже на месте.
    // Делитель 0.45vh → доезжает быстро, ещё до центра экрана («быстрое пролистывание»).
    const raw = (vh - anchor) / (vh * 0.45);
    const p = Math.min(1, Math.max(0, raw));
    const eased = 1 - Math.pow(1 - p, 2); // ease-out: резкий старт, мягкая посадка

    bottom.style.transform = `translateY(${(1 - eased) * RISE_OFFSET}px)`;
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
    <section className={styles.section} aria-label="К счастью, у меня есть решение">
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

        {/*
          Плейсхолдер 2 — Dave по центру (PNG без фона)
          Заменить на <Image>, встанет ровно
        */}
        <div className={styles.photoPerson} aria-hidden="true" />

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
