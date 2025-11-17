// Language Management
const translations = {
  en: {
    // Header
    logoText: 'DGA Help Center',
    home: 'Home',
    contactUs: 'Contact Us',
    faq: 'FAQ',
    helpSupport: 'Help & Support',
    
    // Contact Page
    contactTitle: 'Contact Us',
    contactSubtitle: 'Have a question? We\'d love to hear from you. Send us a message and we\'ll respond as soon as possible.',
    fullName: 'Full Name',
    email: 'Email Address',
    phone: 'Phone Number',
    subject: 'Subject',
    message: 'Message',
    submitButton: 'Send Message',
    submitting: 'Sending...',
    successMessage: 'Thank you! Your message has been sent successfully. We\'ll get back to you soon.',
    
    // FAQ Page
    faqTitle: 'Frequently Asked Questions',
    faqSubtitle: 'Find answers to common questions about our services',
    searchPlaceholder: 'Search for questions...',
    noResults: 'No questions found matching your search.',
    
    // Help & Support Page
    helpTitle: 'Help & Support',
    helpSubtitle: 'We\'re here to help you with whatever you need',
    contactCard: 'Contact Support',
    contactCardDesc: 'Get in touch with our support team for assistance',
    faqCard: 'Browse FAQ',
    faqCardDesc: 'Find quick answers to common questions',
    guidesCard: 'User Guides',
    guidesCardDesc: 'Step-by-step guides to help you get started',
    emailCard: 'Email Support',
    emailCardDesc: 'Send us an email at support@dga.gov.ae',
    phoneCard: 'Phone Support',
    phoneCardDesc: 'Call us at +971-4-123-4567',
    liveCard: 'Live Chat',
    liveCardDesc: 'Chat with our support team in real-time',
    learnMore: 'Learn More',
    
    // Footer
    aboutUs: 'About Us',
    aboutDesc: 'DGA Help & Support Center provides comprehensive assistance for all your needs. We are committed to delivering excellent service.',
    quickLinks: 'Quick Links',
    services: 'Services',
    privacy: 'Privacy Policy',
    terms: 'Terms of Service',
    contactInfo: 'Contact Info',
    address: 'Dubai, United Arab Emirates',
    followUs: 'Follow Us',
    copyright: '© 2024 DGA Help Center. All rights reserved.',
    
    // Form Validation
    requiredField: 'This field is required',
    invalidEmail: 'Please enter a valid email address',
    invalidPhone: 'Please enter a valid phone number',
    minLength: 'Minimum {0} characters required'
  },
  ar: {
    // Header
    logoText: 'مركز مساعدة DGA',
    home: 'الرئيسية',
    contactUs: 'اتصل بنا',
    faq: 'الأسئلة الشائعة',
    helpSupport: 'المساعدة والدعم',
    
    // Contact Page
    contactTitle: 'اتصل بنا',
    contactSubtitle: 'هل لديك سؤال؟ نود أن نسمع منك. أرسل لنا رسالة وسنرد في أقرب وقت ممكن.',
    fullName: 'الاسم الكامل',
    email: 'البريد الإلكتروني',
    phone: 'رقم الهاتف',
    subject: 'الموضوع',
    message: 'الرسالة',
    submitButton: 'إرسال الرسالة',
    submitting: 'جاري الإرسال...',
    successMessage: 'شكراً لك! تم إرسال رسالتك بنجاح. سنتواصل معك قريباً.',
    
    // FAQ Page
    faqTitle: 'الأسئلة الشائعة',
    faqSubtitle: 'ابحث عن إجابات للأسئلة الشائعة حول خدماتنا',
    searchPlaceholder: 'ابحث عن الأسئلة...',
    noResults: 'لم يتم العثور على أسئلة تطابق بحثك.',
    
    // Help & Support Page
    helpTitle: 'المساعدة والدعم',
    helpSubtitle: 'نحن هنا لمساعدتك في كل ما تحتاجه',
    contactCard: 'اتصل بالدعم',
    contactCardDesc: 'تواصل مع فريق الدعم للحصول على المساعدة',
    faqCard: 'تصفح الأسئلة الشائعة',
    faqCardDesc: 'احصل على إجابات سريعة للأسئلة الشائعة',
    guidesCard: 'أدلة المستخدم',
    guidesCardDesc: 'أدلة خطوة بخطوة لمساعدتك على البدء',
    emailCard: 'دعم البريد الإلكتروني',
    emailCardDesc: 'أرسل لنا بريداً إلكترونياً على support@dga.gov.ae',
    phoneCard: 'الدعم الهاتفي',
    phoneCardDesc: 'اتصل بنا على +971-4-123-4567',
    liveCard: 'الدردشة المباشرة',
    liveCardDesc: 'تحدث مع فريق الدعم في الوقت الفعلي',
    learnMore: 'اعرف المزيد',
    
    // Footer
    aboutUs: 'من نحن',
    aboutDesc: 'مركز المساعدة والدعم DGA يوفر مساعدة شاملة لجميع احتياجاتك. نحن ملتزمون بتقديم خدمة ممتازة.',
    quickLinks: 'روابط سريعة',
    services: 'الخدمات',
    privacy: 'سياسة الخصوصية',
    terms: 'شروط الخدمة',
    contactInfo: 'معلومات الاتصال',
    address: 'دبي، الإمارات العربية المتحدة',
    followUs: 'تابعنا',
    copyright: '© 2024 مركز مساعدة DGA. جميع الحقوق محفوظة.',
    
    // Form Validation
    requiredField: 'هذا الحقل مطلوب',
    invalidEmail: 'يرجى إدخال عنوان بريد إلكتروني صحيح',
    invalidPhone: 'يرجى إدخال رقم هاتف صحيح',
    minLength: 'الحد الأدنى {0} أحرف مطلوبة'
  }
};

