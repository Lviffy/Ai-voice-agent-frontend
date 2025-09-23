import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { Input } from '../ui/input'
import { Bell } from 'lucide-react'

const PreferencesSettings = ({ formData, handleInputChange, handleArrayChange }) => {
  return (
    <div className="space-y-8">
      <Card className="border-border/30 bg-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-foreground">
            <Bell className="w-5 h-5 text-primary" />
            Usage Preferences
          </CardTitle>
          <CardDescription className="text-muted-foreground">Configure notifications, reporting, and system preferences</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Analytics Reporting Frequency</label>
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
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Report Recipients</label>
            <textarea
              value={formData.reportRecipients}
              onChange={(e) => handleInputChange('reportRecipients', e.target.value)}
              placeholder="Email addresses for reports (comma-separated)"
              className="w-full px-3 py-2 bg-background border border-border/30 rounded-md text-foreground focus:ring-2 focus:ring-primary/20 focus:border-primary/30 resize-none"
              rows={2}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Emergency Contact</label>
            <Input
              value={formData.emergencyContact}
              onChange={(e) => handleInputChange('emergencyContact', e.target.value)}
              placeholder="24/7 emergency contact number"
              className="bg-background border-border/30 text-foreground"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default PreferencesSettings
