# 🧪 Testing Auth0 Integration - Step by Step

## ✅ Server Status
**Your server is running on: http://localhost:5001**

---

## 🚀 How to Run the Application

### Option 1: Already Running (Current)
The server is currently running in your terminal. Just open your browser to:
```
http://localhost:5001
```

### Option 2: Restart Server
If you need to restart:
```bash
npx tsx server/index.ts
```

Or create a proper npm script for Windows:
```bash
npm install -D cross-env
```
Then update package.json script:
```json
"dev": "cross-env NODE_ENV=development tsx server/index.ts"
```

---

## 🧪 Testing Checklist

### ⚠️ BEFORE Testing - Configure Auth0 First!

**Go to:** https://manage.auth0.com/dashboard

1. **Applications** → Your Application → Settings:
   - Add to **Allowed Callback URLs:** `http://localhost:5001`
   - Add to **Allowed Logout URLs:** `http://localhost:5001`
   - Add to **Allowed Web Origins:** `http://localhost:5001`
   - Add to **Allowed Origins (CORS):** `http://localhost:5001`
   - **Save Changes**

2. **Applications** → **APIs** → **Create API**:
   - Name: `ExpenseWise API`
   - Identifier: `https://expensewise-api` (must match your .env)
   - Click **Create**

---

## 🎯 Test Scenarios

### Test 1: Initial Load (Protected Route Redirect)
**What to do:**
1. Open browser: `http://localhost:5001`

**Expected Result:**
- ✅ You should be automatically redirected to Auth0 login page
- ✅ See Auth0 Universal Login interface
- ✅ URL changes to `expensewise.us.auth0.com`

**What this proves:** 
Protected routes are working - unauthenticated users can't access the app

---

### Test 2: Sign Up (New Account)
**What to do:**
1. On Auth0 login page, click **"Sign Up"** tab
2. Enter email and password
3. Click "Continue"

**Expected Result:**
- ✅ Account created successfully
- ✅ Redirected back to `http://localhost:5001`
- ✅ Dashboard loads
- ✅ No more redirects to login

**What this proves:** 
Sign up functionality works, Auth0 creates user, redirects back correctly

---

### Test 3: View User Profile
**What to do:**
1. Look at the bottom of the sidebar (left side)

**Expected Result:**
- ✅ See your avatar (or initials in circle)
- ✅ See your name
- ✅ See your email address

**What this proves:** 
User data is retrieved from Auth0 and displayed correctly

---

### Test 4: Navigate Protected Routes
**What to do:**
1. Click "Categories" in sidebar
2. Click "Budgets" in sidebar
3. Click "Expenses" in sidebar
4. Click "Income" in sidebar
5. Click "Settings" in sidebar
6. Click "Dashboard" in sidebar

**Expected Result:**
- ✅ Each page loads successfully
- ✅ No redirect to login
- ✅ URL changes for each page
- ✅ You stay authenticated

**What this proves:** 
All routes are protected and accessible when authenticated

---

### Test 5: Logout
**What to do:**
1. Click on your profile at bottom of sidebar
2. Click "Log out" from dropdown menu

**Expected Result:**
- ✅ Logged out from Auth0
- ✅ Redirected to login page
- ✅ Can't access protected routes anymore
- ✅ Trying to visit `http://localhost:5001/` redirects to Auth0 login

**What this proves:** 
Logout functionality works, session cleared, routes protected again

---

### Test 6: Login (Existing User)
**What to do:**
1. After logout, you're on Auth0 login page
2. Enter your email and password
3. Click "Continue"

**Expected Result:**
- ✅ Successfully logged in
- ✅ Redirected to dashboard
- ✅ Profile shows in sidebar again
- ✅ All routes accessible

**What this proves:** 
Login works for existing users, session persists

---

### Test 7: Direct URL Access (When Not Logged In)
**What to do:**
1. After logging out, try visiting directly:
   - `http://localhost:5001/expenses`
   - `http://localhost:5001/budgets`

**Expected Result:**
- ✅ Immediately redirected to Auth0 login
- ✅ Cannot access any protected page
- ✅ After login, redirected back to the page you tried to access

**What this proves:** 
Route protection works on all routes, no backdoor access

---

### Test 8: Browser Refresh (Stay Logged In)
**What to do:**
1. While logged in, press F5 or Ctrl+R to refresh
2. Or close browser and reopen `http://localhost:5001`

**Expected Result:**
- ✅ Stay logged in
- ✅ No redirect to login page
- ✅ Dashboard loads immediately
- ✅ Profile still shows in sidebar

**What this proves:** 
Auth0 session persistence works, tokens are stored securely

---

