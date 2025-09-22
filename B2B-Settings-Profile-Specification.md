# B2B Settings & Profile Information Specification

## Overview
This document outlines the profile information and settings structure for the AI Voice Agent B2B platform, designed specifically for educational institutions managing multilingual voice assistants.

## Profile Information Structure

### 1. Institution Information
**Section: Organization Details**

| Field | Type | Required | Description | Example |
|-------|------|----------|-------------|---------|
| Institution Name | Text | Yes | Official name of the educational institution | "Sri Ramaswamy Memorial University" |
| Institution Type | Select | Yes | Type of educational organization | "University", "College", "School", "Training Institute", "Corporate Training Center" |
| Institution Code/ID | Text | No | Official registration or identification number | "SRMU001", "AICTE-12345" |
| Phone Number | Tel | Yes | Primary contact number with country code | "+91-98765-43210" |
| Website URL | URL | No | Official institution website | "https://www.srmist.edu.in" |
| Institution Logo | File Upload | No | Logo for branding (max 2MB, PNG/JPG) | - |

### 2. Contact Information
**Section: Primary Contact Details**

| Field | Type | Required | Description | Example |
|-------|------|----------|-------------|---------|
| Primary Contact Name | Text | Yes | Name of the main point of contact | "Dr. Rajesh Kumar" |
| Designation/Title | Text | Yes | Job title or position | "Vice Principal", "IT Director", "Student Services Head" |
| Email Address | Email | Yes | Primary institutional email | "contact@srmist.edu.in" |
| Phone Number | Tel | Yes | Primary contact number with country code | "+91-98765-43210" |
| Alternative Email | Email | No | Secondary contact email | "backup@srmist.edu.in" |

### 3. Address Information
**Section: Institution Address**

| Field | Type | Required | Description | Example |
|-------|------|----------|-------------|---------|
| Street Address | Text | Yes | Complete street address | "Potheri Campus, SRM Nagar" |
| City | Text | Yes | City name | "Chennai" |
| State/Province | Text | Yes | State or province | "Tamil Nadu" |
| Postal Code | Text | Yes | ZIP or postal code | "603203" |
| Country | Select | Yes | Country selection | "India" |
| Campus Locations | Text Area | No | Multiple campus addresses (if applicable) | "Main Campus: Chennai\nSatellite Campus: Delhi" |

### 4. Technical Configuration
**Section: System Settings**

| Field | Type | Required | Description | Options/Example |
|-------|------|----------|-------------|-----------------|
| Default Language | Select | Yes | Primary language for the AI assistant | Hindi, English, Tamil, Telugu, Bengali, etc. |
| Supported Languages | Multi-Select | Yes | All languages the assistant should support | English, Hindi, Tamil, Telugu (min 2, max 10) |
| Time Zone | Select | Yes | Institution's operational timezone | "Asia/Kolkata", "Asia/Mumbai" |
| Academic Calendar | Select | No | Type of academic calendar | "Semester System", "Trimester System", "Annual System" |
| Operating Hours | Time Range | No | Daily operational hours | "09:00 AM - 05:00 PM" |
| Weekend Operations | Checkbox | No | Whether to operate on weekends | Yes/No |

### 5. AI Assistant Customization
**Section: Voice Assistant Configuration**

| Field | Type | Required | Description | Example |
|-------|------|----------|-------------|---------|
| Assistant Name | Text | No | Custom name for the AI assistant | "SRMU Assistant", "Campus Helper" |
| Greeting Message | Text Area | No | Custom welcome message | "Welcome to SRM University! I'm here to help with admissions, courses, and campus information." |
| Institution-Specific Keywords | Text Area | No | Custom keywords for better recognition | "SRMIST, Kattankulathur, Computer Science, B.Tech" |
| Response Tone | Select | No | Preferred communication style | "Formal", "Friendly", "Professional", "Casual" |
| Escalation Contact | Text | No | Contact for complex queries | "admissions@srmist.edu.in" |


### 8. Billing & Subscription
**Section: Account & Billing Information**

