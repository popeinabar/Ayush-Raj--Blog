import React from 'react';
import { FaArrowAltCircleRight, FaArrowAltCircleLeft } from 'react-icons/fa';
import { Image } from '@chakra-ui/react';
import '../pages/Home.css'

// FullBlog component
import { FaTimes } from 'react-icons/fa';

const FullBlog = ({ blog, handlePrev, handleNext, handleClose }) => {
  return (
    <div className="full-blog-overlay">
      <FaTimes className="full-blog-close" onClick={handleClose} />
      <div className="full-blog-content">
        <h3>{blog.title}</h3>
        <Image src={blog.Image} alt={blog.title} className="full-blog-image" />
        <p>{blog.desc}</p>
      </div>
      <div className="full-blog-navigation">
        <FaArrowAltCircleLeft onClick={handlePrev} style={{ fontSize: '24px', marginRight: '20px', cursor: 'pointer' }} />
        <FaArrowAltCircleRight onClick={handleNext} style={{ fontSize: '24px', cursor: 'pointer' }} />
      </div>
    </div>
  );
};


export default FullBlog;
