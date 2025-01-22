import React from 'react';
import { useState } from 'react';
import { submitFormData } from '../services/api';
import axios from 'axios';

const ContactUsForm = () => {

     // State to track if the user has interacted with the field

  const [clickedFields, setClickedFields] = useState({
    name:false,
    email:false,
    message:false,
    phone:false,
  });

    // State to store form data
  const [formData, setFormData] = useState({
    name: 'Jane Smith',
    email: 'Jane@example.com',
    message: "I'd love to hear more!",
    phone: '(123) 456-7890'
  });

  

    const handleClick = (event) => {
      const fieldName = event.target.name;
      if (!clickedFields[fieldName]) {
        setFormData({
          ...formData,
          [fieldName]: '',
        });
        setClickedFields({
          ...clickedFields,
          [fieldName]: true,
        });
      }
    };
      
    const handleChange = (event) => {
      const { name, value } = event.target;
      setFormData({
        ...formData,
        [name]: value,
      });
    };
  
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
          const response = await submitFormData(formData);
          console.log('Form submitted successfully (handleSubmit on frontend): ', response);
          // handle success, e.g., show a success message
        } catch (error) {
          console.error('Error submitting form (handlesubmit on frontend):', error);
          // handle error, e.g., show an error message
        }
      };

  
    return (
      <>
        <form onSubmit={handleSubmit}>
            <div className='contactUsMainBottomLeftHeading'>
                Send Us a Message
            </div>
            <div className='contactUsMainBottomLeftForm'>
                Name
            </div>
            <div className='contactUsMainBottomLeftFormField'>
                <label htmlFor="name"></label>
                <input
                    type="text"
                    id="guest"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    onClick={handleClick}
                />
            </div>
            <div className='contactUsMainBottomLeftForm'>
                Phone
            </div>
            <div className='contactUsMainBottomLeftFormField'>
                <label htmlFor="phone"></label>
                <input
                    type="phone"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    onClick={handleClick}
                />
            </div>
            <div className='contactUsMainBottomLeftForm'>
                E-mail
            </div>
            <div className='contactUsMainBottomLeftFormField'>
                <label htmlFor="email"></label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        onClick={handleClick}
                    />
            </div>
            <div className='contactUsMainBottomLeftForm'>
                message
            </div>
            <div className='contactUsMainBottomLeftFormField'>
                <label htmlFor="message"></label>
                <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                onClick={handleClick}
                />
            </div>
            <div className='contactUsMainBottomLeftForm'>
                 
            </div>
            <div className='contactUsMainBottomLeftFormButton' type="submit">
                <button className='contactUsMainBottomLeftFormButton' type="submit">Submit</button>
            </div>

        </form>
      </>
    );
  };
  
  export default ContactUsForm;
  