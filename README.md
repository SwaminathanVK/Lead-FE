# Lead Management System - Frontend

A modern, responsive React application for managing leads with authentication, built with Vite, React Router, and Tailwind CSS.

## 🚀 Features

- **User Authentication**: Secure login and registration system
- **JWT Token Management**: Persistent authentication using localStorage
- **Lead Management Dashboard**: Complete CRUD operations for leads
- **Protected Routes**: Authentication-required pages
- **Responsive Design**: Mobile-first design using Tailwind CSS
- **Modern UI/UX**: Clean interface with Lucide React icons
- **Real-time Feedback**: Loading states and success/error notifications
- **Status Management**: Track lead status (New, Contacted, Lost)
- **Modal Forms**: Intuitive create and edit lead modals

## 📁 Project Structure

```
Lead-FE/
├── src/
│   ├── components/
│   │   ├── Navbar.jsx          # Navigation bar with user info
│   │   ├── LeadModal.jsx       # Modal for creating/editing leads
│   │   └── PrivateRoute.jsx    # Protected route wrapper
│   ├── pages/
│   │   ├── Login.jsx           # Login page
│   │   ├── Register.jsx        # Registration page
│   │   ├── Dashboard.jsx       # Main dashboard with leads table
│   │   └── NotFound.jsx        # 404 error page
│   ├── context/
│   │   └── AuthContext.jsx     # Authentication context provider
│   ├── services/
│   │   └── api.js              # API service functions
│   ├── App.jsx                 # Main app component with routing
│   ├── main.jsx                # Application entry point
│   └── index.css               # Tailwind CSS imports
├── public/
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
└── .gitignore
```

## 🛠️ Technologies Used

- **React 18.3.1**: UI library
- **Vite 6.0**: Build tool and dev server
- **React Router DOM 6.22**: Client-side routing
- **Tailwind CSS 3.4**: Utility-first CSS framework
- **Lucide React**: Beautiful icon library
- **Context API**: State management

## 📋 Prerequisites

Before you begin, ensure you have:
- Node.js (v14 or higher)
- npm (v6 or higher)
- Backend API running on `http://localhost:3000`

## ⚙️ Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/SwaminathanVK/Lead-FE.git
   cd Lead-FE
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure API endpoint**
   
   Update the API URL in `src/services/api.js` if your backend runs on a different port:
   ```javascript
   const API_URL = 'http://localhost:3000/api';
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

   The application will be available at `http://localhost:5173`

5. **Build for production**
   ```bash
   npm run build
   ```

6. **Preview production build**
   ```bash
   npm run preview
   ```

## 🎨 Features Breakdown

### Authentication System

#### Login Page (`/login`)
- Email and password authentication
- Form validation
- Error handling and display
- Automatic redirect to dashboard on success
- Link to registration page

#### Register Page (`/register`)
- User registration with name, email, password, and phone
- Client-side validation
- Success notification
- Automatic redirect to login

#### Protected Routes
- Automatic redirect to login for unauthenticated users
- Loading state while checking authentication
- Token-based access control

### Dashboard (`/dashboard`)

#### Features:
- **View All Leads**: Display leads in a responsive table
- **Create Lead**: Add new leads via modal form
- **Edit Lead**: Update existing lead information
- **Delete Lead**: Remove leads with confirmation
- **Status Badges**: Color-coded status indicators
- **Search & Filter**: Easy lead management
- **Responsive Table**: Mobile-friendly design

#### Lead Status:
- 🔵 **New**: Recently added leads
- 🟢 **Contacted**: Leads that have been reached
- 🔴 **Lost**: Inactive or lost opportunities

### Components

#### Navbar
- Displays logged-in user's name
- Logout functionality
- Responsive design

#### LeadModal
- Create and edit forms
- Input validation
- Status dropdown
- Cancel and submit actions

#### PrivateRoute
- Protects authenticated routes
- Shows loading state
- Redirects unauthorized user



## 🔒 Authentication & Security

