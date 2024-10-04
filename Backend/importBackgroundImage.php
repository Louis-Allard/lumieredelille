<?php
require 'connexion.php';

// Ajoutez les en-têtes pour gérer les requêtes CORS
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header('Content-Type: application/json'); // Précisez que le retour est en JSON

// Récupérer l'URL de l'image active
$sql = "SELECT image_url FROM background_images WHERE is_active = 1 LIMIT 1";
$stmt = $connexion->prepare($sql);
$stmt->execute();
$activeImageUrl = $stmt->fetchColumn();

// Vérifiez si une image active a été trouvée
if ($activeImageUrl) {
    // Retourner l'URL de l'image active au format JSON
    echo json_encode(['image_url' => $activeImageUrl]);
} else {
    // Si aucune image active n'est trouvée, retourner une réponse vide ou un message par défaut
    echo json_encode(['image_url' => null]);
}
