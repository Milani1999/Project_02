import React from "react";
import "./Gallery.css";
import Slider from "react-slick";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import img1 from "../../assets/ImageResources/im01.jpg";
import img2 from "../../assets/ImageResources/im02.jpg";
import img3 from "../../assets/ImageResources/im03.jpg";
import img4 from "../../assets/ImageResources/im04.jpg";



function Gallery() {
    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,           //autorotate
        autoplaySpeed: 4000, 
    
        responsive: [
            {
              breakpoint: 1024,
              settings: {
                slidesToShow: 3,
                slidesToScroll: 3,
                infinite: true,
                dots: true
              }
            },
            {
              breakpoint: 600,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
                initialSlide: 2
              }
            },
            {
              breakpoint: 480,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1
              }
            }]
      };

  return (

    <div className="GalleryComponent" id="GalleryComponent">
      <div className="row">
        <h1 className="h1-heading">Gallery</h1></div>
    <Slider {...settings}>
        
    
        
    <div className="galleryimg">
        
     <img className="img-fluid" width={500} src={img1} alt="galimg" />
    </div>
    <div>
    <img className="img-fluid" width={500} src={img2} alt="galimg" />
    </div>
    <div>
    <img className="img-fluid" width={500} src={img3} alt="galimg" />
    </div>
    <div>
    <img className="img-fluid" width={500} src={img4} alt="galimg" />
    </div>
    <div>
    <img className="img-fluid"width={500} src={img1} alt="galimg" />
    </div>
    <div>
    <img className="img-fluid" width={500} src={img2} alt="galimg" />
    </div>
  </Slider>
  </div>
);
}

export default Gallery;
