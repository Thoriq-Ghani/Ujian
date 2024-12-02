<?php
// Konfigurasi koneksi database
$host = "localhost"; // Ganti jika perlu
$user = "root"; // Sesuaikan dengan username database Anda
$password = ""; // Sesuaikan dengan password database Anda
$dbname = "calculator"; // Nama database Anda

try {
    // Koneksi ke database menggunakan PDO
    $pdo = new PDO("mysql:host=$host;dbname=$dbname", $user, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Ambil data dari permintaan POST
    $num1 = $_POST['num1'] ?? '';
    $operation = $_POST['operation'] ?? '';
    $result = $_POST['result'] ?? '';

    // Query untuk memasukkan data ke tabel
    $sql = "INSERT INTO history (num1, operation, result) VALUES (:num1, :operation, :result)";
    $stmt = $pdo->prepare($sql);

    // Eksekusi query
    $stmt->execute([
        ':num1' => $num1,
        ':operation' => $operation,
        ':result' => $result,
    ]);

    echo "Data berhasil disimpan!";
} catch (PDOException $e) {
    echo "Koneksi atau query error: " . $e->getMessage();
}
?>
