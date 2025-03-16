// pages/AddToCartPage.js
import { useRouter } from 'next/router';
import cardsData from '@/data/cardsData';

function AddToCartPage() {
  const router = useRouter();
  const { productId } = router.query; // Récupérez l'ID du produit à partir des paramètres de l'URL

  // Récupérez les informations du produit en fonction de son ID
  const product = cardsData.find(card => card.id === parseInt(productId));

  // Fonction pour ajouter le produit au panier
  const addToCart = () => {
    console.log('Product added to cart:', product);
  };

  return (
    <div>
      <h1>Add to Cart Page</h1>
      {product && (
        <div>
          <h2>{product.title}</h2>
          <p>Description: {product.description}</p>
          <p>Price: {product.price}</p>
          <button onClick={addToCart}>Add to Cart</button>
        </div>
      )}
    </div>
  );
}

export default AddToCartPage;