| Field | Type | Required | Description | Example |
|-------|------|----------|-------------|---------|
| Subscription Plan | Display | - | Current active plan | "University Pro" |
| Billing Contact Name | Text | Yes | Person responsible for billing | "Finance Manager" |
| Billing Email | Email | Yes | Email for invoices and billing | "finance@srmist.edu.in" |
| Billing Address | Text Area | No | Address for billing (if different) | Same as institution address |
| Tax ID/GST Number | Text | No | Tax identification number | "29AABCS1234C1ZN" |
| Purchase Order Required | Checkbox | No | Whether PO is needed for billing | Yes/No |
| Payment Method | Display | - | Current payment method | "Bank Transfer", "Credit Card", "UPI"|

### 9. Usage Preferences
**Section: Feature Configuration**

| Field | Type | Required | Description | Options |
|-------|------|----------|-------------|---------|
| Analytics Reporting | Select | No | Frequency of analytics reports | "Daily", "Weekly", "Monthly" |
| Report Recipients | Text Area | No | Email addresses for reports | "admin@srmist.edu.in, dean@srmist.edu.in" |
| Emergency Contact | Text | No | 24/7 emergency contact | "+91-98765-43210" |
| Maintenance Window | Select | No | Preferred time for system maintenance | "2:00 AM - 4:00 AM IST" |
| Notification Preferences | Multi-Select | No | Types of notifications to receive | "System Updates", "Usage Alerts", "Performance Reports", "Security Alerts" |

## Settings Categories

### General Settings
- Profile Information Management
- Contact Information Updates
- Address Management
- Logo and Branding Upload

### Technical Settings  
- Language Configuration
- Time Zone Management

### Security Settings
- User Access Management
- Data Privacy Controls
- Audit Log Configuration
- Compliance Settings

### Billing Settings
- Subscription Management
- Payment Method Updates
- Invoice History
- Usage Analytics

### Support Settings
- Help Desk Integration
- Emergency Contacts
- Maintenance Preferences
- Notification Management

## User Interface Requirements

### Navigation Structure
```
Settings
├── Profile Information
│   ├── Institution Details
│   ├── Contact Information
│   └── Address Information
├── Technical Configuration
│   ├── Language Settings
│   ├── AI Assistant Configuration
│   └── Integration Settings
├── Security & Compliance
│   ├── Data Privacy
│   ├── Compliance Requirements
│   └── Audit Settings
├── Account & Billing
│   ├── Subscription Details
│   ├── Billing Information
│   └── Payment Methods
└── Preferences
    ├── Notifications
    ├── Reporting
    └── Support
```

### Form Validation Rules

1. **Required Field Validation**: All required fields must be filled before saving
2. **Email Validation**: Proper email format validation
3. **Phone Number Validation**: International format with country code
4. **URL Validation**: Valid URL format for website and API endpoints
5. **File Upload Validation**: Logo files must be PNG/JPG, max 2MB
6. **Language Selection**: Minimum 2 languages required
7. **Character Limits**: Institution name (max 100 chars), description fields (max 500 chars)


### Save & Update Behavior

- **Auto-save**: Form auto-saves every 30 seconds for drafts
- **Validation**: Real-time validation with error highlighting
- **Confirmation**: Confirmation dialog for critical changes
- **Audit Trail**: All changes logged with user and timestamp

## API Integration Points

### Profile Management APIs
- GET `/api/v1/profile` - Retrieve profile information
- PUT `/api/v1/profile` - Update profile information
- POST `/api/v1/profile/logo` - Upload institution logo
- DELETE `/api/v1/profile/logo` - Remove institution logo

### Settings Management APIs
- GET `/api/v1/settings` - Retrieve all settings
- PUT `/api/v1/settings/{category}` - Update specific settings category
- POST `/api/v1/settings/validate` - Validate settings before saving
- GET `/api/v1/settings/audit` - Retrieve audit log

## Implementation Notes

1. **Responsive Design**: Settings page must work on mobile, tablet, and desktop
2. **Progressive Disclosure**: Use tabs/sections to avoid overwhelming users
3. **Help Text**: Provide contextual help for complex fields
4. **Preview Mode**: Allow users to preview changes before saving
5. **Export/Import**: Option to export settings and import for new institutions
6. **Multi-language UI**: Settings interface available in multiple languages

This specification provides a comprehensive framework for the B2B settings and profile information page tailored for educational institutions using the AI Voice Agent platform.