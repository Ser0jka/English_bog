"use client";

import { useState, useEffect } from "react";
import { links } from "@/data/links";
import { siteContent } from "@/data/content";
import { Container } from "@/shared/Container/Container";
import styles from "./Header.module.scss";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const openMenu  = () => setIsMenuOpen(true);
  const closeMenu = () => setIsMenuOpen(false);

  // Блокируем прокрутку страницы
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isMenuOpen]);

  return (
    <>
      {/* ── Шапка ─────────────────────────────── */}
      <header className={styles.header}>
        <Container className={styles.inner}>
          <a className={styles.logo} href="#top" aria-label="Dave Englishbad — на главную">
            Dave Englishbad <span className={styles.logoTag}>us</span>
          </a>

          <nav className={styles.nav} aria-label="Основная навигация">
            {siteContent.nav.map((item) => (
              <a key={item.href} href={item.href}>
                {item.label}
              </a>
            ))}
          </nav>

          <a className={styles.cta} href={links.telegramBotLead}>
            Участвовать <span aria-hidden="true">→</span>
          </a>

          <button
            className={styles.menuButton}
            type="button"
            aria-label="Открыть меню"
            aria-expanded={isMenuOpen}
            onClick={openMenu}
          >
            <span />
            <span />
          </button>
        </Container>
      </header>

      {/* ── Backdrop и меню — вне <header>, чтобы избежать stacking-context от backdrop-filter ── */}
      <div
        className={`${styles.backdrop} ${isMenuOpen ? styles.backdropOpen : ""}`}
        onClick={closeMenu}
        aria-hidden="true"
      />

      <aside
        className={`${styles.mobileMenu} ${isMenuOpen ? styles.mobileMenuOpen : ""}`}
        aria-hidden={!isMenuOpen}
        aria-label="Мобильное меню"
      >
        <button
          className={styles.closeButton}
          type="button"
          aria-label="Закрыть меню"
          onClick={closeMenu}
        >
          <span />
          <span />
        </button>

        <nav className={styles.mobileNav} aria-label="Мобильная навигация">
          {siteContent.nav.map((item) => (
            <a key={item.href} href={item.href} onClick={closeMenu}>
              {item.label}
            </a>
          ))}
        </nav>

        <a className={styles.mobileCta} href={links.telegramBotLead} onClick={closeMenu}>
          Участвовать <span aria-hidden="true">→</span>
        </a>
      </aside>
    </>
  );
}
