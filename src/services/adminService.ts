import { apiService } from './apiService';
import {
  AdminAccount,
  AdminAccountCreate,
  AdminAccountUpdate,
  PaginationParams
} from '../types/models';

export class AdminService {
  private readonly basePath = '/admin';

  async createAdmin(data: AdminAccountCreate): Promise<AdminAccount> {
    return apiService.post<AdminAccount>(this.basePath, data);
  }

  async signup(data: { 
    first_name: string; 
    last_name: string; 
    email: string; 
    password: string; 
  }): Promise<any> {
    return apiService.post(`${this.basePath}/signup`, {
      first_name: data.first_name,
      last_name: data.last_name,
      email: data.email,
      password: data.password
    });
  }

  async authenticateAdmin(email: string, password: string): Promise<any> {
    return apiService.post(`${this.basePath}/authenticate`, {
      email,
      password
    });
  }

  async getAdmins(params: PaginationParams = {}): Promise<AdminAccount[]> {
    const queryParams = new URLSearchParams();
    if (params.skip !== undefined) queryParams.append('skip', params.skip.toString());
    if (params.limit !== undefined) queryParams.append('limit', params.limit.toString());
    
    const query = queryParams.toString();
    return apiService.get<AdminAccount[]>(`${this.basePath}${query ? `?${query}` : ''}`);
  }

  async getAdminById(adminId: string): Promise<AdminAccount> {
    return apiService.get<AdminAccount>(`${this.basePath}/${adminId}`);
  }

  async getAdminByEmail(email: string): Promise<AdminAccount> {
    return apiService.get<AdminAccount>(`${this.basePath}/email/${email}`);
  }

  async updateAdmin(adminId: string, data: AdminAccountUpdate): Promise<AdminAccount> {
    return apiService.put<AdminAccount>(`${this.basePath}/${adminId}`, data);
  }

  async deleteAdmin(adminId: string): Promise<{ message: string }> {
    return apiService.delete<{ message: string }>(`${this.basePath}/${adminId}`);
  }
}

export const adminService = new AdminService();
