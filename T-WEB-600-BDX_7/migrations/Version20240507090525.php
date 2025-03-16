<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20240507090525 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('DROP SEQUENCE user_id_seq CASCADE');
        $this->addSql('CREATE SEQUENCE "user_plain_password_seq" INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('ALTER TABLE "user" DROP CONSTRAINT "user_pkey"');
        $this->addSql('ALTER TABLE "user" ADD plain_password VARCHAR(255) NOT NULL');
        $this->addSql('ALTER TABLE "user" DROP id');
        $this->addSql('ALTER TABLE "user" ADD PRIMARY KEY (plain_password)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SCHEMA public');
        $this->addSql('DROP SEQUENCE "user_plain_password_seq" CASCADE');
        $this->addSql('CREATE SEQUENCE user_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('DROP INDEX user_pkey');
        $this->addSql('ALTER TABLE "user" ADD id INT NOT NULL');
        $this->addSql('ALTER TABLE "user" DROP plain_password');
        $this->addSql('ALTER TABLE "user" ADD PRIMARY KEY (id)');
    }
}
