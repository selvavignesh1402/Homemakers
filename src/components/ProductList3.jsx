import React, { useState } from 'react';
import ProductCard from './ProductCard';
import './ProductCard.css';
import Navbar from './Navbar';
import p20 from './images/p20.jpg';
import p21 from './images/p21.jpg';
import p22 from './images/p22.jpg';
import p23 from './images/p23.jpg';
import p24 from './images/p24.webp';
import p25 from './images/p25.webp';
import p26 from './images/p26.jpg';
import p27 from './images/p27.jpg';
import { useCart } from './CartContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from './Footer';

const products = [
  { id: 17, image: p24, name: 'Vintage Rectangle Necklace', price: 50.00 },
  { id: 18, image: p25, name: 'Vintage Rectangle Necklace', price: 50.00 },
  { id: 19, image: p26, name: 'Vintage Rectangle Necklace', price: 50.00 },
  { id: 20, image: p27, name: 'Vintage Rectangle Necklace', price: 50.00 },
  { id: 21, image: p20, name: 'Tribal Dreamcatcher Necklace', price: 85.00 },
  { id: 22, image: p21, name: 'Vintage Rectangle Necklace', price: 50.00 },
  { id: 23, image: p22, name: 'Vintage Rectangle Necklace', price: 50.00 },
  { id: 24, image: p23, name: 'Vintage Rectangle Necklace', price: 50.00 },
];

const ProductList3 = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { addToCart } = useCart();

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handleAddToCart = (product) => {
    addToCart(product);
    toast.success('Item added to Bag successfully!');
  };


  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <Navbar onSearch={handleSearch} />
      <div className="grid">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} handleAddToCart={handleAddToCart} />
        ))}
      </div>
      <ToastContainer />
      <br />
      <br />
      <br />
      <br />
      <div className="extra-content">
        <div className="video-container">
          <video className="extra-video" autoPlay muted loop>
            <source src="/videos/pd6.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <div className="video-overlay"></div>
        </div>
        <div className="extra-content-text">
          <h2>Handmade Textiles</h2>
          <p>
            Immerse yourself in the world of handmade textiles. Each piece is a testament to the skill and creativity of our artisans, crafted with care and precision. From intricate weaves to vibrant prints, discover the beauty and uniqueness of our textile collection.
          </p>
        </div>
      </div>
      <br />
      <br />
      <Footer/>
    </div>
  );
};

export default ProductList3;