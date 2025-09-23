// Enums
export type ResponseTone = 'Professional' | 'Formal' | 'Friendly' | 'Casual';
export type VoiceStyle = 'Male' | 'Female';
export type AnalyticsFrequency = 'Daily' | 'Weekly' | 'Monthly';
export type SubscriptionPlan = 'Free' | 'Pro' | 'Enterprise';
export type PaymentMethod = 'Card' | 'Bank Transfer' | 'UPI';
export type ParticipantType = 'Student' | 'Parent' | 'Staff';
export type ConversationStatus = 'Resolved' | 'Pending' | 'Escalated';
export type FAQCategory = 'Admission' | 'Scholarship' | 'Fees' | 'Timetable' | 'Facilities';
export type TicketPriority = 'Low' | 'Medium' | 'High' | 'Urgent';
export type UserRoleName = 'Admin' | 'Department Staff' | 'Reception' | 'Student Council' | 'Library';
export type TicketStatus = 'Open' | 'In Progress' | 'Under Review' | 'Resolved' | 'Closed';

// Base interfaces
// Base interfaces
export interface AdminAccount {
  admin_id: string;
  first_name: string;
  last_name: string;
  email: string;
  institution_id?: string | null;
  password_hash?: string;
  created_at?: string;
  updated_at?: string;
}

export interface Institution {
  institution_id: string;
  institution_name: string;
  institution_type: string;
  institution_code?: string;
  phone_number: string;
  website_url?: string;
  logo_url?: string;
  created_at?: string;
  updated_at?: string;
}

export interface InstitutionContact {
  contact_id: string;
  institution_id: string;
  full_name: string;
  designation: string;
  email: string;
  alternate_email?: string;
  phone_number: string;
}

export interface InstitutionAddress {
  address_id: string;
  institution_id: string;
  street_address: string;
  city: string;
  state_province: string;
  postal_code: string;
  country: string;
  campus_locations?: string[];
}

export interface AIAssistantConfig {
  config_id: string;
  institution_id: string;
  assistant_name: string;
  personality?: string;
  behaviour?: string;
  response_tone?: ResponseTone;
  greeting_message?: string;
  keywords?: string[];
  supported_languages: string[];
  default_language: string;
  voice_style?: VoiceStyle;
  escalation_user_id?: string;
}

export interface UsagePreference {
  preference_id: string;
  institution_id: string;
  analytics_frequency?: AnalyticsFrequency;
  report_recipient_emails?: string[];
  emergency_contact_numbers?: string[];
}

export interface AccountBilling {
  billing_id: string;
  institution_id: string;
  subscription_plan?: SubscriptionPlan;
  payment_method?: PaymentMethod;
  billing_contact_name: string;
  billing_contact_email: string;
  tax_identifier?: string;
  billing_address?: string;
  purchase_order_required?: boolean;
}

export interface ConversationLog {
  conversation_id: string;
  institution_id: string;
  participant_type?: ParticipantType;
  participant_name?: string;
  intent?: string;
  duration?: string;
  status?: ConversationStatus;
  satisfaction_score?: number;
  created_at?: string;
}

export interface ConversationSummary {
  institution_id: string;
  total_conversations?: number;
  resolved_count?: number;
  pending_count?: number;
  average_satisfaction?: number;
}

export interface FAQArticle {
  faq_id: string;
  institution_id: string;
  category?: FAQCategory;
  question?: string;
  answer?: string;
}

export interface SupportTicket {
  ticket_id: string;
  institution_id: string;
  subject?: string;
  category?: string;
  priority?: TicketPriority;
  status?: TicketStatus; // Add this field
  contact_email: string;
  contact_phone?: string;
}

export interface UserRole {
  user_id: string;
  institution_id: string;
  username?: string;
  email: string;
  phone_number?: string;
  role_name?: UserRoleName;
}

// Create interfaces (for POST requests)
export interface AdminAccountCreate {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  institution_id?: string | null;
}

export interface InstitutionCreate {
  institution_name: string;
  institution_type: string;
  institution_code?: string;
  phone_number: string;
  website_url?: string;
  logo_url?: string;
}

export interface InstitutionContactCreate {
  institution_id: string;
  full_name: string;
  designation: string;
  email: string;
  alternate_email?: string;
  phone_number: string;
}

