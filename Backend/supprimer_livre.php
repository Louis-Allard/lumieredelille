<?php
require 'connexion.php';

// Vérifiez si l'ID du livre est passé dans l'URL
if (isset($_GET['id'])) {
    $livre_id = intval($_GET['id']); // Convertir en entier pour éviter les injections

    // Requête pour supprimer le livre
    $sql = "DELETE FROM livres WHERE id = :id";
    $stmt = $connexion->prepare($sql);
    $stmt->bindParam(':id', $livre_id);

    if ($stmt->execute()) {
        echo "Livre supprimé avec succès.";
        header('Location: listeLivres.php'); // Rediriger vers la liste des livres
        exit();
    } else {
        echo "Erreur lors de la suppression du livre.";
    }
} else {
    echo "ID de livre non spécifié.";
}
?>
