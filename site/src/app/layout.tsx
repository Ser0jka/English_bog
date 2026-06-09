import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import localFont from "next/font/local";
import "@/app/globals.scss";

/**
 * Двухшрифтовая система:
 * - Montserrat — дисплейный/заголовочный (геометрический гротеск, есть italic + black)
 * - Gilroy     — текстовый локальный шрифт из app/font.
 *
 * Обязательно подключаем subset "cyrillic" — сайт на русском.
 */
const montserrat = Montserrat({
  subsets: ["latin", "cyrillic"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-display",
});

const gilroy = localFont({
  src: [
    { path: "./font/Gilroy-Regular_0.ttf", weight: "400", style: "normal" },
    { path: "./font/Gilroy-Medium_0.ttf", weight: "500", style: "normal" },
    { path: "./font/Gilroy-Semibold_0.ttf", weight: "600", style: "normal" },
    { path: "./font/Gilroy-Bold_0.ttf", weight: "700", style: "normal" },
    { path: "./font/Gilroy-Extrabold_0.ttf", weight: "800", style: "normal" },
    { path: "./font/Gilroy-Heavy_0.ttf", weight: "900", style: "normal" },
    { path: "./font/Gilroy-BoldItalic_0.ttf", weight: "700", style: "italic" },
    { path: "./font/Gilroy-ExtraboldItalic_0.ttf", weight: "800", style: "italic" },
    { path: "./font/Gilroy-HeavyItalic_0.ttf", weight: "900", style: "italic" },
  ],
  variable: "--font-gilroy",
  display: "swap",
});

export const metadata: Metadata = {
  title: "English Bog — занятия английским с Иваном Богомоловым",
  description:
    "Индивидуальные и групповые занятия английским для детей и взрослых: общий английский, ОГЭ/ЕГЭ, разговорная практика и английский для путешествий.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className={`${montserrat.variable} ${gilroy.variable}`}>
      <body>{children}</body>
    </html>
  );
}
