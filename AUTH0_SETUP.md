# Auth0 Integration Setup Guide

## ✅ Implementation Complete

All Auth0 authentication functionality has been integrated into your ExpenseWise application!

## 🎯 What Has Been Implemented

### 1. **Installed Packages**
- `@auth0/auth0-react` - Auth0 React SDK
- `express-oauth2-jwt-bearer` - JWT verification for Express backend

### 2. **Client-Side Changes**

#### `client/src/main.tsx`
- Wrapped app with `Auth0Provider`
- Configured Auth0 with domain, client ID, and audience

#### `client/src/components/ProtectedRoute.tsx` (NEW)
- Created route protection component
- Redirects unauthenticated users to login
- Shows loading state during authentication

#### `client/src/hooks/use-user.ts` (NEW)
- Custom hook for accessing user information
- Provides user details, authentication status

#### `client/src/App.tsx`
- Added Auth0 hooks integration
- Protected all main routes with authentication
- Set up access token getter for API calls
- Added loading state

#### `client/src/pages/login.tsx`
- Replaced custom login form with Auth0 login
- Added "Sign In with Auth0" button
- Redirects to dashboard after successful login

#### `client/src/pages/register.tsx`
- Replaced custom registration form with Auth0 signup
- Added "Sign Up with Auth0" button
- Opens Auth0 Universal Login with signup screen

#### `client/src/lib/queryClient.ts`
- Added Auth0 token injection to all API requests
- Automatically includes JWT token in Authorization header

#### `client/src/components/app-sidebar.tsx`
- Added user profile display with avatar
- Added logout functionality with dropdown menu
- Shows user name and email

### 3. **Server-Side Changes**

#### `server/index.ts`
- Added JWT verification middleware
- Protected all `/api` routes with Auth0 authentication
- Validates tokens on every API request

## 🔧 Configuration Required

You need to configure your Auth0 application properly. Here's what to do:

### Step 1: Update Auth0 Application Settings

Go to [Auth0 Dashboard](https://manage.auth0.com/dashboard) and:

1. **Navigate to your application** (already created)

2. **Update Application URIs:**
   - Allowed Callback URLs: `http://localhost:5001, http://localhost:5001/`
   - Allowed Logout URLs: `http://localhost:5001, http://localhost:5001/`
   - Allowed Web Origins: `http://localhost:5001`
   - Allowed Origins (CORS): `http://localhost:5001`

3. **Application Type:** Make sure it's set to "Single Page Application"

### Step 2: Create an API in Auth0

1. Go to **Applications** → **APIs** in Auth0 Dashboard
2. Click **Create API**
3. Fill in the details:
   - **Name:** ExpenseWise API
   - **Identifier:** `https://expensewise-api` (must match .env file)
   - **Signing Algorithm:** RS256
4. Click **Create**

### Step 3: Update Environment Variables

Your `.env` file has been updated with:

```env
VITE_AUTH0_DOMAIN=expensewise.us.auth0.com
VITE_AUTH0_CLIENT_ID=ocK4rGPicXErVS5Q3mIBYzJLfxmEizj1
VITE_AUTH0_AUDIENCE=https://expensewise-api
AUTH0_AUDIENCE=https://expensewise-api
AUTH0_ISSUER=https://expensewise.us.auth0.com/
PORT=5001
```

⚠️ **Important:** Make sure the API identifier in Auth0 matches `VITE_AUTH0_AUDIENCE`

### Step 4: Enable Social Logins (Optional)

In Auth0 Dashboard:
1. Go to **Authentication** → **Social**
2. Enable providers like Google, GitHub, Microsoft, etc.
3. Users can now sign up/login with these providers

## 🚀 How to Test

### 1. Start the Development Server

```bash
npx tsx server/index.ts
```

The server will start on `http://localhost:5001`

### 2. Test Authentication Flow

1. **Visit:** `http://localhost:5001`
2. You'll be redirected to Auth0 login
3. Click "Sign Up" to create a new account
4. Or login with existing credentials
5. After authentication, you'll be redirected to the dashboard

### 3. Test Features

- ✅ **Sign Up:** Click "Sign Up with Auth0" on register page
- ✅ **Login:** Click "Sign In with Auth0" on login page
- ✅ **Protected Routes:** All main routes require authentication
- ✅ **User Profile:** See your avatar and name in sidebar
- ✅ **Logout:** Click user dropdown → "Log out"
- ✅ **API Security:** All API calls include JWT token

## 🔐 Security Features

1. **JWT Token-Based Authentication**
   - Tokens are automatically included in all API requests
   - Server verifies tokens on every API call

2. **Route Protection**
   - Unauthenticated users are redirected to login
   - No access to protected pages without valid token

3. **Secure Token Storage**
   - Auth0 handles token management
   - Tokens stored securely by Auth0 SDK

4. **Session Management**
   - Automatic token refresh
   - Secure logout clears all session data

## 📋 User Flow

### Sign Up Flow
1. User visits `/register`
2. Clicks "Sign Up with Auth0"
3. Redirected to Auth0 Universal Login
4. Creates account with email/password or social login
5. Redirected back to app at `/`
6. Protected routes now accessible

### Login Flow
1. User visits `/login` or any protected route
2. Clicks "Sign In with Auth0"
3. Redirected to Auth0 Universal Login
4. Enters credentials
5. Redirected back to app
6. Access granted to protected routes

### Logout Flow
1. User clicks profile dropdown in sidebar
2. Selects "Log out"
3. Logged out from Auth0
4. Redirected to login page
5. Session cleared

## 🎨 Customization Options

### Customize Auth0 Universal Login

1. Go to **Branding** → **Universal Login** in Auth0 Dashboard
2. Customize colors, logo, and styling
3. Use your ExpenseWise branding

### Add Multi-Factor Authentication (MFA)

1. Go to **Security** → **Multi-Factor Auth**
2. Enable MFA policies
3. Users will be prompted for second factor

### Add Email Verification

1. Go to **Authentication** → **Database**
2. Enable "Requires Verification"
3. Users must verify email before accessing app

## 🐛 Troubleshooting

### Issue: "Invalid audience" error

**Solution:** Make sure the API identifier in Auth0 matches `VITE_AUTH0_AUDIENCE` in `.env`

### Issue: Callback URL error

**Solution:** Add `http://localhost:5001` to "Allowed Callback URLs" in Auth0

### Issue: CORS errors

**Solution:** Add `http://localhost:5001` to "Allowed Web Origins" in Auth0

### Issue: Token not included in API requests

**Solution:** Check that `setAccessTokenGetter` is called in `App.tsx`

## 📚 Next Steps

1. **Configure Auth0 URLs** in dashboard (Step 1 above)
2. **Create API** in Auth0 (Step 2 above)
3. **Test the application** with signup/login
4. **Customize branding** in Auth0 dashboard
5. **Add MFA** for extra security (optional)
6. **Set up production environment** when ready to deploy

## 🎉 You're All Set!

Your ExpenseWise application now has:
- ✅ Secure user authentication
- ✅ Sign up and login functionality
- ✅ Protected routes
- ✅ User profile management
- ✅ Secure API calls with JWT
- ✅ Logout functionality

Just configure the Auth0 dashboard settings and you're ready to go!
