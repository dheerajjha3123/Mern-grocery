import React from 'react';
import './About.css'; // Import the CSS file
import AboutImage from "../assest/aboutImg.jpg"
import { Link } from 'react-router-dom';

const About = () => {
 return (
    <div className="responsive-container-block bigContainer">
      <div className="responsive-container-block Container">
        <div className="imgContainer">
          <img className="blueDots" src="https://workik-widget-assets.s3.amazonaws.com/widget-assets/images/aw3.svg" alt="Blue Dots" />
          <img src={AboutImage} className="mainImg"  alt="Main Image" />
        </div>
        <div className="responsive-container-block textSide">
          <p className="text-blk heading">About Us</p>
          <p className="text-blk subHeading">
          At Sanesh, we're more than just a retailer - we're a community dedicated to providing you with the best shopping experience possible. Established in 2023, we've been serving customers with top-quality products and exceptional service ever since.

Our passion for Grocery  is what drives us every day. Whether you're looking for Fruites , Vegetables, Grocery Essential  or simply seeking inspiration, we're here to help you find exactly what you need. From the latest trends to timeless classics, we curate our selection with care, ensuring that every item meets our high standards of quality and style.
          </p>
          {/* Product Highlights */}
          <div className="product-highlights">
            <h2 className="text-blk heading">Our Products</h2>
            <p className="text-blk subHeading">
            We pride ourselves on offering the best deals on a wide range of grocery essentials, fresh fruits, and crisp vegetables. From pantry staples to seasonal delights, we've got everything you need to stock your kitchen without breaking the bank.Explore our aisles filled with top-quality grocery items at prices that won't disappoint. Whether you're looking for breakfast favorites, cooking essentials, or snacks to satisfy your cravings, we've got you covered. With frequent specials and discounts, you'll always find great value at Sanesh Store.  
            Fresh Fruits: Indulge in nature's bounty with our selection of fresh, hand-picked fruits. From juicy apples to sweet berries and tropical delights, our fruits are sourced directly from local farms to ensure peak freshness and flavor. Enjoy the goodness of nature at prices you'll love. 
            </p>
            
    
    
    
  
            {/* Add your product cards here */}
          </div>
          {/* Customer Testimonials */}
          
          {/* Call to Action */}
          <Link to={"/"}>
          
            <button className="explore">Explore our Product</button>
            </Link>
        </div>
        <img className="redDots" src="https://workik-widget-assets.s3.amazonaws.com/widget-assets/images/cw3.svg" alt="Red Dots" />
      </div>
    </div>
 );
}

export default About;
