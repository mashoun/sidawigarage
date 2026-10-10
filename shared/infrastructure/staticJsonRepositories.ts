import type { Brand, GarageProfile, Product, Testimonial, VideoReel } from '../domain/models';
import type {
  ICatalogRepository,
  IGarageRepository,
  ITestimonialRepository,
  IVideoRepository,
  ProductFilters,
} from '../domain/repositories';

// Import raw static JSON datasets
import brandsData from '../../content/data/brands.json';
import garageData from '../../content/data/garage.json';
import productsData from '../../content/data/products.json';
import testimonialsData from '../../content/data/testimonials.json';
import videosData from '../../content/data/videos.json';

export class StaticJsonCatalogRepository implements ICatalogRepository {
  private products: Product[] = productsData as Product[];
  private brands: Brand[] = brandsData as Brand[];

  getAllProducts(): Product[] {
    return this.products;
  }

  getProductBySlug(slug: string): Product | undefined {
    return this.products.find((p) => p.slug === slug);
  }

  getFeaturedProducts(): Product[] {
    return this.products.filter((p) => p.featured);
  }

  filterProducts(filters: ProductFilters): Product[] {
    return this.products.filter((product) => {
      // 1. Brand match
      if (filters.brandId && filters.brandId !== 'all' && product.brandId !== filters.brandId) {
        return false;
      }

      // 2. Category match
      if (filters.category && filters.category !== 'all' && product.category !== filters.category) {
        return false;
      }

      // 3. Viscosity match
      if (filters.viscosity && filters.viscosity !== 'all' && product.viscosity !== filters.viscosity) {
        return false;
      }

      // 4. Keyword search
      if (filters.search && filters.search.trim() !== '') {
        const query = filters.search.toLowerCase().trim();
        const matchesName = product.name.toLowerCase().includes(query);
        const matchesDesc = product.description.toLowerCase().includes(query);
        const matchesApprovals = product.approvals.some((a) => a.toLowerCase().includes(query));
        const matchesRecommended = product.recommendedFor.some((r) => r.toLowerCase().includes(query));
        const matchesViscosity = product.viscosity.toLowerCase().includes(query);

        if (!matchesName && !matchesDesc && !matchesApprovals && !matchesRecommended && !matchesViscosity) {
          return false;
        }
      }

      return true;
    });
  }

  getAllBrands(): Brand[] {
    return this.brands;
  }

  getBrandById(id: string): Brand | undefined {
    return this.brands.find((b) => b.id === id);
  }
}

export class StaticJsonVideoRepository implements IVideoRepository {
  private reels: VideoReel[] = videosData as VideoReel[];

  getAllReels(): VideoReel[] {
    return this.reels;
  }

  getFeaturedReels(): VideoReel[] {
    return this.reels.filter((r) => r.featured);
  }

  getReelById(id: string): VideoReel | undefined {
    return this.reels.find((r) => r.id === id);
  }
}

export class StaticJsonTestimonialRepository implements ITestimonialRepository {
  private testimonials: Testimonial[] = testimonialsData as Testimonial[];

  getAllTestimonials(): Testimonial[] {
    return this.testimonials;
  }

  getFeaturedTestimonials(): Testimonial[] {
    return this.testimonials;
  }
}

export class StaticJsonGarageRepository implements IGarageRepository {
  private profile: GarageProfile = garageData as GarageProfile;

  getProfile(): GarageProfile {
    return this.profile;
  }
}

// Singleton instances for zero-allocation reuse
export const catalogRepo = new StaticJsonCatalogRepository();
export const videoRepo = new StaticJsonVideoRepository();
export const testimonialRepo = new StaticJsonTestimonialRepository();
export const garageRepo = new StaticJsonGarageRepository();
