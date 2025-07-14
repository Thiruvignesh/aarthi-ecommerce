# LadyJoy - Women's Fashion Store

A complete frontend-only women's fashion e-commerce web application built with React, featuring modern UI components, state management, and local data persistence.

## 🌟 Features

### Core Functionality
- **Fashion Browsing**: Search, filter, sort, and paginate women's fashion items
- **User Authentication**: Register/login with mock authentication
- **Shopping Cart**: Add/remove items, quantity management, stock validation
- **Wishlist**: Save favorite fashion pieces for later
- **Checkout Process**: Complete order flow with address and payment forms
- **Order Management**: View order history and detailed receipts

### Fashion-Focused Features
- **Curated Collections**: Handpicked fashion items across multiple categories
- **Style Categories**: Dresses, Tops & Blouses, Bottoms, Outerwear, Accessories
- **Fashion Photography**: High-quality product images from Unsplash
- **Trend Tracking**: Featured collections and trending items
- **Style Support**: Fashion-focused customer service messaging

### Technical Features
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **State Management**: Zustand for global state with localStorage persistence
- **Client-side Routing**: Next.js App Router for navigation
- **Mock Data**: Comprehensive fashion catalog and user data
- **Form Validation**: Client-side validation with error handling
- **Print Functionality**: Printable order receipts

## 🛠️ Tech Stack

- **Framework**: Next.js 14 with App Router
- **UI Library**: React 18 with functional components and hooks
- **Styling**: Tailwind CSS with custom fashion-focused components
- **State Management**: Zustand
- **Icons**: Lucide React
- **Data Persistence**: Browser localStorage
- **Authentication**: Mock JWT-style tokens
- **Images**: Unsplash API for high-quality fashion photography

## 📁 Project Structure

\`\`\`
src/
├── components/
│   ├── ui/                 # Reusable UI components
│   │   ├── Button.jsx
│   │   ├── Card.jsx
│   │   ├── Input.jsx
│   │   ├── Modal.jsx
│   │   ├── Navbar.jsx
│   │   └── ProductCard.jsx
│   └── PrivateRoute.jsx    # Route protection component
├── services/
│   ├── mockData.js         # Fashion products and user data
│   └── localStorage.js     # Storage helper functions
├── store/                  # Zustand state slices
│   ├── userSlice.js
│   ├── productSlice.js
│   ├── cartSlice.js
│   ├── wishlistSlice.js
│   └── orderSlice.js
└── utils/                  # Utility functions
    ├── auth.js
    ├── formatters.js
    └── validators.js

app/                        # Next.js App Router pages
├── page.jsx               # Home page
├── products/
│   ├── page.jsx           # Product listing
│   └── [id]/page.jsx      # Product details
├── cart/page.jsx
├── wishlist/page.jsx
├── checkout/page.jsx
├── orders/
│   ├── page.jsx           # Order history
│   └── [id]/page.jsx      # Order details
├── login/page.jsx
├── register/page.jsx
└── layout.jsx
\`\`\`

## 🚀 Getting Started

### Installation

1. **Clone or download the project**
2. **Install dependencies**:
   \`\`\`bash
   npm install
   \`\`\`

3. **Start the development server**:
   \`\`\`bash
   npm run dev
   \`\`\`

4. **Open your browser** and navigate to `http://localhost:3000`

### Demo Credentials

For testing the authentication system:
- **Email**: emma@example.com
- **Password**: password123

## 👗 Fashion Categories

### Product Categories
- **Dresses**: Casual dresses, evening gowns, midi dresses
- **Tops & Blouses**: Silk blouses, cashmere sweaters, t-shirts
- **Bottoms**: High-waisted jeans, pleated skirts, trousers
- **Outerwear**: Leather jackets, trench coats, blazers
- **Accessories**: Designer handbags, statement jewelry, scarves

### Featured Collections
- Trending Now
- New Arrivals
- Best Sellers
- Seasonal Collections

## 💾 Data Management

### Fashion Mock Data
The application comes with pre-populated fashion data including:
- 10 curated fashion products across 5 categories
- Sample user account (Emma Johnson)
- Fashion categories and subcategories
- Shipping methods

### localStorage Persistence
All application data is automatically saved to localStorage:
- User accounts and authentication state
- Shopping cart contents
- Wishlist items
- Order history
- Product inventory updates

## 🎨 Design & Styling

### Color Palette
- **Primary**: Pink to Purple gradient (#ec4899 to #9333ea)
- **Secondary**: Teal accent colors
- **Background**: Soft gradients from pink to purple to indigo

### Fashion-Focused UI
- Elegant product cards with hover effects
- High-quality fashion photography
- Feminine color scheme and typography
- Responsive design optimized for fashion browsing

## 🔧 Customization

### Adding New Fashion Products
Edit `src/services/mockData.js` and add products to the `products` array:

\`\`\`javascript
{
  id: 11,
  name: 'Designer Dress',
  description: 'Elegant designer dress perfect for special occasions',
  price: 199.99,
  originalPrice: 249.99,
  image: 'https://images.unsplash.com/photo-[fashion-image-id]?w=400&h=400&fit=crop',
  categoryId: 1,
  subcategoryId: 1,
  stock: 15,
  rating: 4.8,
  reviews: 89,
  tags: ['designer', 'elegant', 'special-occasion'],
  featured: true
}
\`\`\`

### Image Sources
All product images are sourced from Unsplash with fashion-specific search terms:
- High-quality fashion photography
- Consistent aspect ratios (400x400)
- Professional styling and lighting

## 🛒 E-commerce Features

### Fashion-Specific Features
- Style-focused search and filtering
- Wishlist for fashion inspiration
- Size and color variations (ready for implementation)
- Fashion trend tracking
- Style recommendations

### Shopping Experience
- Elegant product browsing
- Smooth cart and checkout flow
- Fashion-focused messaging and copy
- Mobile-optimized for on-the-go shopping

## 🔄 Converting to Real Backend

To integrate with a real fashion e-commerce backend:

1. **Replace localStorage services** with fashion API calls
2. **Implement real product catalog** with size/color variants
3. **Add inventory management** for fashion items
4. **Integrate payment processing** for fashion purchases
5. **Add user profiles** with style preferences
6. **Implement reviews and ratings** for fashion items

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🤝 Contributing

This is a fashion e-commerce template. Feel free to:
- Customize for your fashion brand
- Add new fashion categories
- Improve the styling and UX
- Add fashion-specific features
- Integrate with fashion APIs

## 📄 License

This project is open source and available under the MIT License.
