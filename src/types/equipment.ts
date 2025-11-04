export type EquipmentCategory =
  | 'Cardio'
  | 'Strength'
  | 'FreeWeight'
  | 'Functional'
  | 'Accessory';

export type Equipment = {
  equipment_id: string;
  name: string;
  brand: string;
  model: string;
  category: EquipmentCategory;
  description: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
};

export type CreateEquipment = Omit<
  Equipment,
  'equipment_id' | 'created_at' | 'updated_at' | 'deleted_at'
>;

export type UpdateEquipment = Partial<CreateEquipment>;
