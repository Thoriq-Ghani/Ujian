<?php
require 'config.php';

// Ambil riwayat perhitungan dari database, urutkan berdasarkan waktu terbaru
$sql = 'SELECT * FROM history ORDER BY created_at DESC LIMIT 10'; // Batasi hasil 10 riwayat terbaru
$stmt = $pdo->query($sql);

// Mengambil hasil dan mengonversinya ke format JSON
echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
?>
