
// api/submit-form.js

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle OPTIONS request (for CORS preflight)
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ 
      success: false,
      error: 'Method not allowed',
      message: 'Only POST requests are accepted'
    });
  }

  try {
    // Get form data from request body
    const { name, email, message } = req.body;

    // Basic validation
    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        error: 'Validation failed',
        message: 'All fields are required'
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        error: 'Validation failed',
        message: 'Please enter a valid email address'
      });
    }

    // Log the submission (in production, you'd save to a database here)
    console.log('New form submission:', {
      name,
      email,
      message: message.substring(0, 100) + (message.length > 100 ? '...' : ''), // Log preview
      timestamp: new Date().toISOString(),
      ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress
    });

    // Here you could add:
    // - Database storage (MongoDB, Firebase, etc.)
    // - Email notification (using Nodemailer)
    // - Integration with a CRM or other service

    // Send success response
    return res.status(200).json({
      success: true,
      message: 'Thank you for your message! I will get back to you soon.',
      data: {
        name,
        email,
        // Don't return full message in response for privacy
        received: true,
        timestamp: new Date().to
