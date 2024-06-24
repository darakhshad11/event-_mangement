// ProductModal.jsx
import React from 'react';
import { Button, Typography } from '@mui/material';

const ProductModal = ({ open, handleClose, product, addToCart }) => {
  if (!open || !product) return null;

  const handleAddToCart = () => {
    addToCart(product);
    handleClose();
  };

  return (
    <div>
      <Typography variant="h6" component="h2">
        Product Details
      </Typography>
      <Typography variant="body1">
        Name: {product.name}
      </Typography>
      <Typography variant="body1">
        Description: {product.description}
      </Typography>
      {/* Add other product details here */}
      <Button onClick={handleAddToCart}>Add to Cart</Button>
      <Button onClick={handleClose}>Close</Button>
    </div>
  );
};

export default ProductModal;
