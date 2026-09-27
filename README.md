ZENJI — Front-End Hiring Assessment
A responsive one-page streetwear storefront created as a front-end hiring assessment for ZENJI.
The project takes inspiration from ZENJI's anime and Japanese streetwear identity while using an original layout and interface design.
Live Demo
Live URL will be added after deployment.
Features
- Responsive one-page storefront
- Mobile-first layout
- Branded hero section
- Product grid with four sample products
- Product size selection
- Add to cart functionality
- Cart drawer
- Increase and decrease item quantity
- Remove items from cart
- Dynamic cart item count
- Automatic subtotal calculation
- Cart persistence using localStorage
- Mobile navigation
- Keyboard-accessible cart interactions
- Escape key support for closing the cart
- Focus management inside the cart
- Responsive desktop, tablet and mobile layouts
- Reduced-motion accessibility support
- Product image loading and fallback states
Tech Stack
- React
- TypeScript
- Vite
- Tailwind CSS
- Lucide React
Project Structure
src/
├── components/
│   ├── cart/
│   │   ├── CartDrawer.tsx
│   │   └── CartItem.tsx
│   ├── home/
│   │   ├── BrandStory.tsx
│   │   ├── FeatureStrip.tsx
│   │   ├── Hero.tsx
│   │   └── ProductGrid.tsx
│   ├── layout/
│   │   ├── AnnouncementBar.tsx
│   │   ├── Footer.tsx
│   │   └── Header.tsx
│   └── product/
│       ├── ProductCard.tsx
│       ├── ProductImage.tsx
│       └── SizeSelector.tsx
├── context/
│   ├── cart-context.ts
│   └── CartContext.tsx
├── data/
│   └── products.ts
├── hooks/
│   └── useCart.ts
├── types/
│   └── product.ts
├── App.tsx
├── index.css
└── main.tsx
Running Locally
npm install
npm run dev
Production checks:
npm run lint
npm run build
npm run preview
Design Approach
The interface uses a dark editorial streetwear aesthetic with bold typography, strong contrast, limited red accents and Japanese-inspired visual elements.
Rather than recreating the existing ZENJI website, the goal was to create an original storefront concept that still feels consistent with the brand's visual direction.
Cart Implementation
The shopping cart is implemented entirely on the client side. Cart state is managed through React Context and persisted to localStorage.
Users can add products with selected sizes, update quantities, remove products and view a dynamically calculated subtotal.
Accessibility
Accessibility considerations include semantic HTML, descriptive image alt text, keyboard-accessible controls, visible focus states, ARIA labels, Escape-key support, cart focus management and reduced-motion preference support.
Assessment Scope
This project is a front-end demonstration only. Real checkout, payment processing, user accounts, authentication, backend APIs, inventory management and order processing are intentionally outside the assessment scope.
Development Notes
Built with React, TypeScript, Vite and Tailwind CSS.
The project was developed as a time-boxed hiring assessment. AI-assisted tools were used during ideation, development support and creation of original demo imagery.
All product data is mock data used solely for demonstration purposes.
Author
Md Mohimul Alam
Front-End Developer
Portfolio: https://mohim-portfolio.netlify.app/
GitHub: https://github.com/Md-Mohimul-Alam