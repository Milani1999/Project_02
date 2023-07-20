import React from 'react';
import "./NewsCard.css";

const NewsCard = ({
  ImgSrc,
  ImgAlt,
  title,
  description,
  btnText,
  link}) => {
  return (
    <div className='card-container'>
      {ImgSrc && ImgAlt && (
        <img src={ImgSrc} alt={ImgAlt} className='card-img'/>
      )}
      {title && (
        <h3 className='card-title'>{title}</h3>
      )}
      {description && (
        <p className='card-desc'>{description}</p>
      )}
      {btnText && (
        <a href={link} className='card-btn'>{btnText}</a>
      )}
    </div>
  )
}

export default NewsCard;