### Test 9: Register Page
**What to do:**
1. Visit: `http://localhost:5001/register`
2. Click "Sign Up with Auth0"

**Expected Result:**
- ✅ Redirected to Auth0 with signup form showing
- ✅ Can create new account
- ✅ After signup, redirected to dashboard

**What this proves:** 
Register page integration works

---

### Test 10: Login Page
**What to do:**
1. After logout, visit: `http://localhost:5001/login`
2. Click "Sign In with Auth0"

**Expected Result:**
- ✅ Redirected to Auth0 login
- ✅ Can log in
- ✅ Redirected to dashboard after login

**What this proves:** 
Login page integration works

---

## 🔍 What to Look For

### ✅ Success Indicators:
- No console errors (Press F12 to open DevTools)
- Smooth redirects between pages
- User profile displays correctly
- All navigation works
- Login/logout functions properly

### ❌ Common Issues & Fixes:

#### Issue: "Invalid redirect URI"
**Cause:** Auth0 URLs not configured
**Fix:** Add `http://localhost:5001` to all URL fields in Auth0 dashboard

#### Issue: "Invalid audience"
**Cause:** API not created or identifier mismatch
**Fix:** 
1. Create API in Auth0 with identifier: `https://expensewise-api`
2. Verify .env has: `VITE_AUTH0_AUDIENCE=https://expensewise-api`

#### Issue: Blank page or loading forever
**Cause:** Server not running or wrong port
**Fix:** Check terminal shows "serving on port 5001"

#### Issue: "Failed to fetch" errors
**Cause:** CORS not configured
**Fix:** Add `http://localhost:5001` to "Allowed Web Origins" in Auth0

---

## 📊 Visual Confirmation

### What You Should See:

**1. Before Login:**
```
┌─────────────────────────────┐
│   Auth0 Universal Login     │
│  ┌───────────────────────┐  │
│  │ Email: ______________ │  │
│  │ Password: ___________ │  │
│  │  [Continue]           │  │
│  └───────────────────────┘  │
└─────────────────────────────┘
```

**2. After Login (Sidebar):**
```
┌──────────────┐
│ Expense Wise │
├──────────────┤
│ Dashboard    │
│ Categories   │
│ Budgets      │
│ Expenses     │
│ Income       │
│ Settings     │
├──────────────┤
│ [Avatar] 👤  │
│ Your Name    │
│ your@email   │
└──────────────┘
```

**3. Logout Dropdown:**
```
┌──────────────┐
│ My Account   │
├──────────────┤
│ Profile      │
│ Settings     │
├──────────────┤
│ Log out      │ ← Click this
└──────────────┘
```

---

## 🎯 Quick Test Script

Copy and paste this checklist as you test:

```
□ 1. Open http://localhost:5001
□ 2. Redirected to Auth0 login? (YES/NO)
□ 3. Sign up with email/password? (YES/NO)
□ 4. Redirected to dashboard? (YES/NO)
□ 5. Profile shows in sidebar? (YES/NO)
□ 6. Navigate to all pages? (YES/NO)
□ 7. Click profile dropdown? (YES/NO)
□ 8. Click logout? (YES/NO)
□ 9. Redirected to login? (YES/NO)
□ 10. Login again successfully? (YES/NO)
□ 11. Refresh page - stay logged in? (YES/NO)
```

If all answers are YES → ✅ **Auth0 integration working perfectly!**

---

## 🎥 Testing in Chrome DevTools

**Open DevTools (F12) and check:**

1. **Console Tab:** Should have no red errors
2. **Network Tab:** 
   - Filter by "Fetch/XHR"
   - See requests to Auth0
   - See Authorization headers with Bearer tokens
3. **Application Tab → Local Storage:**
   - See Auth0 session data

---

## 🐛 Debugging Tips

### View Authentication State
Add this temporarily to any page to debug:

```typescript
import { useAuth0 } from '@auth0/auth0-react';

const { isAuthenticated, isLoading, user } = useAuth0();
console.log({ isAuthenticated, isLoading, user });
```

### Check Token in API Calls
In Network tab, click any API request:
- Headers → Authorization should show: `Bearer eyJ...`

---

## ✨ Next Steps After Testing

Once everything works:

1. **Customize Auth0 Login Page:**
   - Auth0 Dashboard → Branding → Universal Login
   - Add your logo and colors

2. **Add Social Logins:**
   - Auth0 Dashboard → Authentication → Social
   - Enable Google, GitHub, etc.

3. **Enable MFA (Optional):**
   - Auth0 Dashboard → Security → Multi-Factor Auth

4. **Production Setup:**
   - Update URLs for production domain
   - Configure production environment variables

---

**Ready to test? Open http://localhost:5001 in your browser! 🚀**
