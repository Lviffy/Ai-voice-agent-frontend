import { apiService } from './apiService';
import {
  UserRole,
  UserRoleCreate,
  UserRoleUpdate
} from '../types/models';

export class UserRoleService {
  private readonly basePath = '/user-roles';

  async createUser(data: UserRoleCreate): Promise<UserRole> {
    return apiService.post<UserRole>(this.basePath, data);
  }

  async getUserById(userId: string): Promise<UserRole> {
    return apiService.get<UserRole>(`${this.basePath}/${userId}`);
  }

  async getUsersByInstitution(institutionId: string): Promise<UserRole[]> {
    return apiService.get<UserRole[]>(`${this.basePath}/institution/${institutionId}`);
  }

  async getUsersByRole(roleName: string, institutionId?: string): Promise<UserRole[]> {
    const queryParams = new URLSearchParams();
    if (institutionId) queryParams.append('institution_id', institutionId);
    
    const query = queryParams.toString();
    return apiService.get<UserRole[]>(`${this.basePath}/role/${roleName}${query ? `?${query}` : ''}`);
  }

  async updateUser(userId: string, data: UserRoleUpdate): Promise<UserRole> {
    return apiService.put<UserRole>(`${this.basePath}/${userId}`, data);
  }

  async deleteUser(userId: string): Promise<{ message: string }> {
    return apiService.delete<{ message: string }>(`${this.basePath}/${userId}`);
  }
}

export const userRoleService = new UserRoleService();
