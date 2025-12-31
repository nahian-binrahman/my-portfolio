# Deployment Guide for Vercel

## 1. Prerequisites
- [x] Functional Next.js App
- [x] GitHub Repository (pushed)
- [x] Supabase Project (Tables, Storage, Auth configured)

## 2. Vercel Configuration
1.  **Login** to [Vercel](https://vercel.com).
2.  Click **"Add New..."** > **Project**.
3.  Select your GitHub repository (`nextjs-portfolio`).
4.  **Framework Preset**: Next.js (default).

## 3. Environment Variables
Add the following keys in the **Environment Variables** section before deploying:

| Key | Description | Where to find |
| :-- | :--- | :--- |
| `NEXT_PUBLIC_SUPABASE_URL` | Your project URL | Supabase > Settings > API |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Public Anon key | Supabase > Settings > API |
| `SUPABASE_SERVICE_ROLE_KEY` | **Secret** Service role key | Supabase > Settings > API |
| `ADMIN_EMAIL` | Your email | Set manually (must match Supabase User) |

> **Security Note:** `SUPABASE_SERVICE_ROLE_KEY` must strictly be kept server-side. Next.js handles this automatically if you **do not** prefix it with `NEXT_PUBLIC_`.

## 4. Supabase Auth Configuration (Post-Deployment)
Once Vercel gives you the domain (e.g., `https://your-portfolio.vercel.app`), go back to Supabase:

1.  Go to **Authentication** > **URL Configuration**.
2.  Set **Site URL** to: `https://your-portfolio.vercel.app`
3.  Add it to **Redirect URLs**:
    - `https://your-portfolio.vercel.app/**`

## 5. Storage Configuration
1.  Go to **Storage** > **Buckets**.
2.  Ensure you have a bucket named `media`.
3.  Set it to **Public**.

## 6. Verification Checklist
- [ ] Visit `/` (Homepage) - Check if hero 3D blob loads.
- [ ] Visit `/admin/login` - Log in with your admin credentials.
- [ ] Check `/sitemap.xml` - Should list your static pages and blog posts.
- [ ] Check `/rss.xml` - Should exist (if implemented).

## 7. Troubleshooting
- **"Supabase client not initialized"**: Double-check *Environment Variables* in Vercel settings and ensure you redeploy after changing them.
- **Images not loading**: Check `next.config.ts` has the correct `hostname` pattern for Supabase.

---
*Ready for launch.*
