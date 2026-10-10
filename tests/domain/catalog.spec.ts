import { describe, expect, it } from 'vitest';
import { catalogRepo } from '../../shared/infrastructure/staticJsonRepositories';

describe('Catalog Repository Domain Tests', () => {
  it('retrieves all products and brands', () => {
    const products = catalogRepo.getAllProducts();
    const brands = catalogRepo.getAllBrands();

    expect(products.length).toBeGreaterThan(0);
    expect(brands.length).toBe(3);
  });

  it('filters products correctly by brandId', () => {
    const liquiMolyProducts = catalogRepo.filterProducts({ brandId: 'liqui-moly' });
    expect(liquiMolyProducts.length).toBeGreaterThan(0);
    expect(liquiMolyProducts.every((p) => p.brandId === 'liqui-moly')).toBe(true);

    const addinolProducts = catalogRepo.filterProducts({ brandId: 'addinol' });
    expect(addinolProducts.length).toBeGreaterThan(0);
    expect(addinolProducts.every((p) => p.brandId === 'addinol')).toBe(true);
  });

  it('filters products correctly by category (engine vs transmission vs differential)', () => {
    const transmissions = catalogRepo.filterProducts({ category: 'transmission' });
    expect(transmissions.length).toBeGreaterThan(0);
    expect(transmissions.every((p) => p.category === 'transmission')).toBe(true);

    const engines = catalogRepo.filterProducts({ category: 'engine' });
    expect(engines.length).toBeGreaterThan(0);
    expect(engines.every((p) => p.category === 'engine')).toBe(true);
  });

  it('filters products by viscosity grade', () => {
    const fivethirty = catalogRepo.filterProducts({ viscosity: '5W-30' });
    expect(fivethirty.length).toBeGreaterThan(0);
    expect(fivethirty.every((p) => p.viscosity === '5W-30')).toBe(true);
  });

  it('searches products by OEM approval keyword (e.g. "BMW Longlife-04")', () => {
    const bmwApproved = catalogRepo.filterProducts({ search: 'BMW Longlife-04' });
    expect(bmwApproved.length).toBeGreaterThan(0);
  });

  it('finds a single product by unique slug', () => {
    const product = catalogRepo.getProductBySlug('addinol-giga-light-mv-0530-ll');
    expect(product).toBeDefined();
    expect(product?.name).toContain('Addinol Giga Light');
    expect(product?.viscosity).toBe('5W-30');
  });
});
