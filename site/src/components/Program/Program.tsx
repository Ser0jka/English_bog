"use client";

import { motion } from "framer-motion";
import { links } from "@/data/links";
import { siteContent } from "@/data/content";
import { Container } from "@/shared/Container/Container";
import { Section } from "@/shared/Section/Section";
import styles from "./Program.module.scss";

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};

const cardVariant = {
  hidden: { opacity: 0, y: 36 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};

export function Program() {
  const { program } = siteContent;

  return (
    <Section id="program" className={styles.section} ariaLabel="Форматы занятий и цены">
      <Container>
        <motion.div
          className={styles.header}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={fadeUp}
        >
          <h2 className={styles.heading}>
            <em className={styles.headingItalic}>{program.heading}</em>{" "}
            {program.headingLight}
          </h2>
          <p className={styles.subtitle}>{program.subtitle}</p>
        </motion.div>

        <motion.div
          className={styles.grid}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={stagger}
        >
          {program.blocks.map((block) => (
            <motion.div
              key={block.num}
              className={`${styles.card} ${block.accent ? styles.cardAccent : ""}`}
              variants={cardVariant}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
            >
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
                      <span className={styles.lessonBullet} aria-hidden="true" />
                      <span className={styles.lessonLabel}>{lesson.label}</span>
                      {(lesson as { tooltip?: string }).tooltip && (
                        <div className={styles.tooltip} role="tooltip">
                          {(lesson as { tooltip?: string }).tooltip}
                        </div>
                      )}
                    </li>
                  ))}
                </ul>

                <div className={styles.result}>
                  <strong>{program.resultLabel}:</strong>
                  <span>{block.result}</span>
                </div>
              </div>

              {block.photo && (
                <div className={styles.photoSlot} aria-hidden="true" />
              )}
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className={styles.ctaRow}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={fadeUp}
        >
          <motion.a
            className={styles.cta}
            href={links.telegramBotLead}
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.97 }}
          >
            {program.cta} <span aria-hidden="true">→</span>
          </motion.a>
        </motion.div>
      </Container>
    </Section>
  );
}
