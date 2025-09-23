import React, { useRef } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Building2, User, MapPin, Upload } from 'lucide-react'
import { useToast } from '../toast/toast'

const ProfileSettings = ({ formData, handleInputChange }) => {
  const fileInputRef = useRef(null)
  const { toast } = useToast()

  const handleLogoUpload = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = (event) => {
    const file = event.target.files[0]
    if (file && file.size <= 2 * 1024 * 1024) {
      console.log('Uploading logo:', file)
      toast.success('Logo uploaded successfully!')
    } else {
      toast.error('File size must be less than 2MB')
    }
  }

  return (
    <div className="space-y-8">
      {/* Institution Details */}
      <Card className="border-border/30 bg-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-foreground">
            <Building2 className="w-5 h-5 text-primary" />
            Institution Details
          </CardTitle>
          <CardDescription className="text-muted-foreground">Basic information about your educational institution</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Institution Name *</label>
              <Input
                value={formData.institutionName}
                onChange={(e) => handleInputChange('institutionName', e.target.value)}
                placeholder="Enter institution name"
                className="bg-background border-border/30 text-foreground"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Institution Type *</label>
              <select
                value={formData.institutionType}
                onChange={(e) => handleInputChange('institutionType', e.target.value)}
                className="w-full px-3 py-2 bg-background border border-border/30 rounded-md text-foreground focus:ring-2 focus:ring-primary/20 focus:border-primary/30"
              >
                <option value="">Select institution type</option>
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
              <label className="block text-sm font-medium text-foreground mb-2">Institution Code/ID</label>
              <Input
                value={formData.institutionCode}
                onChange={(e) => handleInputChange('institutionCode', e.target.value)}
                placeholder="e.g., SRMU001, AICTE-12345"
                className="bg-background border-border/30 text-foreground"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Phone Number *</label>
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
            <label className="block text-sm font-medium text-foreground mb-2">Website URL</label>
            <Input
              value={formData.website}
              onChange={(e) => handleInputChange('website', e.target.value)}
              placeholder="https://www.institution.edu"
              className="bg-background border-border/30 text-foreground"
            />
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
          <CardDescription className="text-muted-foreground">Main point of contact for your institution</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Contact Name *</label>
              <Input
                value={formData.primaryContactName}
                onChange={(e) => handleInputChange('primaryContactName', e.target.value)}
                placeholder="Dr. Rajesh Kumar"
                className="bg-background border-border/30 text-foreground"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Designation/Title *</label>
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
              <label className="block text-sm font-medium text-foreground mb-2">Email Address *</label>
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
              <label className="block text-sm font-medium text-foreground mb-2">Alternative Email</label>
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
          <CardDescription className="text-muted-foreground">Complete address and location details</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Street Address *</label>
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
              <label className="block text-sm font-medium text-foreground mb-2">City *</label>
              <Input value={formData.city} onChange={(e) => handleInputChange('city', e.target.value)} placeholder="City name" className="bg-background border-border/30 text-foreground" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">State/Province *</label>
              <Input
                value={formData.state}
                onChange={(e) => handleInputChange('state', e.target.value)}
                placeholder="State or province"
                className="bg-background border-border/30 text-foreground"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Postal Code *</label>
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
            <label className="block text-sm font-medium text-foreground mb-2">Country *</label>
            <select
              value={formData.country}
              onChange={(e) => handleInputChange('country', e.target.value)}
              className="w-full px-3 py-2 bg-background border border-border/30 rounded-md text-foreground focus:ring-2 focus:ring-primary/20 focus:border-primary/30"
              required
            >
              <option value="">Select country</option>
              <option value="India">India</option>
              <option value="United States">United States</option>
              <option value="United Kingdom">United Kingdom</option>
              <option value="Canada">Canada</option>
              <option value="Australia">Australia</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Campus Locations</label>
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
  )
}

export default ProfileSettings
