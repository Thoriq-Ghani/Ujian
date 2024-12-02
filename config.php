<?php
$dsn = 'mysql:host=localhost;dbname=calculator';
$username = 'root';
$password = '';
$options = [];

try {
    $pdo = new PDO($dsn, $username, $password, $options);
} catch (PDOException $e) {
    die('Database Connection Failed: ' . $e->getMessage());
}
?>
