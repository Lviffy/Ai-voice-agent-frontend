import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { Input } from '../ui/input'
import { Switch } from '../ui/switch'
import { Bot, Globe } from 'lucide-react'

const TechnicalSettings = ({ formData, handleInputChange, handleArrayChange }) => {
  return (
    <div className="space-y-8">
      {/* AI Assistant Configuration */}
      <Card className="border-border/30 bg-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-foreground">
            <Bot className="w-5 h-5 text-primary" />
            AI Assistant Configuration
          </CardTitle>
          <CardDescription className="text-muted-foreground">Customize your AI voice assistant's behavior and responses</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Assistant Personality</label>
            <textarea
              value={formData.assistantPersonality}
              onChange={(e) => handleInputChange('assistantPersonality', e.target.value)}
              placeholder="Describe the personality traits of your AI assistant (e.g., helpful, knowledgeable, empathetic)"
              className="w-full px-3 py-2 bg-background border border-border/30 rounded-md text-foreground focus:ring-2 focus:ring-primary/20 focus:border-primary/30 resize-none"
              rows={3}
            />
            <p className="text-xs text-muted-foreground mt-1">Define how your AI assistant should present itself in terms of personality and character traits.</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Assistant Behaviour</label>
            <textarea
              value={formData.assistantBehaviour}
              onChange={(e) => handleInputChange('assistantBehaviour', e.target.value)}
              placeholder="Describe how your AI assistant should behave in conversations (e.g., greeting style, response approach, interaction patterns)"
              className="w-full px-3 py-2 bg-background border border-border/30 rounded-md text-foreground focus:ring-2 focus:ring-primary/20 focus:border-primary/30 resize-none"
              rows={3}
            />
            <p className="text-xs text-muted-foreground mt-1">Specify behavioral patterns and interaction styles for consistent user experiences.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Assistant Name</label>
              <Input
                value={formData.assistantName}
                onChange={(e) => handleInputChange('assistantName', e.target.value)}
                placeholder="SRMU Assistant, Campus Helper"
                className="bg-background border-border/30 text-foreground"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Response Tone</label>
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
            <label className="block text-sm font-medium text-foreground mb-2">Greeting Message</label>
            <textarea
              value={formData.greetingMessage}
              onChange={(e) => handleInputChange('greetingMessage', e.target.value)}
              placeholder="Welcome message for users"
              className="w-full px-3 py-2 bg-background border border-border/30 rounded-md text-foreground focus:ring-2 focus:ring-primary/20 focus:border-primary/30 resize-none"
              rows={3}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Institution-Specific Keywords</label>
            <textarea
              value={formData.institutionKeywords}
              onChange={(e) => handleInputChange('institutionKeywords', e.target.value)}
              placeholder="Keywords for better recognition (comma-separated)"
              className="w-full px-3 py-2 bg-background border border-border/30 rounded-md text-foreground focus:ring-2 focus:ring-primary/20 focus:border-primary/30 resize-none"
              rows={2}
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
          <CardDescription className="text-muted-foreground">Configure language support for your AI assistant</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Default Language *</label>
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
              <label className="block text-sm font-medium text-foreground mb-2">Time Zone *</label>
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
            <label className="block text-sm font-medium text-foreground mb-3">Supported Languages * (minimum 2)</label>
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
        </CardContent>
      </Card>
    </div>
  )
}

export default TechnicalSettings
