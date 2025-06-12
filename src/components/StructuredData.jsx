import React from 'react';
import { Helmet } from 'react-helmet-async';

const StructuredData = ({ type = 'WebApplication', data = {} }) => {
  const baseUrl = 'https://www.nutricalc.online';

  const schemas = {
    WebApplication: {
      '@context': 'https://schema.org',
      '@type': 'WebApplication',
      name: data.name || 'NutriCalc - Calculadora Nutricional',
      description:
        data.description ||
        'NutriCalc - Calculadora especializada para cálculos nutricionais enterais e parenterais',
      url: data.url || baseUrl,
      applicationCategory: 'HealthApplication',
      operatingSystem: 'Web Browser',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'BRL',
      },
      author: {
        '@type': 'Organization',
        name: 'NutriCalc',
      },
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '4.8',
        reviewCount: '150',
      },
    },

    MedicalWebPage: {
      '@context': 'https://schema.org',
      '@type': 'MedicalWebPage',
      name: data.name || 'Calculadora de Terapia Nutricional',
      description:
        data.description || 'Ferramenta para profissionais da saúde calcularem terapia nutricional',
      url: data.url || baseUrl,
      audience: {
        '@type': 'MedicalAudience',
        audienceType: 'healthcare professionals',
      },
      medicalAudience: {
        '@type': 'MedicalAudience',
        audienceType: ['Nutritionist', 'Physician', 'Nurse'],
      },
      about: {
        '@type': 'MedicalCondition',
        name: 'Nutritional Therapy',
      },
    },

    Organization: {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'NutriCalc',
      url: baseUrl,
      logo: `${baseUrl}/logo512.png`,
      description:
        'Plataforma especializada em ferramentas para cálculos nutricionais profissionais',
      contactPoint: {
        '@type': 'ContactPoint',
        contactType: 'customer service',
      },
    },

    BreadcrumbList: {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: data.breadcrumbs || [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Início',
          item: baseUrl,
        },
      ],
    },

    SoftwareApplication: {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name: 'NutriCalc',
      operatingSystem: 'Web Browser',
      applicationCategory: 'HealthApplication',
      description: data.description || 'Aplicação web para cálculos nutricionais profissionais',
      url: baseUrl,
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'BRL',
      },
      creator: {
        '@type': 'Organization',
        name: 'NutriCalc',
      },
    },
  };

  const selectedSchema = schemas[type] || schemas.WebApplication;

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(selectedSchema)}</script>
    </Helmet>
  );
};

export default StructuredData;
