import OurMission from '@/components/aboutpage-01/OurMission';
import VisionStatement from '@/components/aboutpage-01/VisionStatement';
import WhyChooseUs from '@/components/aboutpage-01/WhyChooseUs';
import RevealAnimation from '@/components/animation/RevealAnimation';
import Team from '@/components/homepage-05/Team';
import CTA from '@/components/homepage-08/CTA';
import FooterThree from '@/components/shared/footer/FooterThree';
import NavbarOne from '@/components/shared/header/NavbarOne';
import OurAchievements from '@/components/shared/OurAchievements';
import PageHero from '@/components/shared/PageHero';
import ReviewsV3 from '@/components/shared/reviews/ReviewsV3';
import { projectAchievements } from '@/data/achievements';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sobre Nosotros - Agencia Marketing Digital Florida | Fascinante Digital',
  description: 'Conoce Fascinante Digital, agencia de marketing digital especializada en empresas latinas en Florida. Equipo bilingüe con más de 10 años de experiencia en Miami, Orlando y Tampa.',
  keywords: 'agencia marketing digital florida, sobre fascinante digital, equipo marketing digital miami, agencia digital marketing orlando, marketing digital hispano florida, empresa marketing digital tampa',
};

const AboutPage = () => {
  return (
    <>
      <NavbarOne
        megaMenuColor="dark:bg-background-7"
        className="border border-stroke-2 bg-accent/60 backdrop-blur-[25px] dark:border-stroke-6 dark:bg-background-9"
        btnClassName="btn-primary hover:bg-secondary dark:hover:btn-accent"
      />
      <main className="bg-background-3 dark:bg-background-7">
        <PageHero
          className="bg-background-3 dark:bg-background-7"
          title="About us"
          heading="About us"
          link="/about"
        />
        <VisionStatement />
        <OurMission />
        <section className="pt-14 md:pt-16 lg:pt-[88px] xl:pt-[100px] pb-14 md:pb-16 lg:pb-[88px] xl:pb-[100px]">
          <div className="main-container">
            <div className="mb-14 md:mb-[70px] space-y-3 text-center">
              <RevealAnimation delay={0.2}>
              <h2>Over a decade of digital marketing excellence in Florida.</h2>
            </RevealAnimation>
            <RevealAnimation delay={0.3}>
              <p className="max-w-[744px] mx-auto">
                With more than ten years of hands-on experience in digital marketing, we&apos;ve built a strong foundation of knowledge, skill,
                and trust in the Florida market. Over the years, we&apos;ve navigated evolving digital trends, embraced new marketing technologies,
                and helped hundreds of Latino businesses grow their online presence.
              </p>
              </RevealAnimation>
            </div>
            <OurAchievements achievements={projectAchievements} />
          </div>
        </section>
        <WhyChooseUs />
        <Team className="bg-background-3 dark:bg-background-7 py-[100px]" badgeColor="badge-cyan" />
        <ReviewsV3
          badgeText="Client Success"
          buttonText="View all reviews"
          badgeColor="badge-cyan"
          title="Real people. Real results."
          description="Fascinante Digital delivered our entire digital marketing strategy ahead of schedule—flawless execution and real partnership that grew our business 300%."
        />
        <CTA />
      </main>
      <FooterThree />
    </>
  );
};
AboutPage.displayName = 'AboutPage';
export default AboutPage;
