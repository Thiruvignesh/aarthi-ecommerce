export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export const validatePhone = (phone) => {
  const phoneRegex = /^\+?[\d\s\-$$$$]{10,}$/
  return phoneRegex.test(phone)
}

export const validatePassword = (password) => {
  return password && password.length >= 6
}

export const validateRequired = (value) => {
  return value && value.toString().trim().length > 0
}

export const validateForm = (formData, rules) => {
  const errors = {}

  Object.keys(rules).forEach((field) => {
    const value = formData[field]
    const fieldRules = rules[field]

    if (fieldRules.required && !validateRequired(value)) {
      errors[field] = `${field} is required`
      return
    }

    if (value && fieldRules.email && !validateEmail(value)) {
      errors[field] = "Invalid email format"
    }

    if (value && fieldRules.phone && !validatePhone(value)) {
      errors[field] = "Invalid phone format"
    }

    if (value && fieldRules.password && !validatePassword(value)) {
      errors[field] = "Password must be at least 6 characters"
    }

    if (value && fieldRules.minLength && value.length < fieldRules.minLength) {
      errors[field] = `Minimum ${fieldRules.minLength} characters required`
    }
  })

  return errors
}
