# Deployment Guide

This guide covers various ways to deploy the DGA Help & Support Center.

## Static Hosting Options

### GitHub Pages

1. Go to your repository settings
2. Navigate to "Pages" section
3. Select branch: `main` or `copilot/add-help-and-support-center`
4. Select folder: `/ (root)`
5. Click "Save"
6. Your site will be available at: `https://[username].github.io/[repository-name]/`

**Custom Domain:**
```bash
# Add CNAME file
echo "your-domain.com" > CNAME
git add CNAME
git commit -m "Add custom domain"
git push
```

### Netlify

1. Go to [netlify.com](https://netlify.com)
2. Click "Add new site" → "Import an existing project"
3. Connect your GitHub repository
4. Build settings:
   - Build command: (leave empty)
   - Publish directory: `/`
5. Click "Deploy site"

**Custom Domain & HTTPS:**
- Automatically provided by Netlify
- Configure in site settings

### Vercel

1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Import your repository
4. Leave default settings (no build step needed)
5. Click "Deploy"

### AWS S3 + CloudFront

```bash
# Install AWS CLI
aws configure

# Create S3 bucket
aws s3 mb s3://dga-help-center

# Enable static website hosting
aws s3 website s3://dga-help-center \
  --index-document index.html \
  --error-document index.html

# Upload files
aws s3 sync . s3://dga-help-center \
  --exclude ".git/*" \
  --exclude "*.md"

# Set bucket policy for public access
aws s3api put-bucket-policy \
  --bucket dga-help-center \
  --policy file://bucket-policy.json
```

**bucket-policy.json:**
```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadGetObject",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::dga-help-center/*"
    }
  ]
}
```

### Azure Static Web Apps

```bash
# Install Azure CLI
az login

# Create resource group
az group create --name dga-help-rg --location eastus

# Create static web app
az staticwebapp create \
  --name dga-help-center \
  --resource-group dga-help-rg \
  --source https://github.com/[username]/[repo] \
  --branch main \
  --app-location "/" \
  --output-location "/"
```

### Firebase Hosting

```bash
# Install Firebase CLI
npm install -g firebase-tools

# Login
firebase login

# Initialize project
firebase init hosting

# Select options:
# - Public directory: .
# - Single-page app: Yes
# - GitHub integration: Optional

# Deploy
firebase deploy
```

## Docker Deployment

### Dockerfile

Create `Dockerfile`:
```dockerfile
FROM nginx:alpine

# Copy files
COPY . /usr/share/nginx/html

# Copy custom nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
```

### nginx.conf

Create `nginx.conf`:
```nginx
server {
    listen 80;
    server_name localhost;
    root /usr/share/nginx/html;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    # Enable gzip
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml;
    
    # Cache static assets
    location ~* \.(css|js|json|jpg|jpeg|png|gif|ico|svg)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

### Build and Run

```bash
# Build image
docker build -t dga-help-center .

# Run container
docker run -d -p 8080:80 --name dga-help dga-help-center

# Test
curl http://localhost:8080
```

### Docker Compose

Create `docker-compose.yml`:
```yaml
version: '3.8'
services:
  web:
    build: .
    ports:
      - "8080:80"
    restart: unless-stopped
```

```bash
# Run with Docker Compose
docker-compose up -d
```

## Kubernetes Deployment

### deployment.yaml

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: dga-help-center
spec:
  replicas: 3
  selector:
    matchLabels:
      app: dga-help-center
  template:
    metadata:
      labels:
        app: dga-help-center
    spec:
      containers:
      - name: web
        image: dga-help-center:latest
        ports:
        - containerPort: 80
---
apiVersion: v1
kind: Service
metadata:
  name: dga-help-service
spec:
  selector:
    app: dga-help-center
  ports:
  - protocol: TCP
    port: 80
    targetPort: 80
  type: LoadBalancer
```

```bash
# Deploy
kubectl apply -f deployment.yaml

# Check status
kubectl get pods
kubectl get services
```

## CDN Integration

### Cloudflare

1. Add your domain to Cloudflare
2. Update nameservers at your registrar
3. Enable Auto Minify (CSS, JS, HTML)
4. Enable Brotli compression
5. Set cache rules:
   - HTML: 4 hours
   - CSS/JS: 1 year
   - JSON: 1 hour

### Performance Optimizations

Add to HTML files:
```html
<!-- Preconnect to API endpoints -->
<link rel="preconnect" href="https://api.example.com">

<!-- DNS prefetch -->
<link rel="dns-prefetch" href="https://cdn.example.com">

<!-- Preload critical resources -->
<link rel="preload" href="css/styles.css" as="style">
<link rel="preload" href="js/main.js" as="script">
```

## Environment-Specific Configurations

### Production

```javascript
// Add to js/main.js
const config = {
  apiUrl: 'https://api.dga.gov.ae',
  environment: 'production',
  enableAnalytics: true,
  enableDebug: false
};
```

### Staging

```javascript
const config = {
  apiUrl: 'https://staging-api.dga.gov.ae',
  environment: 'staging',
  enableAnalytics: false,
  enableDebug: true
};
```

### Development

```javascript
const config = {
  apiUrl: 'http://localhost:3000',
  environment: 'development',
  enableAnalytics: false,
  enableDebug: true
};
```

## CI/CD Pipeline

### GitHub Actions

Create `.github/workflows/deploy.yml`:
```yaml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Deploy to Netlify
        uses: nwtgck/actions-netlify@v2.0
        with:
          publish-dir: '.'
          production-deploy: true
        env:
          NETLIFY_AUTH_TOKEN: ${{ secrets.NETLIFY_AUTH_TOKEN }}
          NETLIFY_SITE_ID: ${{ secrets.NETLIFY_SITE_ID }}
```

## Monitoring & Analytics

### Google Analytics

Add to all HTML files before `</head>`:
```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

### Error Tracking

Use Sentry:
```html
<script src="https://browser.sentry-cdn.com/7.x.x/bundle.min.js"></script>
<script>
  Sentry.init({
    dsn: 'YOUR_SENTRY_DSN',
    environment: 'production'
  });
</script>
```

## SSL/TLS Setup

### Let's Encrypt (Free)

```bash
# Install certbot
sudo apt-get update
sudo apt-get install certbot python3-certbot-nginx

# Get certificate
sudo certbot --nginx -d your-domain.com -d www.your-domain.com

# Auto-renewal
sudo certbot renew --dry-run
```

## Backup Strategy

### Automated Backups

```bash
#!/bin/bash
# backup.sh

DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="/backups/dga-help-center"

# Create backup
tar -czf "$BACKUP_DIR/backup_$DATE.tar.gz" \
  /var/www/dga-help-center

# Keep only last 30 days
find $BACKUP_DIR -name "backup_*.tar.gz" -mtime +30 -delete
```

Add to crontab:
```bash
0 2 * * * /path/to/backup.sh
```

## Health Checks

Create `health.html`:
```html
<!DOCTYPE html>
<html>
<head><title>Health Check</title></head>
<body>OK</body>
</html>
```

Configure load balancer:
- Path: `/health.html`
- Expected: 200 OK
- Interval: 30 seconds

## Security Headers

Add to server configuration:
```nginx
add_header X-Frame-Options "SAMEORIGIN" always;
add_header X-Content-Type-Options "nosniff" always;
add_header X-XSS-Protection "1; mode=block" always;
add_header Referrer-Policy "no-referrer-when-downgrade" always;
add_header Content-Security-Policy "default-src 'self' https:; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline';" always;
```

## Rollback Procedure

```bash
# List deployments
netlify deploy --list

# Rollback to specific deploy
netlify deploy --alias [deploy-id]

# Or use Git
git revert HEAD
git push origin main
```

## Post-Deployment Checklist

- [ ] Test all pages load correctly
- [ ] Verify language switching works
- [ ] Test form submission
- [ ] Check FAQ search functionality
- [ ] Verify mobile responsiveness
- [ ] Test all links (social media, email, phone)
- [ ] Check SSL certificate validity
- [ ] Verify analytics tracking
- [ ] Test from different browsers
- [ ] Check mobile devices
- [ ] Monitor error logs
- [ ] Test CDN cache
- [ ] Verify SEO meta tags
- [ ] Check accessibility
- [ ] Load testing (if high traffic expected)

## Support

For deployment issues or questions:
- Documentation: README.md, USAGE.md
- GitHub Issues: [Repository URL]
- Email: support@dga.gov.ae
