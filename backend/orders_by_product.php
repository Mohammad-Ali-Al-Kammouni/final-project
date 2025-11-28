<?php

require_once 'db.php';
require_once 'helpers.php';

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    method_not_allowed(['GET']);
}

$productId = isset($_GET['product_id']) ? (int)$_GET['product_id'] : 0;

if ($productId <= 0) {
    json_response([
        'success' => false,
        'error'   => 'Invalid or missing product_id'
    ], 400);
}

try {
    // Optional: check product exists
    $check = $pdo->prepare("SELECT id FROM products WHERE id = :id");
    $check->execute(['id' => $productId]);
    if (!$check->fetch()) {
        json_response([
            'success' => false,
            'error'   => 'Product not found'
        ], 404);
    }

    $stmt = $pdo->prepare("
        SELECT id, product_id, quantity, customer_name, created_at
        FROM orders
        WHERE product_id = :product_id
        ORDER BY created_at DESC
        LIMIT 10
    ");
    $stmt->execute(['product_id' => $productId]);
    $orders = $stmt->fetchAll();

    json_response([
        'success' => true,
        'data'    => $orders
    ]);
} catch (PDOException $e) {
    json_response([
        'success' => false,
        'error'   => 'Failed to fetch orders',
        'details' => $e->getMessage()
    ], 500);
}
