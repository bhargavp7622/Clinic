export type BackgroundKind = 'color' | 'gradient' | 'image';

export interface SectionBackground {
  kind: BackgroundKind;
  value: string; // Hex color (e.g. '#FFFFFF'), gradient (e.g. '#0F766E,#14B8A6'), or image URI
}

export interface FestivalConfig {
  name: string;
  greeting: string;
  bannerImageUrl: string;
}

export interface LayoutTheme {
  primary: string;
  secondary: string;
  background: string;
  surface: string;
  textPrimary: string;
  textSecondary: string;
  accent: string;
  festival?: FestivalConfig;
}

export type TabScreenName = 'home' | 'bookings' | 'prescriptions' | 'profile';

export interface TabItem {
  id: string;
  label: string;
  icon: string;
  screen: TabScreenName;
}

export interface BaseSectionItem {
  id: string;
  [key: string]: unknown;
}

export interface HeroBannerItem extends BaseSectionItem {
  greeting?: string;
  title: string;
  subtitle?: string;
  ctaText?: string;
  ctaAction?: string;
  imageUrl?: string;
}

export interface CategoryChipItem extends BaseSectionItem {
  label: string;
  icon: string;
  color?: string;
  categoryKey: string;
}

export interface QuickActionItem extends BaseSectionItem {
  label: string;
  sublabel?: string;
  icon: string;
  action: string;
  badge?: string;
}

export interface ServiceGridItem extends BaseSectionItem {
  name: string;
  priceInr: number;
  originalPriceInr?: number;
  imageUrl: string;
  badge?: string;
  duration?: string;
  testsCount?: number;
}

export interface DoctorCarouselItem extends BaseSectionItem {
  doctorId: string;
  name: string;
  specialty: string;
  photoUrl: string;
  feeInr: number;
  languages: string[];
  nextSlot: string;
  rating: number;
  clinicName: string;
}

export interface OfferStripItem extends BaseSectionItem {
  text: string;
  couponCode?: string;
  actionText?: string;
  actionUrl?: string;
}

export interface SectionConfig {
  id: string;
  type: string; // 'hero_banner' | 'category_chips' | 'quick_actions' | 'service_grid' | 'doctor_carousel' | 'offer_strip' | unknown
  background: SectionBackground;
  title?: string;
  items?: unknown[];
}

export interface LayoutConfig {
  version: number;
  theme: LayoutTheme;
  tabs: TabItem[];
  sections: SectionConfig[];
}
