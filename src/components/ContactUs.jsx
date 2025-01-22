import React from 'react';
import SocialMediaBar from './SocialMediaBar';
import BarberIcon from './Icons/BarberIcon';
import ContactUsForm from './ContactUsForm';


const ContactUs = () => {

 
  return (
    <>
      <div className='contactUs'>
            <div className='contactUsContainer'>
                <div className='contactUsContainerTop'>

                </div>
                <div className='contactUsContainerBottom'>
                    
                </div>
            </div>
            <div className='contactUsMain'>
                <div className='contactUsMainTop'>
                    <div className='contactUsMainTopLeft'>
                        <div className='contactUsMainTopLeftTop'>
                            GET IN TOUCH
                        </div>
                        <div className='contactUsMainTopLeftBottom'>
                            CONTACT US
                        </div>
                    </div>
                    <div className='contactUsMainTopRight'>
                    Feel free to reach out to us with your inquiries through either phone or email. We are here to provide you with the information you need.
                    </div>

                </div>
                <div className='contactUsMainBottom'>
                    <div className='contactUsMainBottomLeft'>
                    <ContactUsForm/>
                    {/*
                        <div className='contactUsMainBottomLeftHeading'>
                            Send Us a Message
                        </div>
                        <div className='contactUsMainBottomLeftForm'>
                            Name
                        </div>
                        <div className='contactUsMainBottomLeftFormField'>
                            {formData.name}
                        </div>
                        <div className='contactUsMainBottomLeftForm'>
                            Phone
                        </div>
                        <div className='contactUsMainBottomLeftFormField'>
                            {formData.phone}
                        </div>
                        <div className='contactUsMainBottomLeftForm'>
                            E-mail
                        </div>
                        <div className='contactUsMainBottomLeftFormField'>
                            {formData.email}
                        </div>
                        <div className='contactUsMainBottomLeftForm'>
                            message
                        </div>
                        <div className='contactUsMainBottomLeftFormField'>
                            {formData.message}
                        </div>
                        <div className='contactUsMainBottomLeftFormButton'>
                            Submit
                        </div> */}
                    </div>
                    <div className='contactUsMainBottomRight'>
                        
                        <div className='contactUsMainBottomRightItemHeading'>
                            Contact Information 
                        </div>
                        <div className='contactUsMainBottomRightItem'>
                            <div className='contactUsMainBottomRightItemLeft'>
                            Ic.
                            </div>
                            <div className='contactUsMainBottomRightItemRight'>
                            Address: 123 Main Street, Cityville, Stateburg, 98765
                            </div>
                        </div>
                        <div className='contactUsMainBottomRightItem'>
                            <div className='contactUsMainBottomRightItemLeft'>
                            Ic.
                            </div>
                            <div className='contactUsMainBottomRightItemRight'>
                            Hotline: (555) 123-4567
                            </div>
                        </div>

                        <div className='contactUsMainBottomRightItem'>
                            <div className='contactUsMainBottomRightItemLeft'>
                            Ic.
                            </div>
                            <div className='contactUsMainBottomRightItemRight'>
                            Email: info@barbershop.com
                            </div>
                        </div>

                        <div className='contactUsMainBottomRightItem'>
                            <div className='contactUsMainBottomRightItemLeft'>
                            Ic.
                            </div>
                            <div className='contactUsMainBottomRightItemRight'>
                                <div>Opening Hours: </div>
                                <div>Mon to Fri: 9.00am - 8.30pm</div>
                                <div>Sat: 10.00am - 6.30pm</div>
                                <div>Sun: Closed</div>

                            </div>
                        </div>
                        
                        <div className='contactUsMainBottomRightItemFooter'>
                            <div>FOLLOW US ON <BarberIcon/> </div>
                            <SocialMediaBar size={3}/>
                        </div>

                    </div>
                        
                </div>


                

            </div>
      </div>
    </>
  );
};

export default ContactUs;
