import { cn } from '@/utils/cn';
import Link from 'next/link';
import RevealAnimation from '../animation/RevealAnimation';

interface PageHeroProps {
  className?: string;
  title?: string;
  heading?: string;
  link?: string;
}

const PageHero = ({ className, title, heading, link }: PageHeroProps) => {
  return (
    <section className={cn('xl:pt-[180px] md:pt-42 sm:pt-36 pt-32 ', className)} aria-label="Page hero section">
      <div className="main-container">
        {/* Hero content - Elite UX/UI Distribution */}
        <div className="pb-8 lg:pb-12">
          {/* Breadcrumb - Centered, elegant, subtle */}
          <RevealAnimation delay={0.1}>
            <div className="text-center mb-6">
              <nav className="inline-flex items-center space-x-2 text-sm">
                <Link
                  href="/"
                  className="text-gray-500 hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400 transition-all duration-300 hover:scale-105">
                  Home
                </Link>
                <span className="text-gray-300 dark:text-gray-600">/</span>
                <Link
                  href={link || '/'}
                  className="text-gray-700 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-400 transition-all duration-300 hover:scale-105 font-medium">
                  {title}
                </Link>
              </nav>
            </div>
          </RevealAnimation>
          
          {/* Badge and Heading - Elite centered layout */}
          <div className="text-center space-y-6">
            <RevealAnimation delay={0.2}>
              <div className="inline-flex items-center">
                <span className="badge badge-green">Services</span>
              </div>
            </RevealAnimation>
            
            <RevealAnimation delay={0.3}>
              <h2 className="max-w-[700px] mx-auto text-center">
                {heading}
              </h2>
            </RevealAnimation>
            
            <RevealAnimation delay={0.35}>
              <div className="max-w-2xl mx-auto text-center space-y-3">
                <p className="text-lg">
                  Whether you have a question, need technical assistance, or just want some guidance, our support team is here to help.
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Available around the clock for quick and friendly support.
                </p>
              </div>
            </RevealAnimation>
            
            {/* Subtle accent line for elite feel */}
            <RevealAnimation delay={0.4}>
              <div className="w-24 h-1 bg-gradient-to-r from-primary to-accent mx-auto rounded-full"></div>
            </RevealAnimation>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PageHero;
