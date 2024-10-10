<?php

require 'connexion.php';

try {
    // Connexion à la base de données avec PDO
    $connexion = new PDO("mysql:host=$host;dbname=$dbname", $user, $password);
    // Définition des attributs de gestion d'erreurs
    $connexion->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $connectionMessage = ""; 
} catch(PDOException $e) {
    $connectionMessage = "Erreur de connexion : " . $e->getMessage();
    exit();  // Arrête le script si la connexion échoue
}

if ($_SERVER['REQUEST_METHOD'] == 'POST' && isset($_FILES['image'])) {
    $image = $_FILES['image'];
    $imageName = time() . '_' . basename($image['name']);
    $targetDir = "images/";  
    $targetFile = $targetDir . $imageName;

    // Déplacer l'image dans le répertoire cible
    if (move_uploaded_file($image['tmp_name'], $targetFile)) {
        $titre = $_POST['titre'];
        $auteur = $_POST['auteur'];
        $isbn = $_POST['isbn'];
        $prix = $_POST['prix'];
        $poids = $_POST['poids'];
        $date_publication = $_POST['date_publication'];

        // Vérification si l'ISBN existe déjà dans la base de données
        $sqlCheck = "SELECT COUNT(*) FROM livres WHERE isbn = :isbn";
        $stmtCheck = $connexion->prepare($sqlCheck);
        $stmtCheck->bindParam(':isbn', $isbn);
        $stmtCheck->execute();
        $isbnExists = $stmtCheck->fetchColumn();

        if ($isbnExists > 0) {
            // ISBN existe déjà, message d'erreur
            echo "Erreur : un livre avec cet ISBN existe déjà.";
            exit();
        }

        //Format du livre***************************************************************
        $largeur = $_POST['largeur'];
        $hauteur = $_POST['hauteur'];

        // Valider que largeur et hauteur sont des nombres
        if (!is_numeric($largeur) || !is_numeric($hauteur)) {
            echo "Erreur : la largeur et la hauteur doivent être des nombres.";
            exit();
        }

        // Formater le format sous forme "largeur x hauteur"
        $format = $largeur . ' x ' . $hauteur;

        //*****************************************************************************

        $nombre_pages = $_POST['nombre_pages']; 
        $descriptif = $_POST['descriptif'];
        $stock = isset($_POST['stock']) ? 1 : 0;
        $imageUrl = $targetFile; 

        function validateISBN($isbn) {
            // Enlever les tirets ou espaces éventuels
            $isbn = str_replace(['-', ' '], '', $isbn);
        
            // Vérifier si c'est un ISBN-10 ou ISBN-13
            if (preg_match('/^\d{10}$/', $isbn) || preg_match('/^\d{13}$/', $isbn)) {
                return true;
            }
            return false;
        }

        
        if (!validateISBN($isbn)) {
            echo "Erreur : l'ISBN doit être valide (ISBN-10 ou ISBN-13).";
            exit();
        }

        function validateFormat($format) {
            // Vérifier le format (ex: 220 x 140)
            return preg_match('/^\d{2,3} x \d{2,3}$/', $format);
        }
        
        if (!validateFormat($format)) {
            echo "Erreur : le format du livre doit être au format 'largeur x hauteur' (par exemple, '140 x 210').";
            exit();
        }
       

        // Requête SQL pour insérer les détails du livre
        $sql = "INSERT INTO livres (titre, auteur, isbn, prix, poids, image_url, date_publication, format, nombre_pages, descriptif, stock) 
                VALUES (:titre, :auteur, :isbn, :prix, :poids, :image_url, :date_publication, :format, :nombre_pages, :descriptif, :stock)";
        
        // Préparation de la requête
        $stmt = $connexion->prepare($sql);
        
        // Liaison des paramètres
        $stmt->bindParam(':titre', $titre);
        $stmt->bindParam(':auteur', $auteur);
        $stmt->bindParam(':isbn', $isbn);
        $stmt->bindParam(':prix', $prix);
        $stmt->bindParam(':poids', $poids);
        $stmt->bindParam(':image_url', $imageUrl);
        $stmt->bindParam(':date_publication', $date_publication);
        $stmt->bindParam(':format', $format);
        $stmt->bindParam(':nombre_pages', $nombre_pages);
        $stmt->bindParam(':descriptif', $descriptif);
        $stmt->bindParam(':stock', $stock);
        
        // Exécution de la requête
        if ($stmt->execute()) {
            $uploadMessage = "Livre ajouté avec succès.";
        } else {
            echo "Erreur lors de l'insertion dans la base de données.";
        }
    } else {
        echo "Erreur lors de l'upload de l'image.";
    }
}
?>



<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Ajouter un Livre</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f9;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
        }

        form {
            background-color: #ffffff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
            max-width: 500px;
            width: 100%;
            margin-top: 5%;
        }

        h2 {
            text-align: center;
            margin-bottom: 20px;
            color: #333;
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

        .success {
    color: green;
    font-weight: bold;
}


        @media (max-width: 768px) {
            form {
                padding: 15px;
            }

            input[type="submit"] {
                font-size: 16px;
            }
        }
    </style>
</head>
<body>
<?php include_once('navBar.php'); ?>


<form method="post" enctype="multipart/form-data">

    <div style="text-align:center; margin-bottom: 20px;" class="<?php echo !empty($uploadMessage) ? 'success' : ''; ?>">
        <?php echo $uploadMessage; ?>
    </div>

    <h2>Ajouter un Livre</h2>

    <label for="titre">Titre :</label>
    <input type="text" name="titre" id="titre" required>

    <label for="auteur">Auteur :</label>
    <input type="text" name="auteur" id="auteur" required>

    <label for="isbn">ISBN :</label>
    <input type="text" name="isbn" id="isbn" required>

    <label for="prix">Prix en € :</label>
    <input type="text" name="prix" id="prix" required>

    <label for="poids">Poids du livre en gramme :</label>
    <input type="text" name="poids" id="poids" required>

    <label for="date_publication">Date de publication :</label>
    <input type="date" name="date_publication" id="date_publication" required>

    <label for="largeur">Largeur (mm) :</label>
    <input type="number" name="largeur" id="largeur" required placeholder="ex: 140">

    <label for="hauteur">Hauteur (mm) :</label>
    <input type="number" name="hauteur" id="hauteur" required placeholder="ex: 210">

    <label for="nombre_pages">Nombre de pages :</label>
    <input type="number" name="nombre_pages" id="nombre_pages" required>

    <label for="descriptif">Descriptif :</label>
    <textarea name="descriptif" id="descriptif" required></textarea>

    <label for="stock">
        <input type="checkbox" name="stock" id="stock">
        En stock
    </label>

    <label for="image">Image :</label>
    <input type="file" name="image" id="image" required>

    <input type="submit" value="Ajouter le livre">
</form>

</body>
</html>
