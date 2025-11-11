# Render Deployment Checklist

## Required Environment Variables

Make sure these are set in your Render dashboard under **Environment** tab:

### 1. NODE_ENV

```
NODE_ENV=production
```

### 2. CLIENT_URL

Set this to your frontend URL (where your React app is hosted):

```
CLIENT_URL=https://your-frontend-app.netlify.app
```

Or if frontend is also on Render:

```
CLIENT_URL=https://your-frontend-app.onrender.com
```

### 3. SESSION_SECRET

Generate a random string (at least 32 characters):

```
SESSION_SECRET=your-super-secret-random-string-here-make-it-long
```

You can generate one using Node:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### 4. ATLASDB_URL

Your MongoDB Atlas connection string:

```
ATLASDB_URL=mongodb+srv://username:password@cluster.mongodb.net/linkedin-clone?retryWrites=true&w=majority
```

## Important Notes

1. **Restart Required**: After adding/changing environment variables, you MUST restart your Render service
2. **HTTPS Only**: Your frontend MUST use HTTPS (not HTTP) because we set `secure: true` for cookies in production
3. **Check Logs**: Go to Render Dashboard → Your Service → Logs to see any errors

## Testing Checklist

- [ ] All 4 environment variables are set
- [ ] Service has been restarted after setting variables
- [ ] Frontend uses HTTPS
- [ ] CLIENT_URL matches your actual frontend URL (no trailing slash)
- [ ] MongoDB Atlas allows connections from anywhere (0.0.0.0/0) or Render IPs
- [ ] Check Render logs for any connection errors

## Common Issues

### "SESSION STORE ERROR" in logs

- SESSION_SECRET is missing or empty
- ATLASDB_URL is incorrect
- MongoDB Atlas network access is restricted

### "401 Unauthorized" persists

- CLIENT_URL doesn't match your frontend
- Browser is blocking third-party cookies (test in incognito mode)
- Session cookies aren't being sent (check browser DevTools → Application → Cookies)

### "500 Internal Server Error" on registration

- Check Render logs for specific error
- Usually database connection or session store issue
- Verify ATLASDB_URL is correct

## Quick Test

After deployment, visit:

```
https://linkedin-clone-1-zwpn.onrender.com/
```

You should see:

```json
{ "message": "LinkedIn Clone API" }
```

If this works, your server is running. If authentication still fails, check environment variables and logs.
