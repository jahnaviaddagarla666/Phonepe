# PhonePe Wallet - Frontend

React + Vite frontend application for the PhonePe digital wallet platform.

## 🚀 Quick Start

### Prerequisites
- **Node.js 16+**
- **npm or yarn**

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Open http://localhost:5173 in your browser
```

### Build for Production

```bash
# Create optimized production build
npm run build

# Output will be in dist/ directory
```

## 📦 Required Dependencies

All dependencies are listed in `package.json`:

- **react** - UI library
- **react-router-dom** - Client-side routing
- **axios** - HTTP client for API calls
- **framer-motion** - Animation library
- **tailwindcss** - Utility-first CSS
- **vite** - Build tool

Install with: `npm install`

## 🗂 Project Structure

```
src/
├── App.jsx                 # Main app component with auth routing
├── main.jsx                # Entry point
├── index.css              # Global styles & animations
├── pages/
│   ├── Login.jsx          # Login page
│   ├── Register.jsx       # Registration page
│   └── Dashboard.jsx      # Main wallet dashboard
├── services/
│   └── api.js             # Axios API configuration & endpoints
└── assets/                # Images, icons, etc.
```

## 🔑 API Configuration

Edit `src/services/api.js` to change the backend URL:

```javascript
const api = axios.create({
  baseURL: 'http://localhost:8080/api', // Change if needed
});
```

## 📜 Available Scripts

- `npm run dev` - Start development server on http://localhost:5173
- `npm run build` - Create production build in `dist/`
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint (if configured)

## 🎨 Styling

- **Tailwind CSS** for utility classes
- **Custom CSS animations** in `index.css`
- **Framer Motion** for component animations
- Dark theme with glassmorphism effects

## 🔒 Authentication Flow

1. Login component stores user data in `localStorage`
2. App component checks `localStorage` on mount
3. Protected routes redirect to login if not authenticated
4. Logout removes user data and dispatches `authChange` event

## 🌐 API Endpoints Used

- `POST /auth/register` - Create new account
- `POST /auth/login` - User login
- `GET /wallet/balance/{upiId}` - Get balance
- `PUT /wallet/add-money` - Add funds
- `POST /wallet/send-money` - Send money
- `GET /transactions/history/{upiId}` - Transaction history

## 📚 Component Details

### Login.jsx
- Phone number and PIN validation
- Error message display
- Animated form with Framer Motion
- Redirects to dashboard on success

### Register.jsx
- Full registration form
- Input validation
- Success/error states
- Redirects to login on completion

### Dashboard.jsx
- Balance display with animations
- Add money form
- Send money form
- Transaction history with filtering
- Tab-based navigation (Overview/Transactions)
- Logout functionality

## 🐛 Troubleshooting

**Frontend won't connect to backend**
- Check backend is running on http://localhost:8080
- Browser DevTools Network tab will show API calls
- Check CORS is enabled in backend

**Animations not working**
- Ensure Framer Motion is installed: `npm install framer-motion`
- Clear browser cache and hard refresh (Ctrl+Shift+R)

**Build errors**
- Clear node_modules: `rm -rf node_modules` (or delete folder on Windows)
- Reinstall: `npm install`
- Check Node version: `node --version` (should be 16+)

## 🚀 Deployment

### Deploy to Vercel (Recommended for React)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Deploy to Netlify

```bash
# Build first
npm run build

# Upload dist/ folder to Netlify
# Or use: npm i -g netlify-cli && netlify deploy
```

### Deploy to Any Static Host

```bash
# Build production files
npm run build

# Upload contents of dist/ folder to your hosting
```

## 📝 Notes

- Development server uses HMR (Hot Module Reload) for instant updates
- All API calls are made from localhost:8080 in development
- Use browser DevTools to debug React components and network requests
- Console logs help trace authentication flow

For full project documentation, see the main [README.md](../README.md) in the root directory.
