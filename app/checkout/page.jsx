"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { CreditCard, MapPin, Truck } from "lucide-react"
import { useCartStore } from "../../src/store/cartSlice"
import { useUserStore } from "../../src/store/userSlice"
import { useOrderStore } from "../../src/store/orderSlice"
import { useProductStore } from "../../src/store/productSlice"
import { shippingMethods } from "../../src/services/mockData"
import { formatPrice } from "../../src/utils/formatters"
import { validateForm } from "../../src/utils/validators"
import Button from "../../src/components/ui/Button"
import Input from "../../src/components/ui/Input"
import { Card, CardContent, CardHeader } from "../../src/components/ui/Card"
import PrivateRoute from "../../src/components/PrivateRoute"

function CheckoutPageContent() {
  const router = useRouter()
  const { items, getCartSummary, clearCart } = useCartStore()
  const { currentUser } = useUserStore()
  const { createOrder } = useOrderStore()
  const { updateProductStock } = useProductStore()

  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState({})
  const [selectedShipping, setSelectedShipping] = useState(shippingMethods[0])
  const [discountCode, setDiscountCode] = useState("")
  const [discountApplied, setDiscountApplied] = useState(null)

  const [formData, setFormData] = useState({
    // Billing Address
    billingFirstName: currentUser?.name?.split(" ")[0] || "",
    billingLastName: currentUser?.name?.split(" ")[1] || "",
    billingEmail: currentUser?.email || "",
    billingPhone: currentUser?.phone || "",
    billingAddress: "",
    billingCity: "",
    billingState: "",
    billingZip: "",
    billingCountry: "US",

    // Shipping Address
    sameAsbilling: true,
    shippingFirstName: "",
    shippingLastName: "",
    shippingAddress: "",
    shippingCity: "",
    shippingState: "",
    shippingZip: "",
    shippingCountry: "US",

    // Payment
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardName: "",
  })

  const cartSummary = getCartSummary()
  const shippingCost = selectedShipping.price
  const discountAmount = discountApplied ? cartSummary.subtotal * 0.1 : 0 // 10% discount
  const finalTotal = cartSummary.total + shippingCost - discountAmount

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: null }))
    }
  }

  const handleApplyDiscount = () => {
    if (discountCode.toUpperCase() === "SAVE10") {
      setDiscountApplied({ code: "SAVE10", amount: 0.1 })
    } else {
      setErrors((prev) => ({ ...prev, discountCode: "Invalid discount code" }))
    }
  }

  const validateCheckoutForm = () => {
    const rules = {
      billingFirstName: { required: true },
      billingLastName: { required: true },
      billingEmail: { required: true, email: true },
      billingPhone: { required: true, phone: true },
      billingAddress: { required: true },
      billingCity: { required: true },
      billingState: { required: true },
      billingZip: { required: true },
      cardNumber: { required: true, minLength: 16 },
      expiryDate: { required: true },
      cvv: { required: true, minLength: 3 },
      cardName: { required: true },
    }

    if (!formData.sameAsBinding) {
      rules.shippingFirstName = { required: true }
      rules.shippingLastName = { required: true }
      rules.shippingAddress = { required: true }
      rules.shippingCity = { required: true }
      rules.shippingState = { required: true }
      rules.shippingZip = { required: true }
    }

    return validateForm(formData, rules)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    const validationErrors = validateCheckoutForm()
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      setLoading(false)
      return
    }

    try {
      // Create order
      const orderData = {
        userId: currentUser.id,
        items: items.map((item) => ({
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          image: item.image,
        })),
        subtotal: cartSummary.subtotal,
        tax: cartSummary.tax,
        shippingCost,
        discountAmount,
        total: finalTotal,
        billingAddress: {
          firstName: formData.billingFirstName,
          lastName: formData.billingLastName,
          email: formData.billingEmail,
          phone: formData.billingPhone,
          address: formData.billingAddress,
          city: formData.billingCity,
          state: formData.billingState,
          zip: formData.billingZip,
          country: formData.billingCountry,
        },
        shippingAddress: formData.sameAsBinding
          ? {
              firstName: formData.billingFirstName,
              lastName: formData.billingLastName,
              address: formData.billingAddress,
              city: formData.billingCity,
              state: formData.billingState,
              zip: formData.billingZip,
              country: formData.billingCountry,
            }
          : {
              firstName: formData.shippingFirstName,
              lastName: formData.shippingLastName,
              address: formData.shippingAddress,
              city: formData.shippingCity,
              state: formData.shippingState,
              zip: formData.shippingZip,
              country: formData.shippingCountry,
            },
        shippingMethod: selectedShipping,
        paymentMethod: {
          type: "credit_card",
          last4: formData.cardNumber.slice(-4),
        },
      }

      const order = createOrder(orderData)

      // Update product stock
      items.forEach((item) => {
        updateProductStock(item.id, item.stock - item.quantity)
      })

      // Clear cart
      clearCart()

      // Redirect to order confirmation
      router.push(`/orders/${order.id}`)
    } catch (error) {
      console.error("Checkout error:", error)
      setErrors({ submit: "Failed to process order. Please try again." })
    } finally {
      setLoading(false)
    }
  }

  if (items.length === 0) {
    router.push("/cart")
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Checkout Form */}
            <div className="lg:col-span-2 space-y-8">
              {/* Billing Address */}
              <Card>
                <CardHeader>
                  <div className="flex items-center space-x-2">
                    <MapPin className="h-5 w-5 text-primary-600" />
                    <h2 className="text-lg font-semibold">Billing Address</h2>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input
                      label="First Name"
                      value={formData.billingFirstName}
                      onChange={(e) => handleInputChange("billingFirstName", e.target.value)}
                      error={errors.billingFirstName}
                      required
                    />
                    <Input
                      label="Last Name"
                      value={formData.billingLastName}
                      onChange={(e) => handleInputChange("billingLastName", e.target.value)}
                      error={errors.billingLastName}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input
                      label="Email"
                      type="email"
                      value={formData.billingEmail}
                      onChange={(e) => handleInputChange("billingEmail", e.target.value)}
                      error={errors.billingEmail}
                      required
                    />
                    <Input
                      label="Phone"
                      value={formData.billingPhone}
                      onChange={(e) => handleInputChange("billingPhone", e.target.value)}
                      error={errors.billingPhone}
                      required
                    />
                  </div>

                  <Input
                    label="Address"
                    value={formData.billingAddress}
                    onChange={(e) => handleInputChange("billingAddress", e.target.value)}
                    error={errors.billingAddress}
                    required
                  />

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <Input
                      label="City"
                      value={formData.billingCity}
                      onChange={(e) => handleInputChange("billingCity", e.target.value)}
                      error={errors.billingCity}
                      required
                    />
                    <Input
                      label="State"
                      value={formData.billingState}
                      onChange={(e) => handleInputChange("billingState", e.target.value)}
                      error={errors.billingState}
                      required
                    />
                    <Input
                      label="ZIP Code"
                      value={formData.billingZip}
                      onChange={(e) => handleInputChange("billingZip", e.target.value)}
                      error={errors.billingZip}
                      required
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Shipping Address */}
              <Card>
                <CardHeader>
                  <div className="flex items-center space-x-2">
                    <Truck className="h-5 w-5 text-primary-600" />
                    <h2 className="text-lg font-semibold">Shipping Address</h2>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={formData.sameAsBinding}
                      onChange={(e) => handleInputChange("sameAsBinding", e.target.checked)}
                      className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                    />
                    <span className="text-sm text-gray-700">Same as billing address</span>
                  </label>

                  {!formData.sameAsBinding && (
                    <>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <Input
                          label="First Name"
                          value={formData.shippingFirstName}
                          onChange={(e) => handleInputChange("shippingFirstName", e.target.value)}
                          error={errors.shippingFirstName}
                          required
                        />
                        <Input
                          label="Last Name"
                          value={formData.shippingLastName}
                          onChange={(e) => handleInputChange("shippingLastName", e.target.value)}
                          error={errors.shippingLastName}
                          required
                        />
                      </div>

                      <Input
                        label="Address"
                        value={formData.shippingAddress}
                        onChange={(e) => handleInputChange("shippingAddress", e.target.value)}
                        error={errors.shippingAddress}
                        required
                      />

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <Input
                          label="City"
                          value={formData.shippingCity}
                          onChange={(e) => handleInputChange("shippingCity", e.target.value)}
                          error={errors.shippingCity}
                          required
                        />
                        <Input
                          label="State"
                          value={formData.shippingState}
                          onChange={(e) => handleInputChange("shippingState", e.target.value)}
                          error={errors.shippingState}
                          required
                        />
                        <Input
                          label="ZIP Code"
                          value={formData.shippingZip}
                          onChange={(e) => handleInputChange("shippingZip", e.target.value)}
                          error={errors.shippingZip}
                          required
                        />
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>

              {/* Shipping Method */}
              <Card>
                <CardHeader>
                  <h2 className="text-lg font-semibold">Shipping Method</h2>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {shippingMethods.map((method) => (
                      <label
                        key={method.id}
                        className={`flex items-center justify-between p-4 border rounded-lg cursor-pointer transition-colors ${
                          selectedShipping.id === method.id
                            ? "border-primary-500 bg-primary-50"
                            : "border-gray-200 hover:bg-gray-50"
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          <input
                            type="radio"
                            name="shipping"
                            value={method.id}
                            checked={selectedShipping.id === method.id}
                            onChange={() => setSelectedShipping(method)}
                            className="text-primary-600 focus:ring-primary-500"
                          />
                          <div>
                            <div className="font-medium">{method.name}</div>
                            <div className="text-sm text-gray-600">{method.estimatedDays} business days</div>
                          </div>
                        </div>
                        <div className="font-medium">{formatPrice(method.price)}</div>
                      </label>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Payment Information */}
              <Card>
                <CardHeader>
                  <div className="flex items-center space-x-2">
                    <CreditCard className="h-5 w-5 text-primary-600" />
                    <h2 className="text-lg font-semibold">Payment Information</h2>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Input
                    label="Cardholder Name"
                    value={formData.cardName}
                    onChange={(e) => handleInputChange("cardName", e.target.value)}
                    error={errors.cardName}
                    required
                  />

                  <Input
                    label="Card Number"
                    value={formData.cardNumber}
                    onChange={(e) => handleInputChange("cardNumber", e.target.value.replace(/\D/g, ""))}
                    error={errors.cardNumber}
                    placeholder="1234 5678 9012 3456"
                    maxLength={16}
                    required
                  />

                  <div className="grid grid-cols-2 gap-4">
                    <Input
                      label="Expiry Date"
                      value={formData.expiryDate}
                      onChange={(e) => handleInputChange("expiryDate", e.target.value)}
                      error={errors.expiryDate}
                      placeholder="MM/YY"
                      maxLength={5}
                      required
                    />
                    <Input
                      label="CVV"
                      value={formData.cvv}
                      onChange={(e) => handleInputChange("cvv", e.target.value.replace(/\D/g, ""))}
                      error={errors.cvv}
                      placeholder="123"
                      maxLength={4}
                      required
                    />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <Card className="sticky top-8">
                <CardHeader>
                  <h2 className="text-lg font-semibold">Order Summary</h2>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Order Items */}
                  <div className="space-y-3">
                    {items.map((item) => (
                      <div key={item.id} className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center text-xs">
                          {item.quantity}x
                        </div>
                        <div className="flex-1">
                          <div className="text-sm font-medium line-clamp-1">{item.name}</div>
                          <div className="text-sm text-gray-600">{formatPrice(item.price)}</div>
                        </div>
                        <div className="text-sm font-medium">{formatPrice(item.price * item.quantity)}</div>
                      </div>
                    ))}
                  </div>

                  <div className="border-t pt-4 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Subtotal</span>
                      <span>{formatPrice(cartSummary.subtotal)}</span>
                    </div>

                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Tax</span>
                      <span>{formatPrice(cartSummary.tax)}</span>
                    </div>

                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Shipping</span>
                      <span>{formatPrice(shippingCost)}</span>
                    </div>

                    {discountApplied && (
                      <div className="flex justify-between text-sm text-green-600">
                        <span>Discount ({discountApplied.code})</span>
                        <span>-{formatPrice(discountAmount)}</span>
                      </div>
                    )}
                  </div>

                  {/* Discount Code */}
                  <div className="border-t pt-4">
                    <div className="flex space-x-2">
                      <Input
                        placeholder="Discount code"
                        value={discountCode}
                        onChange={(e) => setDiscountCode(e.target.value)}
                        error={errors.discountCode}
                        className="flex-1"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        onClick={handleApplyDiscount}
                        disabled={!discountCode || discountApplied}
                      >
                        Apply
                      </Button>
                    </div>
                  </div>

                  <div className="border-t pt-4">
                    <div className="flex justify-between text-lg font-semibold">
                      <span>Total</span>
                      <span>{formatPrice(finalTotal)}</span>
                    </div>
                  </div>

                  {errors.submit && (
                    <div className="text-sm text-red-600 bg-red-50 p-3 rounded-lg">{errors.submit}</div>
                  )}

                  <Button type="submit" className="w-full" size="lg" loading={loading} disabled={loading}>
                    {loading ? "Processing..." : `Place Order - ${formatPrice(finalTotal)}`}
                  </Button>

                  <div className="text-xs text-gray-500 text-center">
                    <p>By placing your order, you agree to our Terms of Service and Privacy Policy.</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default function CheckoutPage() {
  return (
    <PrivateRoute>
      <CheckoutPageContent />
    </PrivateRoute>
  )
}
