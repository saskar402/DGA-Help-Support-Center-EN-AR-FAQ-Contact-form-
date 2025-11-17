# DGA Help & Support Center

A modern, responsive, and bilingual (English/Arabic) Help & Support Center web application featuring Contact Us, FAQ, and Help & Support pages.

## Features

### Core Features
- ✅ **Three Main Pages**
  - Help & Support: Landing page with service cards
  - Contact Us: Contact form with validation
  - FAQ: Expandable/collapsible questions with search

- ✅ **Responsive Design**
  - Mobile-first approach
  - Optimized for tablets and desktops
  - Adaptive navigation with mobile menu

- ✅ **Bilingual Support (EN/AR)**
  - Language toggle button
  - Full translation for all content
  - Proper RTL/LTR directionality
  - Persistent language preference

- ✅ **Form Validation**
  - Client-side validation
  - Real-time error feedback
  - Required field indicators
  - Email and phone validation

- ✅ **Accessibility Features**
  - ARIA labels and landmarks
  - Keyboard navigation support
  - Skip to main content link
  - Focus indicators
  - Screen reader friendly

### Bonus Features
- ✅ Social media links in footer
- ✅ FAQ search functionality with debounce
- ✅ Smooth animations and transitions
- ✅ Loading states for form submission
- ✅ Success message feedback

## Project Structure

```
DGA-Help-Support-Center/
├── index.html          # Help & Support page (landing)
├── contact.html        # Contact Us page with form
├── faq.html           # FAQ page with search
├── css/
│   └── styles.css     # Main stylesheet with responsive design
├── js/
│   └── main.js        # JavaScript for interactivity
├── data/
│   └── faq-data.json  # FAQ content in EN/AR
└── README.md          # This file
```

## Getting Started

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, Edge)
- A local web server (optional but recommended)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/saskar402/DGA-Help-Support-Center-EN-AR-FAQ-Contact-form-.git
cd DGA-Help-Support-Center-EN-AR-FAQ-Contact-form-
```

2. Open with a local server (recommended):
```bash
# Using Python 3
python -m http.server 8000

# Using Node.js http-server
npx http-server

# Using PHP
php -S localhost:8000
```

3. Open your browser and navigate to:
```
http://localhost:8000
```

### Direct File Access
Alternatively, you can open `index.html` directly in your browser, though some features may require a web server.

## Usage

### Navigation
- Use the header navigation to switch between pages
- Click the language toggle (EN/AR) to switch languages
- On mobile, use the hamburger menu (☰) to access navigation

### Contact Form
1. Fill in all required fields (marked with *)
2. The form validates in real-time
3. Submit the form to see a success message
4. Note: Currently simulates submission (no backend)

### FAQ Page
1. Browse questions by category
2. Click on any question to expand/collapse the answer
3. Use the search box to filter questions
4. Only one answer is shown at a time

### Language Switching
- Click EN or AR button in the header
- The entire interface updates instantly
- Text direction changes automatically (LTR/RTL)
- Language preference is saved locally

## Technologies Used

- **HTML5**: Semantic markup
- **CSS3**: Modern styling with CSS Grid and Flexbox
- **Vanilla JavaScript**: No frameworks or dependencies
- **JSON**: Data storage for FAQ content

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Design Principles

1. **Mobile-First**: Designed for mobile, enhanced for larger screens
2. **Accessibility**: WCAG 2.1 compliant features
3. **Performance**: Minimal dependencies, optimized loading
4. **Maintainability**: Clean, documented code
5. **Internationalization**: Built for multiple languages

## Customization

### Adding FAQ Questions
Edit `data/faq-data.json` to add or modify questions in both languages.

### Changing Colors
Modify CSS variables in `css/styles.css`:
```css
:root {
  --primary-color: #0066cc;
  --secondary-color: #004080;
  /* ... more variables */
}
```

### Adding Languages
1. Add translations to the `translations` object in `js/main.js`
2. Add FAQ content to `data/faq-data.json`
3. Add language button to header

## Future Enhancements

- [ ] Backend integration for form submission
- [ ] Database storage for contact requests
- [ ] Email notification system
- [ ] Live chat functionality
- [ ] User authentication
- [ ] Admin dashboard
- [ ] Analytics integration
- [ ] AI-powered FAQ chatbot

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is created for the DGA GitHub Copilot Challenge.

## Acknowledgments

- Figma designs provided by DGA
- Built with GitHub Copilot assistance
- Icons: Unicode emoji characters for simplicity

## Contact

For questions or support, please contact:
- Email: support@dga.gov.ae
- Phone: +971-4-123-4567