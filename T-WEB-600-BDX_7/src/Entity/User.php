<?php
namespace App\Entity;

use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Security\Core\User\PasswordAuthenticatedUserInterface;
use App\Repository\UserRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: UserRepository::class)]
#[ORM\Table(name: '`user`')]
#[UniqueEntity(fields: ['email'], message: 'There is already an account with this email')]
class User implements UserInterface, PasswordAuthenticatedUserInterface // Correct interface
{
    #[ORM\Id]
    #[ORM\GeneratedValue(strategy:'AUTO')]
    #[ORM\Column(type:'integer')]
    private ?int $id = null;
    private ?string $plainPassword = null;
    #[ORM\Column(length: 255, options: ["default" => "default_login"])]
    private ?string $login = "default_login";

    #[ORM\Column(length: 255)]
    private ?string $password = null;

    #[ORM\Column(length: 255)]
    private ?string $email = null;

    #[ORM\Column(length: 255)]
    private ?string $firstname = "default_firstname";

    #[ORM\Column(length: 255)]
    private ?string $lastname = "default_lastname";



    public function getPlainPassword(): ?string {
        return $this->plainPassword;
    }

    public function setPlainPassword(string $plainPassword): self {
        $this->plainPassword = $plainPassword;
        return $this;
    }

    public function getUsername(): string {
        return $this->email;
    }

    public function getRoles(): array {
        return ['ROLE_USER'];
    }

    public function setPassword(string $password): static {
        $this->password = $password;
        return $this;
    }

    public function getPassword(): string {
        return $this->password;
    }

    public function getSalt(): ?string {
        return null;
    }

    public function eraseCredentials(): void {
        $this->plainPassword = null;
    }

    public function getId(): ?int {
        return $this->id;
    }

    public function getLogin(): ?string {
        return $this->login;
    }

    public function setLogin(string $login): static {
        $this->login = $login;
        return $this;
    }

    public function getEmail(): ?string {
        return $this->email;
    }
    public function setEmail(string $email): static {
        $this->email = $email;
        return $this;
    }

    public function getFirstname(): ?string {
        return $this->firstname;
    }

    public function setFirstname(string $firstname): static {
        $this->firstname = $firstname;
        return $this;
    }

    public function getLastname(): ?string {
        return $this->lastname;
    }

    public function setLastname(string $lastname): static {
        $this->lastname = $lastname;
        return $this;
    }

    /**
     * Returns the identifier for this user (e.g., username or email address).
     * @return string
     */
    public function getUserIdentifier(): string {
        return $this->getEmail();
    }
}