export interface InstitutionAddressCreate {
  institution_id: string;
  street_address: string;
  city: string;
  state_province: string;
  postal_code: string;
  country: string;
  campus_locations?: string[];
}

export interface AIAssistantConfigCreate {
  institution_id: string;
  assistant_name: string;
  personality?: string;
  behaviour?: string;
  response_tone?: ResponseTone;
  greeting_message?: string;
  keywords?: string[];
  supported_languages: string[];
  default_language: string;
  voice_style?: VoiceStyle;
  escalation_user_id?: string;
}

export interface UsagePreferenceCreate {
  institution_id: string;
  analytics_frequency?: AnalyticsFrequency;
  report_recipient_emails?: string[];
  emergency_contact_numbers?: string[];
}

export interface AccountBillingCreate {
  institution_id: string;
  subscription_plan?: SubscriptionPlan;
  payment_method?: PaymentMethod;
  billing_contact_name: string;
  billing_contact_email: string;
  tax_identifier?: string;
  billing_address?: string;
  purchase_order_required?: boolean;
}

export interface ConversationLogCreate {
  institution_id: string;
  participant_type?: ParticipantType;
  participant_name?: string;
  intent?: string;
  duration?: string;
  status?: ConversationStatus;
  satisfaction_score?: number;
}

export interface ConversationSummaryCreate {
  institution_id: string;
  total_conversations?: number;
  resolved_count?: number;
  pending_count?: number;
  average_satisfaction?: number;
}

export interface FAQArticleCreate {
  institution_id: string;
  category?: FAQCategory;
  question?: string;
  answer?: string;
}

export interface SupportTicketCreate {
  institution_id: string;
  subject?: string;
  category?: string;
  priority?: TicketPriority;
  status?: TicketStatus;
  contact_email: string;
  contact_phone?: string;
}

export interface UserRoleCreate {
  institution_id: string;
  username?: string;
  email: string;
  phone_number?: string;
  role_name?: UserRoleName;
}

export interface AdminAccountUpdate {
  first_name?: string;
  last_name?: string;
  email?: string;
  password?: string;
  institution_id?: string | null;
}

export interface InstitutionUpdate {
  institution_name?: string;
  institution_type?: string;
  institution_code?: string;
  phone_number?: string;
  website_url?: string;
  logo_url?: string;
}

export interface InstitutionContactUpdate {
  full_name?: string;
  designation?: string;
  email?: string;
  alternate_email?: string;
  phone_number?: string;
}

export interface InstitutionAddressUpdate {
  street_address?: string;
  city?: string;
  state_province?: string;
  postal_code?: string;
  country?: string;
  campus_locations?: string[];
}

export interface AIAssistantConfigUpdate {
  assistant_name?: string;
  personality?: string;
  behaviour?: string;
  response_tone?: ResponseTone;
  greeting_message?: string;
  keywords?: string[];
  supported_languages?: string[];
  default_language?: string;
  voice_style?: VoiceStyle;
  escalation_user_id?: string;
}

export interface UsagePreferenceUpdate {
  analytics_frequency?: AnalyticsFrequency;
  report_recipient_emails?: string[];
  emergency_contact_numbers?: string[];
}

export interface AccountBillingUpdate {
  subscription_plan?: SubscriptionPlan;
  payment_method?: PaymentMethod;
  billing_contact_name?: string;
  billing_contact_email?: string;
  tax_identifier?: string;
  billing_address?: string;
  purchase_order_required?: boolean;
}

export interface ConversationLogUpdate {
  participant_type?: ParticipantType;
  participant_name?: string;
  intent?: string;
  duration?: string;
  status?: ConversationStatus;
  satisfaction_score?: number;
}

export interface ConversationSummaryUpdate {
  total_conversations?: number;
  resolved_count?: number;
  pending_count?: number;
  average_satisfaction?: number;
}

export interface FAQArticleUpdate {
  category?: FAQCategory;
  question?: string;
  answer?: string;
}

export interface SupportTicketUpdate {
  subject?: string;
  category?: string;
  priority?: TicketPriority;
  status?: TicketStatus;
  contact_email?: string;
  contact_phone?: string;
}

export interface UserRoleUpdate {
  username?: string;
  email?: string;
  phone_number?: string;
  role_name?: UserRoleName;
}



export interface ApiResponse<T = any> {
  message?: string;
  data?: T;
  error?: string;
}
