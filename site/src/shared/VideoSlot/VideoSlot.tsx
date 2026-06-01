import type { CSSProperties } from "react";
import styles from "./VideoSlot.module.scss";

/**
 * Единое видео для всех блоков-заглушек.
 * Лежит в public/videos. Сейчас это .gif, но компонент сам
 * выберет <video> для mp4/webm — достаточно поменять путь.
 */
interface VideoSlotProps {
  videoSrc: string;
  /** Класс блока-слота (размер/форма) из модуля компонента */
  className?: string;
  /** Для наклона и прочих точечных правок */
  style?: CSSProperties;
  /** Подпись для скринридеров */
  label?: string;
}


// Видео-плейсхолдер: заполняет слот реальным видео (или gif как fallback)
export function VideoSlot({videoSrc, className, style, label }: VideoSlotProps) {
  const slotClass = className ? `${styles.slot} ${className}` : styles.slot;

  const isPlayableVideo = /\.(mp4|webm|ogg|mov)$/i.test(videoSrc);

  return (
    <span className={slotClass} style={style} role="img" aria-label={label}>
      {isPlayableVideo ? (
        <video
          className={styles.media}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
        >
          <source src={videoSrc} />
        </video>
      ) : (
        // gif анимируется сам — рендерим как картинку
        // eslint-disable-next-line @next/next/no-img-element
        <img className={styles.media} src={videoSrc} alt={label ?? ""} />
      )}
    </span>
  );
}
