<?php

require_once 'db.php';
require_once 'helpers.php';

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    method_not_allowed(['GET']);
}

$id = isset($_GET['id']) ? (int) $_GET['id'] : 0;

if ($id <= 0) {
    json_response([
        'success' => false,
        'error' => 'Invalid or missing product id'
    ], 400);
}

try {
    $stmt = $pdo->prepare("SELECT id, name, price, created_at FROM products WHERE id = :id");
    $stmt->execute(['id' => $id]);
    $product = $stmt->fetch();

    if (!$product) {
        json_response([
            'success' => false,
            'error' => 'Product not found'
        ], 404);
    }

    json_response([
        'success' => true,
        'data' => $product
    ]);
} catch (PDOException $e) {
    json_response([
        'success' => false,
        'error' => 'Failed to fetch product',
        'details' => $e->getMessage()
    ], 500);
}
