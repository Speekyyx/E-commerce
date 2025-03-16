import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Button, Dialog, Slide, DialogTitle, DialogContent, DialogActions, List, ListItem, ListItemText, IconButton } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import axios from 'axios';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="left" ref={ref} {...props} />;
});

const ProductPage: React.FC<{ product: any }> = ({ product }) => {
  const router = useRouter();
  const { id } = router.query;
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    const storedCartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
    setCartItems(storedCartItems);
  }, []);

  const addToCart = (product: any) => {
    const existingProductIndex = cartItems.findIndex((item) => item.id === product.id);

    let newCartItems;
    if (existingProductIndex >= 0) {
      newCartItems = cartItems.map((item, index) => {
        if (index === existingProductIndex) {
          return { ...item, quantity: item.quantity + 1 };
        }
        return item;
      });
    } else {
      newCartItems = [...cartItems, { ...product, quantity: 1 }];
    }

    setCartItems(newCartItems);
    localStorage.setItem('cartItems', JSON.stringify(newCartItems));
    toast.success('Product added to cart!');
    setOpenModal(true);
  };

  const removeFromCart = (productId: number) => {
    const newCartItems = cartItems.filter((item) => item.id !== productId);
    setCartItems(newCartItems);
    localStorage.setItem('cartItems', JSON.stringify(newCartItems));
    toast.success('Product removed from cart!');
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleViewCart = () => {
    setOpenModal(false);
    router.push('/cart');
  };

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <>
      <Navbar />
      <div style={styles.container}>
        <div style={styles.productInfo}>
          <h1>{product.title}</h1>
          <p>{product.description}</p>
          <p>{product.price}</p>
          <img src={product.photo} alt={product.title} />
        </div>
        <Button
          variant="contained"
          color="primary"
          onClick={() => addToCart(product)}
        >
          Add to Cart
        </Button>
        <ToastContainer />
      </div>
      <Footer />

      {/* Modal for Cart Items */}
      <Dialog
        open={openModal}
        onClose={handleCloseModal}
        TransitionComponent={Transition}
        PaperProps={{
          style: {
            position: 'fixed',
            right: 0,
            top: '50%',
            transform: 'translateY(-50%)',
            width: '400px',
            height: '100%'
          },
        }}
      >
        <DialogTitle>Cart Items</DialogTitle>
        <DialogContent>
          <List>
            {cartItems.map((item, index) => (
              <ListItem key={index} secondaryAction={
                <IconButton edge="end" aria-label="delete" onClick={() => removeFromCart(item.id)}>
                  Remove
                </IconButton>
              }>
                <ListItemText
                  primary={item.title}
                  secondary={`Price: ${item.price}, Quantity: ${item.quantity}`}
                />
              </ListItem>
            ))}
          </List>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal} color="primary">
            Continue Shopping
          </Button>
          <Button onClick={handleViewCart} color="secondary">
            View Cart
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '20px',
    marginTop: '100px',
  },
  productInfo: {
    marginRight: '20px',
  },
};

export async function getStaticPaths() {
  try {
    const response = await axios.get('http://localhost:8000/api/products');
    const products = response.data;

    const paths = products.map((product) => ({
      params: { category: product.category, id: String(product.id) },
    }));

    return { paths, fallback: false };
  } catch (error) {
    console.error('Error fetching product paths:', error);
    return { paths: [], fallback: false };
  }
}

export async function getStaticProps({ params }) {
  try {
    const response = await axios.get(`http://localhost:8000/api/products/${params.id}`);
    const product = response.data;

    return { props: { product } };
  } catch (error) {
    console.error('Error fetching product:', error);
    return { props: { product: null } };
  }
}

export default ProductPage;
