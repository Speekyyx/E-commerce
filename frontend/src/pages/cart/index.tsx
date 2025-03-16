import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

function CartPage() {
  const [cartItems, setCartItems] = useState<any[]>([]);

  useEffect(() => {
    // Récupérer les articles du panier depuis le localStorage lors du chargement initial
    const storedCartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
    setCartItems(storedCartItems);
  }, []); // Le tableau vide assure que useEffect s'exécute une seule fois

  const removeFromCart = (productId: number) => {
    // Fonction pour retirer un article du panier
    const newCartItems = cartItems.filter((item) => item.id !== productId);
    setCartItems(newCartItems);
    localStorage.setItem('cartItems', JSON.stringify(newCartItems));
  };

  return (
    <>
      <Navbar />
      <div style={styles.container}>
        <h1>Cart</h1>
        <div style={styles.cartContainer}>
          <ul style={styles.cartList}>
            {cartItems.map((item, index) => (
              <li key={index} style={styles.cartItem}>
                <div style={styles.itemInfo}>
                  <img src={item.photo} alt={item.title} style={styles.itemImage} />
                  <div style={styles.itemDetails}>
                    <span>{item.name}</span>
                    <span>Price: {item.price}</span>
                    <span>Quantity: {item.quantity}</span>
                    <button onClick={() => removeFromCart(item.id)}>Remove</button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <Footer />
    </>
  );
}

const styles = {
  container: {
    padding: '20px',
    paddingBottom: '330px',
    marginTop: '100px',
  },
  cartContainer: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  cartList: {
    listStyleType: 'none',
    padding: 0,
    width: '70%',
  },
  cartItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottom: '1px solid #ccc',
    padding: '10px 0',
  },
  itemInfo: {
    display: 'flex',
    alignItems: 'center',
  },
  itemImage: {
    width: '100px',
    marginRight: '20px',
  },
  itemDetails: {
    display: 'flex',
    flexDirection: 'column',
  },
};

export default CartPage;
