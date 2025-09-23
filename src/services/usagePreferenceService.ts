import { apiService } from './apiService';
import {
  UsagePreference,
  UsagePreferenceCreate,
  UsagePreferenceUpdate
} from '../types/models';

export class UsagePreferenceService {
  private readonly basePath = '/usage-preferences';

  async getPreferenceById(preferenceId: string): Promise<UsagePreference> {
    return apiService.get<UsagePreference>(`${this.basePath}/${preferenceId}`);
  }

  async getPreferencesByInstitution(institutionId: string): Promise<UsagePreference> {
    return apiService.get<UsagePreference>(`${this.basePath}/institution/${institutionId}`);
  }

  async createPreferences(data: UsagePreferenceCreate): Promise<UsagePreference> {
    return apiService.post<UsagePreference>(this.basePath, data);
  }

  async updatePreferences(preferenceId: string, data: UsagePreferenceUpdate): Promise<UsagePreference> {
    return apiService.put<UsagePreference>(`${this.basePath}/${preferenceId}`, data);
  }

  async deletePreferences(preferenceId: string): Promise<{ message: string }> {
    return apiService.delete<{ message: string }>(`${this.basePath}/${preferenceId}`);
  }
}

export const usagePreferenceService = new UsagePreferenceService();
