export const formatPrice = (price) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(price)
}

export const formatDate = (dateString) => {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(dateString))
}

export const calculateDiscount = (originalPrice, currentPrice) => {
  if (!originalPrice || originalPrice <= currentPrice) return 0
  return Math.round(((originalPrice - currentPrice) / originalPrice) * 100)
}

export const generateOrderId = () => {
  return "ORD-" + Date.now() + "-" + Math.random().toString(36).substr(2, 9).toUpperCase()
}
