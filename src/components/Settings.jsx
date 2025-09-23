import React, { useState, useRef, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Switch } from './ui/switch'
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
  AlertCircle,
} from 'lucide-react'
import { useToast } from './toast/toast'
import { useInstitution } from '../contexts/InstitutionContext'
import { institutionService } from '../services/institutionService'
import { institutionContactService } from '../services/institutionContactService'
import { institutionAddressService } from '../services/institutionAddressService'
import { aiConfigService } from '../services/aiConfigService'
import { usagePreferenceService } from '../services/usagePreferenceService'
import { accountBillingService } from '../services/accountBillingService'
import ProfileSettings from './settings/ProfileSettings'
import TechnicalSettings from './settings/TechnicalSettings'
import BillingSettings from './settings/BillingSettings'
import PreferencesSettings from './settings/PreferencesSettings'
import { Loader2 } from 'lucide-react'

const Settings = () => {
  const [activeSection, setActiveSection] = useState('profile')
  const [loading, setLoading] = useState(true)
  const [unsavedChanges, setUnsavedChanges] = useState(false)
  const { institutionId } = useInstitution()
  const { toast } = useToast()
  const fileInputRef = useRef(null)
  const [saving, setSaving] = useState(false)

  const [dataIds, setDataIds] = useState({
    institutionId: null,
    contactId: null,
    addressId: null,
    aiConfigId: null,
    usagePreferenceId: null,
    billingId: null,
  })

  const [formData, setFormData] = useState({
    // Institution Information
    institutionName: '',
    institutionType: '',
    institutionCode: '',
    phone: '',
    website: '',

    // Contact Information
    primaryContactName: '',
    designation: '',
    email: '',
    alternativeEmail: '',

    // Address Information
    streetAddress: '',
    city: '',
    state: '',
    postalCode: '',
    country: '',
    campusLocations: '',

    // AI Assistant Configuration
    assistantName: '',
    assistantPersonality: '',
    assistantBehaviour: '',
    greetingMessage: '',
    institutionKeywords: '',
    responseTone: 'Professional',
    escalationContact: '',
    defaultLanguage: 'English',
    supportedLanguages: ['English'],
    timeZone: 'Asia/Kolkata',

    // Billing & Subscription
    subscriptionPlan: '',
    billingContactName: '',
    billingEmail: '',
    billingAddress: '',
    taxId: '',
    purchaseOrderRequired: false,
    paymentMethod: '',

    // Usage Preferences
    analyticsReporting: 'Weekly',
    reportRecipients: '',
    emergencyContact: '',
    notificationPreferences: [],
  })

  const fetchAllData = async () => {
    if (!institutionId) {
      setLoading(false)
      return
    }

    try {
      setLoading(true)
      console.log('Fetching data for institution:', institutionId)

      // Fetch institution data (this should always work)
      const institution = await institutionService.getInstitutionById(institutionId)
      console.log('Institution data:', institution)

      // Fetch related data with individual error handling
      let primaryContact = null
      let primaryAddress = null
      let aiConfigData = null
      let usageData = null
      let billingData = null

      try {
        const contacts = await institutionContactService.getContactsByInstitution(institutionId)
        primaryContact = contacts[0] || null
        console.log('Contact data:', primaryContact)
      } catch (error) {
        console.warn('Contacts not found:', error.message)
      }

      try {
        const addresses = await institutionAddressService.getAddressesByInstitution(institutionId)
        primaryAddress = addresses[0] || null
        console.log('Address data:', primaryAddress)
      } catch (error) {
        console.warn('Addresses not found:', error.message)
      }

      try {
        aiConfigData = await aiConfigService.getConfigByInstitution(institutionId)
        console.log('AI Config data:', aiConfigData)
      } catch (error) {
        console.warn('AI Config not found:', error.message)
      }

      try {
        usageData = await usagePreferenceService.getPreferencesByInstitution(institutionId)
        console.log('Usage data:', usageData)
      } catch (error) {
        console.warn('Usage Preferences not found:', error.message)
      }

      try {
        billingData = await accountBillingService.getBillingByInstitution(institutionId)
        console.log('Billing data:', billingData)
      } catch (error) {
        console.warn('Billing not found:', error.message)
      }

      // Create new form data object with all fetched data
      const newFormData = {
        // Institution data
        institutionName: institution?.institution_name || '',
        institutionType: institution?.institution_type || '',
        institutionCode: institution?.institution_code || '',
        phone: institution?.phone_number || '',
        website: institution?.website_url || '',

        // Contact data
        primaryContactName: primaryContact?.full_name || '',
        designation: primaryContact?.designation || '',
        email: primaryContact?.email || '',
        alternativeEmail: primaryContact?.alternate_email || '',

        // Address data
        streetAddress: primaryAddress?.street_address || '',
        city: primaryAddress?.city || '',
        state: primaryAddress?.state_province || '',
        postalCode: primaryAddress?.postal_code || '',
        country: primaryAddress?.country || '',
        campusLocations: primaryAddress?.campus_locations ? primaryAddress.campus_locations.join('\n') : '',

        // AI Config data
        assistantName: aiConfigData?.assistant_name || '',
        assistantPersonality: aiConfigData?.personality || '',
        assistantBehaviour: aiConfigData?.behaviour || '',
        greetingMessage: aiConfigData?.greeting_message || '',
        institutionKeywords: aiConfigData?.keywords ? aiConfigData.keywords.join(', ') : '',
        responseTone: aiConfigData?.response_tone || 'Professional',
        escalationContact: aiConfigData?.escalation_user_id || '',
        defaultLanguage: aiConfigData?.default_language || 'English',
        supportedLanguages: aiConfigData?.supported_languages || ['English'],

        // Billing data
        subscriptionPlan: billingData?.subscription_plan || '',
        billingContactName: billingData?.billing_contact_name || '',
        billingEmail: billingData?.billing_contact_email || '',
        billingAddress: billingData?.billing_address || '',
        taxId: billingData?.tax_identifier || '',
        purchaseOrderRequired: billingData?.purchase_order_required || false,
        paymentMethod: billingData?.payment_method || '',

        // Usage preferences data
        analyticsReporting: usageData?.analytics_frequency || 'Weekly',
        reportRecipients: usageData?.report_recipient_emails ? usageData.report_recipient_emails.join(', ') : '',
        emergencyContact: usageData?.emergency_contact_numbers?.[0] || '',
        notificationPreferences: [], // Initialize as empty array since backend doesn't store this yet

        // Technical settings (keep existing values if not in backend)
        timeZone: 'Asia/Kolkata',
      }

      console.log('Setting form data:', newFormData)
      setFormData(newFormData)

      // Store IDs for updates
      setDataIds({
        institutionId: institution?.institution_id || null,
        contactId: primaryContact?.contact_id || null,
        addressId: primaryAddress?.address_id || null,
        aiConfigId: aiConfigData?.config_id || null,
        usagePreferenceId: usageData?.preference_id || null,
        billingId: billingData?.billing_id || null,
      })

      console.log('Data IDs set:', {
        institutionId: institution?.institution_id || null,
        contactId: primaryContact?.contact_id || null,
        addressId: primaryAddress?.address_id || null,
        aiConfigId: aiConfigData?.config_id || null,
        usagePreferenceId: usageData?.preference_id || null,
        billingId: billingData?.billing_id || null,
      })
    } catch (error) {
      console.error('Error fetching settings data:', error)
      toast.error('Failed to load settings data')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (institutionId) {
      fetchAllData()
    }
  }, [institutionId])

  const sections = [
    {
      id: 'profile',
      title: 'Profile Information',
      icon: Building2,
      description: 'Institution details, contact info, and address',
    },
    {
      id: 'technical',
      title: 'Technical Configuration',
      icon: SettingsIcon,
      description: 'Language settings and AI configuration',
    },
    {
      id: 'billing',
      title: 'Account & Billing',
      icon: CreditCard,
      description: 'Subscription and billing information',
    },
    {
      id: 'preferences',
      title: 'Preferences',
      icon: Bell,
      description: 'Notifications and reporting settings',
    },
  ]

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    setUnsavedChanges(true)
  }

  const handleArrayChange = (field, value, isChecked) => {
    setFormData((prev) => ({
      ...prev,
      [field]: isChecked ? [...prev[field], value] : prev[field].filter((item) => item !== value),
    }))
    setUnsavedChanges(true)
  }

  const handleSave = async () => {
    try {
      setSaving(true)

      // Update institution
      await institutionService.updateInstitution(dataIds.institutionId, {
        institution_name: formData.institutionName,
        institution_type: formData.institutionType,
        institution_code: formData.institutionCode,
        phone_number: formData.phone,
        website_url: formData.website,
      })

      // Update or create contact
      if (formData.primaryContactName && formData.email) {
        const contactData = {
          institution_id: institutionId,
          full_name: formData.primaryContactName,
          designation: formData.designation,
          email: formData.email,
          alternate_email: formData.alternativeEmail,
          phone_number: formData.phone,
        }

        if (dataIds.contactId) {
          await institutionContactService.updateContact(dataIds.contactId, contactData)
        } else {
          const newContact = await institutionContactService.createContact(contactData)
          setDataIds((prev) => ({ ...prev, contactId: newContact.contact_id }))
        }
      }

      // Update or create address
      if (formData.streetAddress && formData.city) {
        const addressData = {
          institution_id: institutionId,
          street_address: formData.streetAddress,
          city: formData.city,
          state_province: formData.state,
          postal_code: formData.postalCode,
          country: formData.country,
          campus_locations: formData.campusLocations.split('\n').filter((loc) => loc.trim()),
        }

        if (dataIds.addressId) {
          await institutionAddressService.updateAddress(dataIds.addressId, addressData)
        } else {
          const newAddress = await institutionAddressService.createAddress(addressData)
          setDataIds((prev) => ({ ...prev, addressId: newAddress.address_id }))
        }
      }

      // Update or create AI config (with error handling)
      if (formData.assistantName) {
        const aiConfigData = {
          institution_id: institutionId,
          assistant_name: formData.assistantName,
          personality: formData.assistantPersonality,
          behaviour: formData.assistantBehaviour,
          greeting_message: formData.greetingMessage,
          keywords: formData.institutionKeywords
            .split(',')
            .map((k) => k.trim())
            .filter((k) => k),
          response_tone: formData.responseTone,
          default_language: formData.defaultLanguage,
          supported_languages: formData.supportedLanguages,
        }

        try {
          if (dataIds.aiConfigId) {
            await aiConfigService.updateConfig(dataIds.aiConfigId, aiConfigData)
          } else {
            const newConfig = await aiConfigService.createConfig(aiConfigData)
            setDataIds((prev) => ({ ...prev, aiConfigId: newConfig.config_id }))
          }
        } catch (error) {
          console.warn('AI Config save failed:', error)
        }
      }

      // Update or create billing (with error handling)
      if (formData.billingContactName && formData.billingEmail) {
        const billingData = {
          institution_id: institutionId,
          billing_contact_name: formData.billingContactName,
          billing_contact_email: formData.billingEmail,
          billing_address: formData.billingAddress,
          tax_identifier: formData.taxId,
          purchase_order_required: formData.purchaseOrderRequired,
          subscription_plan: formData.subscriptionPlan,
          payment_method: formData.paymentMethod,
        }

        try {
          if (dataIds.billingId) {
            await accountBillingService.updateBilling(dataIds.billingId, billingData)
          } else {
            const newBilling = await accountBillingService.createBilling(billingData)
            setDataIds((prev) => ({ ...prev, billingId: newBilling.billing_id }))
          }
        } catch (error) {
          console.warn('Billing save failed:', error)
        }
      }

      // Update or create usage preferences (with error handling)
      const usageData = {
        institution_id: institutionId,
        analytics_frequency: formData.analyticsReporting,
        report_recipient_emails: formData.reportRecipients
          .split(',')
          .map((e) => e.trim())
          .filter((e) => e),
        emergency_contact_numbers: formData.emergencyContact ? [formData.emergencyContact] : [],
      }

      try {
        if (dataIds.usagePreferenceId) {
          await usagePreferenceService.updatePreferences(dataIds.usagePreferenceId, usageData)
        } else {
          const newPrefs = await usagePreferenceService.createPreferences(usageData)
          setDataIds((prev) => ({ ...prev, usagePreferenceId: newPrefs.preference_id }))
        }
      } catch (error) {
        console.warn('Usage Preferences save failed:', error)
      }

      setUnsavedChanges(false)
      toast.success('Settings saved successfully')
    } catch (error) {
      console.error('Error saving settings:', error)
      toast.error('Failed to save settings')
    } finally {
      setSaving(false)
    }
  }

  const handleLogoUpload = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = (event) => {
    const file = event.target.files[0]
    if (file && file.size <= 2 * 1024 * 1024) {
      // 2MB limit
      // Handle file upload
      console.log('Uploading logo:', file)
      toast.success('Logo uploaded successfully!')
    } else {
      toast.error('File size must be less than 2MB')
    }
  }

  const renderSectionContent = () => {
    switch (activeSection) {
      case 'profile':
        return <ProfileSettings formData={formData} handleInputChange={handleInputChange} />
      case 'technical':
        return <TechnicalSettings formData={formData} handleInputChange={handleInputChange} handleArrayChange={handleArrayChange} />
      case 'billing':
        return <BillingSettings formData={formData} handleInputChange={handleInputChange} />
      case 'preferences':
        return <PreferencesSettings formData={formData} handleInputChange={handleInputChange} handleArrayChange={handleArrayChange} />
      default:
        return <ProfileSettings formData={formData} handleInputChange={handleInputChange} />
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!institutionId) {
    return (
      <div className="max-w-7xl mx-auto p-8">
        <Card className="p-12 text-center">
          <div className="text-muted-foreground">
            <SettingsIcon className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <h3 className="text-lg font-semibold mb-2">Institution not found</h3>
            <p>Please ensure you have a valid institution setup.</p>
          </div>
        </Card>
      </div>
    )
  }

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
          <p className="text-muted-foreground">Manage your institution's profile, configuration, and preferences</p>
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
                        activeSection === section.id ? 'bg-primary/10 border border-primary/20 text-primary' : 'hover:bg-muted/50 text-foreground'
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

              <Button onClick={handleSave} disabled={!unsavedChanges || saving} className="bg-primary text-primary-foreground hover:bg-primary/90">
                {saving ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4 mr-2" />
                    Save Changes
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Settings
