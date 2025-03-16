<?php
namespace App\Controller;

use App\Entity\Order;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Http\Attribute\IsGranted;


class OrderController extends AbstractController
{
    private $entityManager;
    #[Route('/api/orders', name: 'list', methods: ['GET'])]
    public function __construct(EntityManagerInterface $entityManager)
    {
        $this->entityManager = $entityManager;
    }

    #[Route('/api/orders', name: 'list', methods: ['GET'])]
    #[IsGranted('ROLE_USER')]
    public function listOrders(): JsonResponse
    {
        $user = $this->getUser();
        $orders = $this->entityManager->getRepository(Order::class)->findBy(['user' => $user]);

        $ordersData = [];
        foreach ($orders as $order) {
            $ordersData[] = $this->serializeOrder($order);
        }

        return $this->json($ordersData);
    }

    #[Route('/api/orders/{orderId}', name: 'show', methods: ['GET'])]
    #[IsGranted('ROLE_USER')]
    public function showOrder(int $orderId): JsonResponse
    {
        $user = $this->getUser();
        $order = $this->entityManager->getRepository(Order::class)->find($orderId);

        if (!$order || $order->getUser() !== $user) {
            return $this->json(['message' => 'Order not found or not authorized'], 404);
        }

        return $this->json($this->serializeOrder($order));
    }
    private function serializeOrder(Order $order): array
    {
        $productsData = [];
        foreach ($order->getProducts() as $product) {
            $productsData[] = [
                'id' => $product->getId(),
                'name' => $product->getName(),
                'description' => $product->getDescription(),
                'photo' => $product->getPhoto(),
                'price' => $product->getPrice(),
            ];
        }

        return [
            'id' => $order->getId(),
            'totalPrice' => $order->getTotalPrice(),
            'creationDate' => $order->getCreationDate()->format('Y-m-d H:i:s'),
            'products' => $productsData,
        ];
    }
}
