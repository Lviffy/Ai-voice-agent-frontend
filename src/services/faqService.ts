import { apiService } from './apiService';
import {
  FAQArticle,
  FAQArticleCreate,
  FAQArticleUpdate
} from '../types/models';

export class FAQService {
  private readonly basePath = '/faqs';

  async createFAQ(data: FAQArticleCreate): Promise<FAQArticle> {
    return apiService.post<FAQArticle>(this.basePath, data);
  }

  async getFAQs(
    skip: number = 0, 
    limit: number = 100, 
    institution_id?: string, 
    category?: string
  ): Promise<FAQArticle[]> {
    const queryParams = new URLSearchParams();
    queryParams.append('skip', skip.toString());
    queryParams.append('limit', limit.toString());
    if (institution_id) queryParams.append('institution_id', institution_id);
    if (category) queryParams.append('category', category);
    
    return apiService.get<FAQArticle[]>(`${this.basePath}?${queryParams.toString()}`);
  }

  async searchFAQs(q: string, institution_id?: string): Promise<FAQArticle[]> {
    const queryParams = new URLSearchParams();
    queryParams.append('q', q);
    if (institution_id) queryParams.append('institution_id', institution_id);
    
    return apiService.get<FAQArticle[]>(`${this.basePath}/search?${queryParams.toString()}`);
  }

  async getFAQById(faqId: string): Promise<FAQArticle> {
    return apiService.get<FAQArticle>(`${this.basePath}/${faqId}`);
  }

  async getFAQsByInstitution(institutionId: string): Promise<FAQArticle[]> {
    return apiService.get<FAQArticle[]>(`${this.basePath}/institution/${institutionId}`);
  }

  async getFAQsByCategory(category: string, institution_id?: string): Promise<FAQArticle[]> {
    const queryParams = new URLSearchParams();
    if (institution_id) queryParams.append('institution_id', institution_id);
    
    const query = queryParams.toString();
    return apiService.get<FAQArticle[]>(`${this.basePath}/category/${category}${query ? `?${query}` : ''}`);
  }

  async updateFAQ(faqId: string, data: FAQArticleUpdate): Promise<FAQArticle> {
    return apiService.put<FAQArticle>(`${this.basePath}/${faqId}`, data);
  }

  async deleteFAQ(faqId: string): Promise<{ message: string }> {
    return apiService.delete<{ message: string }>(`${this.basePath}/${faqId}`);
  }
}

export const faqService = new FAQService();
