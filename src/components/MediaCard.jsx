// MediaCard.js

import React from 'react';
import Navbar from './Navbar';
import fetchProduct from '../api/fetchProducts';
import {
  Button,
} from '@mui/material';
import ProductModal from './ProductModal';
import { useNavigate } from 'react-router-dom';

export default function MediaCard() {
  const [products, setProducts] = React.useState([]);
  const [selectedProduct, setSelectedProduct] = React.useState(null);
  const [modalOpen, setModalOpen] = React.useState(false);
  const navigate = useNavigate();

  const getData = React.useRef(() => {});

  getData.current = async () => {
    const savedData = await fetchProduct();
    setProducts(savedData);
  };

  React.useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user')) || { role: '' };
    if (user.role) {
      if (user.role === 'vendor') {
        window.location.href = '/vendor-page';
      } else {
        getData.current();
      }
    } else {
      window.location.href = '/';
    }
  }, []);

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setModalOpen(true);
  };

  const handleAddToCart = () => {
    localStorage.setItem('cart', JSON.stringify(selectedProduct));
    navigate("/cart");
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <>
      <Navbar name="USER" />

      <div
        style={{
          width: '80%',
          margin: 'auto',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          marginTop: '20px',
        }}
      >
        {/* Your existing code */}
        <div className="px-6 pt-4 pb-2">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full" onClick={handleAddToCart}>Add to Cart</button>
        </div>
        {/* Your existing code */}
      </div>
      <ProductModal open={modalOpen} handleClose={handleCloseModal} product={selectedProduct} />
    </>
  );
}
