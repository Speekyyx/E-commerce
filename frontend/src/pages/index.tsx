import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import Navbar from "../components/Navbar";
import Card from "@/components/Card";
import Footer from "@/components/Footer";
import HomeCarousel from "@/components/HomeCarousel";
import HomeCarousel2 from "@/components/HomeCarousel2";
export default function Home() {
  const [firstThreeCards, setFirstThreeCards] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/products")
      .then((response) => response.json())
      .then((data) => {
        // Filtrer les trois premiers produits
        const firstThree = data.slice(0, 3);
        setFirstThreeCards(firstThree);
        console.log(data)
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, []);

  return (
    <main>
      <Navbar products={undefined} />
      <div className="carousel-margin">
        <HomeCarousel />
      </div>
      <div className="d-flex justify-content-around cards-margin">
        {firstThreeCards.map((card) => (
          <Card
            key={card.id}
            id={card.id}
            category={card.category} // Passer la catégorie à la carte
            name={card.name}
            description={card.description}
            price={card.price}
            image={card.photo} // Utilisation de "photo" au lieu de "image"
          />
        ))}
      </div>
      <div className="carousel2-margin">
        <HomeCarousel2 />
      </div>
      <div
        id="container-30aaf9bbde"
        className="cmp-container"
        data-component="cmp-container"
      >
      
        <div
          className="cmp-container__image cover"
          style={{
            backgroundImage:
              'url("https://www.amd.com/content/dam/amd/en/images/backgrounds/abstract/1579650-twa-ai.jpg")',
            backgroundAttachment: "fixed",
          }}
        >
          <div className="cmp-container__content">
            <div className="button-container">
              <Button variant="dark" className="about-button">
                About
              </Button>
            </div>
          </div>
        </div>
        <div className="cmp-container__content"></div>
      </div>
      <div className="footer-margin">
        <Footer />
      </div>
      <style jsx>{`
        main {
          background-color: #000;
        }
        .carousel-margin {
          margin-bottom: 20px;
        }
        .cards-margin {
          margin-bottom: 20px;
        }
        .carousel2-margin {
          margin-bottom: 20px;
        }
        .footer-margin {
          margin-top: 20px;
        }
        .cmp-container__image {
          position: relative;
          width: 100%;
          height: 0;
          padding-top: 50%;
          overflow: hidden;
        }

        .cmp-container__image.cover {
          background-size: cover;
          background-position: center;
        }

        .cmp-container__content {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .button-container {
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 20px;
          border-radius: 10px;
        }

        .about-button {
          color: #fff;
        }
      `}</style>
    </main>
  );
}


const styles = {
  card: {
    borderRadius: '5px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    overflow: 'hidden',
    backgroundColor: '#000',
    color: '#fff',
    marginBottom: '20px',
  },
  cardImage: {
    width: '100%',
    height: '300px', // Hauteur fixe pour les images
    objectFit: 'cover', // Pour couvrir toute la zone de l'image
  },
  cardContent: {
    padding: '20px',
  },
  cardTitle: {
    fontSize: '1.5rem',
    marginBottom: '10px',
  },
  cardDescription: {
    marginBottom: '10px',
  },
  cardButton: {
    width: '100%', // Bouton prend 100% de la largeur du contenu de la carte
    textAlign: 'center', // Bouton centré horizontalement
  },
  priceAndLink: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardId: {
    
  }
};
