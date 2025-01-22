export const submitForm = async (req, res) => {
    try {
      const formData = req.body;
  
      // Here you would handle form data (e.g., save to database, process, etc.)
      // For this example, we're just sending the data back in the response
      res.status(200).json({
        success: true,
        message: 'Form submitted successfully!',
        data: formData,
      });
    } catch (error) {
      console.error('Error submitting form:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to submit form (backend)',
      });

    }
  };
