<?php
// Paramètres de connexion à la BDD
$host = 'localhost';
$dbname = 'maison-edition';
$user = 'root';
$password = '';

try {
    // Connexion à la base de données avec PDO
    $connexion = new PDO("mysql:host=$host;dbname=$dbname", $user, $password);
    // Définition des attributs de gestion d'erreurs
    $connexion->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch(PDOException $e) {
    // Gestion de l'erreur
    echo "Erreur de connexion : " . $e->getMessage();
    exit();  // Arrête le script si la connexion échoue
}
?>
