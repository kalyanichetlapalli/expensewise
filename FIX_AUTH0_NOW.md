# 🔧 Auth0 Integration Fix Guide

## ❌ Current Issue
You're seeing "Oops, something went wrong" from Auth0.

## 🎯 Root Causes & Solutions

### Issue 1: API Not Created in Auth0
Auth0 is rejecting the audience parameter because the API doesn't exist.

**Fix:**
1. Go to Auth0 Dashboard: https://manage.auth0.com/dashboard
2. Navigate to **Applications** → **APIs**
3. Click **"Create API"** button
4. Fill in:
   - **Name:** `ExpenseWise API`
   - **Identifier:** `https://expensewise-api` ⚠️ Must match exactly!
   - **Signing Algorithm:** `RS256`
5. Click **"Create"**

### Issue 2: Wrong Application Type
Your application might be set as "Regular Web Application" instead of "Single Page Application"

**Fix:**
1. In Auth0 Dashboard, go to **Applications** → **Applications**
2. Click on **"ExpenseWise-application"**
3. Go to **Settings** tab
4. Scroll to **"Application Type"**
5. If it says "Regular Web Application", you need to create a new SPA:
   - Click **"Create Application"**
   - Name: `ExpenseWise SPA`
   - Type: **Single Page Application**
   - Click **Create**
   - Copy the new **Client ID**
   - Update your `.env` file with new Client ID

### Issue 3: Callback URLs Not Configured
**Fix:**
1. In your application settings, scroll to **"Application URIs"**
2. Add these **EXACTLY**:
   - **Application Login URI:** Leave EMPTY
   - **Allowed Callback URLs:** `http://localhost:5001`
   - **Allowed Logout URLs:** `http://localhost:5001`
   - **Allowed Web Origins:** `http://localhost:5001`
   - **Allowed Origins (CORS):** `http://localhost:5001`
3. Click **"Save Changes"** at the bottom

---

## ✅ Complete Fix - Do These in Order

### Step 1: Create API (Most Important!)
```
1. Auth0 Dashboard → Applications → APIs → Create API
2. Name: ExpenseWise API
3. Identifier: https://expensewise-api
4. Save
```

### Step 2: Verify Application Type
```
1. Auth0 Dashboard → Applications → Applications
2. Click ExpenseWise-application
3. Check Application Type = "Single Page Application"
4. If not, create new SPA application
```

### Step 3: Configure URLs
```
1. In application Settings
2. Clear "Application Login URI" (leave empty)
3. Add http://localhost:5001 to:
   - Allowed Callback URLs
   - Allowed Logout URLs
   - Allowed Web Origins
   - Allowed Origins (CORS)
4. Save Changes
```

### Step 4: Restart Your Server
```bash
# Stop the current server (Ctrl+C in terminal)
# Then run:
npx tsx server/index.ts
```

### Step 5: Test
```
1. Open: http://localhost:5001
2. Should redirect to Auth0 login
3. Login with: kalyani.chetlapalli@ncompasbusiness.com
4. Should redirect back to dashboard
```

---

## 🚨 Quick Checklist

Before testing again, make sure:

- [ ] API created in Auth0 with identifier `https://expensewise-api`
- [ ] Application type is "Single Page Application"
- [ ] Callback URLs added: `http://localhost:5001`
- [ ] Application Login URI is EMPTY
- [ ] All changes saved in Auth0
- [ ] Server restarted with `npx tsx server/index.ts`
- [ ] `.env` file has correct Client ID

---

## 🎯 Expected Behavior After Fix

1. Visit `http://localhost:5001`
2. Redirect to Auth0 (expensewise.us.auth0.com)
3. See login form (not error page)
4. Enter credentials
5. Redirect back to your app
6. See dashboard with user profile

---

## 🐛 Still Having Issues?

### Error: "Invalid audience"
- The API wasn't created
- Or the identifier doesn't match `https://expensewise-api`

### Error: "Callback URL mismatch"
- URLs not added to Auth0 settings
- Or Application Login URI is not empty

### Error: "Access denied"
- Wrong application type (use SPA, not Regular Web App)

---

## 📞 Current Configuration

Your `.env` file:
```
VITE_AUTH0_DOMAIN=expensewise.us.auth0.com
VITE_AUTH0_CLIENT_ID=ocK4rGPicXErVS5Q3mIBYzJLfxmEizj1
VITE_AUTH0_AUDIENCE=https://expensewise-api
PORT=5001
```

**Action Required:** Create API with identifier `https://expensewise-api` in Auth0!
