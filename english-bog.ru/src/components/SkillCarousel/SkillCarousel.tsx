"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { siteContent } from "@/data/content";
import { Container } from "@/shared/Container/Container";
import { VideoSlot } from "@/shared/VideoSlot/VideoSlot";
import styles from "./SkillCarousel.module.scss";

const TOTAL = 3;
const ROTATIONS = [-6, 5, -4];
const VIDEO_SOURCES = [
  "/videos/huh-cat-huh-m4rtin_1.gif",
  "/videos/cat-water.gif",
  "/images/kiten.jpeg",
];

export function SkillCarousel() {
  const [current, setCurrent] = useState(0);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const currentRef = useRef(0);

  const update = useCallback(() => {
    const wrapper = wrapperRef.current;
    const track = trackRef.current;
    if (!wrapper || !track) return;

    const scrolled = Math.max(0, -wrapper.getBoundingClientRect().top);
    const maxScroll = wrapper.offsetHeight - window.innerHeight;
    const progress = maxScroll > 0 ? Math.min(1, scrolled / maxScroll) : 0;

    track.style.transform = `translateX(-${progress * (TOTAL - 1) * 100}%)`;

    const idx = Math.min(TOTAL - 1, Math.round(progress * (TOTAL - 1)));
    if (idx !== currentRef.current) {
      currentRef.current = idx;
      setCurrent(idx);
    }
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", update, { passive: true });
    update();
    return () => window.removeEventListener("scroll", update);
  }, [update]);

  const goToSlide = useCallback((index: number) => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;
    const wrapperTop = wrapper.getBoundingClientRect().top + window.scrollY;
    const maxScroll = wrapper.offsetHeight - window.innerHeight;
    const targetProgress = TOTAL > 1 ? index / (TOTAL - 1) : 0;
    window.scrollTo({ top: wrapperTop + targetProgress * maxScroll, behavior: "smooth" });
  }, []);

  const { skillCarousel } = siteContent;

  return (
    <div ref={wrapperRef} className={styles.wrapper}>
      <section className={styles.section} aria-label="Примерно так обстоят дела с английским">

        <Container className={styles.headingWrap}>
          <h2 className={styles.heading}>
            {skillCarousel.heading}{" "}
            <em className={styles.headingAccent}>{skillCarousel.headingAccent}</em>
          </h2>
        </Container>

        <div className={styles.viewport}>
          <div
            ref={trackRef}
            className={styles.track}
            aria-live="polite"
          >
            {skillCarousel.slides.map((slide, i) => (
              <div
                key={slide.num}
                className={styles.slide}
                aria-hidden={i !== current}
              >
                {/*
                  Фото-заглушка (мем-картинка: кот, выдра и т.д.) — слева
                  Заменить на <Image> — пустой div, без CSS внутри
                */}
                <div className={styles.photoSlot} aria-hidden="true" />

                {/* Текст слайда */}
                <div className={styles.slideText}>
                  <span className={styles.slideNum}>{slide.num}</span>
                  <p className={styles.slideQuestion}>{slide.question}</p>
                  <p className={styles.slideDesc}>{slide.desc}</p>
                </div>

                {/* Видео-блок под наклоном, справа */}
                <VideoSlot
                  className={styles.videoSlot}
                  videoSrc={VIDEO_SOURCES[i] || VIDEO_SOURCES[0]}
                  style={{ rotate: `${ROTATIONS[i]}deg` }}
                  label={slide.question}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Точки навигации */}
        <div className={styles.dots} role="tablist" aria-label="Навигация по слайдам">
          {skillCarousel.slides.map((slide, i) => (
            <button
              key={slide.num}
              role="tab"
              className={`${styles.dot} ${i === current ? styles.dotActive : ""}`}
              aria-selected={i === current}
              aria-label={`Слайд ${i + 1}`}
              onClick={() => goToSlide(i)}
            />
          ))}
        </div>

      </section>
    </div>
  );
}
