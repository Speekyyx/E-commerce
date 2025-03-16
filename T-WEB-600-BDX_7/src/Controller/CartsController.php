<?php
namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Session\SessionInterface;
use Symfony\Component\Routing\Annotation\Route;
use App\Repository\ProductRepository;

class CartsController extends AbstractController
{
    #[Route('/api/carts', name: 'cart_list', methods: ['GET'])]
    public function list(SessionInterface $session, ProductRepository $productRepository): Response
    {
        $cart = $session->get('cart', []);
        $products = $productRepository->findBy(['id' => array_keys($cart)]);

        $data = [];
        foreach ($products as $product) {
            $data[] = [
                'id' => $product->getId(),
                'name' => $product->getName(),
                'price' => $product->getPrice(),
                'quantity' => $cart[$product->getId()],
            ];
        }

        return $this->json($data);
    }

    #[Route('/api/carts/{productId}', name: 'cart_add', methods: ['POST'])]
    public function addToCart(int $productId, ProductRepository $productRepository, SessionInterface $session): Response
    {
        $product = $productRepository->find($productId);
        if (!$product) {
            return $this->json(['message' => 'Product not found'], Response::HTTP_NOT_FOUND);
        }

        $cart = $session->get('cart', []);
        if (!array_key_exists($productId, $cart)) {
            $cart[$productId] = 0;
        }
        $cart[$productId]++;

        $session->set('cart', $cart);

        return $this->json(['message' => 'Product added to cart']);
    }

    #[Route('/api/carts/{productId}', name: 'cart_remove', methods: ['DELETE'])]
    public function removeFromCart(int $productId, SessionInterface $session): Response
    {
        $cart = $session->get('cart', []);
        if (!array_key_exists($productId, $cart)) {
            return $this->json(['message' => 'Product not found in cart'], Response::HTTP_NOT_FOUND);
        }

        if ($cart[$productId] > 1) {
            $cart[$productId]--;
        } else {
            unset($cart[$productId]);
        }

        $session->set('cart', $cart);

        return $this->json(['message' => 'Product removed from cart']);
    }

    #[Route('/api/carts/validate', name: 'cart_validate', methods: ['POST'])]
    public function validateCart(SessionInterface $session): Response
    {
        $session->set('cart', []);

        return $this->json(['message' => 'Cart validated']);
    }
}
