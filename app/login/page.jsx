"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Eye, EyeOff } from "lucide-react"
import { useUserStore } from "../../src/store/userSlice"
import { validateForm } from "../../src/utils/validators"
import Button from "../../src/components/ui/Button"
import Input from "../../src/components/ui/Input"
import { Card, CardContent } from "../../src/components/ui/Card"

export default function LoginPage() {
  const router = useRouter()
  const { login, isAuthenticated, loading, error, clearError } = useUserStore()

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const [errors, setErrors] = useState({})
  const [showPassword, setShowPassword] = useState(false)

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/")
    }
  }, [isAuthenticated, router])

  useEffect(() => {
    if (error) {
      setErrors({ submit: error })
    }
  }, [error])

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: null }))
    }
    if (error) {
      clearError()
      setErrors((prev) => ({ ...prev, submit: null }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const validationRules = {
      email: { required: true, email: true },
      password: { required: true },
    }

    const validationErrors = validateForm(formData, validationRules)
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    const result = await login(formData.email, formData.password)
    if (result.success) {
      router.push("/")
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
            Welcome Back
          </h1>
          <p className="text-gray-600 mt-2">Sign in to your LadyJoy account</p>
        </div>

        <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <Input
                label="Email Address"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                error={errors.email}
                placeholder="Enter your email"
                required
              />

              <div className="relative">
                <Input
                  label="Password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={(e) => handleInputChange("password", e.target.value)}
                  error={errors.password}
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-8 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>

              {errors.submit && <div className="text-sm text-red-600 bg-red-50 p-3 rounded-lg">{errors.submit}</div>}

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white hover:from-pink-600 hover:to-purple-700"
                size="lg"
                loading={loading}
                disabled={loading}
              >
                {loading ? "Signing in..." : "Sign In"}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Don't have an account?{" "}
                <Link href="/register" className="text-pink-600 hover:text-pink-700 font-medium">
                  Join LadyJoy
                </Link>
              </p>
            </div>

            <div className="mt-4 text-center">
              <p className="text-xs text-gray-500">Demo credentials: emma@example.com / password123</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
