import React, { useState, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Switch } from './ui/switch';
import { 
  Building2, 
  User, 
  MapPin, 
  Settings as SettingsIcon, 
  Globe, 
  Bot, 
  CreditCard, 
  Bell,
  Save,
  Upload,
  ChevronRight,
  Mail,
  Phone,
  Link,
  Clock,
  Calendar,
  Languages,
  MessageSquare,
  Shield,
  FileText,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

const Settings = () => {
  const [activeSection, setActiveSection] = useState('profile');
  const [formData, setFormData] = useState({
    // Institution Information
    institutionName: 'Sri Ramaswamy Memorial University',
    institutionType: 'University',
    institutionCode: 'SRMU001',
    phone: '+91-98765-43210',
    website: 'https://www.srmist.edu.in',
    
    // Contact Information
    primaryContactName: 'Dr. Rajesh Kumar',
    designation: 'Vice Principal',
    email: 'contact@srmist.edu.in',
    alternativeEmail: 'backup@srmist.edu.in',
    
    // Address Information
    streetAddress: 'Potheri Campus, SRM Nagar',
    city: 'Chennai',
    state: 'Tamil Nadu',
    postalCode: '603203',
    country: 'India',
    campusLocations: 'Main Campus: Chennai\nSatellite Campus: Delhi',
    
    // Technical Configuration
    defaultLanguage: 'English',
    supportedLanguages: ['English', 'Hindi', 'Tamil', 'Telugu'],
    timeZone: 'Asia/Kolkata',
    academicCalendar: 'Semester System',
    operatingHours: '09:00 AM - 05:00 PM',
    weekendOperations: true,
    
    // AI Assistant Configuration
    assistantName: 'SRMU Assistant',
    assistantPersonality: 'Helpful, knowledgeable, and empathetic educational assistant that understands student concerns and provides clear, accurate information.',
    assistantBehaviour: 'Always greet users warmly, actively listen to their queries, provide step-by-step guidance when needed, and offer additional relevant information proactively.',
    greetingMessage: 'Welcome to SRM University! I\'m here to help with admissions, courses, and campus information.',
    institutionKeywords: 'SRMIST, Kattankulathur, Computer Science, B.Tech',
    responseTone: 'Professional',
    escalationContact: 'admissions@srmist.edu.in',
    
    // Billing & Subscription
    subscriptionPlan: 'University Pro',
    billingContactName: 'Finance Manager',
    billingEmail: 'finance@srmist.edu.in',
    billingAddress: '',
    taxId: '29AABCS1234C1ZN',
    purchaseOrderRequired: false,
    paymentMethod: 'Bank Transfer',
    
    // Usage Preferences
    analyticsReporting: 'Weekly',
    reportRecipients: 'admin@srmist.edu.in, dean@srmist.edu.in',
    emergencyContact: '+91-98765-43210',
    maintenanceWindow: '2:00 AM - 4:00 AM IST',
    notificationPreferences: ['System Updates', 'Performance Reports']
  });
  
  const [unsavedChanges, setUnsavedChanges] = useState(false);
  const fileInputRef = useRef(null);

  const sections = [
    {
      id: 'profile',
      title: 'Profile Information',
      icon: Building2,
      description: 'Institution details, contact info, and address'
    },
    {
      id: 'technical',
      title: 'Technical Configuration',
      icon: SettingsIcon,
      description: 'Language settings and AI configuration'
    },
    {
      id: 'billing',
      title: 'Account & Billing',
      icon: CreditCard,
      description: 'Subscription and billing information'
    },
    {
      id: 'preferences',
      title: 'Preferences',
      icon: Bell,
      description: 'Notifications and reporting settings'
    }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setUnsavedChanges(true);
  };

  const handleArrayChange = (field, value, isChecked) => {
    setFormData(prev => ({
      ...prev,
      [field]: isChecked 
        ? [...prev[field], value]
        : prev[field].filter(item => item !== value)
    }));
    setUnsavedChanges(true);
  };

  const handleSave = () => {
    // Here you would typically save to backend
    console.log('Saving settings:', formData);
    setUnsavedChanges(false);
    // Show success toast
  };

  const handleLogoUpload = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.size <= 2 * 1024 * 1024) { // 2MB limit
      // Handle file upload
      console.log('Uploading logo:', file);
    } else {
      alert('File size must be less than 2MB');
    }
  };

  const renderProfileSection = () => (
    <div className="space-y-8">
      {/* Institution Details */}
      <Card className="border-border/30 bg-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-foreground">
            <Building2 className="w-5 h-5 text-primary" />
            Institution Details
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            Basic information about your educational institution
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Institution Name *
              </label>
              <Input
                value={formData.institutionName}
                onChange={(e) => handleInputChange('institutionName', e.target.value)}
                placeholder="Enter institution name"
                className="bg-background border-border/30 text-foreground"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Institution Type *
              </label>
              <select
                value={formData.institutionType}
                onChange={(e) => handleInputChange('institutionType', e.target.value)}
                className="w-full px-3 py-2 bg-background border border-border/30 rounded-md text-foreground focus:ring-2 focus:ring-primary/20 focus:border-primary/30"
              >
                <option value="University">University</option>
                <option value="College">College</option>
                <option value="School">School</option>
                <option value="Training Institute">Training Institute</option>
                <option value="Corporate Training Center">Corporate Training Center</option>
              </select>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Institution Code/ID
              </label>
              <Input
                value={formData.institutionCode}
                onChange={(e) => handleInputChange('institutionCode', e.target.value)}
                placeholder="e.g., SRMU001, AICTE-12345"
                className="bg-background border-border/30 text-foreground"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Phone Number *
              </label>
              <Input
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                placeholder="+91-98765-43210"
                className="bg-background border-border/30 text-foreground"
                required
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Website URL
            </label>
            <Input
              value={formData.website}
              onChange={(e) => handleInputChange('website', e.target.value)}
              placeholder="https://www.institution.edu"
              className="bg-background border-border/30 text-foreground"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Institution Logo
            </label>
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 border-2 border-dashed border-border/30 rounded-lg flex items-center justify-center bg-muted/30">
                <Building2 className="w-6 h-6 text-muted-foreground" />
              </div>
              <Button 
                variant="outline" 
                onClick={handleLogoUpload}
                className="bg-background border-border/30 text-foreground hover:bg-muted/50"
              >
                <Upload className="w-4 h-4 mr-2" />
                Upload Logo
              </Button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/png,image/jpeg"
                onChange={handleFileChange}
                className="hidden"
              />
              <span className="text-xs text-muted-foreground">
                PNG/JPG, max 2MB
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Contact Information */}
      <Card className="border-border/30 bg-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-foreground">
            <User className="w-5 h-5 text-primary" />
            Primary Contact Details
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            Main point of contact for your institution
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Contact Name *
              </label>
              <Input
                value={formData.primaryContactName}
                onChange={(e) => handleInputChange('primaryContactName', e.target.value)}
                placeholder="Dr. Rajesh Kumar"
                className="bg-background border-border/30 text-foreground"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Designation/Title *
              </label>
              <Input
                value={formData.designation}
                onChange={(e) => handleInputChange('designation', e.target.value)}
                placeholder="Vice Principal, IT Director"
                className="bg-background border-border/30 text-foreground"
                required
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Email Address *
              </label>
              <Input
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                placeholder="contact@institution.edu"
                className="bg-background border-border/30 text-foreground"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Alternative Email
              </label>
              <Input
                type="email"
                value={formData.alternativeEmail}
                onChange={(e) => handleInputChange('alternativeEmail', e.target.value)}
                placeholder="backup@institution.edu"
                className="bg-background border-border/30 text-foreground"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Address Information */}
      <Card className="border-border/30 bg-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-foreground">
            <MapPin className="w-5 h-5 text-primary" />
            Institution Address
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            Complete address and location details
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Street Address *
            </label>
            <Input
              value={formData.streetAddress}
              onChange={(e) => handleInputChange('streetAddress', e.target.value)}
              placeholder="Complete street address"
              className="bg-background border-border/30 text-foreground"
              required
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                City *
              </label>
              <Input
                value={formData.city}
                onChange={(e) => handleInputChange('city', e.target.value)}
                placeholder="City name"
                className="bg-background border-border/30 text-foreground"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                State/Province *
              </label>
              <Input
                value={formData.state}
                onChange={(e) => handleInputChange('state', e.target.value)}
                placeholder="State or province"
                className="bg-background border-border/30 text-foreground"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Postal Code *
              </label>
              <Input
                value={formData.postalCode}
                onChange={(e) => handleInputChange('postalCode', e.target.value)}
                placeholder="ZIP/Postal code"
                className="bg-background border-border/30 text-foreground"
                required
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Country *
            </label>
            <select
              value={formData.country}
              onChange={(e) => handleInputChange('country', e.target.value)}
              className="w-full px-3 py-2 bg-background border border-border/30 rounded-md text-foreground focus:ring-2 focus:ring-primary/20 focus:border-primary/30"
              required
            >
              <option value="India">India</option>
              <option value="United States">United States</option>
              <option value="United Kingdom">United Kingdom</option>
              <option value="Canada">Canada</option>
              <option value="Australia">Australia</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Campus Locations
            </label>
            <textarea
              value={formData.campusLocations}
              onChange={(e) => handleInputChange('campusLocations', e.target.value)}
              placeholder="Multiple campus addresses (if applicable)"
              className="w-full px-3 py-2 bg-background border border-border/30 rounded-md text-foreground focus:ring-2 focus:ring-primary/20 focus:border-primary/30 resize-none"
              rows={3}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderTechnicalSection = () => (
    <div className="space-y-8">
      {/* AI Assistant Configuration */}
      <Card className="border-border/30 bg-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-foreground">
            <Bot className="w-5 h-5 text-primary" />
            AI Assistant Configuration
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            Customize your AI voice assistant's behavior and responses
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Personality Field */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Assistant Personality
            </label>
            <textarea
              value={formData.assistantPersonality}
              onChange={(e) => handleInputChange('assistantPersonality', e.target.value)}
              placeholder="Describe the personality traits of your AI assistant (e.g., helpful, knowledgeable, empathetic)"
              className="w-full px-3 py-2 bg-background border border-border/30 rounded-md text-foreground focus:ring-2 focus:ring-primary/20 focus:border-primary/30 resize-none"
              rows={3}
            />
            <p className="text-xs text-muted-foreground mt-1">
              Define how your AI assistant should present itself in terms of personality and character traits.
            </p>
          </div>

          {/* Behaviour Field */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Assistant Behaviour
            </label>
            <textarea
              value={formData.assistantBehaviour}
              onChange={(e) => handleInputChange('assistantBehaviour', e.target.value)}
              placeholder="Describe how your AI assistant should behave in conversations (e.g., greeting style, response approach, interaction patterns)"
              className="w-full px-3 py-2 bg-background border border-border/30 rounded-md text-foreground focus:ring-2 focus:ring-primary/20 focus:border-primary/30 resize-none"
              rows={3}
            />
            <p className="text-xs text-muted-foreground mt-1">
              Specify behavioral patterns and interaction styles for consistent user experiences.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Assistant Name
              </label>
              <Input
                value={formData.assistantName}
                onChange={(e) => handleInputChange('assistantName', e.target.value)}
                placeholder="SRMU Assistant, Campus Helper"
                className="bg-background border-border/30 text-foreground"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Response Tone
              </label>
              <select
                value={formData.responseTone}
                onChange={(e) => handleInputChange('responseTone', e.target.value)}
                className="w-full px-3 py-2 bg-background border border-border/30 rounded-md text-foreground focus:ring-2 focus:ring-primary/20 focus:border-primary/30"
              >
                <option value="Formal">Formal</option>
                <option value="Friendly">Friendly</option>
                <option value="Professional">Professional</option>
                <option value="Casual">Casual</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Greeting Message
            </label>
            <textarea
              value={formData.greetingMessage}
              onChange={(e) => handleInputChange('greetingMessage', e.target.value)}
              placeholder="Welcome message for users"
              className="w-full px-3 py-2 bg-background border border-border/30 rounded-md text-foreground focus:ring-2 focus:ring-primary/20 focus:border-primary/30 resize-none"
              rows={3}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Institution-Specific Keywords
            </label>
            <textarea
              value={formData.institutionKeywords}
              onChange={(e) => handleInputChange('institutionKeywords', e.target.value)}
              placeholder="Keywords for better recognition (comma-separated)"
              className="w-full px-3 py-2 bg-background border border-border/30 rounded-md text-foreground focus:ring-2 focus:ring-primary/20 focus:border-primary/30 resize-none"
              rows={2}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Escalation Contact
            </label>
            <Input
              value={formData.escalationContact}
              onChange={(e) => handleInputChange('escalationContact', e.target.value)}
              placeholder="Email for complex queries"
              className="bg-background border-border/30 text-foreground"
            />
          </div>
        </CardContent>
      </Card>

      {/* Language Settings */}
      <Card className="border-border/30 bg-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-foreground">
            <Globe className="w-5 h-5 text-primary" />
            Language Settings
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            Configure language support for your AI assistant
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Default Language *
              </label>
              <select
                value={formData.defaultLanguage}
                onChange={(e) => handleInputChange('defaultLanguage', e.target.value)}
                className="w-full px-3 py-2 bg-background border border-border/30 rounded-md text-foreground focus:ring-2 focus:ring-primary/20 focus:border-primary/30"
              >
                <option value="English">English</option>
                <option value="Hindi">Hindi</option>
                <option value="Tamil">Tamil</option>
                <option value="Telugu">Telugu</option>
                <option value="Bengali">Bengali</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Time Zone *
              </label>
              <select
                value={formData.timeZone}
                onChange={(e) => handleInputChange('timeZone', e.target.value)}
                className="w-full px-3 py-2 bg-background border border-border/30 rounded-md text-foreground focus:ring-2 focus:ring-primary/20 focus:border-primary/30"
              >
                <option value="Asia/Kolkata">Asia/Kolkata (IST)</option>
                <option value="Asia/Mumbai">Asia/Mumbai (IST)</option>
                <option value="America/New_York">America/New_York (EST)</option>
                <option value="Europe/London">Europe/London (GMT)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-3">
              Supported Languages * (minimum 2)
            </label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {['English', 'Hindi', 'Tamil', 'Telugu', 'Bengali', 'Gujarati', 'Marathi', 'Punjabi'].map((lang) => (
                <label key={lang} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.supportedLanguages.includes(lang)}
                    onChange={(e) => handleArrayChange('supportedLanguages', lang, e.target.checked)}
                    className="rounded border-border/30 text-primary focus:ring-primary/20"
                  />
                  <span className="text-sm text-foreground">{lang}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Academic Calendar
              </label>
              <select
                value={formData.academicCalendar}
                onChange={(e) => handleInputChange('academicCalendar', e.target.value)}
                className="w-full px-3 py-2 bg-background border border-border/30 rounded-md text-foreground focus:ring-2 focus:ring-primary/20 focus:border-primary/30"
              >
                <option value="Semester System">Semester System</option>
                <option value="Trimester System">Trimester System</option>
                <option value="Annual System">Annual System</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Operating Hours
              </label>
              <Input
                value={formData.operatingHours}
                onChange={(e) => handleInputChange('operatingHours', e.target.value)}
                placeholder="09:00 AM - 05:00 PM"
                className="bg-background border-border/30 text-foreground"
              />
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <Switch
              checked={formData.weekendOperations}
              onCheckedChange={(checked) => handleInputChange('weekendOperations', checked)}
            />
            <label className="text-sm text-foreground">
              Enable weekend operations
            </label>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderBillingSection = () => (
    <div className="space-y-8">
      <Card className="border-border/30 bg-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-foreground">
            <CreditCard className="w-5 h-5 text-primary" />
            Account & Billing Information
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            Subscription details and billing configuration
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Current Plan
              </label>
              <div className="px-3 py-2 bg-muted/30 border border-border/30 rounded-md text-foreground">
                {formData.subscriptionPlan}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Payment Method
              </label>
              <div className="px-3 py-2 bg-muted/30 border border-border/30 rounded-md text-foreground">
                {formData.paymentMethod}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Billing Contact Name *
              </label>
              <Input
                value={formData.billingContactName}
                onChange={(e) => handleInputChange('billingContactName', e.target.value)}
                placeholder="Finance Manager"
                className="bg-background border-border/30 text-foreground"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Billing Email *
              </label>
              <Input
                type="email"
                value={formData.billingEmail}
                onChange={(e) => handleInputChange('billingEmail', e.target.value)}
                placeholder="finance@institution.edu"
                className="bg-background border-border/30 text-foreground"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Tax ID/GST Number
            </label>
            <Input
              value={formData.taxId}
              onChange={(e) => handleInputChange('taxId', e.target.value)}
              placeholder="29AABCS1234C1ZN"
              className="bg-background border-border/30 text-foreground"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Billing Address
            </label>
            <textarea
              value={formData.billingAddress}
              onChange={(e) => handleInputChange('billingAddress', e.target.value)}
              placeholder="Leave empty to use institution address"
              className="w-full px-3 py-2 bg-background border border-border/30 rounded-md text-foreground focus:ring-2 focus:ring-primary/20 focus:border-primary/30 resize-none"
              rows={3}
            />
          </div>

          <div className="flex items-center space-x-3">
            <Switch
              checked={formData.purchaseOrderRequired}
              onCheckedChange={(checked) => handleInputChange('purchaseOrderRequired', checked)}
            />
            <label className="text-sm text-foreground">
              Purchase Order required for billing
            </label>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderPreferencesSection = () => (
    <div className="space-y-8">
      <Card className="border-border/30 bg-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-foreground">
            <Bell className="w-5 h-5 text-primary" />
            Usage Preferences
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            Configure notifications, reporting, and system preferences
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Analytics Reporting Frequency
              </label>
              <select
                value={formData.analyticsReporting}
                onChange={(e) => handleInputChange('analyticsReporting', e.target.value)}
                className="w-full px-3 py-2 bg-background border border-border/30 rounded-md text-foreground focus:ring-2 focus:ring-primary/20 focus:border-primary/30"
              >
                <option value="Daily">Daily</option>
                <option value="Weekly">Weekly</option>
                <option value="Monthly">Monthly</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Maintenance Window
              </label>
              <select
                value={formData.maintenanceWindow}
                onChange={(e) => handleInputChange('maintenanceWindow', e.target.value)}
                className="w-full px-3 py-2 bg-background border border-border/30 rounded-md text-foreground focus:ring-2 focus:ring-primary/20 focus:border-primary/30"
              >
                <option value="2:00 AM - 4:00 AM IST">2:00 AM - 4:00 AM IST</option>
                <option value="12:00 AM - 2:00 AM IST">12:00 AM - 2:00 AM IST</option>
                <option value="3:00 AM - 5:00 AM IST">3:00 AM - 5:00 AM IST</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Report Recipients
            </label>
            <textarea
              value={formData.reportRecipients}
              onChange={(e) => handleInputChange('reportRecipients', e.target.value)}
              placeholder="Email addresses for reports (comma-separated)"
              className="w-full px-3 py-2 bg-background border border-border/30 rounded-md text-foreground focus:ring-2 focus:ring-primary/20 focus:border-primary/30 resize-none"
              rows={2}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Emergency Contact
            </label>
            <Input
              value={formData.emergencyContact}
              onChange={(e) => handleInputChange('emergencyContact', e.target.value)}
              placeholder="24/7 emergency contact number"
              className="bg-background border-border/30 text-foreground"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-3">
              Notification Preferences
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {['System Updates', 'Usage Alerts', 'Performance Reports', 'Security Alerts'].map((notif) => (
                <label key={notif} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.notificationPreferences.includes(notif)}
                    onChange={(e) => handleArrayChange('notificationPreferences', notif, e.target.checked)}
                    className="rounded border-border/30 text-primary focus:ring-primary/20"
                  />
                  <span className="text-sm text-foreground">{notif}</span>
                </label>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderSectionContent = () => {
    switch (activeSection) {
      case 'profile':
        return renderProfileSection();
      case 'technical':
        return renderTechnicalSection();
      case 'billing':
        return renderBillingSection();
      case 'preferences':
        return renderPreferencesSection();
      default:
        return renderProfileSection();
    }
  };

  return (
    <div className="min-h-screen bg-background relative">
      {/* Cosmic particle effect (background dots) */}
      <div className="absolute top-0 left-0 w-full h-full cosmic-grid opacity-20 z-0"></div>
      
      {/* Gradient glow effect */}
      <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] rounded-full">
        <div className="w-full h-full opacity-5 bg-primary blur-[100px]"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Settings</h1>
          <p className="text-muted-foreground">
            Manage your institution's profile, configuration, and preferences
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:w-1/4">
            <Card className="border-border/30 bg-card sticky top-8">
              <CardContent className="p-4">
                <nav className="space-y-2">
                  {sections.map((section) => (
                    <button
                      key={section.id}
                      onClick={() => setActiveSection(section.id)}
                      className={`w-full flex items-center justify-between p-3 rounded-lg text-left transition-colors ${
                        activeSection === section.id
                          ? 'bg-primary/10 border border-primary/20 text-primary'
                          : 'hover:bg-muted/50 text-foreground'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <section.icon className="w-4 h-4" />
                        <div>
                          <div className="font-medium text-sm">{section.title}</div>
                          <div className="text-xs text-muted-foreground">{section.description}</div>
                        </div>
                      </div>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  ))}
                </nav>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:w-3/4">
            {renderSectionContent()}
            
            {/* Save Button */}
            <div className="mt-8 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                {unsavedChanges ? (
                  <>
                    <AlertCircle className="w-4 h-4 text-amber-500" />
                    <span className="text-sm text-muted-foreground">You have unsaved changes</span>
                  </>
                ) : (
                  <>
                    <CheckCircle className="w-4 h-4 text-emerald-500" />
                    <span className="text-sm text-muted-foreground">All changes saved</span>
                  </>
                )}
              </div>
              
              <Button 
                onClick={handleSave}
                disabled={!unsavedChanges}
                className="bg-primary text-primary-foreground hover:bg-primary/90"
              >
                <Save className="w-4 h-4 mr-2" />
                Save Changes
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;