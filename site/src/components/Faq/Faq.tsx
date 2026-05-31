"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";
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
        <motion.div
          className={styles.heading}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, ease: "easeOut" as const }}
        >
          <h2 className={styles.title}>
            <em>{faq.heading}</em>
          </h2>
          <p className={styles.subtitle}>
            Уверен, что{" "}
            <em className={styles.subtitleAccent}>читаешь правильно?</em>
          </p>
        </motion.div>

        <ul className={styles.list} role="list">
          {faq.items.map((item, i) => {
            const isOpen = openIdx === i;
            return (
              <motion.li
                key={i}
                className={styles.item}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-20px" }}
                transition={{ duration: 0.4, ease: "easeOut" as const, delay: i * 0.04 }}
              >
                <button
                  className={styles.question}
                  onClick={() => toggle(i)}
                  aria-expanded={isOpen}
                >
                  <span className={styles.questionText}>{item.q}</span>
                  <motion.span
                    className={styles.icon}
                    animate={{ rotate: isOpen ? 0 : 0 }}
                    aria-hidden="true"
                  >
                    {isOpen ? <Minus size={18} /> : <Plus size={18} />}
                  </motion.span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="answer"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.32, ease: "easeInOut" as const }}
                      style={{ overflow: "hidden" }}
                    >
                      <p className={styles.answerText}>{item.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
