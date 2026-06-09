import { useEffect, useRef, useState, type CSSProperties } from "react";
import styles from "./VideoSlot.module.scss";

/**
 * Единое видео для всех блоков-заглушек.
 * Лежит в public/videos. Компонент сам
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
  priority?: boolean;
  ariaHidden?: boolean;
}


// Видео-плейсхолдер: заполняет слот реальным видео (или gif как fallback)
export function VideoSlot({ videoSrc, className, style, label, priority = false, ariaHidden = false }: VideoSlotProps) {
  const slotRef = useRef<HTMLSpanElement>(null);
  const [shouldLoad, setShouldLoad] = useState(priority);
  const slotClass = className ? `${styles.slot} ${className}` : styles.slot;

  const isPlayableVideo = /\.(mp4|webm|ogg|mov)$/i.test(videoSrc);
  const videoType = videoSrc.endsWith(".webm")
    ? "video/webm"
    : videoSrc.endsWith(".ogg")
      ? "video/ogg"
      : "video/mp4";

  useEffect(() => {
    if (shouldLoad || priority) return;

    const slot = slotRef.current;
    if (!slot || !("IntersectionObserver" in window)) {
      setShouldLoad(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setShouldLoad(true);
        observer.disconnect();
      },
      { rootMargin: "360px 0px" },
    );

    observer.observe(slot);
    return () => observer.disconnect();
  }, [priority, shouldLoad]);

  return (
    <span
      ref={slotRef}
      className={slotClass}
      style={style}
      role={ariaHidden ? undefined : "img"}
      aria-label={ariaHidden ? undefined : label}
      aria-hidden={ariaHidden || undefined}
    >
      {shouldLoad && isPlayableVideo ? (
        <video
          className={styles.media}
          autoPlay
          muted
          loop
          playsInline
          preload={priority ? "auto" : "metadata"}
        >
          <source src={videoSrc} type={videoType} />
        </video>
      ) : shouldLoad ? (
        // gif анимируется сам — рендерим как картинку
        // eslint-disable-next-line @next/next/no-img-element
        <img className={styles.media} src={videoSrc} alt={label ?? ""} loading="lazy" decoding="async" />
      ) : null}
    </span>
  );
}
