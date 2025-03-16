<?php

namespace App\Controller;

use App\Entity\Product;
use App\Repository\ProductRepository;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Http\Attribute\IsGranted;
use Symfony\Component\Validator\Validator\ValidatorInterface;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class ProductController extends AbstractController
{
    #[Route('/api/products', name: 'create_product', methods: ['POST'])]
    public function create(Request $request, ValidatorInterface $validator, EntityManagerInterface $entityManager): Response
    {
        $data = json_decode($request->getContent(), true);

        $product = new Product();
        $product->setName($data['name'] ?? '');
        $product->setDescription($data['description'] ?? '');
        $product->setPhoto($data['photo'] ?? '');
        $product->setPrice($data['price'] ?? 0);

        $errors = $validator->validate($product);
        if (count($errors) > 0) {
            $errorsString = (string) $errors;
            return $this->json(['error' => $errorsString], Response::HTTP_BAD_REQUEST);
        }

        $entityManager->persist($product);
        $entityManager->flush();

        return $this->json([
            'message' => 'Product created successfully!',
            'product' => [
                'id' => $product->getId(),
                'name' => $product->getName(),
                'description' => $product->getDescription(),
                'price' => $product->getPrice()
            ]
        ], Response::HTTP_CREATED);
    }

    #[Route('/api/products', name: 'get_list_product', methods: ['GET'])]
    public function list(ProductRepository $productRepository): Response
    {
        $products = $productRepository->findAll();
        $data = [];
        foreach ($products as $product) {
            $data[] = [
                'id' => $product->getId(),
                'name' => $product->getName(),
                'description' => $product->getDescription(),
                'price' => $product->getPrice(),
                'category' => $product->getCategory(),
                'photo' => $product->getPhoto()
            ];
        }
        return $this->json($data);
    }
    
    #[Route('/api/products/{id}', name: 'get_information_product', methods: ['GET'])]
    public function show(ProductRepository $productRepository, int $id): Response
    {
        $product = $productRepository->find($id);
        if (!$product) {
            return $this->json(['error' => 'Product not found'], Response::HTTP_NOT_FOUND);
        }
        return $this->json([
            'id' => $product->getId(),
            'name' => $product->getName(),
            'description' => $product->getDescription(),
            'price' => $product->getPrice()
        ]);
    }
    #[Route('/api/products/{id}', name: 'update_product', methods: ['PUT'])]
    #[IsGranted('ROLE_ADMIN')]
    public function update(Request $request,ProductRepository $productRepository,EntityManagerInterface $entityManager,ValidatorInterface $validator, int $id ): Response {
        $product = $productRepository->find($id);
        if (!$product) {
            return $this->json(['error' => 'Product not found'], Response::HTTP_NOT_FOUND);
        }

        $data = json_decode($request->getContent(), true);
        $product->setName($data['name'] ?? $product->getName());
        $product->setDescription($data['description'] ?? $product->getDescription());
        $product->setPhoto($data['photo'] ?? $product->getPhoto());
        $product->setPrice($data['price'] ?? $product->getPrice());

        $errors = $validator->validate($product);
        if (count($errors) > 0) {
            $errorsString = (string) $errors;
            return $this->json(['error' => $errorsString], Response::HTTP_BAD_REQUEST);
        }

        $entityManager->persist($product);
        $entityManager->flush();

        return $this->json([
            'message' => 'Product updated successfully!',
            'product' => [
                'id' => $product->getId(),
                'name' => $product->getName(),
                'description' => $product->getDescription(),
                'photo' => $product->getPhoto(),
                'price' => $product->getPrice()
            ]
        ]);
    }
    #[Route('/api/products/{id}', name: 'delete_product', methods: ['DELETE'])]
    #[IsGranted('ROLE_ADMIN')]
    public function delete(ProductRepository $productRepository, EntityManagerInterface $entityManager, int $id): Response
    {
        $product = $productRepository->find($id);
        if (!$product) {
            return $this->json(['error' => 'Product not found'], Response::HTTP_NOT_FOUND);
        }
        $entityManager->remove($product);
        $entityManager->flush();
        return $this->json(['message' => 'Product deleted successfully!']);
    }
}
