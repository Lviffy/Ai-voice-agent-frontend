import { apiService } from './apiService';
import {
  AccountBilling,
  AccountBillingCreate,
  AccountBillingUpdate
} from '../types/models';

export class AccountBillingService {
  private readonly basePath = '/billing';

  async getBillingByInstitution(institutionId: string): Promise<AccountBilling> {
    return apiService.get<AccountBilling>(`${this.basePath}/institution/${institutionId}`);
  }

  async getBillingById(billingId: string): Promise<AccountBilling> {
    return apiService.get<AccountBilling>(`${this.basePath}/${billingId}`);
  }

  async createBilling(data: AccountBillingCreate): Promise<AccountBilling> {
    return apiService.post<AccountBilling>(this.basePath, data);
  }

  async updateBilling(billingId: string, data: AccountBillingUpdate): Promise<AccountBilling> {
    return apiService.put<AccountBilling>(`${this.basePath}/${billingId}`, data);
  }

  async deleteBilling(billingId: string): Promise<{ message: string }> {
    return apiService.delete<{ message: string }>(`${this.basePath}/${billingId}`);
  }
}

export const accountBillingService = new AccountBillingService();
