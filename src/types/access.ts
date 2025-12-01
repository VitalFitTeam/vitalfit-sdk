export type CheckIn = {
  branch_id: string;
  qr_jwt: string;
};

export type CheckInResponse = {
  access_type: string;
  check_in_time: string;
  message: string;
  service_name: string;
};
