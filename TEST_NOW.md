# 🎯 Quick Test - 2 Minutes

## 🚀 Server Running
✅ **http://localhost:5001** (already running!)

## ⚠️ FIRST: Configure Auth0 (2 minutes)

**Go to:** https://manage.auth0.com/dashboard

### Step 1: Update Application URLs
Applications → Your App → Settings:
- **Allowed Callback URLs:** `http://localhost:5001`
- **Allowed Logout URLs:** `http://localhost:5001`
- **Allowed Web Origins:** `http://localhost:5001`
- Click **Save Changes**

### Step 2: Create API
Applications → APIs → Create API:
- **Name:** ExpenseWise API
- **Identifier:** `https://expensewise-api`
- Click **Create**

## 🧪 Test Now!

### 1. Open Browser
```
http://localhost:5001
```

### 2. What You'll See
✅ Redirected to Auth0 login page

### 3. Sign Up
- Click "Sign Up" tab
- Enter email & password
- Click Continue

### 4. Success!
✅ Redirected to dashboard
✅ See your profile in sidebar
✅ All navigation works

### 5. Test Logout
- Click profile at bottom of sidebar
- Click "Log out"
- You're logged out!

### 6. Login Again
- Click "Sign In with Auth0"
- Enter credentials
- Back in dashboard!

## ✅ Working?
If you can:
- ✅ Sign up
- ✅ Login
- ✅ See dashboard
- ✅ Navigate pages
- ✅ Logout

**🎉 Auth0 is working perfectly!**

## ❌ Issues?
See `TESTING_GUIDE.md` for detailed troubleshooting

---

**Current Status:** Server running at http://localhost:5001
**Browser:** Should already be open
**Next:** Configure Auth0 dashboard URLs above ⬆️
