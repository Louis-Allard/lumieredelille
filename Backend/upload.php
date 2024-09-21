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
    echo "Connexion réussie !<br>";
} catch(PDOException $e) {
    echo "Erreur de connexion : " . $e->getMessage();
    exit();  // Arrête le script si la connexion échoue
}

if ($_SERVER['REQUEST_METHOD'] == 'POST' && isset($_FILES['image'])) {
    $image = $_FILES['image'];
    $imageName = time() . '_' . basename($image['name']); // Nom unique basé sur le timestamp
    $targetDir = "images/";  // Répertoire pour stocker les images
    $targetFile = $targetDir . $imageName;

    // Déplacer l'image dans le répertoire cible
    if (move_uploaded_file($image['tmp_name'], $targetFile)) {
        $titre = $_POST['titre'];
        $auteur = $_POST['auteur'];
        $isbn = $_POST['isbn'];
        $prix = $_POST['prix'];
        $frais_port = $_POST['frais_port'];
        $imageUrl = $targetFile;  // Chemin relatif vers l'image

        // Requête SQL pour insérer les détails du livre avec une requête préparée pour éviter les injections SQL
        $sql = "INSERT INTO livres (titre, auteur, isbn, prix, frais_port, image_url) 
                VALUES (:titre, :auteur, :isbn, :prix, :frais_port, :image_url)";
        
        // Préparation de la requête
        $stmt = $connexion->prepare($sql);
        
        // Liaison des paramètres
        $stmt->bindParam(':titre', $titre);
        $stmt->bindParam(':auteur', $auteur);
        $stmt->bindParam(':isbn', $isbn);
        $stmt->bindParam(':prix', $prix);
        $stmt->bindParam(':frais_port', $frais_port);
        $stmt->bindParam(':image_url', $imageUrl);
        
        // Exécution de la requête
        if ($stmt->execute()) {
            echo "Livre ajouté avec succès.";
        } else {
            echo "Erreur lors de l'insertion dans la base de données.";
        }
    } else {
        echo "Erreur lors de l'upload de l'image.";
    }
}
?>

<form method="post" enctype="multipart/form-data">
    Titre : <input type="text" name="titre" required><br>
    Auteur : <input type="text" name="auteur" required><br>
    ISBN : <input type="text" name="isbn" required><br>
    Prix : <input type="text" name="prix" required><br>
    Frais de port : <input type="text" name="frais_port" required><br>
    Image : <input type="file" name="image" required><br>
    <input type="submit" value="Ajouter le livre">
</form>
