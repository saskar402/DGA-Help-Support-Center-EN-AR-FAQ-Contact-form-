// Language Management
class LanguageManager {
    constructor() {
        this.currentLang = localStorage.getItem('language') || 'en';
        this.translations = {
            en: {
                dir: 'ltr',
                name: 'English'
            },
            ar: {
                dir: 'rtl',
                name: 'العربية'
            }
        };
        this.init();
    }

    init() {
        this.applyLanguage(this.currentLang);
        this.setupLanguageToggle();
    }

    setupLanguageToggle() {
        const langToggle = document.getElementById('langToggle');
        const currentLangSpan = document.getElementById('currentLang');
        
        if (langToggle) {
            langToggle.addEventListener('click', () => {
                this.toggleLanguage();
            });
        }
        
        if (currentLangSpan) {
            currentLangSpan.textContent = this.currentLang.toUpperCase();
        }
    }

    toggleLanguage() {
        this.currentLang = this.currentLang === 'en' ? 'ar' : 'en';
        this.applyLanguage(this.currentLang);
        localStorage.setItem('language', this.currentLang);
    }

    applyLanguage(lang) {
        const html = document.documentElement;
        const currentLangSpan = document.getElementById('currentLang');
        
        // Set HTML attributes
        html.setAttribute('lang', lang);
        html.setAttribute('dir', this.translations[lang].dir);
        
        // Update language toggle button
        if (currentLangSpan) {
            currentLangSpan.textContent = lang.toUpperCase();
        }
        
        // Update all translatable elements
        this.updateTranslations(lang);
    }

    updateTranslations(lang) {
        // Update elements with data attributes
        document.querySelectorAll('[data-en]').forEach(element => {
            const translation = element.getAttribute(`data-${lang}`);
            if (translation) {
                // Handle different element types
                if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                    if (element.hasAttribute('placeholder')) {
                        const placeholderAttr = element.getAttribute(`data-placeholder-${lang}`);
                        if (placeholderAttr) {
                            element.placeholder = placeholderAttr;
                        }
                    }
                } else if (element.tagName === 'OPTION') {
                    element.textContent = translation;
                } else {
                    element.textContent = translation;
                }
            }
        });
    }
}

// FAQ Management
class FAQManager {
    constructor() {
        this.faqItems = document.querySelectorAll('.faq-item');
        this.categoryButtons = document.querySelectorAll('.category-btn');
        this.searchInput = document.getElementById('searchInput');
        this.init();
    }

    init() {
        this.setupFAQToggles();
        this.setupCategoryFilters();
        this.setupSearch();
    }

    setupFAQToggles() {
        this.faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            question.addEventListener('click', () => {
                this.toggleFAQ(item);
            });
        });
    }

    toggleFAQ(item) {
        const isActive = item.classList.contains('active');
        
        // Close all other FAQs (optional - remove if you want multiple open)
        this.faqItems.forEach(faq => {
            if (faq !== item) {
                faq.classList.remove('active');
            }
        });
        
        // Toggle current FAQ
        item.classList.toggle('active', !isActive);
    }

    setupCategoryFilters() {
        this.categoryButtons.forEach(button => {
            button.addEventListener('click', () => {
                const category = button.getAttribute('data-category');
                this.filterByCategory(category);
                
                // Update active button
                this.categoryButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
            });
        });
    }

    filterByCategory(category) {
        this.faqItems.forEach(item => {
            const itemCategory = item.getAttribute('data-category');
            
            if (category === 'all' || itemCategory === category) {
                item.classList.remove('hidden');
            } else {
                item.classList.add('hidden');
                item.classList.remove('active');
            }
        });
    }

    setupSearch() {
        if (this.searchInput) {
            this.searchInput.addEventListener('input', (e) => {
                this.searchFAQs(e.target.value.toLowerCase());
            });
        }
    }

    searchFAQs(searchTerm) {
        if (searchTerm === '') {
            // Reset to show all FAQs
            this.faqItems.forEach(item => {
                item.classList.remove('hidden');
            });
            return;
        }

        this.faqItems.forEach(item => {
            const question = item.querySelector('.faq-question span').textContent.toLowerCase();
            const answer = item.querySelector('.faq-answer p').textContent.toLowerCase();
            
            if (question.includes(searchTerm) || answer.includes(searchTerm)) {
                item.classList.remove('hidden');
                // Optionally open matching FAQs
                item.classList.add('active');
            } else {
                item.classList.add('hidden');
                item.classList.remove('active');
            }
        });
    }
}

