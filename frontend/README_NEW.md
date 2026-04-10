# ApplyGenie Frontend

A modern, production-ready SaaS frontend for an AI-powered job application assistant. Built with React, TypeScript, and Tailwind CSS.

## 🚀 Features

- **Modern SaaS UI** inspired by Stripe, Linear, Notion, and Vercel
- **Full JWT Authentication** with secure token management
- **Resume Management** - Upload, organize, and manage multiple resumes
- **Job Tracking** - Save and manage job opportunities
- **Beautiful Dashboard** with real-time statistics
- **Responsive Design** - Works perfectly on mobile, tablet, and desktop
- **Smooth Animations** powered by Framer Motion
- **Type-Safe** with full TypeScript support
- **Toast Notifications** for user feedback
- **Loading & Error States** with skeleton loaders

## 🛠️ Tech Stack

- **React 19** - UI library
- **TypeScript** - Type safety
- **Vite** - Fast build tool
- **Tailwind CSS** - Utility-first CSS
- **Framer Motion** - Smooth animations
- **Axios** - HTTP client with JWT interceptors
- **Zustand** - State management
- **React Router** - Client-side routing
- **React Hot Toast** - Notifications

## 📦 Installation

### Prerequisites
- Node.js 18+ and npm/yarn

### Setup

1. **Install dependencies:**
```bash
npm install
```

2. **Create `.env` file:**
```bash
cp .env.example .env
```

3. **Update API endpoint** (if not running locally):
```env
VITE_API_BASE_URL=http://localhost:8080
```

## 🏃 Running the Application

### Development
```bash
npm run dev
```
The app will open at `http://localhost:5173`

### Build
```bash
npm run build
```

### Preview
```bash
npm run preview
```

## 🗂️ Project Structure

```
src/
├── components/           # Reusable UI components
│   └── ui/              # Base UI components (Button, Input, Card, etc.)
├── pages/               # Page components (Landing, Login, Dashboard)
├── layouts/             # Layout wrappers (MainLayout, DashboardLayout)
├── services/            # API service layer
├── store/               # Zustand state management
├── hooks/               # Custom React hooks
├── utils/               # Utility functions
├── constants/           # Constants and configurations
├── types/               # TypeScript type definitions
├── lib/                 # Library helpers
└── App.tsx              # Main app component
```

## 🔐 Authentication Flow

1. **User Registration** - Create account with email/password
2. **Login** - Get JWT tokens (access & refresh)
3. **Token Storage** - Tokens stored in localStorage
4. **Auto-Refresh** - Automatic token refresh on expiry
5. **Protected Routes** - Dashboard requires authentication
6. **Logout** - Clear tokens and redirect to home

## 📱 Pages

### Landing Page
- Hero section with CTA buttons
- Features showcase
- How it works section
- Social proof

### Authentication
- **Login Page** - Email/password authentication
- **Register Page** - Signup with validation
- Beautiful auth UI with gradient backgrounds

### Dashboard
- **Overview Cards** - Stats for resumes, jobs, applications
- **Resume Management** - Upload, view, delete resumes
- **Job Descriptions** - Save and track job opportunities
- **AI Section** - Placeholder for future AI features

## 🎨 Design System

### Colors
- **Primary**: Indigo (#4F46E5)
- **Secondary**: Purple (#6366F1)
- **Success**: Green (#10B981)
- **Danger**: Red (#EF4444)
- **Background**: White/Gray-50

### Components

#### UI Components
- **Button** - With variants (default, secondary, outline, ghost)
- **Input** - Text input with validation
- **Card** - Content container with hover effects
- **Modal** - Dialog for forms and actions
- **Badge** - Status indicators
- **Toast** - Notifications

#### State Components
- **LoadingState** - Skeleton loaders
- **EmptyState** - No content placeholders
- **ErrorState** - Error messages with actions

## 🔌 API Integration

### Endpoints Used

#### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `POST /api/auth/refresh` - Token refresh
- `POST /api/auth/logout` - User logout

#### Resumes
- `GET /api/resumes` - List resumes
- `POST /api/resumes` - Upload new resume
- `DELETE /api/resumes/{id}` - Delete resume

#### Jobs
- `GET /api/jobs` - List saved jobs
- `POST /api/jobs` - Save new job
- `DELETE /api/jobs/{id}` - Delete job

#### Dashboard
- `GET /api/dashboard/stats` - Get dashboard statistics

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Deploy to Vercel
```bash
vercel
```

### Deploy to Netlify
```bash
netlify deploy --prod
```

### Docker Support
A Dockerfile is provided for containerized deployment:
```bash
docker build -t applygenie-frontend .
docker run -p 3000:80 applygenie-frontend
```

## 🔒 Environment Variables

Create a `.env` file based on `.env.example`:

```env
# API Configuration
VITE_API_BASE_URL=http://localhost:8080

# App Configuration
VITE_APP_NAME=ApplyGenie
```

## 🛠️ Development

### Code Quality
```bash
npm run lint
```

### Type Checking
```bash
npm run type-check
```

## 📝 Best Practices

1. **Components** - Keep components small and focused
2. **State** - Use Zustand for global state, hooks for local state
3. **API** - Use service layer for all API calls
4. **Types** - Define types in `src/types/`
5. **Utils** - Extract reusable logic to utils
6. **Naming** - Use descriptive names for files and variables

## 🐛 Troubleshooting

### API Connection Issues
- Verify backend is running on `http://localhost:8080`
- Check `VITE_API_BASE_URL` in `.env`
- Check browser console for CORS errors

### Authentication Issues
- Clear browser localStorage: `localStorage.clear()`
- Check token expiry
- Verify JWT format in requests

### Build Issues
- Delete `node_modules` and run `npm install`
- Clear Vite cache: `rm -rf .vite`
- Check Node.js version: `node --version`

## 📚 Resources

- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS](https://tailwindcss.com)
- [Framer Motion](https://www.framer.com/motion/)
- [Vite Documentation](https://vitejs.dev)

## 📄 License

ApplyGenie © 2024. All rights reserved.

## 🤝 Support

For issues and questions, please contact the development team or open an issue in the repository.
