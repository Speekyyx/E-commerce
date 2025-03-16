<?php
namespace App\Controller;

use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;

class RegistrationController extends AbstractController
{
    #[Route('/api/register', name: 'app_register', methods: ['POST'])]
    public function register(Request $request, UserPasswordHasherInterface $userPasswordHasher, EntityManagerInterface $entityManager, SerializerInterface $serializer): Response
    {
        // Récupération des données JSON de la requête
        $data = json_decode($request->getContent(), true);

        // Création d'un nouvel utilisateur
        $user = $serializer->deserialize($request->getContent(), User::class, 'json');
        // Validation des données reçues (à implémenter selon vos besoins de validation)
        if (isset($data['email']) && isset($data['password'])) {
            $user->setEmail($data['email']);
            $user->setPassword(
                $userPasswordHasher->hashPassword(
                    $user,
                    $data['password']
                )
            );

            // Enregistrement de l'utilisateur dans la base de données
            $entityManager->persist($user);
            $entityManager->flush();

            // Réponse JSON pour confirmer la création de l'utilisateur
            return $this->json([
                'message' => 'User registered successfully',
                'user_id' => $user->getId()
            ], Response::HTTP_CREATED);
        }

        // Réponse en cas de données invalides
        return new JsonResponse(['error' => 'Invalid data'], Response::HTTP_BAD_REQUEST);
    }
}