// Language State
let currentLang = localStorage.getItem('language') || 'en';

// Initialize app
document.addEventListener('DOMContentLoaded', () => {
  initializeLanguage();
  initializeMobileMenu();
  setupLanguageToggle();
  highlightActiveNav();
  
  // Page-specific initialization
  if (document.getElementById('contactForm')) {
    initializeContactForm();
  }
  
  if (document.getElementById('faqContainer')) {
    initializeFAQ();
  }
});

// Language Functions
function initializeLanguage() {
  document.documentElement.lang = currentLang;
  document.body.dir = currentLang === 'ar' ? 'rtl' : 'ltr';
  updateContent();
  updateActiveLanguageButton();
}

function setupLanguageToggle() {
  const langButtons = document.querySelectorAll('.lang-btn');
  langButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const lang = btn.dataset.lang;
      if (lang !== currentLang) {
        currentLang = lang;
        localStorage.setItem('language', lang);
        initializeLanguage();
      }
    });
  });
}

function updateActiveLanguageButton() {
  const langButtons = document.querySelectorAll('.lang-btn');
  langButtons.forEach(btn => {
    if (btn.dataset.lang === currentLang) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });
}

function updateContent() {
  const elements = document.querySelectorAll('[data-i18n]');
  elements.forEach(el => {
    const key = el.dataset.i18n;
    if (translations[currentLang][key]) {
      if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
        el.placeholder = translations[currentLang][key];
      } else {
        el.textContent = translations[currentLang][key];
      }
    }
  });
}

function t(key) {
  return translations[currentLang][key] || key;
}

// Mobile Menu
function initializeMobileMenu() {
  const toggle = document.querySelector('.mobile-menu-toggle');
  const menu = document.querySelector('.nav-menu');
  
  if (toggle && menu) {
    toggle.addEventListener('click', () => {
      menu.classList.toggle('active');
      toggle.setAttribute('aria-expanded', menu.classList.contains('active'));
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!toggle.contains(e.target) && !menu.contains(e.target)) {
        menu.classList.remove('active');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  }
}

// Navigation Active State
function highlightActiveNav() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-menu a');
  
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
}

// Contact Form
function initializeContactForm() {
  const form = document.getElementById('contactForm');
  
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    if (validateForm(form)) {
      await submitForm(form);
    }
  });
  
  // Real-time validation
  const inputs = form.querySelectorAll('input, textarea, select');
  inputs.forEach(input => {
    input.addEventListener('blur', () => {
      validateField(input);
    });
    
    input.addEventListener('input', () => {
      if (input.parentElement.classList.contains('error')) {
        validateField(input);
      }
    });
  });
}

function validateField(field) {
  const formGroup = field.parentElement;
  const errorMessage = formGroup.querySelector('.error-message');
  let isValid = true;
  let message = '';
  
  // Required validation
  if (field.hasAttribute('required') && !field.value.trim()) {
    isValid = false;
    message = t('requiredField');
  }
  
  // Email validation
  if (field.type === 'email' && field.value) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(field.value)) {
      isValid = false;
      message = t('invalidEmail');
    }
  }
  
  // Phone validation
  if (field.type === 'tel' && field.value) {
    const phoneRegex = /^[\d\s\-\+\(\)]+$/;
    if (!phoneRegex.test(field.value) || field.value.replace(/\D/g, '').length < 7) {
      isValid = false;
      message = t('invalidPhone');
    }
  }
  
  // Minimum length validation
  if (field.hasAttribute('minlength') && field.value) {
    const minLength = parseInt(field.getAttribute('minlength'));
    if (field.value.length < minLength) {
      isValid = false;
      message = t('minLength').replace('{0}', minLength);
    }
  }
  
  if (isValid) {
    formGroup.classList.remove('error');
  } else {
    formGroup.classList.add('error');
    if (errorMessage) {
      errorMessage.textContent = message;
    }
  }
  
  return isValid;
}

