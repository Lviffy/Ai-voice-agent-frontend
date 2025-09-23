import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { Input } from '../ui/input'
import { Switch } from '../ui/switch'
import { CreditCard } from 'lucide-react'

const BillingSettings = ({ formData, handleInputChange }) => {
  return (
    <div className="space-y-8">
      <Card className="border-border/30 bg-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-foreground">
            <CreditCard className="w-5 h-5 text-primary" />
            Account & Billing Information
          </CardTitle>
          <CardDescription className="text-muted-foreground">Subscription details and billing configuration</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Current Plan</label>
              <select
                value={formData.subscriptionPlan}
                onChange={(e) => handleInputChange('subscriptionPlan', e.target.value)}
                className="w-full px-3 py-2 bg-background border border-border/30 rounded-md text-foreground focus:ring-2 focus:ring-primary/20 focus:border-primary/30"
              >
                <option value="">Select plan</option>
                <option value="Free">Free</option>
                <option value="Pro">Pro</option>
                <option value="Enterprise">Enterprise</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Payment Method</label>
              <select
                value={formData.paymentMethod}
                onChange={(e) => handleInputChange('paymentMethod', e.target.value)}
                className="w-full px-3 py-2 bg-background border border-border/30 rounded-md text-foreground focus:ring-2 focus:ring-primary/20 focus:border-primary/30"
              >
                <option value="">Select payment method</option>
                <option value="Card">Credit/Debit Card</option>
                <option value="Bank Transfer">Bank Transfer</option>
                <option value="UPI">UPI</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Billing Contact Name *</label>
              <Input
                value={formData.billingContactName}
                onChange={(e) => handleInputChange('billingContactName', e.target.value)}
                placeholder="Finance Manager"
                className="bg-background border-border/30 text-foreground"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Billing Email *</label>
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
            <label className="block text-sm font-medium text-foreground mb-2">Tax ID/GST Number</label>
            <Input value={formData.taxId} onChange={(e) => handleInputChange('taxId', e.target.value)} placeholder="29AABCS1234C1ZN" className="bg-background border-border/30 text-foreground" />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Billing Address</label>
            <textarea
              value={formData.billingAddress}
              onChange={(e) => handleInputChange('billingAddress', e.target.value)}
              placeholder="Leave empty to use institution address"
              className="w-full px-3 py-2 bg-background border border-border/30 rounded-md text-foreground focus:ring-2 focus:ring-primary/20 focus:border-primary/30 resize-none"
              rows={3}
            />
          </div>
          <div className="flex items-center space-x-3">
            <Switch checked={formData.purchaseOrderRequired} onCheckedChange={(checked) => handleInputChange('purchaseOrderRequired', checked)} />
            <label className="text-sm text-foreground">Purchase Order required for billing</label>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default BillingSettings
