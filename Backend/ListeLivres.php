<?php
require 'connexion.php';

// Requête pour récupérer tous les livres
$sql = "SELECT * FROM livres";
$stmt = $connexion->prepare($sql);
$stmt->execute();
$livres = $stmt->fetchAll(PDO::FETCH_ASSOC);

// Vérification des livres récupérés
if ($livres === false) {
    echo "Erreur lors de la récupération des livres.";
    exit();
}
?>

<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Liste des Livres</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f9;
            margin: 0;
            padding: 0;
        }

        h1 {
            text-align: center;
            color: #333;
            margin-top: 20px;
        }

        table {
            width: 100%;
            max-width: 1200px;
            border-collapse: collapse;
            margin: 20px auto;
            background-color: #fff;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
            border-radius: 10px;
            overflow: hidden;
        }

        table, th, td {
            border: 1px solid #ddd;
        }

        th, td {
            padding: 15px;
            text-align: left;
        }

        th {
            background-color: #f8f8f8;
            color: #555;
        }

        td img {
            max-width: 80px;
            height: auto;
            border-radius: 5px;
            transition: transform 0.2s ease;
        }

        td img:hover {
            transform: scale(1.1);
        }

        /* Style responsive */
        @media (max-width: 768px) {
            table {
                display: block;
                overflow-x: auto; /* Permet le défilement horizontal */
                white-space: nowrap; /* Empêche les retours à la ligne */
                margin-left: 6%;
                width: 85%;
            }

            tr {
                display: flex; /* Utilise le flexbox pour les lignes */
                flex-direction: column; /* Les cellules s'affichent en colonne */
                margin-bottom: 15px; /* Espacement entre les lignes */
                border: 1px solid #ddd; /* Bordure pour chaque ligne */
            }

            th, td {
                text-align: left;
                display: block; /* Chaque cellule est un bloc */
                padding-left: 50%; /* Ajoute du padding à gauche */
                position: relative;
                width: 100%; /* Les cellules occupent toute la largeur */
            }

            th {
                background-color: #f8f8f8;
                position: sticky;
                top: 0; /* Colonne d'en-tête collante en haut */
                z-index: 1; /* Pour être au-dessus des autres lignes */
            }

            td::before {
                content: attr(data-label); /* Ajoute un label à chaque cellule */
                position: absolute;
                left: 10px; /* Positionne le label à gauche */
                font-weight: bold; /* Gras */
                color: #555; /* Couleur du texte */
                white-space: nowrap; /* Empêche le retour à la ligne */
            }

            thead {
                display: none; /* Masque l'en-tête pour les mobiles */
            }
        }
    </style>
</head>
<body>
<?php include_once('navBar.php'); ?>

    <h1>Liste des Livres</h1>
    <table>
        <thead>
            <tr>
                <th>Image</th>
                <th>Titre</th>
                <th>Auteur</th>
                <th>ISBN</th>
                <th>Prix</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            <?php if (count($livres) > 0): ?>
                <?php foreach ($livres as $livre): ?>
                    <tr>
                        <td data-label="Image"><img src="<?= htmlspecialchars($livre['image_url']) ?>" alt="Image du livre"></td>
                        <td data-label="Titre"><?= htmlspecialchars($livre['titre']) ?></td>
                        <td data-label="Auteur"><?= htmlspecialchars($livre['auteur']) ?></td>
                        <td data-label="ISBN"><?= htmlspecialchars($livre['isbn']) ?></td>
                        <td data-label="Prix"><?= htmlspecialchars($livre['prix']) ?> €</td>
                        <td data-label="Actions">
                            <a href="modifier_livre.php?id=<?= $livre['id'] ?>">Modifier</a> |
                            <a href="supprimer_livre.php?id=<?= $livre['id'] ?>" onclick="return confirm('Êtes-vous sûr de vouloir supprimer ce livre ?');">Supprimer</a>
                        </td>
                    </tr>
                <?php endforeach; ?>
            <?php else: ?>
                <tr>
                    <td colspan="6" style="text-align: center;">Aucun livre trouvé.</td>
                </tr>
            <?php endif; ?>
        </tbody>
    </table>
</body>
</html>
