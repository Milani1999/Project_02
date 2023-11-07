import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from "axios";

import "./Gallery.css";

function Gallery() {
  const [imageList, setImageList] = useState([]);

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const response = await axios.get("/api/gallery/get");
      console.log("Response",response);
      setImageList(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="GalleryComponent" id="GalleryComponent">
      <div className="row">
        <h1 className="h1-heading">Gallery</h1>
      </div>
      <Slider {...settings}>
        {imageList.map((image) => (
          <div key={image._id} className="galleryimg">
            <img
              className="img-fluid"
              width={500}
              src={image.image}
              alt="Gallery"
            />
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default Gallery;
