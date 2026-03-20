# 🧠 Second Brain - Your Personal Knowledge Base

A production-level full-stack web application built with MERN stack (MongoDB, Express, React, Node) and TypeScript. Store links, notes, content, and share your knowledge base with a unique shareable link.

## 🎯 Features

### Authentication
- User Signup & Sign In with email verification
- JWT-based authentication
- Secure password hashing with bcrypt
- Protected routes and endpoints

### Content Management
- Add content (links, notes, images, videos)
- Organize with titles and tags
- View all personal content
- Delete content easily
- Sort content by date

### Brain Sharing (USP Feature)
- Generate unique share links for your brain
- Public access to shared brains without authentication
- Toggle brain public/private status
- Share your knowledge publicly

## 🛠️ Tech Stack

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Language**: TypeScript
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT (JSON Web Tokens)
- **Password Hashing**: bcrypt
- **Environment**: dotenv

### Frontend
- **Framework**: React 18
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Build Tool**: Vite
- **Routing**: React Router v6
- **State Management**: React Hooks

## 📁 Project Structure

```
second-brain/
├── server/
│   ├── src/
│   │   ├── models/
│   │   │   ├── User.ts
│   │   │   ├── Content.ts
│   │   │   └── Brain.ts
│   │   ├── controllers/
│   │   │   ├── authController.ts
│   │   │   ├── contentController.ts
│   │   │   └── brainController.ts
│   │   ├── routes/
│   │   │   ├── authRoutes.ts
│   │   │   ├── contentRoutes.ts
│   │   │   └── brainRoutes.ts
│   │   ├── middleware/
│   │   │   └── auth.ts
│   │   ├── config/
│   │   │   └── database.ts
│   │   ├── utils/
│   │   │   └── helpers.ts
│   │   ├── app.ts
│   │   └── server.ts
│   ├── package.json
│   ├── tsconfig.json
│   └── .env
├── client/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Header.tsx
│   │   │   └── ProtectedRoute.tsx
│   │   ├── pages/
│   │   │   ├── Signup.tsx
│   │   │   ├── Signin.tsx
│   │   │   ├── Dashboard.tsx
│   │   │   └── PublicBrain.tsx
│   │   ├── hooks/
│   │   │   ├── useAuth.ts
│   │   │   └── useContent.ts
│   │   ├── services/
│   │   │   └── api.ts
│   │   ├── utils/
│   │   │   └── auth.ts
│   │   ├── App.tsx
│   │   ├── main.tsx
│   │   └── index.css
│   ├── index.html
│   ├── package.json
│   ├── tsconfig.json
│   ├── vite.config.ts
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   └── .env
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- MongoDB (local or cloud)

### Backend Setup

1. **Navigate to server directory**
   ```bash
   cd server
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   - Edit `.env` file and populate with your values:
   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/secondbrain
   JWT_SECRET=your_jwt_secret_key_here_change_in_production
   NODE_ENV=development
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```
   Server will run on `http://localhost:5000`

### Frontend Setup

1. **Navigate to client directory**
   ```bash
   cd client
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   - Edit `.env` file:
   ```env
   VITE_API_URL=http://localhost:5000/api
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```
   Client will run on `http://localhost:3000`

## 📚 API Documentation

### Authentication Endpoints

#### Signup
```
POST /api/auth/signup
Content-Type: application/json

{
  "username": "string",
  "email": "string",
  "password": "string"
}

Response: { token, user: { id, username, email } }
```

#### Signin
```
POST /api/auth/signin
Content-Type: application/json

{
  "email": "string",
  "password": "string"
}

Response: { token, user: { id, username, email } }
```

### Content Endpoints

#### Add Content
```
POST /api/content/add
Authorization: Bearer {token}
Content-Type: application/json

{
  "title": "string",
  "type": "note|link|image|video",
  "content": "string",
  "tags": ["string"]
}

Response: { content }
```

#### Get Content
```
GET /api/content
Authorization: Bearer {token}

Response: { contents: Content[] }
```

#### Delete Content
```
DELETE /api/content/{contentId}
Authorization: Bearer {token}

Response: { message }
```

### Brain Endpoints

#### Get Share Link
```
GET /api/brain/share-link
Authorization: Bearer {token}

Response: { shareLink: string }
```

#### Toggle Brain Public
```
POST /api/brain/toggle-public
Authorization: Bearer {token}

Response: { isPublic: boolean }
```

#### Get Public Brain
```
GET /api/brain/public/{shareLink}

Response: { brain: { username, contents } }
```

## 🔐 Security Features

- JWT token-based authentication
- Password hashing with bcrypt (10 rounds)
- Protected API routes with middleware
- CORS enabled for secure cross-origin requests
- Environment variable isolation
- Input validation on all endpoints

## 🎨 UI/UX Features

- Dark theme with Tailwind CSS
- Responsive design (mobile, tablet, desktop)
- Real-time content management
- Copy-to-clipboard share link functionality
- Error handling and user feedback
- Smooth transitions and hover effects
- Sticky header for easy navigation

## 📝 Usage Guide

### Creating an Account
1. Go to signup page
2. Enter username, email, and password
3. Click "Sign Up"
4. Automatically redirected to dashboard

### Adding Content
1. Go to dashboard
2. Fill in content details (title, type, content, tags)
3. Click "Add Content"
4. Content appears in your feed

### Sharing your Brain
1. In dashboard, find "Share Link" section
2. Click "Copy Link" button
3. Share the link with others
4. Anyone with the link can view your public brain

### Managing Content
1. View all your content in the dashboard
2. Click "Delete" to remove content
3. Use tags to organize content

## 🏗️ Building for Production

### Backend Build
```bash
cd server
npm run build
npm start
```

### Frontend Build
```bash
cd client
npm run build
npm run preview
```

## 🔄 Database Schema

### User Model
```typescript
{
  username: string (unique, required)
  email: string (unique, required)
  password: string (hashed, required)
  createdAt: Date
}
```

### Content Model
```typescript
{
  userId: string (reference to User)
  title: string (required)
  type: "link" | "note" | "image" | "video" (required)
  content: string (required)
  tags: string[]
  createdAt: Date
  updatedAt: Date
}
```

### Brain Model
```typescript
{
  userId: string (unique, reference to User)
  shareLink: string (unique)
  isPublic: boolean (default: true)
  createdAt: Date
  updatedAt: Date
}
```

## 🐛 Troubleshooting

### MongoDB Connection Issues
- Ensure MongoDB is running locally or connection string is correct
- Check MONGODB_URI in .env

### JWT Errors
- Verify JWT_SECRET is set in .env
- Check token expiration (default: 30 days)

### CORS Issues
- Ensure VITE_API_URL matches backend URL
- Check backend CORS configuration

### Build Errors
- Clear node_modules and reinstall: `rm -rf node_modules && npm install`
- Check Node version compatibility (v16+)

## 📄 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📞 Support

For issues and questions, please open an issue in the repository.

---

**Built with ❤️ using MERN Stack**
