# Alhayat Smart E-commerce Platform

[![Angular Version](https://img.shields.io/badge/Angular-8.1.0-red.svg)](https://angular.io/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

An e-commerce platform built with Angular 8, featuring product catalog, shopping cart, user authentication, and order management.

## 🚀 Getting Started

### Prerequisites

- Node.js 14.x or 16.x (LTS version recommended)
- npm 6.x or higher
- Angular CLI 8.1.0

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/alhayat-smart-angular.git
   cd alhayat-smart-angular
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   - Copy `.env.example` to `.env`
   - Update the environment variables in `src/environments/environment.ts`

4. **Run the development server**
   ```bash
   npm start
   ```
   The app will be available at `http://localhost:4200`

## 🛠 Project Structure

```
src/
├── app/
│   ├── components/     # Reusable components
│   ├── services/       # Application services
│   ├── models/         # TypeScript interfaces/models
│   ├── guards/         # Route guards
│   └── shared/         # Shared modules and components
├── assets/            # Static assets
└── environments/      # Environment configurations
```

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
API_URL=https://cp.alhayatsmart.com/api/
FB_APP_ID=your_facebook_app_id
GOOGLE_ANALYTICS_ID=your_ga_id
```

## 🚀 Deployment

### Production Build

```bash
ng build --prod
```

The build artifacts will be stored in the `dist/` directory.

### Docker Support

Build the Docker image:
```bash
docker build -t alhayat-smart .
```

Run the container:
```bash
docker run -p 80:80 alhayat-smart
```

## 🤝 Contributing

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Angular](https://angular.io/)
- [Bootstrap](https://getbootstrap.com/)
- [ngx-spinner](https://github.com/Napster2210/ngx-spinner)
- And all other open-source libraries used in this project
