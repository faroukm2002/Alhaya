# Alhayat Smart - Next.js E-commerce Platform

A modern, fully-featured e-commerce platform built with Next.js 14, TypeScript, and Tailwind CSS. This project is a complete migration from Angular to Next.js App Router, maintaining all original functionality while adding modern web standards and optimizations.

## 🚀 Features

- **Modern Stack**: Next.js 14 with App Router, TypeScript, Tailwind CSS
- **Internationalization**: Full RTL/LTR support for English and Arabic
- **E-commerce Features**: Product catalog, shopping cart, user authentication, order management
- **Smart Home Focus**: Specialized for smart home devices and IoT products
- **SEO Optimized**: Complete metadata, sitemap, and OpenGraph implementation
- **Responsive Design**: Mobile-first approach with modern UI/UX
- **Performance**: Optimized images, lazy loading, and efficient data fetching

## 🛠 Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Internationalization**: next-intl
- **State Management**: React Context API
- **HTTP Client**: Axios
- **Forms**: React Hook Form
- **Carousel**: Swiper.js
- **Icons**: Font Awesome
- **Deployment**: Vercel-ready

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── [locale]/          # Internationalized routes
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   ├── sitemap.ts         # Dynamic sitemap
│   └── robots.ts          # SEO robots.txt
├── components/            # Reusable components
│   ├── layout/           # Layout components (Navbar, Footer)
│   ├── pages/            # Page-specific components
│   └── ui/               # UI components
├── contexts/             # React Context providers
├── lib/                  # Utilities and API client
├── types/                # TypeScript type definitions
├── i18n.ts              # Internationalization config
└── middleware.ts         # Next.js middleware
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd alhayat-smart-nextjs
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Environment Setup**
   Create a `.env.local` file in the root directory:
   ```env
   API_URL=https://cp.alhayatsmart.com/api/
   FB_APP_ID=your_facebook_app_id
   GOOGLE_ANALYTICS_ID=your_google_analytics_id
   ```

4. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🌐 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking

## 🌍 Internationalization

The application supports both English and Arabic with full RTL support:

- **English**: `/en` or default route
- **Arabic**: `/ar` with RTL layout

Language files are located in the `messages/` directory.

## 📱 Key Features

### User Authentication
- Login/Register with email and password
- Facebook social login integration
- User profile management
- Protected routes

### Product Catalog
- Advanced product filtering and search
- Category-based navigation
- Product details with image galleries
- Price range filtering
- Brand filtering

### Shopping Cart
- Add/remove products
- Quantity management
- Persistent cart state
- Checkout process

### Smart Home Solutions
- Interactive quotation system
- Room-by-room customization
- Feature selection
- Cost calculation

### Responsive Design
- Mobile-first approach
- Touch-friendly interface
- Optimized for all screen sizes

## 🎨 Styling

The project uses Tailwind CSS with custom configurations:

- **Custom Colors**: Primary (#01B0FF), Secondary (#015880), Accent (#E80057)
- **Custom Fonts**: Raleway family, Arabic fonts support
- **RTL Support**: Full right-to-left layout support
- **Component Library**: Reusable UI components

## 🔧 API Integration

All API calls are centralized in `src/lib/api-client.ts`:

- Product management
- User authentication
- Shopping cart operations
- Order processing
- Content management

## 📈 SEO & Performance

- **Metadata**: Dynamic meta tags for all pages
- **OpenGraph**: Social media optimization
- **Sitemap**: Automatic sitemap generation
- **Robots.txt**: Search engine directives
- **Image Optimization**: Next.js Image component
- **Code Splitting**: Automatic route-based splitting

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Configure environment variables
4. Deploy automatically

### Manual Deployment

1. Build the application:
   ```bash
   npm run build
   ```

2. Start the production server:
   ```bash
   npm start
   ```

## 🔒 Environment Variables

Required environment variables:

```env
API_URL=https://cp.alhayatsmart.com/api/
FB_APP_ID=your_facebook_app_id
GOOGLE_ANALYTICS_ID=your_google_analytics_id
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Original Angular project structure and design
- Next.js team for the amazing framework
- Tailwind CSS for the utility-first CSS framework
- All open-source libraries used in this project

## 📞 Support

For support and questions:
- Email: contactus@alhayatsmart.com
- Phone: +20 120 656 9999

---

**Built with ❤️ using Next.js 14 and TypeScript**