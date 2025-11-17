# Deployment Guide

## Quick Start

This is a static website that requires no build process or dependencies. You can deploy it anywhere that serves static HTML files.

## Deployment Options

### Option 1: Local Development
1. Clone the repository
2. Open `index.html` in a web browser
3. Or use a local server: `python3 -m http.server 8080`

### Option 2: GitHub Pages
1. Go to repository Settings → Pages
2. Select branch: `main` (or your default branch)
3. Select folder: `/ (root)`
4. Click Save
5. Your site will be available at: `https://[username].github.io/[repo-name]/`

### Option 3: Netlify
1. Sign in to [Netlify](https://www.netlify.com/)
2. Click "Add new site" → "Import an existing project"
3. Connect your GitHub repository
4. Build settings:
   - Build command: (leave empty)
   - Publish directory: `/`
5. Click "Deploy site"

### Option 4: Vercel
1. Sign in to [Vercel](https://vercel.com/)
2. Click "Add New" → "Project"
3. Import your GitHub repository
4. Framework Preset: Other
5. Click "Deploy"

### Option 5: Traditional Web Hosting
Upload the following files to your web server via FTP/SFTP:
- `index.html`
- `css/styles.css`
- `js/script.js`
- `.gitignore` (optional)

## Requirements
- No server-side processing required
- Works with any modern web browser (Chrome, Firefox, Safari, Edge)
- No build tools or dependencies needed
- Uses CDN for Font Awesome icons (requires internet connection)

## Configuration

### Customization
To customize the site, edit these files:
- `index.html` - Content and structure
- `css/styles.css` - Styling and colors
- `js/script.js` - Functionality and behavior

### Contact Form Backend
The contact form currently logs to the browser console. To connect it to a backend:

1. Edit `js/script.js`, find the `submitToServer()` method
2. Uncomment and update the fetch API call:
```javascript
const response = await fetch('YOUR_API_ENDPOINT', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(data)
});
```

Popular backend options:
- [Formspree](https://formspree.io/)
- [Netlify Forms](https://www.netlify.com/products/forms/)
- [EmailJS](https://www.emailjs.com/)
- Custom backend API

## Browser Support
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance Tips
- The site uses CDN for Font Awesome (cached globally)
- Images and assets are minimal
- CSS and JS are not minified (you can add build tools if needed)
- Consider adding a service worker for offline support

## Troubleshooting

### Font Awesome Icons Not Loading
If icons don't appear, check your internet connection. The site uses CDN:
```html
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
```

### Language Not Persisting
Language preference is stored in localStorage. Ensure:
- Browser supports localStorage
- Not in private/incognito mode
- localStorage is not disabled by browser settings

### Contact Form Not Working
Currently, the form displays success messages but doesn't send emails. You need to:
1. Set up a backend API endpoint
2. Update the `submitToServer()` method in `js/script.js`
3. Configure CORS if needed

## Security Considerations
- No sensitive data processing on client-side
- Form validation is client-side only (add server-side validation)
- Consider adding CAPTCHA for production
- Use HTTPS for production deployments
- Sanitize user input if connecting to a backend

## Support
For issues or questions, please refer to the project README or create an issue in the repository.