- **JWT Token Storage**: Tokens stored in localStorage
- **Automatic Token Inclusion**: All API requests include auth token
- **Protected Routes**: Unauthorized access prevented
- **Token Persistence**: Login persists across browser sessions
- **Secure Logout**: Complete cleanup of auth data

## 🎨 Styling & Design

### Tailwind CSS Configuration
- Custom color scheme with blue primary colors
- Responsive breakpoints
- Utility classes for rapid development

### Design Principles
- **Mobile-First**: Responsive design from small to large screens
- **Consistent Spacing**: Uniform padding and margins
- **Color Coding**: Status-based color indicators
- **Smooth Transitions**: Hover effects and animations
- **Accessible Forms**: Proper labels and validation

## 📱 Responsive Design

The application is fully responsive with breakpoints:
- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px

## 🧪 Testing the Application

### Manual Testing Checklist

**Authentication:**
- [ ] Register a new user
- [ ] Login with valid credentials
- [ ] Login with invalid credentials
- [ ] Logout functionality
- [ ] Protected route access without login

**Lead Management:**
- [ ] View all leads
- [ ] Create a new lead
- [ ] Edit an existing lead
- [ ] Delete a lead
- [ ] Status changes reflect correctly


## 🚨 Error Handling

The application handles:
- Network errors
- API errors
- Validation errors
- Authentication failures
- 404 Not Found pages

Error messages are displayed in colored alert boxes:
- 🔴 Red for errors
- 🟢 Green for success


## 🌐 Environment Variables

Create a `.env` file for environment-specific configurations:

```env
VITE_API_URL=http://localhost:3000/api
```

Update `src/services/api.js`:
```javascript
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';
```

## 📝 Code Structure

### Context Pattern (AuthContext)
```javascript
// Provides global authentication state
- user: Current user object
- token: JWT token
- login: Login function
- logout: Logout function
- loading: Loading state
```

### Service Layer (api.js)
```javascript
// Centralized API calls
- Consistent error handling
- Token management
- Reusable functions
```

## 🚀 Deployment

### Build the application
```bash
npm run build
```

### Deploy to Vercel
```bash
npm i -g vercel
vercel
```

### Deploy to Netlify
```bash
npm i -g netlify-cli
netlify deploy --prod
```

### Deploy to GitHub Pages
1. Update `vite.config.js`:
```javascript
export default defineConfig({
  base: '/Lead-FE/',
  plugins: [react()],
})
```

2. Build and deploy:
```bash
npm run build
git add dist -f
git commit -m "Deploy"
git subtree push --prefix dist origin gh-pages
```

## 🐛 Troubleshooting

### Common Issues

**Issue**: "Invalid hook call" error
```
Solution: Ensure React versions match in package.json
```

**Issue**: API calls fail
```
Solution: Check backend is running on http://localhost:3000
```

**Issue**: CORS errors
```
Solution: Verify backend CORS configuration allows http://localhost:5173
```

**Issue**: Login doesn't persist
```
Solution: Check localStorage is enabled in browser
```

## 🔄 State Management

The app uses React Context API for:
- **Authentication State**: User and token management
- **Global Access**: Available to all components
- **Persistent Storage**: Synced with localStorage

## 🎯 Best Practices Implemented

- ✅ Component-based architecture
- ✅ Separation of concerns
- ✅ Reusable components
- ✅ Centralized API services
- ✅ Protected routes pattern
- ✅ Error boundary handling
- ✅ Loading states
- ✅ Form validation
- ✅ Responsive design
- ✅ Clean code structure

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 👤 Author

**Swaminathan VK**
- GitHub: [@SwaminathanVK](https://github.com/SwaminathanVK)

## 🙏 Acknowledgments

- React documentation
- Vite documentation
- Tailwind CSS team
- Lucide Icons
- React Router team

## 📞 Support

For support, create an issue in the repository or contact the maintainer.

## 🔗 Related Projects

- **Backend Repository**: [Lead-BE](https://github.com/SwaminathanVK/Lead-BE)

---

**Built with ❤️ using React and Tailwind CSS**