// Contact Form Management
class ContactFormManager {
    constructor() {
        this.form = document.getElementById('contactForm');
        this.successMessage = document.getElementById('successMessage');
        this.submitBtn = document.getElementById('submitBtn');
        this.init();
    }

    init() {
        if (this.form) {
            this.setupFormValidation();
            this.setupFormSubmission();
        }
    }

    setupFormValidation() {
        const inputs = this.form.querySelectorAll('input, textarea, select');
        
        inputs.forEach(input => {
            input.addEventListener('blur', () => {
                this.validateField(input);
            });
            
            input.addEventListener('input', () => {
                // Clear error on input
                this.clearError(input);
            });
        });
    }

    validateField(field) {
        const value = field.value.trim();
        const fieldName = field.name;
        let isValid = true;
        let errorMessage = '';

        // Check if field is required
        if (field.hasAttribute('required') && value === '') {
            isValid = false;
            errorMessage = this.getErrorMessage('required', fieldName);
        }

        // Email validation
        if (fieldName === 'email' && value !== '') {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                isValid = false;
                errorMessage = this.getErrorMessage('email', fieldName);
            }
        }

        // Name validation (at least 2 characters)
        if (fieldName === 'name' && value !== '' && value.length < 2) {
            isValid = false;
            errorMessage = this.getErrorMessage('minLength', fieldName);
        }

        // Message validation (at least 10 characters)
        if (fieldName === 'message' && value !== '' && value.length < 10) {
            isValid = false;
            errorMessage = this.getErrorMessage('messageLength', fieldName);
        }

        if (!isValid) {
            this.showError(field, errorMessage);
        } else {
            this.clearError(field);
        }

        return isValid;
    }

    getErrorMessage(type, fieldName) {
        const lang = document.documentElement.getAttribute('lang');
        
        const messages = {
            en: {
                required: 'This field is required',
                email: 'Please enter a valid email address',
                minLength: 'Name must be at least 2 characters',
                messageLength: 'Message must be at least 10 characters'
            },
            ar: {
                required: 'هذا الحقل مطلوب',
                email: 'يرجى إدخال عنوان بريد إلكتروني صالح',
                minLength: 'يجب أن يكون الاسم على الأقل حرفين',
                messageLength: 'يجب أن تكون الرسالة على الأقل 10 أحرف'
            }
        };

        return messages[lang][type];
    }

    showError(field, message) {
        field.classList.add('error');
        const errorElement = document.getElementById(`${field.name}Error`);
        if (errorElement) {
            errorElement.textContent = message;
        }
    }

    clearError(field) {
        field.classList.remove('error');
        const errorElement = document.getElementById(`${field.name}Error`);
        if (errorElement) {
            errorElement.textContent = '';
        }
    }

    setupFormSubmission() {
        this.form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleSubmit();
        });
    }

    handleSubmit() {
        // Validate all fields
        const inputs = this.form.querySelectorAll('input, textarea, select');
        let isFormValid = true;

        inputs.forEach(input => {
            if (!this.validateField(input)) {
                isFormValid = false;
            }
        });

        if (!isFormValid) {
            return;
        }

        // Disable submit button and show loading state
        this.submitBtn.disabled = true;
        this.submitBtn.classList.add('loading');

        // Collect form data
        const formData = new FormData(this.form);
        const data = Object.fromEntries(formData.entries());

        // Simulate API call (replace with actual API endpoint)
        this.submitToServer(data);
    }

    async submitToServer(data) {
        try {
            // Simulate network delay
            await new Promise(resolve => setTimeout(resolve, 1500));

            // Log form data to console (for demonstration)
            console.log('Form submitted with data:', data);

            // In a real application, you would send data to a server:
            // const response = await fetch('/api/contact', {
            //     method: 'POST',
            //     headers: {
            //         'Content-Type': 'application/json',
            //     },
            //     body: JSON.stringify(data)
            // });
            // 
            // if (!response.ok) {
            //     throw new Error('Failed to submit form');
            // }

            // Show success message
            this.showSuccess();
            
            // Reset form
            this.form.reset();
            
        } catch (error) {
            console.error('Error submitting form:', error);
            alert('An error occurred while submitting the form. Please try again.');
        } finally {
            // Re-enable submit button
            this.submitBtn.disabled = false;
            this.submitBtn.classList.remove('loading');
        }
    }

    showSuccess() {
        // Hide form and show success message
        this.successMessage.classList.add('show');
        this.form.style.display = 'none';

        // Scroll to success message
        this.successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });

        // Hide success message and show form again after 5 seconds
        setTimeout(() => {
            this.successMessage.classList.remove('show');
            this.form.style.display = 'block';
        }, 5000);
    }
}

