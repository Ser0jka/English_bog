"use client";

import { useRef, useEffect } from "react";
import { siteContent } from "@/data/content";
import { links } from "@/data/links";
import { Container } from "@/shared/Container/Container";
import { VideoSlot } from "@/shared/VideoSlot/VideoSlot";
import styles from "./BigCta.module.scss";

export function BigCta() {
  const { bigCta } = siteContent;
  const sectionRef = useRef<HTMLElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null); // Добавили реф для неподвижной обертки
  const btnRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const btn = btnRef.current;
    const wrapper = wrapperRef.current;
    if (!section || !btn || !wrapper) return;

    function onMove(e: MouseEvent) {
      if (!wrapper || !btn) return;
      // Считаем от центра неподвижной обертки
      const rect = wrapper.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.sqrt(dx * dx + dy * dy);
      
      const RADIUS = 280; // Зона захвата остается большой
      
      // 0.85 означает, что кнопка проходит 85% пути до курсора.
      // За счет своего размера она всегда будет ложиться прямо под мышь.
      const PULL = 0.65;  

      if (dist < RADIUS) {
        const moveX = dx * PULL;
        const moveY = dy * PULL;

        // transition: 0.12s дает очень быстрый бросок к курсору при входе в зону, 
        // но сглаживает микро-дрожь руки
        btn.style.transition = "transform 0.12s ease-out";
        btn.style.transform = `translate(${moveX}px, ${moveY}px) scale(1.25)`; // Увеличили скейл
      } else {
        // Мягкий возврат на место
        btn.style.transition = "transform 0.4s cubic-bezier(0.22, 1, 0.36, 1)";
        btn.style.transform = "translate(0px, 0px) scale(1)";
      }
    }

    function onLeave() {
      if (!btn) return;
      btn.style.transition = "transform 0.4s cubic-bezier(0.22, 1, 0.36, 1)";
      btn.style.transform = "translate(0px, 0px) scale(1)";
    }

    section.addEventListener("mousemove", onMove);
    section.addEventListener("mouseleave", onLeave);
    
    return () => {
      section.removeEventListener("mousemove", onMove);
      section.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <section ref={sectionRef} className={styles.section} aria-label="Призыв к действию">
      {/* Compass-rose SVG background */}
      <svg className={styles.bg} viewBox="0 0 800 800" fill="none" aria-hidden="true">
        <circle cx="400" cy="400" r="360" stroke="rgba(255,255,255,0.065)" strokeWidth="1.5" />
        <circle cx="400" cy="400" r="296" stroke="rgba(255,255,255,0.045)" strokeWidth="1" />
        <circle cx="400" cy="400" r="232" stroke="rgba(255,255,255,0.033)" strokeWidth="1" />
        <circle cx="400" cy="400" r="168" stroke="rgba(255,255,255,0.025)" strokeWidth="1" />
        <line x1="400" y1="40"  x2="400" y2="760" stroke="rgba(255,255,255,0.028)" strokeWidth="1" />
        <line x1="40"  y1="400" x2="760" y2="400" stroke="rgba(255,255,255,0.028)" strokeWidth="1" />
        <line x1="145" y1="145" x2="655" y2="655" stroke="rgba(255,255,255,0.02)"  strokeWidth="1" />
        <line x1="655" y1="145" x2="145" y2="655" stroke="rgba(255,255,255,0.02)"  strokeWidth="1" />
      </svg>

      {/* Video — left */}
      <VideoSlot
        className={`${styles.videoCard} ${styles.videoLeft}`}
        videoSrc="/videos/kung-fu-panda.mp4"
        ariaHidden
      />

      {/* Video — right */}
      <VideoSlot
        className={`${styles.videoCard} ${styles.videoRight}`}
        videoSrc="/videos/showing-my-powers-po.mp4"
        ariaHidden
      />

      <Container>
        <div className={styles.content}>
          <span className={styles.dots} aria-hidden="true">
            <i /><i /><i />
          </span>

          <p className={styles.text}>
            <em className={styles.accent}>{bigCta.title}</em>{" "}
            {bigCta.subtitle} {bigCta.emoji}
          </p>
          
          {/* Оборачиваем кнопку в якорь. display: inline-block гарантирует, что обертка точно по размеру кнопки */}
          <div ref={wrapperRef} style={{ display: "inline-block", zIndex: 10 }}>
            <a
              ref={btnRef}
              href={links.telegramBotSite}
              className={styles.cta}
              target="_blank"
              rel="noopener noreferrer"
            >
              {bigCta.cta} →
            </a>
          </div>
          
        </div>
      </Container>
    </section>
  );
}
