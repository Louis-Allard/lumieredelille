<?php
require 'connexion.php';

// Vérifier si un texte est soumis pour activation
if (isset($_POST['text_id'])) {
    $text_id = $_POST['text_id'];

    // Désactiver tous les textes
    $sql_deactivate = "UPDATE presentation_text SET is_active = 0";
    $stmt_deactivate = $connexion->prepare($sql_deactivate);
    $stmt_deactivate->execute();

    // Activer le texte sélectionné
    $sql_activate = "UPDATE presentation_text SET is_active = 1 WHERE id = :text_id";
    $stmt_activate = $connexion->prepare($sql_activate);
    $stmt_activate->bindParam(':text_id', $text_id, PDO::PARAM_INT);
    $stmt_activate->execute();

    echo "Texte activé avec succès.";
}

// Vérifier si un nouveau texte est soumis pour ajout
if (isset($_POST['new_text']) && !empty($_POST['new_text'])) {
    $new_text = $_POST['new_text'];

    // Insertion du nouveau texte dans la base de données
    $sql_insert = "INSERT INTO presentation_text (text, is_active) VALUES (:new_text, 0)";
    $stmt_insert = $connexion->prepare($sql_insert);
    $stmt_insert->bindParam(':new_text', $new_text, PDO::PARAM_STR);
    $stmt_insert->execute();

    echo "Nouveau texte ajouté avec succès.";
}

// Vérifier si un texte est soumis pour suppression
if (isset($_POST['delete_id'])) {
    $delete_id = $_POST['delete_id'];

    // Requête pour supprimer le texte sélectionné
    $sql_delete = "DELETE FROM presentation_text WHERE id = :delete_id";
    $stmt_delete = $connexion->prepare($sql_delete);
    $stmt_delete->bindParam(':delete_id', $delete_id, PDO::PARAM_INT);
    $stmt_delete->execute();

    echo "Texte supprimé avec succès.";
}

// Requête pour récupérer tous les textes
$sql = "SELECT id, text, is_active FROM presentation_text";
$stmt = $connexion->prepare($sql);
$stmt->execute();
$textes = $stmt->fetchAll(PDO::FETCH_ASSOC);
?>

<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Gestion des textes de présentation</title>
    <link rel="stylesheet" href="style.css">
    <script>
        // Fonction de confirmation avant la suppression
        function confirmDelete() {
            return confirm("Êtes-vous sûr de vouloir supprimer ce texte ?");
        }
    </script>
</head>
<body>

<style>
/* Style global */
body {
    font-family: 'Arial', sans-serif;
    background-color: #f9f9f9;
    margin: 0;
    padding: 0;
}

.container {
    max-width: 800px;
    margin: 50px auto;
    padding: 20px;
    background-color: #ffffff;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
}

h1, h2 {
    color: #333333;
    text-align: center;
}

form {
    margin-bottom: 30px;
    display: flex;
    flex-direction: column;
    gap: 10px;
}

label {
    font-weight: bold;
    margin-bottom: 5px;
}

select, textarea {
    padding: 10px;
    border: 1px solid #cccccc;
    border-radius: 5px;
    width: 100%;
    box-sizing: border-box;
}

button {
    padding: 10px 20px;
    background-color: #174180;
    color: #ffffff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

button:hover {
    background-color: #0E2B46;
}

ul {
    list-style-type: none;
    padding: 0;
    margin: 0;
}

ul li {
    background-color: #f1f1f1;
    padding: 10px;
    margin-bottom: 10px;
    border-radius: 5px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.active {
    font-weight: bold;
    color: green;
}

.delete-button {
    background-color: #E74C3C;
    padding: 5px 10px;
    font-size: 0.9rem;
    border-radius: 5px;
    margin-top: 1rem
}

.delete-button:hover {
    background-color: #c0392b;
}

textarea {
    resize: vertical;
}

/* Style de confirmation de suppression */
.confirmation {
    background-color: #f1c40f;
    padding: 10px;
    border-radius: 5px;
    margin-bottom: 20px;
}
</style>

<?php include_once('navBar.php'); ?>


<div class="container">
    <h1>Gestion des textes de présentation</h1>

    <form method="post" action="">
        <label for="text_id">Sélectionnez le texte à activer :</label>
        <select name="text_id" id="text_id">
            <?php foreach ($textes as $texte) : ?>
                <option value="<?= $texte['id']; ?>" <?= $texte['is_active'] ? 'selected' : ''; ?>>
                    <?= htmlspecialchars($texte['text']); ?>
                </option>
            <?php endforeach; ?>
        </select>
        <button type="submit">Activer ce texte</button>
    </form>

    <h2>Ajouter un nouveau texte</h2>

    <form method="post" action="">
        <label for="new_text">Écrivez un nouveau texte :</label><br>
        <textarea name="new_text" id="new_text" rows="4" cols="50"></textarea><br>
        <button type="submit">Ajouter le nouveau texte</button>
    </form>

    <h2>Textes disponibles</h2>
    <ul>
        <?php foreach ($textes as $texte) : ?>
            <li>
                <?= htmlspecialchars($texte['text']); ?> 
                <?= $texte['is_active'] ? '<span class="active">(Actif)</span>' : ''; ?>

                <!-- Formulaire de suppression avec confirmation -->
                <form method="post" action="" style="display:inline;" onsubmit="return confirmDelete();">
                    <input type="hidden" name="delete_id" value="<?= $texte['id']; ?>">
                    <button type="submit" class="delete-button">Supprimer</button>
                </form>
            </li>
        <?php endforeach; ?>
    </ul>
</div>

</body>
</html>
