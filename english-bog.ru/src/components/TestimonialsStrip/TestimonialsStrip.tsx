"use client";

import Image from "next/image";
import styles from "./TestimonialsStrip.module.scss";

const REVIEWS = [
  {
    src: "/reviews/photo_1_2026-06-09_08-57-00.jpg",
    alt: "Отзыв ученика English Bog 1",
  },
  {
    src: "/reviews/photo_2_2026-06-09_08-57-00.jpg",
    alt: "Отзыв ученика English Bog 2",
  },
  {
    src: "/reviews/photo_3_2026-06-09_08-57-00.jpg",
    alt: "Отзыв ученика English Bog 3",
  },
  {
    src: "/reviews/photo_4_2026-06-09_08-57-00.jpg",
    alt: "Отзыв ученика English Bog 4",
  },
  {
    src: "/reviews/photo_5_2026-06-09_08-57-00.jpg",
    alt: "Отзыв ученика English Bog 5",
  },
  {
    src: "/reviews/photo_6_2026-06-09_08-57-00.jpg",
    alt: "Отзыв ученика English Bog 6",
  },
];

export function TestimonialsStrip() {
  return (
    <section className={styles.strip} aria-label="Отзывы учеников в скриншотах" >
      <div className={styles.track}>
        {[0, 1].map((group) => (
          <div key={group} className={styles.group} aria-hidden={group === 1}>
            {REVIEWS.map((review) => (
              <article key={`${review.src}-${group}`} className={styles.card}>
                <Image
                  src={review.src}
                  alt={group === 0 ? review.alt : ""}
                  width={320}
                  height={500}
                  sizes="(max-width: 480px) 72vw, (max-width: 768px) 42vw, 320px"
                  className={styles.image}
                />
              </article>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
