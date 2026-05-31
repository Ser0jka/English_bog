import { siteContent } from "@/data/content";
import { Container } from "@/shared/Container/Container";
import { Section } from "@/shared/Section/Section";
import { VideoSlot } from "@/shared/VideoSlot/VideoSlot";
import styles from "./ForWhom.module.scss";

// Иконка стрелки для карточек аудитории
function ArrowIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M3 13L13 3M13 3H5M13 3V11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// Видео-блок (аналог videoInline из Hero, но крупнее и под углом)
function VideoPlaceholder({ label, rotate }: { label: string; rotate: number }) {
  return (
    <VideoSlot
      className={styles.videoItem}
      style={{ rotate: `${rotate}deg` }}
      label={label}
    />
  );
}

export function ForWhom() {
  const { forWhom } = siteContent;

  return (
    <Section id="for-whom" className={styles.section} ariaLabel="Для кого этот курс">
      <Container>
        {/* Декоративные точки */}
        <div className={styles.dots} aria-hidden="true">
          <span /><span /><span />
        </div>

        {/* Заголовок */}
        <h2 className={styles.heading}>
          {forWhom.heading}{" "}
          <em className={styles.headingAccent}>{forWhom.headingAccent}</em>
        </h2>

        {/* Основная сетка */}
        <div className={styles.body}>

          {/* ─── Левая зона: Dave-карточка ─── */}
          <div className={styles.daveCard}>
            <div className={styles.daveHeader}>
              {/* Квадратный плейсхолдер для фото — заменить на <Image> */}
              <div className={styles.avatar} aria-label="Фото Dave" />
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
          </div>

          {/* ─── Центральная зона: 2 видео-заглушки ─── */}
          <div className={styles.videos} aria-label="Видео-материалы — позже">
            <VideoPlaceholder label="Видео 1" rotate={-6} />
            <VideoPlaceholder label="Видео 2" rotate={5} />
          </div>

          {/* ─── Правая зона: карточки аудитории ─── */}
          <div className={styles.cards}>
            {forWhom.cards.map((card) => (
              <div key={card.label} className={styles.targetCard}>
                <span className={styles.targetNum}>{card.num}</span>
                <h3 className={styles.targetLabel}>
                  {card.label} <ArrowIcon />
                </h3>
                <p className={styles.targetText}>{card.text}</p>
              </div>
            ))}
          </div>

        </div>
      </Container>
    </Section>
  );
}
