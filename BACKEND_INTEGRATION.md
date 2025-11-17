# Backend Integration Guide

This guide explains how to connect the contact form to various backend services.

## Current State

The contact form currently:
- Validates input on the client-side
- Logs form data to the browser console
- Shows a success message after submission
- Does NOT actually send emails or store data

## Integration Options

### Option 1: Formspree (Easiest - No Backend Code)

1. Sign up at [https://formspree.io](https://formspree.io)
2. Create a new form and get your form endpoint
3. Update `js/script.js` in the `submitToServer()` method:

```javascript
async submitToServer(data) {
    try {
        const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error('Failed to submit form');
        }

        this.showSuccess();
        this.form.reset();
        
    } catch (error) {
        console.error('Error submitting form:', error);
        alert('An error occurred while submitting the form. Please try again.');
    } finally {
        this.submitBtn.disabled = false;
        this.submitBtn.classList.remove('loading');
    }
}
```

### Option 2: EmailJS (Free Email Service)

1. Sign up at [https://www.emailjs.com](https://www.emailjs.com)
2. Create an email service and template
3. Add EmailJS SDK before closing `</body>` tag in `index.html`:

```html
<script src="https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js"></script>
<script>
    emailjs.init('YOUR_PUBLIC_KEY');
</script>
```

4. Update `js/script.js`:

```javascript
async submitToServer(data) {
    try {
        const response = await emailjs.send(
            'YOUR_SERVICE_ID',
            'YOUR_TEMPLATE_ID',
            {
                from_name: data.name,
                from_email: data.email,
                subject: data.subject,
                category: data.category,
                message: data.message
            }
        );

        console.log('Email sent successfully:', response);
        this.showSuccess();
        this.form.reset();
        
    } catch (error) {
        console.error('Error sending email:', error);
        alert('An error occurred while sending the message. Please try again.');
    } finally {
        this.submitBtn.disabled = false;
        this.submitBtn.classList.remove('loading');
    }
}
```

### Option 3: Netlify Forms (If Deployed on Netlify)

1. Add `netlify` attribute to the form in `index.html`:

```html
<form class="contact-form" id="contactForm" name="contact" method="POST" data-netlify="true">
    <input type="hidden" name="form-name" value="contact">
    <!-- rest of form fields -->
</form>
```

2. Update `js/script.js` to use Netlify's form handling:

```javascript
async submitToServer(data) {
    try {
        const formData = new FormData();
        formData.append('form-name', 'contact');
        Object.keys(data).forEach(key => {
            formData.append(key, data[key]);
        });

        const response = await fetch('/', {
            method: 'POST',
            body: formData
        });

        if (!response.ok) {
            throw new Error('Failed to submit form');
        }

        this.showSuccess();
        this.form.reset();
        
    } catch (error) {
        console.error('Error submitting form:', error);
        alert('An error occurred while submitting the form. Please try again.');
    } finally {
        this.submitBtn.disabled = false;
        this.submitBtn.classList.remove('loading');
    }
}
```

### Option 4: Custom Node.js Backend

Create a simple Express.js server:

**Backend (`server.js`):**

```javascript
const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Configure email transporter
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

app.post('/api/contact', async (req, res) => {
    try {
        const { name, email, subject, category, message } = req.body;

        // Validate required fields
        if (!name || !email || !subject || !category || !message) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        // Send email
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: 'support@dga.com',
            subject: `[${category}] ${subject}`,
            html: `
                <h3>New Contact Form Submission</h3>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Category:</strong> ${category}</p>
                <p><strong>Subject:</strong> ${subject}</p>
                <p><strong>Message:</strong></p>
                <p>${message}</p>
            `
        });

        res.json({ success: true, message: 'Email sent successfully' });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ error: 'Failed to send email' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
```

**Frontend Update (`js/script.js`):**

```javascript
async submitToServer(data) {
    try {
        const response = await fetch('http://localhost:3000/api/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.error || 'Failed to submit form');
        }

        this.showSuccess();
        this.form.reset();
        
    } catch (error) {
        console.error('Error submitting form:', error);
        alert('An error occurred while submitting the form. Please try again.');
    } finally {
        this.submitBtn.disabled = false;
        this.submitBtn.classList.remove('loading');
    }
}
```

### Option 5: PHP Backend (Traditional Hosting)

Create `contact.php` in the same directory:

```php
<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    
    $name = htmlspecialchars($data['name']);
    $email = filter_var($data['email'], FILTER_SANITIZE_EMAIL);
    $subject = htmlspecialchars($data['subject']);
    $category = htmlspecialchars($data['category']);
    $message = htmlspecialchars($data['message']);
    
    // Validate email
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        http_response_code(400);
        echo json_encode(['error' => 'Invalid email address']);
        exit;
    }
    
    // Compose email
    $to = 'support@dga.com';
    $email_subject = "[$category] $subject";
    $email_body = "Name: $name\n";
    $email_body .= "Email: $email\n";
    $email_body .= "Category: $category\n\n";
    $email_body .= "Message:\n$message";
    
    $headers = "From: $email\r\n";
    $headers .= "Reply-To: $email\r\n";
    
    // Send email
    if (mail($to, $email_subject, $email_body, $headers)) {
        echo json_encode(['success' => true]);
    } else {
        http_response_code(500);
        echo json_encode(['error' => 'Failed to send email']);
    }
} else {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
}
?>
```

**Frontend Update:**

```javascript
async submitToServer(data) {
    try {
        const response = await fetch('contact.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.error || 'Failed to submit form');
        }

        this.showSuccess();
        this.form.reset();
        
    } catch (error) {
        console.error('Error submitting form:', error);
        alert('An error occurred while submitting the form. Please try again.');
    } finally {
        this.submitBtn.disabled = false;
        this.submitBtn.classList.remove('loading');
    }
}
```

## Security Considerations

When implementing a backend:

1. **Server-side Validation**: Always validate input on the server
2. **Rate Limiting**: Prevent spam by limiting submissions per IP
3. **CAPTCHA**: Add reCAPTCHA or hCaptcha for production
4. **Sanitization**: Clean user input to prevent XSS attacks
5. **CORS**: Configure proper CORS headers
6. **HTTPS**: Always use HTTPS in production
7. **Environment Variables**: Store sensitive data (API keys, passwords) securely
8. **Email Validation**: Verify email addresses server-side
9. **Spam Protection**: Consider honeypot fields or spam detection

## Testing

After integration:

1. Test with valid data
2. Test with invalid email formats
3. Test with missing required fields
4. Test with very long messages
5. Test special characters in inputs
6. Verify emails are received correctly
7. Test error handling

## Recommended Solution

For beginners: **Formspree** or **EmailJS** (no backend code required)
For Netlify users: **Netlify Forms** (built-in integration)
For custom needs: **Node.js backend** or **PHP** (full control)

## Support

Choose the option that best fits your:
- Technical expertise
- Hosting environment
- Budget constraints
- Scalability requirements
