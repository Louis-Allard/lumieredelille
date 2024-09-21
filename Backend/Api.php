<?php
header('Content-Type: application/json');

$host = 'localhost';
$dbname = 'maison-edition';
$user = 'root';
$password = '';

try {
    $connexion = new PDO("mysql:host=$host;dbname=$dbname", $user, $password);
    $connexion->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Récupérer les livres depuis la base de données
    $sql = "SELECT titre, auteur, isbn, prix, frais_port, image_url FROM livres";
    $stmt = $connexion->prepare($sql);
    $stmt->execute();
    $livres = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // Renvoie des données sous format JSON
    echo json_encode($livres);

} catch(PDOException $e) {
    echo json_encode(["error" => "Erreur de connexion : " . $e->getMessage()]);
    exit();
}
