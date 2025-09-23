import { apiService } from './apiService';
import {
  InstitutionAddress,
  InstitutionAddressCreate,
  InstitutionAddressUpdate
} from '../types/models';

export class InstitutionAddressService {
  private readonly basePath = '/institution-addresses';

  async createAddress(data: InstitutionAddressCreate): Promise<InstitutionAddress> {
    return apiService.post<InstitutionAddress>(this.basePath, data);
  }

  async getAddressById(addressId: string): Promise<InstitutionAddress> {
    return apiService.get<InstitutionAddress>(`${this.basePath}/${addressId}`);
  }

  async getAddressesByInstitution(institutionId: string): Promise<InstitutionAddress[]> {
    return apiService.get<InstitutionAddress[]>(`${this.basePath}/institution/${institutionId}`);
  }

  async updateAddress(addressId: string, data: InstitutionAddressUpdate): Promise<InstitutionAddress> {
    return apiService.put<InstitutionAddress>(`${this.basePath}/${addressId}`, data);
  }

  async deleteAddress(addressId: string): Promise<{ message: string }> {
    return apiService.delete<{ message: string }>(`${this.basePath}/${addressId}`);
  }
}

export const institutionAddressService = new InstitutionAddressService();
