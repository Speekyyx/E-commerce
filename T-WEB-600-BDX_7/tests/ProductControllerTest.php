<?php

namespace App\tests;

use App\Entity\Product;
use ApiPlatform\Symfony\Bundle\Test\ApiTestCase;


class ProductControllerTest extends ApiTestCase
{
    public function testCreateProduct(): void
    {
        $client = static::createClient();
        $iri = static::findIriBy(Product::class, ['id' => '1']); 

        $response = $client->request('POST', '/api/products', [
            'headers' => ['Content-Type' => 'application/json'],
            'json' => [
                'name' => 'New Product',
                'description' => 'This is a description of the new product.',
                'price' => 100.0,
            ]
        ]);

        $this->assertResponseStatusCodeSame(201); 
        $this->assertResponseIsSuccessful();
        $this->assertJsonContains([
            '@context' => '/api/contexts/Product',
            '@type' => 'Product',
            'name' => 'New Product',
            'description' => 'This is a description of the new product.'
        ]);

        $product = $response->toArray();
        $this->assertNotNull($product['id']);
    }
}

