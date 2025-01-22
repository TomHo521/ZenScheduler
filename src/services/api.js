export const submitFormData = async (data) => {
  try {
    const response = await fetch('http://localhost:5000/api/forms/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    // Check if the response is not ok
    if (!response.ok) {
      throw new Error('Failed to submit data');
    }

    const responseData = await response.json();
    console.log('Form submitted successfully:', responseData);
  } catch (error) {
    console.error('Error during form submission:', error);
  }
};
