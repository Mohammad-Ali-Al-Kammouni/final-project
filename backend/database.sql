CREATE DATABASE IF NOT EXISTS mini_store
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE mini_store;

-- Products table
CREATE TABLE IF NOT EXISTS products (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Orders table
CREATE TABLE IF NOT EXISTS orders (
  id INT AUTO_INCREMENT PRIMARY KEY,
  product_id INT NOT NULL,
  quantity INT NOT NULL,
  customer_name VARCHAR(100) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_orders_product
    FOREIGN KEY (product_id)
    REFERENCES products(id)
    ON DELETE CASCADE
);

-- Optional sample data
INSERT INTO products (name, price) VALUES
  ('Laptop', 1200.00),
  ('Mouse', 25.50),
  ('Keyboard', 45.00),
  ('Headphones', 80.00);
