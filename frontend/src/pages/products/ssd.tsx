import React, { useEffect, useState } from 'react';
import Card from '@/components/Card';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const Ssd = () => {
  const [ssdCards, setSsdCards] = useState([]);

  useEffect(() => {
    // Récupérer les données des produits depuis votre API Symfony
    fetch('http://127.0.0.1:8000/api/products')
      .then(response => response.json())
      .then(data => {
        // Filtrer les données pour ne récupérer que celles avec la catégorie "cpu"
        const filteredSsdCards = data.filter(card => card.category === 'ssd');
        setSsdCards(filteredSsdCards);
      })
      .catch(error => console.error('Error fetching products:', error));
  }, []);

  return (
    <main>
      <Navbar products={ssdCards} category='ssd' />
      <div style={styles.cardsContainer}>
        {ssdCards.map(card => (
          <Card
            key={card.id}
            id={card.id}
            category={card.category}
            name={card.name}
            description={card.description}
            price={card.price}
            image={card.image}
          />
        ))}
      </div>
      <Footer />
    </main>
  );
};

const styles = {
  cardsContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)', // 4 cards per row
    gap: '20px',
    marginTop: '80px',
    padding: '20px',
    backgroundColor: '#000',
    overflow: 'hidden',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    borderColor: 'black',
  },
};

export default Ssd;
