import type { Product, VideoReel } from '../../shared/domain/models';
import garageData from '../../content/data/garage.json';

export const useJsonLd = () => {
  const baseUrl = 'https://sidawigarage.com';

  /**
   * Generates Schema.org AutoRepair LocalBusiness structured data
   */
  const getGarageSchema = () => {
    return {
      '@context': 'https://schema.org',
      '@type': 'AutoRepair',
      '@id': `${baseUrl}/#garage`,
      name: garageData.name,
      alternateName: `${garageData.owner} - Protection at Every RPM`,
      description: garageData.bio,
      url: baseUrl,
      telephone: garageData.phone,
      priceRange: '$$',
      image: `${baseUrl}/images/sidawi-garage-og.jpg`,
      founder: {
        '@type': 'Person',
        name: garageData.owner,
        image: `${baseUrl}${garageData.ownerImage || '/images/mahmoud-sidawi.webp'}`,
        jobTitle: 'Automotive Tribology Specialist',
      },
      address: {
        '@type': 'PostalAddress',
        streetAddress: garageData.address.street,
        addressLocality: garageData.address.city,
        addressRegion: garageData.address.area,
        addressCountry: 'LB',
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: garageData.address.geo.latitude,
        longitude: garageData.address.geo.longitude,
      },
      openingHoursSpecification: [
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
          opens: '08:30',
          closes: '18:30',
        },
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Saturday'],
          opens: '08:30',
          closes: '17:00',
        },
      ],
      sameAs: [
        garageData.socials.instagram,
        garageData.socials.tiktok,
        garageData.socials.youtube,
        garageData.socials.linkedin,
      ],
      areaServed: {
        '@type': 'Country',
        name: 'Lebanon',
      },
      brand: garageData.certifiedBrands.map((b) => ({
        '@type': 'Brand',
        name: b,
      })),
      knowsAbout: [
        'Motor Oil Service',
        'Automatic Transmission Fluid Flush',
        'Dual Clutch Transmission DSG Fluid Service',
        'Differential Oil Replacement',
        'Liqui Moly Reseller',
        'Addinol High Performance Oils',
        'Castrol Lubricants',
      ],
    };
  };

  /**
   * Generates Schema.org Product structured data
   */
  const getProductSchema = (product: Product) => {
    return {
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: product.name,
      description: product.description,
      image: `${baseUrl}${product.image || '/images/brand/sidawi-emblem.png'}`,
      sku: product.id,
      brand: {
        '@type': 'Brand',
        name: product.brandId.toUpperCase(),
      },
      category: product.category === 'engine' ? 'Engine Oil' : 'Transmission Fluid',
      offers: {
        '@type': 'Offer',
        url: `${baseUrl}/products/${product.slug}`,
        priceCurrency: 'USD',
        price: '0',
        itemCondition: 'https://schema.org/NewCondition',
        availability: product.inStock ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
        seller: {
          '@type': 'AutoRepair',
          name: garageData.name,
        },
      },
    };
  };

  /**
   * Generates Schema.org VideoObject structured data
   */
  const getVideoSchema = (video: VideoReel) => {
    return {
      '@context': 'https://schema.org',
      '@type': 'VideoObject',
      name: video.title,
      description: video.description,
      thumbnailUrl: `${baseUrl}${video.thumbnail || '/images/sidawi-garage-og.jpg'}`,
      uploadDate: video.dateServiced || '2026-03-01',
      contentUrl: video.url,
      embedUrl: video.embedUrl || video.url,
    };
  };

  /**
   * Generates BreadcrumbList structured data
   */
  const getBreadcrumbSchema = (crumbs: Array<{ name: string; path: string }>) => {
    return {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: crumbs.map((crumb, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: crumb.name,
        item: `${baseUrl}${crumb.path}`,
      })),
    };
  };

  return {
    getGarageSchema,
    getProductSchema,
    getVideoSchema,
    getBreadcrumbSchema,
  };
};
