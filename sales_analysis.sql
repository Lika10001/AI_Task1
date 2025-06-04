-- 1. Calculate total sales volume for March 2024
SELECT SUM(amount) as march_sales
FROM orders
WHERE strftime('%Y-%m', order_date) = '2024-03';

-- 2. Find the customer who spent the most overall
SELECT 
    customer,
    SUM(amount) as total_spent
FROM orders
GROUP BY customer
ORDER BY total_spent DESC
LIMIT 1;

-- 3. Calculate the average order value for all orders
SELECT 
    ROUND(AVG(amount), 2) as average_order_value,
    ROUND(SUM(amount), 2) as total_sales,
    COUNT(*) as number_of_orders
FROM orders;

-- Additional useful analysis:

-- 4. Monthly sales breakdown
SELECT 
    strftime('%Y-%m', order_date) as month,
    SUM(amount) as monthly_sales,
    COUNT(*) as number_of_orders
FROM orders
GROUP BY month
ORDER BY month;

-- 5. Customer order frequency and average spend
SELECT 
    customer,
    COUNT(*) as number_of_orders,
    ROUND(AVG(amount), 2) as avg_order_value,
    ROUND(SUM(amount), 2) as total_spent
FROM orders
GROUP BY customer
ORDER BY total_spent DESC; 