<?php
require 'connexion.php';

// Vérifiez si l'ID du livre est passé dans l'URL
if (isset($_GET['id'])) {
    $livre_id = intval($_GET['id']); // Convertir en entier pour éviter les injections

    // Requête pour récupérer les détails du livre
    $sql = "SELECT * FROM livres WHERE id = :id";
    $stmt = $connexion->prepare($sql);
    $stmt->bindParam(':id', $livre_id);
    $stmt->execute();
    $livre = $stmt->fetch(PDO::FETCH_ASSOC);

    // Si le livre n'existe pas
    if (!$livre) {
        echo "Livre non trouvé.";
        exit();
    }
} else {
    echo "ID de livre non spécifié.";
    exit();
}

// Traitement du formulaire de modification
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $titre = $_POST['titre'];
    $auteur = $_POST['auteur'];
    $isbn = $_POST['isbn'];
    $prix = $_POST['prix'];
    $frais_port = $_POST['frais_port'];
    $date_publication = $_POST['date_publication'];
    $format = $_POST['format'];
    $nombre_pages = $_POST['nombre_pages'];
    $descriptif = $_POST['descriptif'];
    $stock = isset($_POST['stock']) ? 1 : 0;

    // Vérifiez si une nouvelle image a été téléchargée
    if (isset($_FILES['image']) && $_FILES['image']['error'] == UPLOAD_ERR_OK) {
        $image = $_FILES['image'];
        $imageName = time() . '_' . basename($image['name']);
        $targetDir = "images/";
        $targetFile = $targetDir . $imageName;

        // Déplacer l'image dans le répertoire cible
        if (move_uploaded_file($image['tmp_name'], $targetFile)) {
            $imageUrl = $targetFile;

            // Mise à jour du livre avec la nouvelle image
            $sql = "UPDATE livres SET titre = :titre, auteur = :auteur, isbn = :isbn, prix = :prix, frais_port = :frais_port, image_url = :image_url, date_publication = :date_publication, format = :format, nombre_pages = :nombre_pages, descriptif = :descriptif, stock = :stock WHERE id = :id";
            $stmt = $connexion->prepare($sql);
            $stmt->bindParam(':image_url', $imageUrl);
        }
    } else {
        // Mise à jour sans nouvelle image
        $sql = "UPDATE livres SET titre = :titre, auteur = :auteur, isbn = :isbn, prix = :prix, frais_port = :frais_port, date_publication = :date_publication, format = :format, nombre_pages = :nombre_pages, descriptif = :descriptif, stock = :stock WHERE id = :id";
        $stmt = $connexion->prepare($sql);
    }

    // Liaison des paramètres
    $stmt->bindParam(':titre', $titre);
    $stmt->bindParam(':auteur', $auteur);
    $stmt->bindParam(':isbn', $isbn);
    $stmt->bindParam(':prix', $prix);
    $stmt->bindParam(':frais_port', $frais_port);
    $stmt->bindParam(':date_publication', $date_publication);
    $stmt->bindParam(':format', $format);
    $stmt->bindParam(':nombre_pages', $nombre_pages);
    $stmt->bindParam(':descriptif', $descriptif);
    $stmt->bindParam(':stock', $stock);
    $stmt->bindParam(':id', $livre_id);

    // Exécution de la requête
    if ($stmt->execute()) {
        echo "Livre modifié avec succès.";
        header('Location: listeLivres.php'); // Rediriger vers la liste des livres
        exit();
    } else {
        echo "Erreur lors de la modification du livre.";
    }
}
?>

<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Modifier un Livre</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f9;
            padding: 20px;
            display: flex;
            justify-content: center;
            align-items: flex-start;
        }

        h1 {
            text-align: center;
            color: #333;
        }

        form {
            background-color: #ffffff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
            width: 100%;
            max-width: 500px;
            margin-top: 5%;
        }

        label {
            font-weight: bold;
            margin-top: 10px;
            display: block;
            color: #555;
        }

        input[type="text"],
        input[type="number"],
        input[type="date"],
        textarea,
        input[type="file"] {
            width: 100%;
            padding: 10px;
            margin-top: 5px;
            margin-bottom: 15px;
            border: 1px solid #ddd;
            border-radius: 5px;
            font-size: 16px;
        }

        textarea {
            resize: vertical;
            min-height: 100px;
        }

        input[type="checkbox"] {
            margin-right: 10px;
        }

        input[type="submit"] {
            background-color: #007bff;
            color: white;
            padding: 10px;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            width: 100%;
            font-size: 18px;
            transition: background-color 0.3s ease;
        }

        input[type="submit"]:hover {
            background-color: #0056b3;
        }


        @media (max-width: 768px) {
            form {
                padding: 15px;
            }

            input[type="submit"] {
                font-size: 16px;
            }
        }

        .image-preview {
            width: 60%;
            max-width: 300px;
            margin: 15px auto;
            display: block;
        }
    </style>
</head>
<body>
<?php include_once('navBar.php'); ?>

    <form method="post" enctype="multipart/form-data">
        <h1>Modifier le Livre</h1>

        <label for="titre">Titre :</label>
        <input type="text" name="titre" id="titre" value="<?= htmlspecialchars($livre['titre']) ?>" required>

        <label for="auteur">Auteur :</label>
        <input type="text" name="auteur" id="auteur" value="<?= htmlspecialchars($livre['auteur']) ?>" required>

        <label for="isbn">ISBN :</label>
        <input type="text" name="isbn" id="isbn" value="<?= htmlspecialchars($livre['isbn']) ?>" required>

        <label for="prix">Prix :</label>
        <input type="text" name="prix" id="prix" value="<?= htmlspecialchars($livre['prix']) ?>" required>

        <label for="frais_port">Frais de port :</label>
        <input type="text" name="frais_port" id="frais_port" value="<?= htmlspecialchars($livre['frais_port']) ?>" required>

        <label for="date_publication">Date de publication :</label>
        <input type="date" name="date_publication" id="date_publication" value="<?= htmlspecialchars($livre['date_publication']) ?>" required>

        <label for="format">Format :</label>
        <input type="text" name="format" id="format" value="<?= htmlspecialchars($livre['format']) ?>" required>

        <label for="nombre_pages">Nombre de pages :</label>
        <input type="number" name="nombre_pages" id="nombre_pages" value="<?= htmlspecialchars($livre['nombre_pages']) ?>" required>

        <label for="descriptif">Descriptif :</label>
        <textarea name="descriptif" id="descriptif" required><?= htmlspecialchars($livre['descriptif']) ?></textarea>

        <label for="stock">
            <input type="checkbox" name="stock" id="stock" <?= $livre['stock'] ? 'checked' : '' ?>>
            En stock
        </label>

        <img src="<?= htmlspecialchars($livre['image_url']) ?>" alt="Image de <?= htmlspecialchars($livre['titre']) ?>" class="image-preview">

        <label for="image">Nouvelle image :</label>
        <input type="file" name="image" id="image">

        <input type="submit" value="Modifier le livre">
    </form>
</body>
</html>
