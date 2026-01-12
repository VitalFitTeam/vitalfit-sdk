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

export type AttendanceHistory = {
  attendance_id: string;
  user_id: string;
  user_name: string;
  service_id: string;
  service_name: string;
  check_in_time: string;
  status: string;
};

export type ServiceUsage = {
  attendance_id: string;
  service_id: string;
  service_name: string;
  check_in_time: string;
  status: string;
};
