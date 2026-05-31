"use client";

import { links } from "@/data/links";
import { siteContent } from "@/data/content";
import { Container } from "@/shared/Container/Container";
import { Section } from "@/shared/Section/Section";
import styles from "./Program.module.scss";

export function Program() {
  const { program } = siteContent;

  return (
    <Section id="program" className={styles.section} ariaLabel="Программа практикума">
      <Container>
        {/* Заголовок */}
        <div className={styles.header}>
          <h2 className={styles.heading}>
            <em className={styles.headingItalic}>{program.heading}</em>{" "}
            {program.headingLight}
          </h2>
          <p className={styles.subtitle}>{program.subtitle}</p>
        </div>

        {/* Три блока */}
        <div className={styles.grid}>
          {program.blocks.map((block) => (
            <div
              key={block.num}
              className={`${styles.card} ${block.accent ? styles.cardAccent : ""}`}
            >
              {/* Текстовая часть карточки */}
              <div className={styles.cardContent}>
                <span className={styles.blockNum}>{block.num}</span>

                <h3 className={styles.blockTitle}>
                  {block.title}
                  {block.emoji && <span className={styles.emoji}>{block.emoji}</span>}
                </h3>

                <p className={styles.blockDesc}>{block.desc}</p>

                <ul className={styles.lessons}>
                  {block.lessons.map((lesson) => (
                    <li key={lesson.label} className={styles.lesson}>
                      <span className={styles.lessonLabel}>{lesson.label}</span>
                      <span className={styles.lessonIcon} aria-hidden="true">?</span>
                      {/* Tooltip — появляется на hover */}
                      <div className={styles.tooltip} role="tooltip">
                        {lesson.tooltip}
                      </div>
                    </li>
                  ))}
                </ul>

                <div className={styles.result}>
                  <strong>Результат:</strong>
                  <span>{block.result}</span>
                </div>
              </div>

              {/* Пустой слот под фото (только блок 3 — «Макгрегор») */}
              {block.photo && (
                <div className={styles.photoSlot} aria-hidden="true" />
              )}
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className={styles.ctaRow}>
          <a className={styles.cta} href={links.telegramBotLead}>
            {program.cta} <span aria-hidden="true">→</span>
          </a>
        </div>
      </Container>
    </Section>
  );
}
