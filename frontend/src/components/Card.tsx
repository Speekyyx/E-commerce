// Card.tsx
import React from 'react';
import Link from 'next/link';

interface CardProps {
  id: number;
  category: string;
  name: string;
  description: string;
  price: string;
  photo: string;
}

const Card: React.FC<CardProps> = ({ id, category, name, description, price, photo }) => {
  return (
    <div style={styles.cardContainer}>
      <Link href={`/products/${category}/${id}`} passHref>
          <div className="card" style={styles.card}>
            <img src={photo} alt={name} className="card-image" style={styles.cardImage} />
            <div className="card-content" style={styles.cardContent}>
              <h2 className="card-title" style={styles.cardTitle}>{name}</h2>
              <p className="card-description" style={styles.cardDescription}>{description}</p>
              <div className="price-and-link" style={styles.priceAndLink}>
                <p className="card-price" style={styles.cardPrice}>{price}€</p>
              </div>
            </div>
          </div>
      </Link>
    </div>
  );
}

const styles = {
  cardContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: '20px',
    zIndex: 2000,
  },
  card: {
    border: '1px solid #ddd',
    borderRadius: '5px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    overflow: 'hidden',
    backgroundColor: 'rgb(9, 9, 9)', // Fond de couleur noir
    color: '#fff', // Texte en blanc
    borderColor: "black"
  },
  cardImage: {
    width: '100%',
    height: 'auto',
  },
  cardContent: {
    padding: '20px',
    maxWidth: '300px',
  },
  cardTitle: {
    fontSize: '1.5rem',
    marginBottom: '10px',
  },
  cardDescription: {
    marginBottom: '10px',
    color: '#fff', // Texte en blanc
  },
  cardPrice: {
    fontWeight: 'bold',
    color: '#007bff',
  },
  priceAndLink: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardLink: {
    textDecoration: 'none',
    color: '#007bff',
    cursor: 'pointer',
  },
};

export default Card;
