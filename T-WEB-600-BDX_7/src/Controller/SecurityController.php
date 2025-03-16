<?php
namespace App\Controller;

use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Security\Core\User\UserProviderInterface;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Security\Core\Exception\UserNotFoundException;
use Lexik\Bundle\JWTAuthenticationBundle\Services\JWTTokenManagerInterface;
use Symfony\Component\Routing\Annotation\Route;

class SecurityController extends AbstractController
{
    #[Route('/api/login', name: 'app_login', methods: ['POST'])]
    public function login(Request $request, UserPasswordHasherInterface $userPasswordHasher, EntityManagerInterface $entityManager, JWTTokenManagerInterface $JWTManager, UserProviderInterface $userProvider): Response
    {
        $data = json_decode($request->getContent(), true);
        $email = $data['email'] ?? null;  // Use email to authenticate
        $password = $data['password'] ?? null;

        if (!$email || !$password) {
            return new JsonResponse(['error' => 'Email and password are required'], Response::HTTP_BAD_REQUEST);
        }

        try {
            // Use email as the identifier to load the user
            $user = $userProvider->loadUserByIdentifier($email);
        } catch (UserNotFoundException $e) {
            return new JsonResponse(['error' => 'Email not found'], Response::HTTP_BAD_REQUEST);
        }

        if (!$userPasswordHasher->isPasswordValid($user, $password)) {
            return new JsonResponse(['error' => 'Invalid credentials'], Response::HTTP_UNAUTHORIZED);
        }

        try {
            $token = $JWTManager->create($user);
        } catch (\Exception $e) {
            // Logger l'erreur ou la retourner dans une réponse
            return new JsonResponse(['error' => 'JWT creation failed: ' . $e->getMessage()], Response::HTTP_INTERNAL_SERVER_ERROR);
        }

        return new JsonResponse(['email' =>$email, 'token' => $token]);
    }
}