// Smooth Scrolling for Anchor Links
function setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            e.preventDefault();
            const target = document.querySelector(href);
            
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Quick Link Cards Interaction
function setupQuickLinks() {
    const linkCards = document.querySelectorAll('.link-card');
    
    linkCards.forEach(card => {
        card.addEventListener('click', () => {
            // Add animation effect
            card.style.transform = 'scale(0.95)';
            setTimeout(() => {
                card.style.transform = '';
            }, 100);
        });
    });
}

// Scroll to Top Functionality
function createScrollToTop() {
    const scrollBtn = document.createElement('button');
    scrollBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollBtn.className = 'scroll-to-top';
    scrollBtn.setAttribute('aria-label', 'Scroll to top');
    
    const style = document.createElement('style');
    style.textContent = `
        .scroll-to-top {
            position: fixed;
            bottom: 2rem;
            right: 2rem;
            width: 50px;
            height: 50px;
            background-color: var(--primary-color);
            color: white;
            border: none;
            border-radius: 50%;
            cursor: pointer;
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
            box-shadow: var(--shadow-lg);
            z-index: 999;
        }
        
        .scroll-to-top.visible {
            opacity: 1;
            visibility: visible;
        }
        
        .scroll-to-top:hover {
            background-color: var(--secondary-color);
            transform: translateY(-5px);
        }
        
        [dir="rtl"] .scroll-to-top {
            right: auto;
            left: 2rem;
        }
    `;
    
    document.head.appendChild(style);
    document.body.appendChild(scrollBtn);
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollBtn.classList.add('visible');
        } else {
            scrollBtn.classList.remove('visible');
        }
    });
    
    scrollBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Initialize all features when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize language manager
    const languageManager = new LanguageManager();
    
    // Initialize FAQ manager
    const faqManager = new FAQManager();
    
    // Initialize contact form manager
    const contactFormManager = new ContactFormManager();
    
    // Setup smooth scrolling
    setupSmoothScrolling();
    
    // Setup quick links
    setupQuickLinks();
    
    // Create scroll to top button
    createScrollToTop();
    
    // Add fade-in animation to sections
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeIn 0.6s ease forwards';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe sections for fade-in animation
    document.querySelectorAll('.quick-links, .faq-section, .contact-section').forEach(section => {
        observer.observe(section);
    });
});

// Handle browser back/forward buttons for language
window.addEventListener('popstate', () => {
    const savedLang = localStorage.getItem('language') || 'en';
    const languageManager = new LanguageManager();
    languageManager.applyLanguage(savedLang);
});
