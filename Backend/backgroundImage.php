<?php
require 'connexion.php'; // Assurez-vous que votre connexion à la base de données est correcte

// Gérer l'ajout d'une nouvelle image
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_FILES['image'])) {
    $image = $_FILES['image'];

    // Vérifiez que le fichier a bien été téléchargé
    if ($image['error'] === UPLOAD_ERR_OK) {
        $targetDir = 'images/'; // Répertoire où les images seront sauvegardées
        $imageName = time() . '_' . basename($image['name']); // Nom unique pour l'image
        $targetFile = $targetDir . $imageName;

        // Déplacez le fichier téléchargé dans le répertoire cible
        if (move_uploaded_file($image['tmp_name'], $targetFile)) {
            // Désactiver toutes les autres images
            $sql = "UPDATE background_images SET is_active = 0";
            $stmt = $connexion->prepare($sql);
            $stmt->execute();

            // Insérer l'image dans la base de données avec is_active à 1
            $sql = "INSERT INTO background_images (image_url, is_active) VALUES (?, 1)"; // Active par défaut
            $stmt = $connexion->prepare($sql);
            $stmt->execute([$targetFile]);
        } else {
            echo "Erreur lors du téléchargement de l'image.";
        }
    } else {
        echo "Erreur lors du téléchargement de l'image: " . $image['error'];
    }
}

// Gérer la mise à jour de l'image active
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['set_active'])) {
    // Désactiver toutes les images avant d'en activer une nouvelle
    $sql = "UPDATE background_images SET is_active = 0";
    $stmt = $connexion->prepare($sql);
    $stmt->execute();

    // Activer l'image sélectionnée
    $activeImageId = intval($_POST['set_active']);
    $sql = "UPDATE background_images SET is_active = 1 WHERE id = ?";
    $stmt = $connexion->prepare($sql);
    $stmt->execute([$activeImageId]);
}

// Gérer la suppression d'une image
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['delete'])) {
    $deleteId = intval($_POST['delete']);
    
    // Récupérer l'URL de l'image à supprimer pour la supprimer du disque
    $sql = "SELECT image_url FROM background_images WHERE id = ?";
    $stmt = $connexion->prepare($sql);
    $stmt->execute([$deleteId]);
    $imageToDelete = $stmt->fetchColumn();

    // Supprimer l'image du disque
    if ($imageToDelete && file_exists($imageToDelete)) {
        unlink($imageToDelete);
    }

    // Supprimer l'image de la base de données
    $sql = "DELETE FROM background_images WHERE id = ?";
    $stmt = $connexion->prepare($sql);
    $stmt->execute([$deleteId]);
    
    // Si aucune image n'est active après la suppression, activez la première image trouvée
    $sql = "SELECT id FROM background_images WHERE is_active = 1";
    $stmt = $connexion->prepare($sql);
    $stmt->execute();
    $activeCount = $stmt->rowCount(); // Comptez combien d'images actives il y a

    // Si aucune image n'est active, activer la première image disponible
    if ($activeCount == 0) {
        $sql = "UPDATE background_images SET is_active = 1 WHERE id != ?";
        $stmt = $connexion->prepare($sql);
        $stmt->execute([$deleteId]); // S'assurer qu'on ne réactive pas l'image supprimée
    }
}

// Récupérer toutes les images de fond
$sql = "SELECT * FROM background_images";
$stmt = $connexion->prepare($sql);
$stmt->execute();
$images = $stmt->fetchAll(PDO::FETCH_ASSOC);
?>

<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Gestion des Images de Fond</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f9;
            padding: 20px;
        }
        h1 {
            text-align: center;
            color: #333;
            margin-top: 4rem;
        }
        h2{
            text-align: center;
        }
        .form1 {
            background-color: #ffffff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
            margin-bottom: 20px;
            width: 100%;
            max-width: 500px;
            margin-left: auto;
            margin-right: auto;
        }
        label {
            font-weight: bold;
            margin-top: 10px;
            display: block;
            color: #555;
        }
        input[type="text"],
        input[type="file"] {
            width: 95%;
            padding: 10px;
            margin-top: 5px;
            margin-bottom: 15px;
            border: 1px solid #ddd;
            border-radius: 5px;
            font-size: 16px;
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
        #imageList {
            display: flex;
            flex-direction: column;
            align-items: center;
        }
        .image-card {
            background-color: #ffffff;
            padding: 10px;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
            margin: 10px 0;
            display: flex;
            align-items: center;
            justify-content: space-between;
            width: 32rem;
            height: 10rem;
        }
        .image-card img {
            max-width: 80px;
            height: auto;
            margin-right: 10px;
        }
        .active-label {
            color: green;
            font-weight: bold;
        }

        .imageDispo {
            height: 7rem;
        }
        
        .form2, .form3{
            margin-top: 1rem;
            border: solid white;
        }

        @media (max-width: 768px) {
            .image-card {
            background-color: #ffffff;
            padding: 10px;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
            margin: 10px 0;
            display: flex;
            align-items: center;
            justify-content: space-between;
            width: 18rem;
            height: 10rem;
        }
        .image-card img {
            max-width: 80px;
            height: auto;
            margin-right: 10px;
        }

        input[type="text"],
        input[type="file"] {
            width: 90%;
        }

        .form1 {
            width: 90%;
        }

        .imageDispo {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
        }

        .form2, .form3 {
            margin-bottom: 5px;
            width: 100%;
        }


}
    </style>
</head>
<body>
<?php include_once('navBar.php'); ?>


<h1>Gestion des Images de Fond</h1>

<!-- Formulaire pour ajouter une nouvelle image -->
<form method="POST" enctype="multipart/form-data" class="form1">
    <label for="image">Télécharger une nouvelle image de fond:</label>
    <input type="file" id="image" name="image" accept="image/*" required>
    <input type="submit" value="Ajouter Image">
</form>

<h2>Images Disponibles</h2>
<div id="imageList">
    <?php if ($images): ?>
        <?php foreach ($images as $image): ?>
            <div class="image-card">
                <img src="<?php echo htmlspecialchars($image['image_url']); ?>" alt="Image de fond">
                <span>
                    <?php if ($image['is_active']): ?>
                        <span class="active-label">Active</span>
                    <?php endif; ?>
                </span>
                <div class="imageDispo">
                <form method="POST" style="display:inline;" class="form2">
                    <input type="hidden" name="set_active" value="<?php echo $image['id']; ?>">
                    <input type="submit" value="Activer" <?php echo $image['is_active'] ? 'disabled' : ''; ?>>
                </form>
                <form method="POST" style="display:inline;" class="form3">
                    <input type="hidden" name="delete" value="<?php echo $image['id']; ?>">
                    <input type="submit" value="Supprimer" onclick="return confirm('Êtes-vous sûr de vouloir supprimer cette image ?');">
                </form>
                </div>
            </div>
        <?php endforeach; ?>
    <?php else: ?>
        <p>Aucune image de fond disponible.</p>
    <?php endif; ?>
</div>

</body>
</html>
