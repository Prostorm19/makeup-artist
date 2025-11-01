# 🎨 Makeup Artist Booking App with MongoDB

A full-stack makeup artist booking application with MongoDB Atlas authentication.

## 🚀 Quick Setup Guide

### Step 1: MongoDB Atlas Setup

1. **Create MongoDB Atlas Account**
   - Go to [https://cloud.mongodb.com/](https://cloud.mongodb.com/)
   - Sign up with email or Google/GitHub

2. **Create a Cluster**
   - Choose "Create a deployment"
   - Select "M0 Free" tier
   - Choose your preferred cloud provider and region
   - Name your cluster (e.g., "makeup-artist-db")
   - Click "Create Cluster"

3. **Security Configuration**
   - **Database User**: Create a user with username/password
   - **Network Access**: Add IP address `0.0.0.0/0` (for development)
   - **Connection**: Get your connection string

### Step 2: Backend Setup

1. **Install Dependencies**
   ```bash
   cd backend
   npm install
   ```

2. **Environment Configuration**
   - Copy your MongoDB connection string
   - Update `backend/.env` file:
   ```env
   MONGODB_URI=mongodb+srv://your-username:your-password@makeup-artist-db.xxxxx.mongodb.net/makeup-artist-app?retryWrites=true&w=majority
   JWT_SECRET=your-super-secret-jwt-key-make-it-long-and-random
   PORT=5000
   NODE_ENV=development
   FRONTEND_URL=http://localhost:5173
   ```

3. **Start Backend Server**
   ```bash
   npm run dev
   ```
   Server will run on `http://localhost:5000`

### Step 3: Frontend Setup

1. **Install Dependencies**
   ```bash
   cd ..
   npm install
   ```

2. **Environment Configuration**
   - Update `.env` file:
   ```env
   VITE_API_URL=http://localhost:5000/api
   ```

3. **Start Frontend**
   ```bash
   npm run dev
   ```
   App will run on `http://localhost:5173`

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user
- `PUT /api/auth/profile` - Update profile

### Users
- `GET /api/users/artists` - Get all artists
- `GET /api/users/artist/:id` - Get single artist

## 📱 Features

- ✅ **Dual Authentication**: Separate login for clients and makeup artists
- ✅ **JWT Token Authentication**: Secure token-based auth
- ✅ **MongoDB Integration**: Real database with user management
- ✅ **Password Hashing**: Secure password storage with bcrypt
- ✅ **Form Validation**: Client and server-side validation
- ✅ **Responsive Design**: Works on all devices
- ✅ **Dashboard**: Different dashboards for clients vs artists

## 🎯 Usage

1. **Sign Up**: Create account as Client or Makeup Artist
2. **Login**: Access your personalized dashboard
3. **Client Dashboard**: View bookings, history, and favorites
4. **Artist Dashboard**: Manage schedule, clients, and earnings

## 🛠️ Tech Stack

**Frontend:**
- React + TypeScript
- Tailwind CSS
- Shadcn/ui Components
- Vite

**Backend:**
- Node.js + Express
- MongoDB + Mongoose
- JWT Authentication
- bcryptjs for password hashing

## 🔒 Security Features

- Password hashing with bcrypt (12 rounds)
- JWT token expiration (7 days)
- Input validation and sanitization
- CORS protection
- Environment variable protection

## 📊 Database Schema

### Users Collection
```javascript
{
  name: String,
  email: String (unique),
  password: String (hashed),
  userType: 'client' | 'artist',
  profileImage: String,
  phone: String,
  // Artist-specific fields
  artistProfile: {
    bio: String,
    experience: Number,
    specialties: [String],
    pricing: Object,
    availability: Object
  },
  // Client-specific fields
  clientProfile: {
    preferences: [String],
    skinType: String,
    allergies: [String]
  }
}
```

## 🚨 Troubleshooting

**Connection Issues:**
- Check MongoDB Atlas network access (IP whitelist)
- Verify connection string format
- Ensure correct username/password

**Authentication Errors:**
- Check JWT secret in backend .env
- Verify API URL in frontend .env
- Clear localStorage if token issues persist

**Build Errors:**
- Run `npm install` in both frontend and backend
- Check Node.js version (recommend v18+)
- Verify environment variables are set

## 🔄 Development Workflow

1. **Backend Changes**: Restart server with `npm run dev`
2. **Frontend Changes**: Hot reload automatic
3. **Database Changes**: Use MongoDB Compass or Atlas UI
4. **Testing**: Test API endpoints with Postman or curl

Happy coding! 🎨✨