import { siteContent } from "@/data/content";
import { links } from "@/data/links";
import { Container } from "@/shared/Container/Container";
import styles from "./Price.module.scss";

export function Price() {
  const { price } = siteContent;

  return (
    <section id="price" className={styles.section} aria-label="Стоимость обучения">
      <Container>
        <div className={styles.heading}>
          <h2 className={styles.title}>
            {price.heading}{" "}
            <em className={styles.titleAccent}>{price.headingAccent}</em>
            <span className={styles.badge} aria-hidden="true">🇺🇸</span>
          </h2>
          <p className={styles.subtitle}>{price.subtitle}</p>
        </div>

        <div className={styles.card}>
          {/* Левая колонка — фото + тариф */}
          <div className={styles.cardLeft}>
            <p className={styles.tariff}>{price.tariff}</p>

            {/* Фото преподавателя — заменить на <Image> */}
            <div className={styles.photoSlot} aria-hidden="true" />

            {/* Облачко с текстом — заменить на <Image> */}
            <div className={styles.bubbleSlot} aria-hidden="true">
              <span className={styles.bubbleText}>{price.bubbleText}</span>
            </div>
          </div>

          {/* Правая колонка — список + цена */}
          <div className={styles.cardRight}>
            <ul className={styles.benefits}>
              {price.benefits.map((item, i) => (
                <li key={i} className={styles.benefit}>
                  <span className={styles.benefitIcon} aria-hidden="true">✓</span>
                  {item}
                </li>
              ))}
            </ul>

            <div className={styles.priceRow}>
              <span className={styles.priceNew}>{price.priceNew}</span>
              <span className={styles.priceOld}>{price.priceOld}</span>
            </div>

            <a
              href={links.telegramBotSite}
              className={styles.cta}
              target="_blank"
              rel="noopener noreferrer"
            >
              {price.cta} →
            </a>

            <p className={styles.payNote}>{price.paymentNote}</p>
          </div>
        </div>
      </Container>
    </section>
  );
}
