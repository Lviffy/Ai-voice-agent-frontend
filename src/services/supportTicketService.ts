import { apiService } from './apiService';
import {
  SupportTicket,
  SupportTicketCreate,
  SupportTicketUpdate
} from '../types/models';

export class SupportTicketService {
  private readonly basePath = '/tickets';

  async createTicket(data: SupportTicketCreate): Promise<SupportTicket> {
    return apiService.post<SupportTicket>(this.basePath, data);
  }

  async getTickets(
    skip: number = 0, 
    limit: number = 100, 
    institution_id?: string, 
    priority?: string, 
    category?: string
  ): Promise<SupportTicket[]> {
    const queryParams = new URLSearchParams();
    queryParams.append('skip', skip.toString());
    queryParams.append('limit', limit.toString());
    if (institution_id) queryParams.append('institution_id', institution_id);
    if (priority) queryParams.append('priority', priority);
    if (category) queryParams.append('category', category);
    
    return apiService.get<SupportTicket[]>(`${this.basePath}?${queryParams.toString()}`);
  }

  async getTicketById(ticketId: string): Promise<SupportTicket> {
    return apiService.get<SupportTicket>(`${this.basePath}/${ticketId}`);
  }

  async getTicketsByInstitution(institutionId: string): Promise<SupportTicket[]> {
    return apiService.get<SupportTicket[]>(`${this.basePath}/institution/${institutionId}`);
  }

  async getTicketsByPriority(priority: string, institution_id?: string): Promise<SupportTicket[]> {
    const queryParams = new URLSearchParams();
    if (institution_id) queryParams.append('institution_id', institution_id);
    
    const query = queryParams.toString();
    return apiService.get<SupportTicket[]>(`${this.basePath}/priority/${priority}${query ? `?${query}` : ''}`);
  }

  async getTicketsByCategory(category: string, institution_id?: string): Promise<SupportTicket[]> {
    const queryParams = new URLSearchParams();
    if (institution_id) queryParams.append('institution_id', institution_id);
    
    const query = queryParams.toString();
    return apiService.get<SupportTicket[]>(`${this.basePath}/category/${category}${query ? `?${query}` : ''}`);
  }

  async updateTicket(ticketId: string, data: SupportTicketUpdate): Promise<SupportTicket> {
    console.log(`Updating ticket ${ticketId} with:`, data)
    return apiService.put<SupportTicket>(`${this.basePath}/${ticketId}`, data)
  }

  async deleteTicket(ticketId: string): Promise<{ message: string }> {
    return apiService.delete<{ message: string }>(`${this.basePath}/${ticketId}`);
  }
}

export const supportTicketService = new SupportTicketService();
