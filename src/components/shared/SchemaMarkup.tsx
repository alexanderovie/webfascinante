interface SchemaMarkupProps {
  type?: 'Organization' | 'Service' | 'LocalBusiness';
  page?: 'home' | 'about' | 'services' | 'blog' | 'contact';
}

const SchemaMarkup = ({ page = 'home' }: SchemaMarkupProps) => {
  const baseSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://fascinantedigital.com/#organization",
        "name": "Fascinante Digital - Agencia Marketing Digital Florida",
        "alternateName": "Fascinante Digital",
        "url": "https://fascinantedigital.com",
        "logo": {
          "@type": "ImageObject",
          "url": "https://fascinantedigital.com/images/shared/logo.svg",
          "width": 200,
          "height": 60
        },
        "description": "Agencia de marketing digital especializada en empresas latinas en Florida. Servicios de SEO, redes sociales, Google Ads y marketing digital bilingüe en Miami, Orlando, Tampa.",
        "foundingDate": "2010",
        "founder": {
          "@type": "Person",
          "name": "Fascinante Digital Team"
        },
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Miami",
          "addressRegion": "FL",
          "addressCountry": "US",
          "postalCode": "33101"
        },
        "contactPoint": {
          "@type": "ContactPoint",
          "telephone": "+1-305-XXX-XXXX",
          "contactType": "customer service",
          "availableLanguage": ["Spanish", "English"],
          "areaServed": "FL"
        },
        "sameAs": [
          "https://www.facebook.com/fascinantedigital",
          "https://www.instagram.com/fascinantedigital",
          "https://www.linkedin.com/company/fascinantedigital",
          "https://twitter.com/fascinantedigital"
        ],
        "areaServed": [
          {
            "@type": "City",
            "name": "Miami",
            "containedInPlace": {
              "@type": "State",
              "name": "Florida"
            }
          },
          {
            "@type": "City", 
            "name": "Orlando",
            "containedInPlace": {
              "@type": "State",
              "name": "Florida"
            }
          },
          {
            "@type": "City",
            "name": "Tampa", 
            "containedInPlace": {
              "@type": "State",
              "name": "Florida"
            }
          }
        ],
        "knowsAbout": [
          "Marketing Digital",
          "SEO",
          "Google Ads",
          "Facebook Ads",
          "Redes Sociales",
          "Marketing Digital Latino",
          "Marketing Digital Hispano",
          "Digital Marketing Florida"
        ]
      }
    ]
  };

  // Add Service schema for services page
  if (page === 'services') {
    (baseSchema["@graph"] as any[]).push({
      "@type": "Service",
      "@id": "https://fascinantedigital.com/#service",
      "name": "Servicios Marketing Digital Florida",
      "description": "Servicios completos de marketing digital para empresas latinas en Florida: SEO, redes sociales, Google Ads, Facebook Ads, marketing digital bilingüe."
    });
  }

  // Add LocalBusiness schema for contact page
  if (page === 'contact') {
    baseSchema["@graph"].push({
      "@type": "LocalBusiness",
      "@id": "https://fascinantedigital.com/#localbusiness",
      "name": "Fascinante Digital - Agencia Marketing Digital Miami",
      "description": "Agencia de marketing digital especializada en empresas latinas en Miami, Florida. Servicios de SEO, redes sociales y publicidad digital.",
      "url": "https://fascinantedigital.com",
      "telephone": "+1-305-XXX-XXXX",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "123 Main Street",
        "addressLocality": "Miami",
        "addressRegion": "FL", 
        "postalCode": "33101",
        "addressCountry": "US"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": "25.7617",
        "longitude": "-80.1918"
      },
      "openingHours": "Mo-Fr 09:00-18:00",
      "priceRange": "$$",
      "paymentAccepted": "Cash, Credit Card, Bank Transfer",
      "currenciesAccepted": "USD",
      "languages": ["Spanish", "English"]
    });
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(baseSchema, null, 2)
      }}
    />
  );
};

export default SchemaMarkup;
