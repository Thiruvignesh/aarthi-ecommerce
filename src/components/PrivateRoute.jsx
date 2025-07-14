"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useUserStore } from "../store/userSlice"

const PrivateRoute = ({ children }) => {
  const router = useRouter()
  const { isAuthenticated, initialize } = useUserStore()

  useEffect(() => {
    initialize()
  }, [initialize])

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login")
    }
  }, [isAuthenticated, router])

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Checking authentication...</p>
        </div>
      </div>
    )
  }

  return children
}

export default PrivateRoute
