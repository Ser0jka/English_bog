"use client";

import styles from "./TestimonialsStrip.module.scss";

const QUOTES = [
  { text: "Меня перестали переспрашивать уже через две недели", author: "Тигран К." },
  { text: "Наконец поняла, почему носители говорят так быстро", author: "Анастасия Р." },
  { text: "Американские коллеги думали, что я жил в США раньше", author: "Михаил Д." },
  { text: "Просто повторяешь — через неделю слышишь разницу сам", author: "Ольга В." },
  { text: "Три урока — и акцент встал на место. Магия", author: "Артём Н." },
  { text: "За месяц прошла курс дважды. Столько полезного", author: "Дарья С." },
];

export function TestimonialsStrip() {
  return (
    <div className={styles.strip} aria-label="Отзывы учеников">
      <div className={styles.track}>
        {[...QUOTES, ...QUOTES].map((q, i) => (
          <article key={i} className={styles.card}>
            <p className={styles.stars} aria-hidden="true">★★★★★</p>
            <p className={styles.text}>"{q.text}"</p>
            <p className={styles.author}>— {q.author}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
