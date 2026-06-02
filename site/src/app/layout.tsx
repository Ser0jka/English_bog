import type { Metadata } from "next";
import { Montserrat, Manrope } from "next/font/google";
import "@/app/globals.scss";

/**
 * Двухшрифтовая система:
 * - Montserrat — дисплейный/заголовочный (геометрический гротеск, есть italic + black)
 * - Manrope    — текстовый. Используется как бесплатная замена Gilroy (Gilroy — платный,
 *                в Google Fonts его нет). Чтобы подставить настоящий Gilroy — заменить
 *                этот импорт на next/font/local с .woff2-файлами, сохранив переменную --font-gilroy.
 *
 * Обязательно подключаем subset "cyrillic" — сайт на русском.
 */
const montserrat = Montserrat({
  subsets: ["latin", "cyrillic"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-display",
});

const manrope = Manrope({
  subsets: ["latin", "cyrillic"],
  display: "swap",
  variable: "--font-gilroy",
});

export const metadata: Metadata = {
  title: "English Bog — практикум по американскому произношению",
  description:
    "Поставь американское произношение и начни понимать носителей. Практикум из коротких видеоуроков от Dave English Bog.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className={`${montserrat.variable} ${manrope.variable}`}>
      <body>{children}</body>
    </html>
  );
}
