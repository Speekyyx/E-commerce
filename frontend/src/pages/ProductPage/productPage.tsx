// pages/products/[category]/[id].tsx

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Button } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const ProductPage: React.FC<{ product: any }> = ({ product }) => {
  const router = useRouter();
  const { id } = router.query;
  const [user, setUser] = useState<any>(null); // Etat pour stocker les données de l'utilisateur

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const accessToken = localStorage.getItem('accessToken');
        if (!accessToken) {
          console.error('No access token available');
          return;
        }

        const response = await axios.get('http://localhost:8000/api/users', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        setUser(response.data);
        console.log('User data:', response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  if (!product) {
    return <div>Product not found</div>;
  }

  const addToCart = async (productId: number) => {
    try {
      const accessToken = localStorage.getItem('accessToken');
      if (!accessToken) {
        toast.error('Please log in to add products to your cart.');
        return;
      }
  
      console.log('Adding product to cart...');
      const response = await axios.post(
        `http://localhost:8000/api/carts/${productId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
  
      console.log('Response:', response);
      
      if (response.status === 200) {
        toast.success('Product added to cart!');
        console.log('Product added to cart successfully!');
      } else {
        toast.error('Error adding product to cart!');
        console.error('Error adding product to cart:', response.data);
      }
    } catch (error) {
      toast.error('Error adding product to cart!');
      console.error('Error adding product to cart:', error);
    }
  };  

  return (
    <>
      <Navbar />
      <div style={styles.container}>
        <div style={styles.productInfo}>
          <h1>{product.title}</h1>
          <p>{product.description}</p>
          <p>{product.price}</p>
          <img src={product.image} alt={product.title} />
        </div>
        <Button
          variant="contained"
          color="primary"
          onClick={() => addToCart(parseInt(id as string))}
        >
          Add to Cart
        </Button>
        <ToastContainer />
      </div>
      <Footer />
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
  // Supposons que vous utilisez axios pour récupérer les chemins des produits depuis votre API
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
