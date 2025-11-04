export interface ServiceCategoryInfo {
  category_id: string;
  name: string;
}

export interface ServiceImageResponse {
  image_id: string;
  image_url: string;
  alt_text: string;
  display_order: number;
  is_primary: boolean;
}

export interface BannerResponse {
  banner_id: string;
  name: string;
  image_url: string;
  link_url: string;
  is_active: boolean;
}

export interface ServiceFullDetail {
  service_id: string;
  category_id: string;
  name: string;
  description: string;
  duration_minutes: number;
  priority_score: number;
  is_featured: boolean;
  created_at: string;
  updated_at: string;

  service_category: ServiceCategoryInfo;
  images: ServiceImageResponse[];
  banners: BannerResponse[];
}

export type CreateServiceImage = {
  alt_text: string;
  display_order: number;
  image_url: string;
  is_primary: boolean;
};

export type CreateService = {
  banner_id: string;
  category_id: string;
  description: string;
  duration: number;
  is_featured: boolean;
  name: string;
  priority: number;
  service_images: CreateServiceImage[];
};

export type UpdateServiceImageManual = {
  alt_text?: string;
  display_order?: number;
  image_url?: string;
  is_primary?: boolean;
};

export type UpdateServiceManual = {
  banner_id?: string;
  category_id?: string;
  description?: string;
  duration?: number;
  is_featured?: boolean;
  name?: string;
  priority?: number;
  service_images?: UpdateServiceImageManual[];
};

export type BranchServicePrice = {
  branchID: string;
  serviceID: string;
  isVisible: boolean;
  maxCapacity: number;
  priceForMember: number;
  priceForNonMember: number;
  createdAt: string;
  updatedAt: string;
};

export type CreateBranchServicePriceItem = {
  service_id: string;
  is_visible: boolean;
  max_capacity: number;
  price_for_member: number;
  price_for_non_member: number;
};

export type UpdateBranchServicePrice = {
  is_visible?: boolean;
  max_capacity?: number;
  price_for_member?: number;
  price_for_non_member?: number;
};
