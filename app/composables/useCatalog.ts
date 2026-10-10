import { catalogRepo } from '../../shared/infrastructure/staticJsonRepositories';
import type { Product, Brand } from '../../shared/domain/models';
import type { ProductFilters } from '../../shared/domain/repositories';

export const useCatalog = () => {
  const products = ref<Product[]>(catalogRepo.getAllProducts());
  const brands = ref<Brand[]>(catalogRepo.getAllBrands());
  const featuredProducts = computed(() => catalogRepo.getFeaturedProducts());

  const getProductBySlug = (slug: string): Product | undefined => {
    return catalogRepo.getProductBySlug(slug);
  };

  const getBrandById = (id: string): Brand | undefined => {
    return catalogRepo.getBrandById(id);
  };

  const filterProducts = (filters: ProductFilters): Product[] => {
    return catalogRepo.filterProducts(filters);
  };

  return {
    products,
    brands,
    featuredProducts,
    getProductBySlug,
    getBrandById,
    filterProducts,
  };
};
