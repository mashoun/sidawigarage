import type { Brand, GarageProfile, Product, Testimonial, VideoReel } from './models';

export interface ProductFilters {
  brandId?: string;
  category?: string;
  viscosity?: string;
  search?: string;
}

export interface ICatalogRepository {
  getAllProducts(): Product[];
  getProductBySlug(slug: string): Product | undefined;
  getFeaturedProducts(): Product[];
  filterProducts(filters: ProductFilters): Product[];
  getAllBrands(): Brand[];
  getBrandById(id: string): Brand | undefined;
}

export interface IVideoRepository {
  getAllReels(): VideoReel[];
  getFeaturedReels(): VideoReel[];
  getReelById(id: string): VideoReel | undefined;
}

export interface ITestimonialRepository {
  getAllTestimonials(): Testimonial[];
  getFeaturedTestimonials(): Testimonial[];
}

export interface IGarageRepository {
  getProfile(): GarageProfile;
}
