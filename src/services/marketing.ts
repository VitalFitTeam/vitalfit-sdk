import type { Banner, CreateBanner } from '@/types/marketing';
import { Client } from '../client';
import type {
  CreatePaymentMethod,
  DataResponse,
  PaymentMethod,
} from '../types';

export class MarketingService {
  private client: Client;

  constructor(client: Client) {
    this.client = client;
    this.createBanners = this.createBanners.bind(this);
    this.getBanner = this.getBanner.bind(this);
    this.getBannerByID = this.getBannerByID.bind(this);
    this.updateBanner = this.updateBanner.bind(this);
    this.deleteBanner = this.deleteBanner.bind(this);
  }

  async createBanners(BannerData: CreateBanner, jwt: string): Promise<void> {
    await this.client.post({
      url: '/marketing/banners',
      jwt,
      data: BannerData,
    });
  }

  async getBanner(jwt: string): Promise<DataResponse<Banner[]>> {
    const response = await this.client.get({
      url: '/marketing/banners',
      jwt,
    });
    return response as unknown as DataResponse<Banner[]>;
  }

  async getBannerByID(
    BannerId: string,
    jwt: string,
  ): Promise<DataResponse<Banner>> {
    const response = await this.client.get({
      url: `/marketing/banners/${BannerId}`,
      jwt,
    });
    return response as unknown as DataResponse<Banner>;
  }

  async updateBanner(
    BannerId: string,
    BannerData: CreateBanner,
    jwt: string,
  ): Promise<void> {
    await this.client.put({
      url: `/marketing/banners/${BannerId}`,
      jwt,
      data: BannerData,
    });
  }

  async deleteBanner(BannerId: string, jwt: string): Promise<void> {
    await this.client.delete({
      url: `/marketing/banners/${BannerId}`,
      jwt,
    });
  }
}
