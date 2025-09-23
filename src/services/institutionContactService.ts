import { apiService } from './apiService';
import {
  InstitutionContact,
  InstitutionContactCreate,
  InstitutionContactUpdate
} from '../types/models';

export class InstitutionContactService {
  private readonly basePath = '/institution-contacts';

  async createContact(data: InstitutionContactCreate): Promise<InstitutionContact> {
    return apiService.post<InstitutionContact>(this.basePath, data);
  }

  async getContactById(contactId: string): Promise<InstitutionContact> {
    return apiService.get<InstitutionContact>(`${this.basePath}/${contactId}`);
  }

  async getContactsByInstitution(institutionId: string): Promise<InstitutionContact[]> {
    return apiService.get<InstitutionContact[]>(`${this.basePath}/institution/${institutionId}`);
  }

  async updateContact(contactId: string, data: InstitutionContactUpdate): Promise<InstitutionContact> {
    return apiService.put<InstitutionContact>(`${this.basePath}/${contactId}`, data);
  }

  async deleteContact(contactId: string): Promise<{ message: string }> {
    return apiService.delete<{ message: string }>(`${this.basePath}/${contactId}`);
  }
}

export const institutionContactService = new InstitutionContactService();
