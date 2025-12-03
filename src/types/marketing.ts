export type Banner = {
  banner_id?: string;
  image_url?: string;
  is_active?: boolean;
  link_url?: string;
  name?: string;
};

export type CreateBanner = Omit<Banner, 'banner_id'>;

export type UpdateBanner = {
  image_url?: string;
  is_active?: boolean;
  link_url?: string;
  name?: string;
};
