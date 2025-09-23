import { apiService } from './apiService';

export class FAQService {
  constructor() {
    this.basePath = '/faqs';
  }

  async createFAQ(data) {
    return apiService.post(this.basePath, data);
  }

  async getFAQs(skip = 0, limit = 100, institution_id, category) {
    const queryParams = new URLSearchParams();
    queryParams.append('skip', skip.toString());
    queryParams.append('limit', limit.toString());
    if (institution_id) queryParams.append('institution_id', institution_id);
    if (category) queryParams.append('category', category);
    
    return apiService.get(`${this.basePath}?${queryParams.toString()}`);
  }

  async searchFAQs(q, institution_id) {
    const queryParams = new URLSearchParams();
    queryParams.append('q', q);
    if (institution_id) queryParams.append('institution_id', institution_id);
    
    return apiService.get(`${this.basePath}/search?${queryParams.toString()}`);
  }

  async getFAQById(faqId) {
    return apiService.get(`${this.basePath}/${faqId}`);
  }

  async getFAQsByInstitution(institutionId) {
    return apiService.get(`${this.basePath}/institution/${institutionId}`);
  }

  async getFAQsByCategory(category, institution_id) {
    const queryParams = new URLSearchParams();
    if (institution_id) queryParams.append('institution_id', institution_id);
    
    const query = queryParams.toString();
    return apiService.get(`${this.basePath}/category/${category}${query ? `?${query}` : ''}`);
  }

  async updateFAQ(faqId, data) {
    return apiService.put(`${this.basePath}/${faqId}`, data);
  }

  async deleteFAQ(faqId) {
    return apiService.delete(`${this.basePath}/${faqId}`);
  }
}

export const faqService = new FAQService();
