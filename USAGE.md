# Usage Guide

## Getting Started

### Quick Start
1. Clone the repository
2. Open `index.html` in your web browser
3. That's it! No build process or dependencies required.

### Using a Local Server (Recommended)
For the best experience, use a local web server:

```bash
# Python 3
python -m http.server 8000

# Node.js
npx http-server

# PHP
php -S localhost:8000
```

Then open `http://localhost:8000` in your browser.

## Features Guide

### Language Switching
1. Click the **EN** or **AR** button in the top-right corner
2. The entire page updates instantly to the selected language
3. Text direction automatically switches (LTR for English, RTL for Arabic)
4. Your preference is saved and remembered for future visits

### Contact Form
1. Navigate to **Contact Us** page
2. Fill in all required fields (marked with *)
   - Full Name (minimum 2 characters)
   - Email Address (valid email format)
   - Phone Number (valid phone format)
   - Subject (select from dropdown)
   - Message (minimum 10 characters)
3. Click **Send Message**
4. A success message appears when the form is submitted
5. The form resets automatically after submission

**Validation Features:**
- Real-time validation on blur (when you leave a field)
- Error messages appear below invalid fields
- Red border highlights fields with errors
- Submit button disabled until all validations pass

### FAQ Page
1. Navigate to **FAQ** page
2. Browse questions organized by category:
   - General Questions
   - Account Management
   - Services & Features
   - Technical Support

**Search Feature:**
- Type keywords in the search box
- Results filter automatically after 300ms
- Searches both questions and answers
- Shows "No results" if no matches found

**Accordion Feature:**
- Click any question to expand its answer
- Previously opened questions close automatically
- Only one answer visible at a time
- Click again to collapse

### Help & Support Page
The landing page displays 6 service cards:
1. **Contact Support** - Link to contact form
2. **Browse FAQ** - Link to FAQ page
3. **User Guides** - Placeholder for future content
4. **Email Support** - Opens email client
5. **Phone Support** - Opens phone dialer
6. **Live Chat** - Placeholder for future feature

### Mobile Navigation
On mobile devices (screen width < 768px):
1. Navigation menu is hidden by default
2. Click the hamburger menu (☰) to show/hide navigation
3. Menu appears as a vertical dropdown
4. Click anywhere outside to close the menu

## Customization

### Changing Colors
Edit `css/styles.css` and modify the CSS variables:

```css
:root {
  --primary-color: #0066cc;      /* Main brand color */
  --secondary-color: #004080;    /* Darker shade */
  --accent-color: #00a3e0;       /* Highlight color */
  /* ... more variables */
}
```

### Adding FAQ Questions
Edit `data/faq-data.json`:

```json
{
  "en": {
    "categories": [
      {
        "id": "category-id",
        "title": "Category Name",
        "questions": [
          {
            "id": "q1",
            "question": "Your question?",
            "answer": "Your answer."
          }
        ]
      }
    ]
  },
  "ar": {
    // Same structure for Arabic
  }
}
```

### Adding New Languages
1. Add translations to `js/main.js`:
```javascript
const translations = {
  en: { /* English */ },
  ar: { /* Arabic */ },
  fr: { /* French */ }  // Add new language
};
```

2. Add FAQ content to `data/faq-data.json`
3. Add language button to header in all HTML files

### Modifying Form Fields
Edit `contact.html` to add/remove fields:
```html
<div class="form-group">
  <label for="fieldId">
    <span data-i18n="labelKey">Field Label</span>
    <span class="required">*</span>
  </label>
  <input type="text" id="fieldId" name="fieldId" required>
  <span class="error-message"></span>
</div>
```

## Browser Support

### Fully Supported
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

### Mobile Browsers
- iOS Safari 14+
- Chrome Mobile 90+
- Samsung Internet 14+

### Features Used
- CSS Grid & Flexbox
- CSS Variables
- Fetch API
- LocalStorage API
- ES6+ JavaScript

## Accessibility

### Keyboard Navigation
- **Tab**: Move between interactive elements
- **Enter/Space**: Activate buttons and links
- **Escape**: Close mobile menu (if open)

### Screen Readers
- All images have descriptive alt text or aria-labels
- Form fields have associated labels
- Error messages use role="alert"
- Semantic HTML structure (header, nav, main, footer)
- Skip to main content link available

### WCAG 2.1 Compliance
- Color contrast ratios meet AA standards
- Focus indicators visible on all interactive elements
- All functionality available via keyboard
- Form errors clearly announced

## Performance

### Load Times
- Initial page load: < 1 second
- Language switch: Instant
- FAQ search: 300ms debounce
- Form validation: Real-time

### Optimization
- No external dependencies
- Minimal CSS/JS (< 50KB total)
- No images (emoji icons used)
- Efficient DOM manipulation

## Troubleshooting

### Language Not Switching
- Check browser console for JavaScript errors
- Clear browser cache and reload
- Verify `js/main.js` is loading correctly

### Form Validation Not Working
- Ensure JavaScript is enabled in browser
- Check if form has `id="contactForm"`
- Verify `js/main.js` is loaded

### FAQ Not Loading
- Check if `data/faq-data.json` exists
- Verify JSON is valid (use JSON validator)
- Check browser console for fetch errors
- Ensure using HTTP server (not file:// protocol)

### Mobile Menu Not Opening
- Verify screen width is < 768px
- Check for JavaScript errors in console
- Ensure button has class `mobile-menu-toggle`

## Security Notes

- Form submission is client-side only (no backend)
- No sensitive data stored in localStorage
- No external scripts or resources loaded
- XSS protection through proper HTML escaping
- CSRF protection not needed (no server-side processing)

## Future Enhancements

Suggested improvements:
1. Backend integration for form submission
2. Database storage for contact requests
3. Email notification system
4. Live chat implementation
5. User authentication system
6. Admin dashboard
7. Analytics integration
8. AI-powered chatbot for FAQ
9. Multi-language support (beyond EN/AR)
10. Offline support with Service Workers

## License

This project is created for the DGA GitHub Copilot Challenge.

## Support

For issues or questions:
- Email: support@dga.gov.ae
- Phone: +971-4-123-4567
- GitHub Issues: [Project Repository]
