import { describe, expect, it } from 'vitest';
import garageData from '../../content/data/garage.json';
import productsData from '../../content/data/products.json';
import videosData from '../../content/data/videos.json';
import { useJsonLd } from '../../app/composables/useJsonLd';
import type { Product, VideoReel } from '../../shared/domain/models';

describe('JSON-LD Structured Data Tests', () => {
  const { getGarageSchema, getProductSchema, getVideoSchema, getBreadcrumbSchema } = useJsonLd();

  it('generates valid AutoRepair schema for Sidawi Garage', () => {
    const schema = getGarageSchema();
    expect(schema['@type']).toBe('AutoRepair');
    expect(schema.name).toBe('Sidawi Garage');
    expect(schema.telephone).toBeDefined();
    expect(schema.geo.latitude).toBeCloseTo(garageData.address.geo.latitude, 3);
    expect(schema.brand.length).toBe(3);
    expect(schema.sameAs.length).toBeGreaterThanOrEqual(4);
  });

  it('generates valid Product schema for an oil product', () => {
    const product = productsData[0] as Product;
    const schema = getProductSchema(product);
    expect(schema['@type']).toBe('Product');
    expect(schema.name).toBe(product.name);
    expect(schema.sku).toBe(product.id);
    expect(schema.offers.availability).toBe('https://schema.org/InStock');
  });

  it('generates valid VideoObject schema for client reel', () => {
    const video = videosData[0] as VideoReel;
    const schema = getVideoSchema(video);
    expect(schema['@type']).toBe('VideoObject');
    expect(schema.name).toBe(video.title);
    expect(schema.contentUrl).toBe(video.url);
  });

  it('generates valid BreadcrumbList schema', () => {
    const crumbs = [
      { name: 'Home', path: '/' },
      { name: 'Catalog', path: '/products' },
      { name: 'Addinol Giga Light', path: '/products/addinol-giga-light-mv-0530-ll' },
    ];
    const schema = getBreadcrumbSchema(crumbs);
    expect(schema['@type']).toBe('BreadcrumbList');
    expect(schema.itemListElement.length).toBe(3);
    expect(schema.itemListElement[1].name).toBe('Catalog');
  });
});
