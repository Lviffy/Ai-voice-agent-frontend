import { apiService } from './apiService';
import {
  ConversationLog,
  ConversationLogCreate,
  ConversationLogUpdate,
  ConversationSummary,
  ConversationSummaryCreate,
  ConversationSummaryUpdate
} from '../types/models';

export class ConversationService {
  private readonly basePath = '/conversations';

  // Conversation Logs
  async createLog(data: ConversationLogCreate): Promise<ConversationLog> {
    return apiService.post<ConversationLog>(`${this.basePath}/logs`, data);
  }

  async getLogs(
    skip: number = 0, 
    limit: number = 100, 
    institution_id?: string, 
    status?: string
  ): Promise<ConversationLog[]> {
    const queryParams = new URLSearchParams();
    queryParams.append('skip', skip.toString());
    queryParams.append('limit', limit.toString());
    if (institution_id) queryParams.append('institution_id', institution_id);
    if (status) queryParams.append('status', status);
    
    return apiService.get<ConversationLog[]>(`${this.basePath}/logs?${queryParams.toString()}`);
  }

  async getLogById(conversationId: string): Promise<ConversationLog> {
    return apiService.get<ConversationLog>(`${this.basePath}/logs/${conversationId}`);
  }

  async getLogsByInstitution(institutionId: string, skip: number = 0, limit: number = 100): Promise<ConversationLog[]> {
    const queryParams = new URLSearchParams();
    queryParams.append('skip', skip.toString());
    queryParams.append('limit', limit.toString());
    
    return apiService.get<ConversationLog[]>(`${this.basePath}/logs/institution/${institutionId}?${queryParams.toString()}`);
  }

  async getLogsByDateRange(
    start_date: string, 
    end_date: string, 
    institution_id?: string
  ): Promise<ConversationLog[]> {
    const queryParams = new URLSearchParams();
    queryParams.append('start_date', start_date);
    queryParams.append('end_date', end_date);
    if (institution_id) queryParams.append('institution_id', institution_id);
    
    return apiService.get<ConversationLog[]>(`${this.basePath}/logs/date-range?${queryParams.toString()}`);
  }

  async updateLog(conversationId: string, data: ConversationLogUpdate): Promise<ConversationLog> {
    return apiService.put<ConversationLog>(`${this.basePath}/logs/${conversationId}`, data);
  }

  async deleteLog(conversationId: string): Promise<{ message: string }> {
    return apiService.delete<{ message: string }>(`${this.basePath}/logs/${conversationId}`);
  }

  // Conversation Summaries
  async createOrUpdateSummary(data: ConversationSummaryCreate): Promise<ConversationSummary> {
    return apiService.post<ConversationSummary>(`${this.basePath}/summaries`, data);
  }

  async getSummaryByInstitution(institutionId: string): Promise<ConversationSummary> {
    return apiService.get<ConversationSummary>(`${this.basePath}/summaries/${institutionId}`);
  }

  async updateSummary(institutionId: string, data: ConversationSummaryUpdate): Promise<ConversationSummary> {
    return apiService.put<ConversationSummary>(`${this.basePath}/summaries/${institutionId}`, data);
  }

  async deleteSummary(institutionId: string): Promise<{ message: string }> {
    return apiService.delete<{ message: string }>(`${this.basePath}/summaries/${institutionId}`);
  }
}

export const conversationService = new ConversationService();
