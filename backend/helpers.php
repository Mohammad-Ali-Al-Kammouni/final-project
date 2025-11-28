<?php


function json_response($data, int $statusCode = 200): void
{
    http_response_code($statusCode);
    header('Content-Type: application/json');
    echo json_encode($data);
    exit;
}

function method_not_allowed(array $allowed): void
{
    header('Allow: ' . implode(', ', $allowed));
    json_response([
        'success' => false,
        'error' => 'Method not allowed'
    ], 405);
}
