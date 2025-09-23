import { apiService } from './apiService';

export class UserRoleService {
  constructor() {
    this.basePath = '/user-roles';
  }

  async createUser(data) {
    return apiService.post(this.basePath, data);
  }

  async getUserById(userId) {
    return apiService.get(`${this.basePath}/${userId}`);
  }

  async getUsersByInstitution(institutionId) {
    return apiService.get(`${this.basePath}/institution/${institutionId}`);
  }

  async getUsersByRole(roleName, institutionId) {
    const queryParams = new URLSearchParams();
    if (institutionId) queryParams.append('institution_id', institutionId);
    
    const query = queryParams.toString();
    return apiService.get(`${this.basePath}/role/${roleName}${query ? `?${query}` : ''}`);
  }

  async updateUser(userId, data) {
    return apiService.put(`${this.basePath}/${userId}`, data);
  }

  async deleteUser(userId) {
    return apiService.delete(`${this.basePath}/${userId}`);
  }
}

export const userRoleService = new UserRoleService();
