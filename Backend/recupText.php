<?php
require 'connexion.php';
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");


$sql = "SELECT text FROM presentation_text WHERE is_active = 1 LIMIT 1";
$stmt = $connexion->prepare($sql);
$stmt->execute();
$texteActif = $stmt->fetch(PDO::FETCH_ASSOC);

header('Content-Type: application/json');
echo json_encode(['activeText' => $texteActif['text']]);
?>
