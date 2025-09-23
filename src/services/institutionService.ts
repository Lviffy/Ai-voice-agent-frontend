import { apiService } from './apiService';
import {
  Institution,
  InstitutionCreate,
  InstitutionUpdate
} from '../types/models';

export class InstitutionService {
  private readonly basePath = '/institutions';

  async createInstitution(data: InstitutionCreate): Promise<Institution> {
    return apiService.post<Institution>(this.basePath, data);
  }

  async setupInstitution(adminId: string, data: InstitutionCreate): Promise<Institution> {
    const queryParams = new URLSearchParams();
    queryParams.append('admin_id', adminId);
    return apiService.post<Institution>(`${this.basePath}/setup?${queryParams.toString()}`, data);
  }

  async getInstitutions(skip: number = 0, limit: number = 100): Promise<Institution[]> {
    const queryParams = new URLSearchParams();
    queryParams.append('skip', skip.toString());
    queryParams.append('limit', limit.toString());
    
    return apiService.get<Institution[]>(`${this.basePath}?${queryParams.toString()}`);
  }

  async searchInstitutions(q: string, skip: number = 0, limit: number = 100): Promise<Institution[]> {
    const queryParams = new URLSearchParams();
    queryParams.append('q', q);
    queryParams.append('skip', skip.toString());
    queryParams.append('limit', limit.toString());
    
    return apiService.get<Institution[]>(`${this.basePath}/search?${queryParams.toString()}`);
  }

  async getInstitutionById(institutionId: string): Promise<Institution> {
    return apiService.get<Institution>(`${this.basePath}/${institutionId}`);
  }

  async getInstitutionByName(institutionName: string): Promise<Institution> {
    return apiService.get<Institution>(`${this.basePath}/name/${institutionName}`);
  }

  async getInstitutionByCode(institutionCode: string): Promise<Institution> {
    return apiService.get<Institution>(`${this.basePath}/code/${institutionCode}`);
  }

  async updateInstitution(institutionId: string, data: InstitutionUpdate): Promise<Institution> {
    return apiService.put<Institution>(`${this.basePath}/${institutionId}`, data);
  }

  async deleteInstitution(institutionId: string): Promise<{ message: string }> {
    return apiService.delete<{ message: string }>(`${this.basePath}/${institutionId}`);
  }
}

export const institutionService = new InstitutionService();
