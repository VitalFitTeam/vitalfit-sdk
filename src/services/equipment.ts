import type {
  CreateEquipment,
  DataResponse,
  Equipment,
  UpdateEquipment,
} from '@/types';
import { Client } from '../client';

export class EquipmentService {
  private client: Client;

  constructor(client: Client) {
    this.client = client;
    this.getEquipment = this.getEquipment.bind(this);
    this.createEquipment = this.createEquipment.bind(this);
    this.updateEquipment = this.updateEquipment.bind(this);
    this.deleteEquipment = this.deleteEquipment.bind(this);
  }

  async getEquipment(jwt: string): Promise<DataResponse<Equipment[]>> {
    const response = await this.client.get({
      url: '/equipment-types',
      jwt,
    });
    return response as unknown as DataResponse<Equipment[]>;
  }

  async createEquipment(data: CreateEquipment, jwt: string): Promise<void> {
    await this.client.post({
      url: '/equipment-types',
      jwt,
      data,
    });
  }

  async updateEquipment(
    equipmentId: string,
    data: UpdateEquipment,
    jwt: string,
  ): Promise<void> {
    await this.client.put({
      url: `/equipment-types/${equipmentId}`,
      jwt,
      data,
    });
  }

  async deleteEquipment(equipmentId: string, jwt: string): Promise<void> {
    await this.client.delete({
      url: `/equipment-types/${equipmentId}`,
      jwt,
    });
  }
}