function validateForm(form) {
  const inputs = form.querySelectorAll('input, textarea, select');
  let isValid = true;
  
  inputs.forEach(input => {
    if (!validateField(input)) {
      isValid = false;
    }
  });
  
  return isValid;
}

async function submitForm(form) {
  const submitBtn = form.querySelector('.btn-primary');
  const originalText = submitBtn.textContent;
  
  // Disable button and show loading state
  submitBtn.disabled = true;
  submitBtn.innerHTML = `<span class="loading"></span> ${t('submitting')}`;
  
  // Simulate API call (replace with actual API call)
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  // Show success message
  showSuccessMessage();
  
  // Reset form
  form.reset();
  
  // Reset button
  submitBtn.disabled = false;
  submitBtn.textContent = originalText;
  
  // Scroll to success message
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function showSuccessMessage() {
  const successDiv = document.getElementById('successMessage');
  if (successDiv) {
    successDiv.classList.add('show');
    setTimeout(() => {
      successDiv.classList.remove('show');
    }, 5000);
  }
}

// FAQ Functions
let faqData = null;

async function initializeFAQ() {
  await loadFAQData();
  renderFAQ();
  setupFAQSearch();
}

async function loadFAQData() {
  try {
    const response = await fetch('data/faq-data.json');
    faqData = await response.json();
  } catch (error) {
    console.error('Error loading FAQ data:', error);
    faqData = { en: { categories: [] }, ar: { categories: [] } };
  }
}

function renderFAQ(searchTerm = '') {
  const container = document.getElementById('faqContainer');
  if (!container || !faqData) return;
  
  container.innerHTML = '';
  
  const categories = faqData[currentLang].categories;
  let hasResults = false;
  
  categories.forEach(category => {
    const filteredQuestions = searchTerm
      ? category.questions.filter(q =>
          q.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
          q.answer.toLowerCase().includes(searchTerm.toLowerCase())
        )
      : category.questions;
    
    if (filteredQuestions.length === 0) return;
    
    hasResults = true;
    
    const categoryDiv = document.createElement('div');
    categoryDiv.className = 'faq-category';
    
    const categoryTitle = document.createElement('h2');
    categoryTitle.textContent = category.title;
    categoryDiv.appendChild(categoryTitle);
    
    filteredQuestions.forEach(item => {
      const faqItem = createFAQItem(item);
      categoryDiv.appendChild(faqItem);
    });
    
    container.appendChild(categoryDiv);
  });
  
  if (!hasResults) {
    container.innerHTML = `<div class="no-results">${t('noResults')}</div>`;
  }
  
  setupFAQAccordion();
}

function createFAQItem(item) {
  const faqDiv = document.createElement('div');
  faqDiv.className = 'faq-item';
  faqDiv.innerHTML = `
    <button class="faq-question" aria-expanded="false">
      <span>${item.question}</span>
      <span class="faq-icon">▼</span>
    </button>
    <div class="faq-answer">
      <div class="faq-answer-content">${item.answer}</div>
    </div>
  `;
  return faqDiv;
}

function setupFAQAccordion() {
  const faqQuestions = document.querySelectorAll('.faq-question');
  
  faqQuestions.forEach(question => {
    question.addEventListener('click', () => {
      const faqItem = question.parentElement;
      const isActive = faqItem.classList.contains('active');
      
      // Close all other items
      document.querySelectorAll('.faq-item').forEach(item => {
        item.classList.remove('active');
        item.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
      });
      
      // Toggle current item
      if (!isActive) {
        faqItem.classList.add('active');
        question.setAttribute('aria-expanded', 'true');
      }
    });
  });
}

function setupFAQSearch() {
  const searchInput = document.getElementById('faqSearch');
  if (!searchInput) return;
  
  let debounceTimer;
  searchInput.addEventListener('input', (e) => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      renderFAQ(e.target.value);
    }, 300);
  });
}

// Utility Functions
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Export functions for use in HTML
window.dgaHelp = {
  t,
  currentLang: () => currentLang
};
