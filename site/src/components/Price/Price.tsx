"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { siteContent } from "@/data/content";
import { links } from "@/data/links";
import { Container } from "@/shared/Container/Container";
import styles from "./Price.module.scss";

const COURSE_DATE = new Date("2026-06-18T00:00:00");

function getTimeLeft() {
  const diff = COURSE_DATE.getTime() - Date.now();
  if (diff <= 0) return null;
  return {
    days: Math.floor(diff / 86400000),
    hours: Math.floor((diff % 86400000) / 3600000),
    minutes: Math.floor((diff % 3600000) / 60000),
    seconds: Math.floor((diff % 60000) / 1000),
  };
}

function Countdown() {
  const [timeLeft, setTimeLeft] = useState<ReturnType<typeof getTimeLeft>>(null);

  useEffect(() => {
    setTimeLeft(getTimeLeft());
    const id = setInterval(() => setTimeLeft(getTimeLeft()), 1000);
    return () => clearInterval(id);
  }, []);

  if (!timeLeft) return null;

  const units = [
    { v: timeLeft.days, l: "дн" },
    { v: timeLeft.hours, l: "ч" },
    { v: timeLeft.minutes, l: "мин" },
    { v: timeLeft.seconds, l: "сек" },
  ];

  return (
    <div className={styles.countdown}>
      <p className={styles.countdownLabel}>⏰ До старта курса осталось:</p>
      <div className={styles.countdownTimer}>
        {units.map(({ v, l }, i) => (
          <div key={l} className={styles.countdownUnit}>
            <span className={styles.countdownNum}>
              {String(v).padStart(2, "0")}
            </span>
            <span className={styles.countdownUnitLabel}>{l}</span>
            {i < units.length - 1 && (
              <span className={styles.countdownColon}>:</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

const fadeUp = {
  hidden: { opacity: 0, y: 36 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" as const } },
};

export function Price() {
  const { price } = siteContent;

  return (
    <section id="price" className={styles.section} aria-label="Стоимость обучения">
      <Container>
        <motion.div
          className={styles.heading}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={fadeUp}
        >
          <h2 className={styles.title}>
            {price.heading}{" "}
            <em className={styles.titleAccent}>{price.headingAccent}</em>
            <span className={styles.badge} aria-hidden="true">🇺🇸</span>
          </h2>
          <p className={styles.subtitle}>{price.subtitle}</p>
        </motion.div>

        <motion.div
          className={styles.card}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={fadeUp}
        >
          {/* Левая колонка — фото + тариф */}
          <div className={styles.cardLeft}>
            <p className={styles.tariff}>{price.tariff}</p>
            <div className={styles.photoSlot} aria-hidden="true" />
            <div className={styles.bubbleSlot} aria-hidden="true">
              <span className={styles.bubbleText}>{price.bubbleText}</span>
            </div>
          </div>

          {/* Правая колонка — список + цена */}
          <div className={styles.cardRight}>
            <Countdown />
            <ul className={styles.benefits}>
              {price.benefits.map((item, i) => (
                <li key={i} className={styles.benefit}>
                  <span className={styles.benefitIcon} aria-hidden="true">
                    <Check size={12} strokeWidth={3} />
                  </span>
                  {item}
                </li>
              ))}
            </ul>

            <div className={styles.priceRow}>
              <span className={styles.priceNew}>{price.priceNew}</span>
              <span className={styles.priceOld}>{price.priceOld}</span>
            </div>

            <motion.a
              href={links.telegramBotSite}
              className={styles.cta}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
            >
              {price.cta} →
            </motion.a>

            <p className={styles.payNote}>{price.paymentNote}</p>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
