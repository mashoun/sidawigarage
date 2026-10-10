/**
 * Domain Models for Sidawi Garage
 * Core business entities, value objects, and types.
 */

export type OilCategory = 'engine' | 'transmission' | 'differential' | 'additive';

export type ViscosityGrade =
  | '0W-16'
  | '0W-20'
  | '0W-30'
  | '0W-40'
  | '5W-20'
  | '5W-30'
  | '5W-40'
  | '5W-50'
  | '10W-40'
  | '10W-60'
  | '75W-80'
  | '75W-85'
  | '75W-90'
  | '75W-140'
  | 'ATF Low-Viscosity'
  | 'ATF Multi-Vehicle'
  | 'DCT / DSG Fluid'
  | 'CVT Fluid';

export interface Brand {
  id: string; // 'liqui-moly' | 'addinol' | 'castrol'
  name: string;
  tagline: string;
  country: string;
  status: string;
  logo: string;
  badgeAccent: string;
  description: string;
  popularLines: string[];
  certificationsSummary: string[];
  certificateImage?: string;
  certificateTitle?: string;
  certificateNumber?: string;
}

export interface Product {
  id: string;
  slug: string;
  brandId: string;
  name: string;
  category: OilCategory;
  viscosity: ViscosityGrade;
  baseOilType: string; // e.g., 'Fully Synthetic PAO', 'HC-Synthetic', 'Fluid TITANIUM'
  image?: string;
  description: string;
  detailedSpecs: {
    flashPoint?: string;
    pourPoint?: string;
    viscosityIndex?: string;
    density?: string;
  };
  approvals: string[]; // OEM Approvals like 'BMW Longlife-04', 'MB 229.52', 'VW 504 00 / 507 00'
  specifications: string[]; // Industry specs like 'ACEA C3', 'API SP'
  recommendedFor: string[]; // Specific cars/engines like 'BMW TwinPower Turbo', 'Porsche 911'
  sidawiNote?: string; // Craftsman insight from Mahmoud Sidawi
  inStock: boolean;
  volumeLiters: number[]; // e.g. [1, 4, 5]
  featured?: boolean;
}

export type VideoPlatform = 'youtube' | 'instagram' | 'tiktok' | 'direct';

export interface VideoReel {
  id: string;
  title: string;
  platform: VideoPlatform;
  url: string; // Raw user link (YouTube watch/short, IG reel, TikTok URL, or direct mp4)
  embedUrl?: string; // Resolved clean embed URL
  videoUrl?: string; // Direct local/remote MP4 or WebM video stream
  thumbnail?: string; // Optional cover image / thumbnail URL or path
  vehicle: string; // e.g., 'BMW M4 Competition F82'
  serviceType: 'motor_oil' | 'transmission_flush' | 'differential' | 'performance_diagnostic';
  oilUsed: string; // e.g., 'Addinol Giga Light MV 0530 LL'
  duration?: string;
  dateServiced?: string;
  description: string;
  tags: string[];
  featured?: boolean;
}

export interface Testimonial {
  id: string;
  clientName: string;
  vehicle: string;
  serviceCompleted: string;
  oilUsed: string;
  rating: number; // 1-5
  comment: string;
  date: string;
  verified: boolean;
}

export interface GarageAddress {
  street: string;
  area: string;
  city: string;
  country: string;
  geo: {
    latitude: number;
    longitude: number;
  };
  googleMapsUrl: string;
  appleMapsUrl: string;
}

export interface OpeningHour {
  days: string;
  hours: string;
  isOpenToday?: boolean;
}

export interface GarageProfile {
  name: string;
  owner: string;
  ownerImage?: string;
  tagline: string;
  bio: string;
  phone: string;
  whatsappNumber: string;
  whatsappGroupUrl: string;
  email: string;
  address: GarageAddress;
  openingHours: OpeningHour[];
  socials: {
    tiktok: string;
    instagram: string;
    youtube: string;
    linkedin: string;
  };
  certifiedBrands: string[];
}
