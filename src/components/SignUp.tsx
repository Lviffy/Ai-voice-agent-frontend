import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from './ui/form'
import { adminService } from '../services/adminService'
import { Eye, EyeOff, Mail, Lock, Loader2, ArrowLeft, User } from 'lucide-react'
import { useToast } from './toast/toast'

interface SignUpProps {
  onBackToHome: () => void
  onSwitchToLogin: () => void
  onSignUp: (userData: any) => void
}

const SignUp: React.FC<SignUpProps> = ({ onBackToHome, onSwitchToLogin, onSignUp }) => {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const form = useForm({
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  })

  const onSubmit = async (data: any) => {
    setIsLoading(true)
    try {
      if (data.password !== data.confirmPassword) {
        form.setError('confirmPassword', {
          type: 'manual',
          message: 'Passwords do not match',
        })
        setIsLoading(false)
        return
      }

      const response = await adminService.signup({
        first_name: data.firstName,
        last_name: data.lastName,
        email: data.email,
        password: data.password,
      })

      toast.success('Account created successfully!')
      onSignUp(response)
    } catch (error: any) {
      console.error('SignUp error:', error)

      if (error.status === 400) {
        if (error.response?.detail === 'Email already registered') {
          form.setError('email', {
            type: 'manual',
            message: 'This email is already registered. Please use a different email or try logging in.',
          })
        } else {
          toast.error('Invalid information provided. Please check your details.', {
            title: 'Validation Error',
          })
        }
      } else if (error.message === 'Network error: Failed to fetch' || error.status === 0) {
        toast.error('Unable to connect to server. Please check if the backend is running on port 8000.', {
          title: 'Connection Error',
        })
      } else {
        toast.error(error.message || 'Failed to create account. Please try again.', {
          title: 'SignUp Error',
        })
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-md">
        <div className="mb-4">
          <Button variant="ghost" onClick={onBackToHome} className="text-muted-foreground hover:text-foreground">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
        </div>

        <Card className="shadow-lg">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">Create your account</CardTitle>
            <CardDescription className="text-center">Enter your information to get started</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="firstName"
                    rules={{
                      required: 'First name is required',
                      minLength: {
                        value: 2,
                        message: 'First name must be at least 2 characters',
                      },
                    }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>First Name</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                            <Input placeholder="First name" className="pl-10" {...field} />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="lastName"
                    rules={{
                      required: 'Last name is required',
                      minLength: {
                        value: 2,
                        message: 'Last name must be at least 2 characters',
                      },
                    }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Last Name</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                            <Input placeholder="Last name" className="pl-10" {...field} />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="email"
                  rules={{
                    required: 'Email is required',
                    pattern: {
                      value: /^\S+@\S+$/i,
                      message: 'Please enter a valid email address',
                    },
                  }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input placeholder="Enter your email" className="pl-10" type="email" {...field} />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password"
                  rules={{
                    required: 'Password is required',
                    minLength: {
                      value: 8,
                      message: 'Password must be at least 8 characters',
                    },
                  }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input placeholder="Create a password" className="pl-10 pr-10" type={showPassword ? 'text' : 'password'} {...field} />
                          <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-3 h-4 w-4 text-muted-foreground hover:text-foreground transition-colors">
                            {showPassword ? <EyeOff /> : <Eye />}
                          </button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="confirmPassword"
                  rules={{
                    required: 'Please confirm your password',
                  }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirm Password</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input placeholder="Confirm your password" className="pl-10 pr-10" type={showConfirmPassword ? 'text' : 'password'} {...field} />
                          <button
                            type="button"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            className="absolute right-3 top-3 h-4 w-4 text-muted-foreground hover:text-foreground transition-colors"
                          >
                            {showConfirmPassword ? <EyeOff /> : <Eye />}
                          </button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="terms" className="h-4 w-4 rounded border border-gray-300 text-primary focus:ring-2 focus:ring-primary" required />
                  <Label htmlFor="terms" className="text-sm text-muted-foreground">
                    I agree to the{' '}
                    <button type="button" className="text-primary hover:underline">
                      Terms of Service
                    </button>{' '}
                    and{' '}
                    <button type="button" className="text-primary hover:underline">
                      Privacy Policy
                    </button>
                  </Label>
                </div>

                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Creating account...
                    </>
                  ) : (
                    'Create Account'
                  )}
                </Button>
              </form>
            </Form>

            <div className="mt-6 text-center text-sm">
              <span className="text-muted-foreground">Already have an account? </span>
              <button onClick={onSwitchToLogin} className="text-primary hover:underline font-medium">
                Sign in
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default SignUp
