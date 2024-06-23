import React from 'react';
import {
  Modal,
  Backdrop,
  Fade,
  Typography,
  Button,
  styled,
} from '@mui/material';

const Paper = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  border: '2px solid #000',
  boxShadow: theme.shadows[5],
  padding: theme.spacing(2, 4, 3),
}));

export default function ProductModal({ open, handleClose, product }) {
  if (!product) {
    return null; // or some placeholder if product is null
  }

  return (
    <Modal
      open={open}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={open}>
        <Paper>
          <Typography variant="h5" gutterBottom>
            {product.name}
          </Typography>
          <Typography variant="body1" gutterBottom>
            {product.description}
          </Typography>
          <Typography variant="body2" gutterBottom>
            Updated Date: {product.date}
          </Typography>
          <Typography variant="body1" gutterBottom>
            Price: ${product.price}
          </Typography>
          <Typography variant="body2" gutterBottom>
            Quantity: {product.quantity}
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              // Handle adding to cart logic here
              console.log('Added to cart:', product.name);
              handleClose();
            }}
          >
            Add to Cart
          </Button>
        </Paper>
      </Fade>
    </Modal>
  );
}
