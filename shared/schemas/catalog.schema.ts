import { z } from 'zod';

export const OilCategorySchema = z.enum(['engine', 'transmission', 'differential', 'additive']);

export const ViscosityGradeSchema = z.enum([
  '0W-16',
  '0W-20',
  '0W-30',
  '0W-40',
  '5W-20',
  '5W-30',
  '5W-40',
  '5W-50',
  '10W-40',
  '10W-60',
  '75W-80',
  '75W-85',
  '75W-90',
  '75W-140',
  'ATF Low-Viscosity',
  'ATF Multi-Vehicle',
  'DCT / DSG Fluid',
  'CVT Fluid',
]);

export const BrandSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  tagline: z.string().min(1),
  country: z.string().min(1),
  status: z.string().min(1),
  logo: z.string().min(1),
  badgeAccent: z.string().min(1),
  description: z.string().min(1),
  popularLines: z.array(z.string().min(1)),
  certificationsSummary: z.array(z.string().min(1)),
  certificateImage: z.string().optional(),
  certificateTitle: z.string().optional(),
  certificateNumber: z.string().optional(),
});

export const ProductSchema = z.object({
  id: z.string().min(1),
  slug: z.string().min(1),
  brandId: z.string().min(1),
  name: z.string().min(1),
  category: OilCategorySchema,
  viscosity: ViscosityGradeSchema,
  baseOilType: z.string().min(1),
  image: z.string().optional(),
  description: z.string().min(1),
  detailedSpecs: z.object({
    flashPoint: z.string().optional(),
    pourPoint: z.string().optional(),
    viscosityIndex: z.string().optional(),
    density: z.string().optional(),
  }),
  approvals: z.array(z.string().min(1)),
  specifications: z.array(z.string().min(1)),
  recommendedFor: z.array(z.string().min(1)),
  sidawiNote: z.string().optional(),
  inStock: z.boolean(),
  volumeLiters: z.array(z.number().positive()),
  featured: z.boolean().optional(),
});

export const VideoPlatformSchema = z.enum(['youtube', 'instagram', 'tiktok', 'direct']);

export const VideoReelSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  platform: VideoPlatformSchema,
  url: z.string().url('Must be a valid social media or video URL'),
  embedUrl: z.string().optional(),
  thumbnail: z.string().optional(),
  vehicle: z.string().min(1),
  serviceType: z.enum(['motor_oil', 'transmission_flush', 'differential', 'performance_diagnostic']),
  oilUsed: z.string().min(1),
  duration: z.string().optional(),
  dateServiced: z.string().optional(),
  description: z.string().min(1),
  tags: z.array(z.string().min(1)),
  featured: z.boolean().optional(),
});

export const TestimonialSchema = z.object({
  id: z.string().min(1),
  clientName: z.string().min(1),
  vehicle: z.string().min(1),
  serviceCompleted: z.string().min(1),
  oilUsed: z.string().min(1),
  rating: z.number().int().min(1).max(5),
  comment: z.string().min(1),
  date: z.string().min(1),
  verified: z.boolean(),
});

export const GarageAddressSchema = z.object({
  street: z.string().min(1),
  area: z.string().min(1),
  city: z.string().min(1),
  country: z.string().min(1),
  geo: z.object({
    latitude: z.number(),
    longitude: z.number(),
  }),
  googleMapsUrl: z.string().min(1),
  appleMapsUrl: z.string().min(1),
});

export const OpeningHourSchema = z.object({
  days: z.string().min(1),
  hours: z.string().min(1),
  isOpenToday: z.boolean().optional(),
});

export const GarageProfileSchema = z.object({
  name: z.string().min(1),
  owner: z.string().min(1),
  tagline: z.string().min(1),
  bio: z.string().min(1),
  phone: z.string().min(1),
  whatsappNumber: z.string().min(1),
  whatsappGroupUrl: z.string().min(1),
  email: z.string().email(),
  address: GarageAddressSchema,
  openingHours: z.array(OpeningHourSchema),
  socials: z.object({
    tiktok: z.string().min(1),
    instagram: z.string().min(1),
    youtube: z.string().min(1),
    linkedin: z.string().min(1),
  }),
  certifiedBrands: z.array(z.string().min(1)),
});

export type BrandSchemaType = z.infer<typeof BrandSchema>;
export type ProductSchemaType = z.infer<typeof ProductSchema>;
export type VideoReelSchemaType = z.infer<typeof VideoReelSchema>;
export type TestimonialSchemaType = z.infer<typeof TestimonialSchema>;
export type GarageProfileSchemaType = z.infer<typeof GarageProfileSchema>;
