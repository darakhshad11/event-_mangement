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
  const [cart, setCart] = React.useState([]);
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

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  const handleCartClick = () => {
    navigate("/cart", { state: { cart } });
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
        <div style={{ padding: '10px', fontSize: '24px', fontWeight: 'bold', display: 'flex' }}>
          <span style={{ backgroundColor: '#f0f0f0', padding: '10px' }}>Welcome User</span>
        </div>
        <div style={{ display: 'flex' }}>
          <Button
            variant="outlined"
            color="primary"
            style={{ marginTop: '40px', marginBottom: '50px', fontSize: '18px', marginRight: '30px' }}
          >
            Vendor
          </Button>
          <Button
            variant="outlined"
            color="primary"
            style={{ marginTop: '40px', marginBottom: '50px', fontSize: '18px', marginRight: '30px' }}
            onClick={handleCartClick}
          >
            Cart
          </Button>
          <Button
            variant="outlined"
            color="primary"
            style={{ marginTop: '40px', marginBottom: '50px', fontSize: '18px', marginRight: '30px' }}
          >
            Guest List
          </Button>
          <Button
            variant="outlined"
            color="primary"
            style={{ marginTop: '40px', marginBottom: '50px', fontSize: '18px', marginRight: '30px' }}
          >
            Order status
          </Button>
        </div>
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
          }}
        >
          {products.length > 0 &&
            products.map((product) => {
              return (
                <div key={product.id} className="max-w-sm rounded overflow-hidden shadow-lg" onClick={() => handleProductClick(product)}>
                  <div className="px-6 py-4">
                    <div className="font-bold text-xl mb-2">{product.name}</div>
                    <p className="text-gray-700 text-base">{product.description}</p>
                    <p className="text-gray-600 text-sm mt-2">Updated Date: {product.date}</p>
                    <p className="text-gray-800 text-lg mt-2">${product.price}</p>
                    <p className="text-gray-800 text-lg mt-2">${product.image}</p>
                    <p className="text-gray-700 text-sm mt-2">Only {product.quantity} items left</p>
                  </div>
                  <div className="px-6 pt-4 pb-2">
                    <button onClick={() => addToCart(product)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">Add to Cart</button>
                  </div>
                </div>
              );
            })}
        </div>
        <ProductModal open={modalOpen} handleClose={handleCloseModal} product={selectedProduct} />
      </div>
    </>
  );
}
