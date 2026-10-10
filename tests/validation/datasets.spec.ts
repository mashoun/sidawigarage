import { describe, expect, it } from 'vitest';
import brandsData from '../../content/data/brands.json';
import garageData from '../../content/data/garage.json';
import productsData from '../../content/data/products.json';
import testimonialsData from '../../content/data/testimonials.json';
import videosData from '../../content/data/videos.json';
import {
  BrandSchema,
  GarageProfileSchema,
  ProductSchema,
  TestimonialSchema,
  VideoReelSchema,
} from '../../shared/schemas/catalog.schema';

describe('Static Datasets Validation Suite', () => {
  it('validates all certified brands against BrandSchema', () => {
    expect(brandsData.length).toBeGreaterThanOrEqual(3);
    for (const brand of brandsData) {
      const result = BrandSchema.safeParse(brand);
      expect(result.success, `Brand "${brand.name}" failed validation: ${JSON.stringify(result.error?.issues)}`).toBe(true);
    }
  });

  it('validates garage profile against GarageProfileSchema', () => {
    const result = GarageProfileSchema.safeParse(garageData);
    expect(result.success, `Garage profile failed validation: ${JSON.stringify(result.error?.issues)}`).toBe(true);
  });

  it('validates all products against ProductSchema and ensures unique IDs and valid brands', () => {
    expect(productsData.length).toBeGreaterThanOrEqual(5);
    const validBrandIds = new Set(brandsData.map((b) => b.id));
    const seenIds = new Set<string>();
    const seenSlugs = new Set<string>();

    for (const product of productsData) {
      const result = ProductSchema.safeParse(product);
      expect(result.success, `Product "${product.name}" failed: ${JSON.stringify(result.error?.issues)}`).toBe(true);

      // Verify no duplicates
      expect(seenIds.has(product.id), `Duplicate product ID: ${product.id}`).toBe(false);
      expect(seenSlugs.has(product.slug), `Duplicate product slug: ${product.slug}`).toBe(false);
      seenIds.add(product.id);
      seenSlugs.add(product.slug);

      // Verify brand integrity
      expect(validBrandIds.has(product.brandId), `Product "${product.name}" references invalid brand "${product.brandId}"`).toBe(true);
    }
  });

  it('validates all video reels against VideoReelSchema', () => {
    expect(videosData.length).toBeGreaterThanOrEqual(3);
    for (const reel of videosData) {
      const result = VideoReelSchema.safeParse(reel);
      expect(result.success, `Video reel "${reel.title}" failed: ${JSON.stringify(result.error?.issues)}`).toBe(true);
    }
  });

  it('validates customer testimonials against TestimonialSchema', () => {
    expect(testimonialsData.length).toBeGreaterThanOrEqual(3);
    for (const review of testimonialsData) {
      const result = TestimonialSchema.safeParse(review);
      expect(result.success, `Review from "${review.clientName}" failed: ${JSON.stringify(result.error?.issues)}`).toBe(true);
    }
  });
});
