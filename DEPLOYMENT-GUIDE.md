# Portfolio Deployment Guide

## 🚨 Issue Resolution: README Showing Instead of Portfolio

If your live link shows the README file instead of your portfolio, this is a **GitHub Pages configuration issue**, not a code issue.

## ✅ Solution

### Step 1: Configure GitHub Pages Source
1. Go to your repository on GitHub
2. Click **Settings** tab
3. Scroll down to **Pages** section in the left sidebar
4. Under **Source**, select **"GitHub Actions"** (NOT "Deploy from a branch")

### Step 2: Verify Your Live Link
Your portfolio should be accessible at:
```
https://yourusername.github.io/Portfolio/
```

**Note the trailing slash!** - Due to the `trailingSlash: true` configuration in `next.config.ts`

## 🔧 How It Works

1. **GitHub Actions Workflow**: The `.github/workflows/deploy.yml` file automatically:
   - Builds the Next.js app as a static export
   - Uploads the built files to GitHub Pages
   - Deploys them to your live site

2. **Next.js Configuration**: The `next.config.ts` file is configured for GitHub Pages:
   - `output: 'export'` - Generates static files
   - `basePath: '/Portfolio'` - Sets the correct URL path
   - `assetPrefix: '/Portfolio'` - Ensures assets load correctly

## 🔍 Troubleshooting

### Problem: Still seeing README instead of portfolio
**Solution**: Double-check that GitHub Pages source is set to "GitHub Actions" in repository settings.

### Problem: 404 errors or broken assets
**Cause**: Usually means the basePath configuration doesn't match your repository name.
**Solution**: In `next.config.ts`, ensure the basePath matches your repository name exactly (case-sensitive).

### Problem: Fonts not loading
**Cause**: The build currently uses fallback fonts due to Google Fonts network restrictions in the build environment.
**Solution**: This is temporary - fonts will work correctly when deployed to GitHub Pages with internet access.

## 📁 File Structure After Build
```
out/
├── index.html          # Your portfolio homepage
├── .nojekyll          # Tells GitHub Pages to serve all files
├── _next/             # Next.js assets (JS, CSS)
├── icons/             # PWA icons
├── images/            # Static images
└── ...
```

## ✨ Features Working
- ✅ Static site generation
- ✅ Progressive Web App (PWA)
- ✅ Responsive design
- ✅ GitHub Pages deployment
- ✅ Asset optimization
- ✅ SEO metadata

## 🚀 Next Steps
1. Configure GitHub Pages source to "GitHub Actions"
2. Wait for the workflow to complete (check the Actions tab)
3. Visit your live link: `https://yourusername.github.io/Portfolio/`

Your portfolio should now display correctly! 🎉