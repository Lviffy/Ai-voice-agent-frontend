import { apiService } from './apiService';
import {
  AIAssistantConfig,
  AIAssistantConfigCreate,
  AIAssistantConfigUpdate
} from '../types/models';

export class AIConfigService {
  private readonly basePath = '/ai-configs';

  async createConfig(data: AIAssistantConfigCreate): Promise<AIAssistantConfig> {
    return apiService.post<AIAssistantConfig>(this.basePath, data);
  }

  async getConfigById(configId: string): Promise<AIAssistantConfig> {
    return apiService.get<AIAssistantConfig>(`${this.basePath}/${configId}`);
  }

  async getConfigByInstitution(institutionId: string): Promise<AIAssistantConfig> {
    return apiService.get<AIAssistantConfig>(`${this.basePath}/institution/${institutionId}`);
  }

  async updateConfig(configId: string, data: AIAssistantConfigUpdate): Promise<AIAssistantConfig> {
    return apiService.put<AIAssistantConfig>(`${this.basePath}/${configId}`, data);
  }

  async deleteConfig(configId: string): Promise<{ message: string }> {
    return apiService.delete<{ message: string }>(`${this.basePath}/${configId}`);
  }
}

export const aiConfigService = new AIConfigService();
