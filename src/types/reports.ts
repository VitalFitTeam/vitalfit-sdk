export type ChartData = {
  hour?: number;
  label: string;
  value: number;
};

export type TopBranch = {
  branch_name: string;
  total_sales: string;
  percent_change: number;
  label: string;
  trend: 'up' | 'down' | string;
};

export type GlobalStat = {
  percentage_change: number;
  total_current_month: number;
  total_last_month: number;
  trend: string;
};
