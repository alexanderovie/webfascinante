import type { Graph, Organization, Service, LocalBusiness } from 'schema-dts';

interface SchemaMarkupProps {
  type?: 'Organization' | 'Service' | 'LocalBusiness';
  page?: 'home' | 'about' | 'services' | 'blog' | 'contact';
}

const SchemaMarkup = ({ page = 'home' }: SchemaMarkupProps) => {
  // Base organization schema
  const organizationSchema: Organization = {
    "@type": "Organization",
    "@id": "https://fascinantedigital.com/#organization",
    "name": "Fascinante Digital - Agencia Marketing Digital Florida",
    "alternateName": "Fascinante Digital",
    "url": "https://fascinantedigital.com",
    "logo": {
      "@type": "ImageObject",
      "url": "https://fascinantedigital.com/images/shared/logo.svg",
      "width": "200px",
      "height": "60px"
    },
    "description": "Agencia de marketing digital especializada en empresas latinas en Florida. Servicios de SEO, redes sociales, Google Ads y marketing digital bilingüe en Miami, Orlando, Tampa.",
    "foundingDate": "2010",
    "founder": {
      "@type": "Person",
      "name": "Fascinante Digital Team"
    },
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "West Palm Beach",
      "addressRegion": "FL",
      "postalCode": "33411",
      "addressCountry": "US"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+1-800-886-4981",
      "contactType": "customer service"
    },
    "sameAs": [
      "https://www.facebook.com/fascinantedigital",
      "https://twitter.com/fascinantedigital",
      "https://www.linkedin.com/company/fascinantedigital"
    ],
    "knowsAbout": [
      "Digital Marketing",
      "SEO",
      "Social Media Marketing",
      "Google Ads",
      "Facebook Ads",
      "Web Development",
      "Marketing Strategy"
    ]
  };

  // Service schema for services page
  const serviceSchema: Service = {
    "@type": "Service",
    "@id": "https://fascinantedigital.com/#service",
    "name": "Servicios Marketing Digital Florida",
    "description": "Servicios completos de marketing digital para empresas latinas en Florida: SEO, redes sociales, Google Ads, Facebook Ads, marketing digital bilingüe."
  };

  // LocalBusiness schema for contact page
  const localBusinessSchema: LocalBusiness = {
    "@type": "LocalBusiness",
    "@id": "https://fascinantedigital.com/#localbusiness",
    "name": "Fascinante Digital - Agencia Marketing Digital West Palm Beach",
    "description": "Agencia de marketing digital especializada en empresas latinas en West Palm Beach, Florida. Servicios de SEO, redes sociales y publicidad digital.",
    "url": "https://fascinantedigital.com",
    "telephone": "+1-800-886-4981",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "West Palm Beach",
      "addressRegion": "FL",
      "postalCode": "33411",
      "addressCountry": "US"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "26.7153",
      "longitude": "-80.0534"
    },
    "openingHours": "Mo-Fr 09:00-18:00",
    "priceRange": "$$",
    "paymentAccepted": "Cash, Credit Card, Bank Transfer",
    "currenciesAccepted": "USD"
  };

  // Build graph based on page
  const baseSchema: Graph = {
    "@context": "https://schema.org",
    "@graph": [
      organizationSchema,
      ...(page === 'services' ? [serviceSchema] : []),
      ...(page === 'contact' ? [localBusinessSchema] : [])
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(baseSchema),
      }}
    />
  );
};

export default SchemaMarkup;