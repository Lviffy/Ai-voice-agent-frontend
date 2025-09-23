import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Building2, ArrowLeft, Loader2, CheckCircle } from 'lucide-react'
import { institutionService } from '../services/institutionService'
import { useToast } from './toast/toast'
import { useInstitution } from '../contexts/InstitutionContext'

const InstitutionSetup = ({ onSetupComplete, onBackToLogin }) => {
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()
  const { adminId, setInstitutionId, setNeedsInstitutionSetup } = useInstitution()

  const form = useForm({
    defaultValues: {
      institution_name: '',
      institution_type: 'University',
      institution_code: '',
      phone_number: '',
      website_url: '',
    },
  })

  // Check if adminId is valid
  const isValidAdminId = adminId && adminId !== 'null' && adminId !== 'undefined' && adminId.trim() !== ''

  const onSubmit = async (data) => {
    if (!isValidAdminId) {
      toast.error('Admin ID not found. Please login again.')
      onBackToLogin()
      return
    }

    setIsLoading(true)
    try {
      const response = await institutionService.setupInstitution(adminId, data)
      setInstitutionId(response.institution_id)
      setNeedsInstitutionSetup(false)
      toast.success('Institution setup completed successfully!')
      onSetupComplete(response)
    } catch (error) {
      if (error.message === 'Network error: Failed to fetch' || error.status === 0) {
        toast.error('Unable to connect to server. Please check if the backend is running on port 8000.', {
          title: 'Connection Error',
        })
      } else {
        toast.error(error.message || 'Failed to setup institution. Please try again.', {
          title: 'Setup Error',
        })
      }
    } finally {
      setIsLoading(false)
    }
  }

  // Show error if no valid admin ID
  if (!isValidAdminId) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background p-4">
        <Card className="w-full max-w-md shadow-lg">
          <CardContent className="p-6 text-center">
            <h3 className="text-lg font-semibold text-foreground mb-2">Session Error</h3>
            <p className="text-muted-foreground mb-4">Your session has expired. Please login again.</p>
            <Button onClick={onBackToLogin}>Back to Login</Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-2xl">
        {/* Back button */}
        <div className="mb-4">
          <Button variant="ghost" onClick={onBackToLogin} className="text-muted-foreground hover:text-foreground">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Login
          </Button>
        </div>

        <Card className="shadow-lg">
          <CardHeader className="space-y-1 text-center">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                <Building2 className="w-8 h-8 text-primary" />
              </div>
            </div>
            <CardTitle className="text-2xl font-bold">Setup Your Institution</CardTitle>
            <CardDescription>Complete your profile by adding your institution details</CardDescription>
          </CardHeader>

          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="institution_name"
                    rules={{
                      required: 'Institution name is required',
                      minLength: {
                        value: 2,
                        message: 'Institution name must be at least 2 characters',
                      },
                    }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Institution Name *</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., Sri Ramaswamy Memorial University" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="institution_type"
                    rules={{
                      required: 'Institution type is required',
                    }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Institution Type *</FormLabel>
                        <FormControl>
                          <select {...field} className="w-full px-3 py-2 bg-background border border-border/30 rounded-md text-foreground focus:ring-2 focus:ring-primary/20 focus:border-primary/30">
                            <option value="University">University</option>
                            <option value="College">College</option>
                            <option value="School">School</option>
                            <option value="Training Institute">Training Institute</option>
                            <option value="Corporate Training Center">Corporate Training Center</option>
                          </select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="institution_code"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Institution Code</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., SRMU001, AICTE-12345" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="phone_number"
                    rules={{
                      required: 'Phone number is required',
                    }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number *</FormLabel>
                        <FormControl>
                          <Input placeholder="+91-98765-43210" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="website_url"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Website URL</FormLabel>
                      <FormControl>
                        <Input placeholder="https://www.institution.edu" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="bg-muted/30 p-4 rounded-lg">
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-primary mt-0.5" />
                    <div>
                      <h4 className="font-medium text-foreground">What happens next?</h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        After setting up your institution, you'll be able to access the full dashboard with analytics, user management, FAQ management, and all other features.
                      </p>
                    </div>
                  </div>
                </div>

                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Setting up institution...
                    </>
                  ) : (
                    'Complete Setup'
                  )}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default InstitutionSetup
