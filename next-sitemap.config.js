/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://fascinantedigital.com',
  generateRobotsTxt: true,
  changefreq: 'daily',
  priority: 0.7,
  sitemapSize: 5000,
  exclude: [
    // Excluir páginas que no están en el menú principal
    '/our-services-01',
    '/our-services-02', 
    '/our-services-03',
    '/about-01',
    '/about-02',
    '/about-03',
    '/blog-01',
    '/blog-02',
    '/blog-03',
    '/blog/*', // Excluir todas las páginas de blog individuales
    '/our-services/*', // Excluir páginas de servicios individuales
    '/team/*', // Excluir páginas de equipo individuales
    '/case-study/*', // Excluir páginas de casos de estudio individuales
    '/career/*', // Excluir páginas de carrera individuales
    // Excluir todas las páginas de homepage que no son la principal
    '/homepage-*',
    // Excluir páginas de autenticación
    '/login-*',
    '/signup-*',
    
    // === PÁGINAS TEMPORALMENTE EXCLUIDAS (hasta que estén listas) ===
    // Políticas y términos
    '/terms-conditions',
    '/privacy',
    '/refund-policy',
    '/affiliate-policy',
    '/gdpr',
    // Páginas de soporte
    '/tutorial',
    '/documentation',
    '/faq',
    '/support',
    '/changelog',
    // Páginas de características y funcionalidades
    '/features-*',
    '/integration-01',
    '/integration-02', 
    '/integration-03',
    '/process-01',
    '/process-02',
    '/analytics',
    '/testimonial-01',
    '/testimonial-02',
    '/case-study',
    '/our-team-01',
    '/our-team-02',
    '/pricing-*',
    '/use-case',
    '/affiliates',
    '/career',
  ],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',
          '/_next/',
          '/admin/',
          '/private/',
          '/*.json$',
          '/*.xml$',
        ],
      },
      {
        userAgent: 'GPTBot',
        disallow: '/',
      },
      {
        userAgent: 'ChatGPT-User',
        disallow: '/',
      },
      {
        userAgent: 'CCBot',
        disallow: '/',
      },
      {
        userAgent: 'anthropic-ai',
        disallow: '/',
      },
      {
        userAgent: 'Claude-Web',
        disallow: '/',
      },
    ],
    additionalSitemaps: [
      'https://fascinantedigital.com/sitemap.xml',
    ],
  },
  transform: async (config, path) => {
    // Configuración personalizada para cada página
    const customConfig = {
      loc: path,
      changefreq: config.changefreq,
      priority: config.priority,
      lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
    };

    // Prioridades específicas para páginas importantes
    if (path === '/') {
      customConfig.priority = 1.0;
      customConfig.changefreq = 'daily';
    } else if (path === '/services') {
      customConfig.priority = 0.9;
      customConfig.changefreq = 'weekly';
    } else if (path === '/about') {
      customConfig.priority = 0.8;
      customConfig.changefreq = 'monthly';
    } else if (path === '/contact-us') {
      customConfig.priority = 0.8;
      customConfig.changefreq = 'monthly';
    } else if (path === '/blog') {
      customConfig.priority = 0.7;
      customConfig.changefreq = 'weekly';
    }

    return customConfig;
  },
};
