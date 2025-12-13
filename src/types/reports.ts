export type ChartData = {
  hour?: number;
  label: string;
  value: number;
};

export type TopBranch = {
  label: string;
  value: string;
  percent_change: number;
  status: string;
  trend: 'up' | 'down' | string;
};

export type GlobalStat = {
  percentage_change: number;
  total_current_month: number;
  total_last_month: number;
  trend: string;
};
