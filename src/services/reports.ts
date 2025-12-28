import { Client } from '@/client';
import type {
  BranchPerformance,
  ChartData,
  ClassCapacityStats,
  ClassScheduleItem,
  DataResponse,
  GlobalSalesStats,
  KPICard,
  RecentAttendanceItem,
  TopBranch,
  TotalSalesStats,
} from '@/types';

export class ReportService {
  client: Client;
  constructor(client: Client) {
    this.client = client;
    this.mostUsedServices = this.mostUsedServices.bind(this);
    this.salesByCategory = this.salesByCategory.bind(this);
    this.salesByHour = this.salesByHour.bind(this);
    this.salesByPaymentMethod = this.salesByPaymentMethod.bind(this);
    this.topInstructors = this.topInstructors.bind(this);
    this.topBranches = this.topBranches.bind(this);
    this.globalStats = this.globalStats.bind(this);
    this.totalActiveBranches = this.totalActiveBranches.bind(this);
    this.totalClients = this.totalClients.bind(this);
    this.totalSales = this.totalSales.bind(this);
    this.todayCheckIns = this.todayCheckIns.bind(this);
    this.currentOccupancy = this.currentOccupancy.bind(this);
    this.classCapacityRatio = this.classCapacityRatio.bind(this);
    this.upcomingClassesToday = this.upcomingClassesToday.bind(this);
    this.recentCheckIns = this.recentCheckIns.bind(this);
    this.newClientsKPI = this.newClientsKPI.bind(this);
    this.retentionRateKPI = this.retentionRateKPI.bind(this);
  }
  async mostUsedServices(
    jwt: string,
    start: string,
    end: string,
  ): Promise<DataResponse<ChartData[]>> {
    const response = await this.client.get({
      url: '/reports/charts/most-used-services',
      jwt,
      params: {
        start,
        end,
      },
    });
    return response as unknown as DataResponse<ChartData[]>;
  }
  async salesByCategory(
    jwt: string,
    start: string,
    end: string,
  ): Promise<DataResponse<ChartData[]>> {
    const response = await this.client.get({
      url: '/reports/charts/sales-by-category',
      jwt,
      params: {
        start,
        end,
      },
    });
    return response as unknown as DataResponse<ChartData[]>;
  }
  async salesByHour(
    jwt: string,
    start: string,
    end: string,
  ): Promise<DataResponse<ChartData[]>> {
    const response = await this.client.get({
      url: '/reports/charts/sales-by-hour',
      jwt,
      params: {
        start,
        end,
      },
    });
    return response as unknown as DataResponse<ChartData[]>;
  }
  async salesByPaymentMethod(
    jwt: string,
    start: string,
    end: string,
  ): Promise<DataResponse<ChartData[]>> {
    const response = await this.client.get({
      url: '/reports/charts/sales-by-payment-method',
      jwt,
      params: {
        start,
        end,
      },
    });
    return response as unknown as DataResponse<ChartData[]>;
  }
  async topInstructors(
    jwt: string,
    start: string,
    end: string,
  ): Promise<DataResponse<ChartData[]>> {
    const response = await this.client.get({
      url: '/reports/charts/top-instructors',
      jwt,
      params: {
        start,
        end,
      },
    });
    return response as unknown as DataResponse<ChartData[]>;
  }
  async topBranches(jwt: string): Promise<DataResponse<TopBranch[]>> {
    const response = await this.client.get({
      url: '/reports/stats/top-branches',
      jwt,
    });
    return response as unknown as DataResponse<BranchPerformance[]>;
  }
  async globalStats(jwt: string): Promise<DataResponse<TopBranch[]>> {
    const response = await this.client.get({
      url: '/reports/stats/global',
      jwt,
    });
    return response as unknown as DataResponse<TopBranch[]>;
  }
  async totalActiveBranches(jwt: string): Promise<DataResponse<number>> {
    const response = await this.client.get({
      url: '/reports/stats/total-active-branches',
      jwt,
    });
    return response as unknown as DataResponse<number>;
  }
  async totalClients(jwt: string): Promise<DataResponse<number>> {
    const response = await this.client.get({
      url: '/reports/stats/total-clients',
      jwt,
    });
    return response as unknown as DataResponse<number>;
  }
  async totalSales(jwt: string): Promise<DataResponse<TotalSalesStats>> {
    const response = await this.client.get({
      url: '/reports/stats/total-sales',
      jwt,
    });
    return response as unknown as DataResponse<TotalSalesStats>;
  }
  async todayCheckIns(
    jwt: string,
    branchId?: string,
  ): Promise<DataResponse<number>> {
    const response = await this.client.get({
      url: '/reports/stats/check-ins-today',
      jwt,
      params: branchId ? { branch_id: branchId } : undefined,
    });
    return response as unknown as DataResponse<number>;
  }
  async currentOccupancy(
    jwt: string,
    branchId?: string,
  ): Promise<DataResponse<number>> {
    const response = await this.client.get({
      url: '/reports/stats/current-occupancy',
      jwt,
      params: branchId ? { branch_id: branchId } : undefined,
    });
    return response as unknown as DataResponse<number>;
  }
  async classCapacityRatio(
    jwt: string,
    classId: string,
  ): Promise<DataResponse<ClassCapacityStats>> {
    const response = await this.client.get({
      url: '/reports/stats/class-capacity',
      jwt,
      params: { class_id: classId },
    });
    return response as unknown as DataResponse<ClassCapacityStats>;
  }
  async upcomingClassesToday(
    jwt: string,
    branchId?: string,
  ): Promise<DataResponse<ClassScheduleItem[]>> {
    const response = await this.client.get({
      url: '/reports/stats/upcoming-classes',
      jwt,
      params: branchId ? { branch_id: branchId } : undefined,
    });
    return response as unknown as DataResponse<ClassScheduleItem[]>;
  }
  async recentCheckIns(
    jwt: string,
    branchId?: string,
  ): Promise<DataResponse<RecentAttendanceItem[]>> {
    const response = await this.client.get({
      url: '/reports/stats/recent-check-ins',
      jwt,
      params: branchId ? { branch_id: branchId } : undefined,
    });
    return response as unknown as DataResponse<RecentAttendanceItem[]>;
  }
  async newClientsKPI(
    jwt: string,
    branchId?: string,
  ): Promise<DataResponse<KPICard>> {
    const response = await this.client.get({
      url: '/reports/kpi/new-clients',
      jwt,
      params: branchId ? { branch_id: branchId } : undefined,
    });
    return response as unknown as DataResponse<KPICard>;
  }
  async retentionRateKPI(
    jwt: string,
    branchId?: string,
  ): Promise<DataResponse<KPICard>> {
    const response = await this.client.get({
      url: '/reports/kpi/retention-rate',
      jwt,
      params: branchId ? { branch_id: branchId } : undefined,
    });
    return response as unknown as DataResponse<KPICard>;
  }
}
