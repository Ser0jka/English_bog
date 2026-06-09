"use client";

import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import Image from "next/image";
import { links } from "@/data/links";
import { siteContent } from "@/data/content";
import { Container } from "@/shared/Container/Container";
import { Section } from "@/shared/Section/Section";
import { VideoSlot } from "@/shared/VideoSlot/VideoSlot";
import styles from "./Hero.module.scss";

const HeroScene = dynamic(() => import("./HeroScene"), { ssr: false });

const socials = [
  {
    name: "Telegram",
    href: links.telegramChannel,
    icon: (
      <svg width="25" height="25" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.248-2.016 9.501c-.148.66-.537.82-1.086.51l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.332-.373-.12l-6.871 4.326-2.962-.924c-.643-.204-.657-.643.136-.953l11.567-4.46c.537-.19 1.005.13.884.717z" />
      </svg>
    ),
  },
  {
    name: "YouTube",
    href: links.youtube,
    icon: (
      <svg width="25" height="25" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M23.495 6.205a3.007 3.007 0 0 0-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 0 0 .527 6.205a31.247 31.247 0 0 0-.522 5.805 31.247 31.247 0 0 0 .522 5.783 3.007 3.007 0 0 0 2.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 0 0 2.088-2.088 31.247 31.247 0 0 0 .5-5.783 31.247 31.247 0 0 0-.5-5.805zM9.609 15.601V8.408l6.264 3.602z" />
      </svg>
    ),
  },
  {
    name: "TikTok",
    href: links.tiktok,
    icon: (
      <svg width="25" height="25" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
      </svg>
    ),
  },
];

const TICKER_ITEMS = [
  "АНГЛИЙСКИЙ ДЕТЯМ И ВЗРОСЛЫМ",
  "ИНДИВИДУАЛЬНО И В МИНИ-ГРУППЕ",
  "ПЕРВЫЙ УРОК БЕСПЛАТНО",
  "ОГЭ И ЕГЭ",
  "РАЗГОВОРНАЯ ПРАКТИКА",
  "АНГЛИЙСКИЙ ДЛЯ ПУТЕШЕСТВИЙ",
  "ИВАН БОГОМОЛОВ",
];

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.52, ease: "easeOut" as const } },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
};

const titleStagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.14 } },
};

const titleLine = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.58, ease: "easeOut" as const } },
};

export function Hero() {
  const { hero } = siteContent;

  return (
    <Section className={styles.hero} ariaLabel="Главный экран" id="top">
      <Container>
        <motion.div
          className={styles.card}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={stagger}
        >
          {/* Marquee ticker */}
          <div className={styles.ticker} aria-hidden="true">
            <div className={styles.tickerTrack}>
              {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
                <span key={i} className={styles.tickerItem}>
                  {item}<span className={styles.tickerDot}>·</span>
                </span>
              ))}
            </div>
          </div>

          <HeroScene />

          <motion.div className={styles.copy} variants={stagger}>
            <motion.ul className={styles.badges} aria-label="Детали занятий" variants={fadeUp}>
              {hero.badges.map((badge) => <li key={badge}>{badge}</li>)}
            </motion.ul>

            <motion.h1 className={styles.title} variants={titleStagger}>
              <motion.span className={styles.titleLine} variants={titleLine}>
                {hero.titleStart}
                <VideoSlot className={styles.videoInline} videoSrc="/videos/american-psycho-nodd.mp4" label={hero.videoPlaceholder} priority />
              </motion.span>
              <motion.span className={styles.nowrap} variants={titleLine}>{hero.titleMiddle}</motion.span>
              <motion.em variants={titleLine}>{hero.titleEnd}</motion.em>
            </motion.h1>

            <motion.p className={styles.subtitle} variants={fadeUp}>{hero.subtitle}</motion.p>

            <motion.div className={styles.actions} variants={fadeUp}>
              <motion.a
                className={styles.primaryBtn}
                href={links.telegramBotLead}
                whileHover={{ scale: 1.04, y: -3 }}
                whileTap={{ scale: 0.97 }}
              >
                {hero.primaryCta}
              </motion.a>
              <motion.a
                className={styles.secondaryBtn}
                href="#program"
                whileHover={{ scale: 1.04, y: -3 }}
                whileTap={{ scale: 0.97 }}
              >
                {hero.secondaryCta} <span aria-hidden="true">→</span>
              </motion.a>
            </motion.div>
          </motion.div>

          <motion.div
            className={styles.personCol}
            aria-label={hero.personPlaceholder}
            variants={fadeUp}
          >
            <div className={styles.scribble} aria-hidden="true" />
            <div className={styles.photoSlot}>
              <Image
                src="/images/promo.png"
                alt={hero.teacherName}
                fill
                style={{ objectFit: "contain", objectPosition: "bottom center" }}
                priority
              />
            </div>
            <div className={styles.teacherInfo}>
              <p className={styles.teacherName}>{hero.teacherName}</p>
              <div className={styles.socials} aria-label="Социальные сети">
                {socials.map((s) => (
                  <motion.a
                    key={s.name}
                    href={s.href}
                    aria-label={s.name}
                    className={styles.socialIcon}
                    whileHover={{ y: -4, scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {s.icon}
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </Container>
    </Section>
  );
}
