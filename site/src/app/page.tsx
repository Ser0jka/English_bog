import { Header } from "@/components/Header/Header";
import { Hero } from "@/components/Hero/Hero";
import { StatsStrip } from "@/components/StatsStrip/StatsStrip";
import { ForWhom } from "@/components/ForWhom/ForWhom";
import { Blessed } from "@/components/Blessed/Blessed";
import { Program } from "@/components/Program/Program";
import { SkillCarousel } from "@/components/SkillCarousel/SkillCarousel";
import { BigCta } from "@/components/BigCta/BigCta";
import { TestimonialsStrip } from "@/components/TestimonialsStrip/TestimonialsStrip";
import { Reviews } from "@/components/Reviews/Reviews";
import { Faq } from "@/components/Faq/Faq";
import { Footer } from "@/components/Footer/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        {/* 1. Hero */}
        <Hero />

        {/* Stats */}
        <StatsStrip />

        {/* 2. Для кого */}
        <ForWhom />

        {/* 3. Карусель */}
        <SkillCarousel />

        {/* 4. Направления */}
        <Blessed />

        {/* 5. Форматы и цены */}
        <Program />

        {/* 6. FAQ */}
        <Faq />

        {/* 7. Большой CTA */}
        <BigCta />

        {/* Отзывы-марки */}
        <TestimonialsStrip />

        {/* 8. Отзывы */}
        <Reviews />

      </main>
      <Footer />
    </>
  );
}
