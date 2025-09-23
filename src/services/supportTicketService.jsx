import { apiService } from './apiService';

export class SupportTicketService {
  constructor() {
    this.basePath = '/tickets';
  }

  async createTicket(data) {
    return apiService.post(this.basePath, data);
  }

  async getTickets(skip = 0, limit = 100, institution_id, priority, category) {
    const queryParams = new URLSearchParams();
    queryParams.append('skip', skip.toString());
    queryParams.append('limit', limit.toString());
    if (institution_id) queryParams.append('institution_id', institution_id);
    if (priority) queryParams.append('priority', priority);
    if (category) queryParams.append('category', category);
    
    return apiService.get(`${this.basePath}?${queryParams.toString()}`);
  }

  async getTicketById(ticketId) {
    return apiService.get(`${this.basePath}/${ticketId}`);
  }

  async getTicketsByInstitution(institutionId) {
    return apiService.get(`${this.basePath}/institution/${institutionId}`);
  }

  async getTicketsByPriority(priority, institution_id) {
    const queryParams = new URLSearchParams();
    if (institution_id) queryParams.append('institution_id', institution_id);
    
    const query = queryParams.toString();
    return apiService.get(`${this.basePath}/priority/${priority}${query ? `?${query}` : ''}`);
  }

  async getTicketsByCategory(category, institution_id) {
    const queryParams = new URLSearchParams();
    if (institution_id) queryParams.append('institution_id', institution_id);
    
    const query = queryParams.toString();
    return apiService.get(`${this.basePath}/category/${category}${query ? `?${query}` : ''}`);
  }

  async updateTicket(ticketId, data) {
    return apiService.put(`${this.basePath}/${ticketId}`, data);
  }

  async deleteTicket(ticketId) {
    return apiService.delete(`${this.basePath}/${ticketId}`);
  }
}

export const supportTicketService = new SupportTicketService();
