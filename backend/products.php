<?php

require_once 'db.php';
require_once 'helpers.php';

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    method_not_allowed(['GET']);
}

try {
    $stmt = $pdo->query("SELECT id, name, price, created_at FROM products ORDER BY id ASC");
    $products = $stmt->fetchAll();

    json_response([
        'success' => true,
        'data' => $products
    ]);
} catch (PDOException $e) {
    json_response([
        'success' => false,
        'error' => 'Failed to fetch products',
        'details' => $e->getMessage()
    ], 500);
}
