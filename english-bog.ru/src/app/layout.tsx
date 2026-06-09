import type { Metadata, Viewport } from "next";
import { Montserrat } from "next/font/google";
import localFont from "next/font/local";
import Script from "next/script";
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
  manifest: "/favicon/site.webmanifest",
  icons: {
    icon: [
      { url: "/favicon/favicon.ico", sizes: "any" },
      { url: "/favicon/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon/favicon-96x96.png", sizes: "96x96", type: "image/png" },
    ],
    apple: [{ url: "/favicon/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className={`${montserrat.variable} ${gilroy.variable}`}>
      <body>
        {children}
        <Script id="yandex-metrika" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            (function(m,e,t,r,i,k,a){
              m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
              m[i].l=1*new Date();
              for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
              k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)
            })(window, document,'script','https://mc.yandex.ru/metrika/tag.js?id=109743982', 'ym');

            ym(109743982, 'init', {ssr:true, webvisor:true, clickmap:true, ecommerce:"dataLayer", referrer: document.referrer, url: location.href, accurateTrackBounce:true, trackLinks:true});
          `}
        </Script>
        <noscript>
          <div>
            <img
              src="https://mc.yandex.ru/watch/109743982"
              style={{ position: "absolute", left: "-9999px" }}
              alt=""
            />
          </div>
        </noscript>
      </body>
    </html>
  );
}
