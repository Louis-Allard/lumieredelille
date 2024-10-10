<?php
require 'connexion.php';
session_start();

header("Access-Control-Allow-Origin: *");


$page = isset($_GET['page']) ? (int)$_GET['page'] : 1;  // Récupère la page actuelle
$limit = 10;  // Nombre de livres par page
$offset = ($page - 1) * $limit;  // Calculer l'index de départ

// Requête pour récupérer tous les livres
$sql = "SELECT * FROM livres
ORDER BY 
    CASE 
        WHEN LOWER(titre) LIKE 'l''%' THEN SUBSTRING(titre FROM 3)
        WHEN LOWER(titre) LIKE 'le %' THEN SUBSTRING(titre FROM 4)
        WHEN LOWER(titre) LIKE 'la %' THEN SUBSTRING(titre FROM 4)
        WHEN LOWER(titre) LIKE 'les %' THEN SUBSTRING(titre FROM 5)
        ELSE titre 
    END ASC
LIMIT :limit OFFSET :offset";
$stmt = $connexion->prepare($sql);
$stmt->bindParam(':limit', $limit, PDO::PARAM_INT);
$stmt->bindParam(':offset', $offset, PDO::PARAM_INT);
$stmt->execute();
$livres = $stmt->fetchAll(PDO::FETCH_ASSOC);

$total_sql = "SELECT COUNT(*) FROM livres";
$total_stmt = $connexion->prepare($total_sql);
$total_stmt->execute();
$total_livres = $total_stmt->fetchColumn();  // Récupère le nombre total de livres

$total_pages = ceil($total_livres / $limit);  // Nombre total de pages

// Retourner les données sous format JSON
header('Content-Type: application/json');
echo json_encode([
    'livres' => $livres,
    'total_pages' => $total_pages,
    'current_page' => $page
]);
