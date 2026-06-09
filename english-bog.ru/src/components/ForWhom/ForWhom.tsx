"use client";

import { motion } from "framer-motion";
import { siteContent } from "@/data/content";
import { Container } from "@/shared/Container/Container";
import { Section } from "@/shared/Section/Section";
import { VideoSlot } from "@/shared/VideoSlot/VideoSlot";
import styles from "./ForWhom.module.scss";

function ArrowIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M3 13L13 3M13 3H5M13 3V11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};
const fadeLeft = {
  hidden: { opacity: 0, x: -44 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.54, ease: "easeOut" as const } },
};
const fadeRight = {
  hidden: { opacity: 0, x: 44 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.54, ease: "easeOut" as const } },
};
const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.11 } },
};

export function ForWhom() {
  const { forWhom } = siteContent;

  return (
    <Section id="for-whom" className={styles.section} ariaLabel="Для кого занятия">
      <Container>
        <div className={styles.dots} aria-hidden="true">
          <span /><span /><span />
        </div>

        <motion.h2
          className={styles.heading}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={fadeUp}
        >
          {forWhom.heading}{" "}<br/>
          <em className={styles.headingAccent}>{forWhom.headingAccent}</em>
        </motion.h2>

        <div className={styles.body}>
          {/* Dave-карточка — въезжает слева */}
          <motion.div
            className={styles.daveCard}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={fadeLeft}
          >
            <div className={styles.daveHeader}>
              <div className={styles.avatar} aria-label="Фото Ivan" />
              <div className={styles.daveMeta}>
                <strong className={styles.daveName}>{forWhom.dave.name}</strong>
                <span className={styles.daveRole}>{forWhom.dave.role}</span>
              </div>
            </div>
            <p className={styles.daveText}>{forWhom.dave.para1}</p>
            <p className={styles.daveText}>
              {forWhom.dave.para2}{" "}
              <strong className={styles.daveAccent}>{forWhom.dave.accent}</strong>
            </p>
            <p className={styles.daveQuote}>{forWhom.dave.quote}</p>
          </motion.div>

          {/* Видео — появляются снизу */}
          <motion.div
            className={styles.videos}
            aria-label="Видео-материалы"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={stagger}
          >
            <motion.div variants={fadeUp}>
              <VideoSlot className={styles.videoItem} videoSrc="/videos/thokkathotakura-thot.mp4" label="Видео 1" />
            </motion.div>
            <motion.div variants={fadeUp}>
              <VideoSlot className={styles.videoItem} videoSrc="/videos/ouch-chilling.mp4" label="Видео 2" />
            </motion.div>
          </motion.div>

          {/* Карточки аудитории — въезжают справа */}
          <motion.div
            className={styles.cards}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={stagger}
          >
            {forWhom.cards.map((card) => (
              <motion.div key={card.label} className={styles.targetCard} variants={fadeRight}>
                
                <h3 className={styles.targetLabel}>
                  <span className={styles.targetNum}>{card.num}</span>
                  {card.label} <ArrowIcon />
                </h3>
                <p className={styles.targetText}>{card.text}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </Container>
    </Section>
  );
}
