// api/submit-form.js
export default async function handler(req, res) {
  // Set proper headers first
  res.setHeader('Content-Type', 'application/json');
  
  try {
    if (req.method !== 'POST') {
      return res.status(405).json({ 
        error: 'Method not allowed',
        message: 'Only POST requests are accepted'
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
