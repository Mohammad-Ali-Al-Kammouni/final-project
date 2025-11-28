<?php

require_once 'db.php';
require_once 'helpers.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    method_not_allowed(['POST']);
}

$rawInput = file_get_contents('php://input');
$data = json_decode($rawInput, true);

if (!is_array($data)) {
    json_response([
        'success' => false,
        'error'   => 'Invalid JSON body'
    ], 400);
}

$productId     = isset($data['product_id']) ? (int)$data['product_id'] : 0;
$quantity      = isset($data['quantity']) ? (int)$data['quantity'] : 0;
$customerName  = isset($data['customer_name']) ? trim($data['customer_name']) : '';

if ($productId <= 0 || $quantity <= 0 || $customerName === '') {
    json_response([
        'success' => false,
        'error'   => 'product_id, quantity and customer_name are required'
    ], 400);
}

try {
    // Check if product exists
    $check = $pdo->prepare("SELECT id FROM products WHERE id = :id");
    $check->execute(['id' => $productId]);
    if (!$check->fetch()) {
        json_response([
            'success' => false,
            'error'   => 'Product does not exist'
        ], 404);
    }

    // Insert order
    $stmt = $pdo->prepare("
        INSERT INTO orders (product_id, quantity, customer_name)
        VALUES (:product_id, :quantity, :customer_name)
    ");

    $stmt->execute([
        'product_id'   => $productId,
        'quantity'     => $quantity,
        'customer_name'=> $customerName
    ]);

    $orderId = (int)$pdo->lastInsertId();

    // Return created order
    $orderStmt = $pdo->prepare("
        SELECT id, product_id, quantity, customer_name, created_at
        FROM orders
        WHERE id = :id
    ");
    $orderStmt->execute(['id' => $orderId]);
    $order = $orderStmt->fetch();

    json_response([
        'success' => true,
        'data'    => $order
    ], 201);
} catch (PDOException $e) {
    json_response([
        'success' => false,
        'error'   => 'Failed to create order',
        'details' => $e->getMessage()
    ], 500);
}
