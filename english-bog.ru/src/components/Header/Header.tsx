"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { links } from "@/data/links";
import { siteContent } from "@/data/content";
import { Container } from "@/shared/Container/Container";
import styles from "./Header.module.scss";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const openMenu  = () => setIsMenuOpen(true);
  const closeMenu = () => setIsMenuOpen(false);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isMenuOpen]);

  return (
    <>
      <header className={styles.header}>
        <Container className={styles.inner}>
          <a className={styles.logo} href="#top" aria-label="Ivan Bogomolov — на главную">
            Ivan Bogomolov <span className={styles.logoTag}>us</span>
          </a>

          <nav className={styles.nav} aria-label="Основная навигация">
            {siteContent.nav.map((item) => (
              <a key={item.href} href={item.href}>{item.label}</a>
            ))}
          </nav>

          <a className={styles.cta} href={links.telegramBotLead}>
            Записаться <span aria-hidden="true">→</span>
          </a>

          <button
            className={styles.menuButton}
            type="button"
            aria-label="Открыть меню"
            aria-expanded={isMenuOpen}
            onClick={openMenu}
          >
            <Menu size={22} />
          </button>
        </Container>
      </header>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className={styles.backdrop}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            onClick={closeMenu}
            aria-hidden="true"
            style={{ background: "rgba(0,0,0,0.72)", pointerEvents: "auto" }}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.aside
            className={styles.mobileMenu}
            initial={{ x: "102%" }}
            animate={{ x: 0 }}
            exit={{ x: "102%" }}
            transition={{ duration: 0.32, ease: "easeInOut" as const }}
            aria-label="Мобильное меню"
          >
            <button
              className={styles.closeButton}
              type="button"
              aria-label="Закрыть меню"
              onClick={closeMenu}
            >
              <X size={20} />
            </button>

            <nav className={styles.mobileNav} aria-label="Мобильная навигация">
              {siteContent.nav.map((item) => (
                <a key={item.href} href={item.href} onClick={closeMenu}>{item.label}</a>
              ))}
            </nav>

            <a className={styles.mobileCta} href={links.telegramBotLead} onClick={closeMenu}>
              Записаться <span aria-hidden="true">→</span>
            </a>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
}
