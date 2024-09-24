<?php
session_start();
require 'connexion.php'; // Fichier de connexion à la base de données

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $identifiant = $_POST['identifiant']; // Peut être le nom d'utilisateur ou l'e-mail
    $password = $_POST['password'];

    // Requête pour vérifier les informations d'identification
    $sql = "SELECT * FROM administrateurs WHERE username = :identifiant OR email = :identifiant";
    $stmt = $connexion->prepare($sql);
    $stmt->bindParam(':identifiant', $identifiant);
    $stmt->execute();
    $admin = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($admin && password_verify($password, $admin['password'])) {
        // Authentification réussie
        $_SESSION['admin_logged_in'] = true;
        header('Location: listeLivres.php'); // Rediriger vers la page de liste des livres
        exit();
    } else {
        $error = "Nom d'utilisateur ou mot de passe incorrect.";
    }
}
?>

<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Connexion Admin</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f9;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            margin: 0;
        }
        .container {
            background-color: white;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
            max-width: 400px;
            width: 100%;
        }
        h2 {
            text-align: center;
            margin-bottom: 20px;
        }
        label {
            display: block;
            margin-bottom: 5px;
        }
        input[type="text"],
        input[type="password"] {
            width: 100%;
            padding: 10px;
            margin-bottom: 15px;
            border: 1px solid #ddd;
            border-radius: 5px;
        }
        input[type="submit"] {
            background-color: #007bff;
            color: white;
            padding: 10px;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            width: 100%;
        }
        input[type="submit"]:hover {
            background-color: #0056b3;
        }
        .error {
            color: red;
            text-align: center;
            margin-bottom: 15px;
        }
    </style>
</head>
<body>

    <div class="container">
        <h2>Connexion Admin</h2>
        <?php if (isset($error)): ?>
            <div class="error"><?= htmlspecialchars($error) ?></div>
        <?php endif; ?>
        <form method="post">
            <label for="identifiant">Nom d'utilisateur ou E-mail :</label>
            <input type="text" name="identifiant" id="identifiant" required>

            <label for="password">Mot de passe :</label>
            <input type="password" name="password" id="password" required>

            <input type="submit" value="Se connecter">
        </form>
    </div>
</body>
</html>
