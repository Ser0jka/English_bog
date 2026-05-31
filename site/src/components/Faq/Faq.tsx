"use client";

import { useState, useCallback } from "react";
import { siteContent } from "@/data/content";
import { Container } from "@/shared/Container/Container";
import styles from "./Faq.module.scss";

export function Faq() {
  const { faq } = siteContent;
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  const toggle = useCallback((i: number) => {
    setOpenIdx((prev) => (prev === i ? null : i));
  }, []);

  return (
    <section id="faq" className={styles.section} aria-label="Частые вопросы">
      <Container>
        <div className={styles.heading}>
          <h2 className={styles.title}>
            <em>{faq.heading}</em>
          </h2>
          <p className={styles.subtitle}>
            Уверен, что{" "}
            <em className={styles.subtitleAccent}>читаешь правильно?</em>
          </p>
        </div>

        <ul className={styles.list} role="list">
          {faq.items.map((item, i) => {
            const isOpen = openIdx === i;
            return (
              <li
                key={i}
                className={`${styles.item} ${isOpen ? styles.itemOpen : ""}`}
              >
                <button
                  className={styles.question}
                  onClick={() => toggle(i)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-${i}`}
                >
                  <span className={styles.questionText}>{item.q}</span>
                  <span className={`${styles.icon} ${isOpen ? styles.iconOpen : ""}`} aria-hidden="true">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
                      <line x1="12" y1="5" x2="12" y2="19" />
                      <line x1="5" y1="12" x2="19" y2="12" />
                    </svg>
                  </span>
                </button>

                {/* grid trick: 0fr → 1fr; padding lives on inner <p> so the
                    wrapper can fully collapse to 0 height when closed */}
                <div
                  id={`faq-${i}`}
                  role="region"
                  className={`${styles.answer} ${isOpen ? styles.answerOpen : ""}`}
                >
                  <div className={styles.answerInner}>
                    <p className={styles.answerText}>{item.a}</p>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
