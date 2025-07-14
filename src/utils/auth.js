export const hashPassword = (password) => {
  return btoa(password + "salt123") // Base64 encoding as mock hash
}

export const verifyPassword = (password, hashedPassword) => {
  return hashPassword(password) === hashedPassword
}

export const generateToken = (user) => {
  return btoa(JSON.stringify({ id: user.id, email: user.email, timestamp: Date.now() }))
}

export const validateToken = (token) => {
  try {
    const decoded = JSON.parse(atob(token))
    // In a real app, you'd check expiration, signature, etc.
    return decoded && decoded.id && decoded.email
  } catch {
    return false
  }
}
