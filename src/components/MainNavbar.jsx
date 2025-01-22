import React from 'react';
import { Link } from 'react-router-dom';

const MainNavbar = () => {
  return (
    <>
        <div className="mainNavbar">

            <div className="mainNavbarLeft">
                TrimHub
            </div>
            <div className="mainNavbarMid">
                <div className="mainNavbarMidItem">
                    <Link to="/">Home </Link>
                </div>
                <div className="mainNavbarMidItem">
                    Pricing
                </div>
                <div className="mainNavbarMidItem">
                    Services
                </div>


                <div className="mainNavbarMidItem">
                    Gallery
                </div>
                <div className="mainNavbarMidItem">
                    Blog
                </div>
                <div className="mainNavbarMidItem">
                    About Us
                </div>
                <div className="mainNavbarMidItem">
                    Contact Us
                </div>



            </div>
            <div className="mainNavbarRight">
                Phone Number
            </div>

        </div>
    </>
  );
};

export default MainNavbar;
