"use client"

import { forwardRef } from "react"

const Button = forwardRef(
  (
    { children, variant = "primary", size = "md", disabled = false, loading = false, className = "", ...props },
    ref,
  ) => {
    const baseClasses =
      "inline-flex items-center justify-center font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"

    const variants = {
      primary: "bg-pink-600 text-white hover:bg-pink-700 focus:ring-pink-500 shadow-md hover:shadow-lg",
      secondary: "bg-purple-600 text-white hover:bg-purple-700 focus:ring-purple-500 shadow-md hover:shadow-lg",
      outline:
        "border-2 border-pink-600 text-pink-600 bg-white hover:bg-pink-600 hover:text-white focus:ring-pink-500 shadow-sm hover:shadow-md",
      ghost: "text-gray-700 bg-transparent hover:bg-pink-50 focus:ring-pink-500",
      danger: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500 shadow-md hover:shadow-lg",
    }

    const sizes = {
      sm: "px-3 py-1.5 text-sm",
      md: "px-4 py-2 text-sm font-semibold",
      lg: "px-6 py-3 text-base font-semibold",
    }

    const classes = `${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`

    return (
      <button ref={ref} className={classes} disabled={disabled || loading} {...props}>
        {loading && (
          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        )}
        {children}
      </button>
    )
  },
)

Button.displayName = "Button"

export default Button
