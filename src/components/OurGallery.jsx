import React from 'react';

const OurGallery = () => {
  return (
    <>
        <div className="ourGalleryContainer">

            <div className="ourGalleryTop">

                <div className='ourGalleryTopLeft'>
                    <div className="ourGalleryTopLeftTop">
                        OUR PHOTO GALLERY
                    </div>
                    <div className="ourGalleryTopLeftBottom">
                        OUR SHOP IN IMAGES
                    </div>
                </div>

                <div className="ourGalleryTopRight">
                    <div className="ourGalleryTopRightButton">
                        VIEW GALLERY → 
                    </div>
                </div>

            </div>

        </div>

        <div className='ourGalleryBottom'>
            <div className='ourGalleryCarousel'>
                <div className="ourGalleryCarouselPic">
                    <img src='../src/assets/images/gallery1.png'/>
                </div>
                <div className="ourGalleryCarouselPic">
                    <img src='../src/assets/images/gallery2.png'/>
                </div>
                <div className="ourGalleryCarouselPic">
                    <img src='../src/assets/images/gallery3.png'/>
                </div>
                <div className="ourGalleryCarouselPic">
                    <img src='../src/assets/images/gallery4.png'/>
                </div>

                <div className="ourGalleryCarouselPic">
                    <img src='../src/assets/images/gallery1.png'/>
                </div>
                <div className="ourGalleryCarouselPic">
                    <img src='../src/assets/images/gallery2.png'/>
                </div>
                <div className="ourGalleryCarouselPic">
                    <img src='../src/assets/images/gallery3.png'/>
                </div>
                <div className="ourGalleryCarouselPic">
                    <img src='../src/assets/images/gallery4.png'/>
                </div>
            </div>

        </div>
    </>
  );
};

export default OurGallery;
