// Add at the top of submit-form.js
import nodemailer from 'nodemailer';

// Configure transporter (using Gmail as example)
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// Inside your handler function, after validation:
const mailOptions = {
  from: process.env.EMAIL_USER,
  to: process.env.YOUR_PERSONAL_EMAIL,
  subject: `New message from ${name}`,
  text: `
    Name: ${name}
    Email: ${email}
    Message: ${message}
  `,
  html: `
    <h2>New Contact Form Submission</h2>
    <p><strong>Name:</strong> ${name}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Message:</strong></p>
    <p>${message.replace(/\n/g, '<br>')}</p>
  `
};

await transporter.sendMail({
  // ... other fields
  text: `
    New message from your website:
    Name: ${name}
    Email: ${email}
    Message: 
    ${message}
  `,
  html: `
    <h2>New Contact Form Submission</h2>
    <p><strong>From:</strong> ${name} &lt;${email}&gt;</p>
    <p><strong>Message:</strong></p>
    <div style="border: 1px solid #ddd; padding: 15px; margin: 10px 0; white-space: pre-line">
      ${message}
    </div>
  `
});
    }

    const { name, email, message } = req.body;

    // Validate input
    if (!name || !email || !message) {
      return res.status(400).json({
        error: 'Missing fields',
        message: 'All fields are required'
      });
    }

    // Simple email validation
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({
        error: 'Invalid email',
        message: 'Please enter a valid email address'
      });
    }

    // Log the submission (replace with your actual processing)
    console.log('Form submission:', { name, email, message });

    // Successful response
    return res.status(200).json({
      success: true,
      message: 'Message received successfully!'
    });

  } catch (error) {
    console.error('Server error:', error);
    return res.status(500).json({
      error: 'Server error',
      message: 'An unexpected error occurred'
    });
  }
}
