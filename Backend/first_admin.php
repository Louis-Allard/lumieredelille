<?php
// require 'connexion.php';

// Vérifiez si l'administrateur existe déjà
$sql = "SELECT * FROM administrateurs WHERE username = :username OR email = :email";
$stmt = $connexion->prepare($sql);
$stmt->execute(['username' => 'admin', 'email' => 'admin@example.com']);
$admin = $stmt->fetch(PDO::FETCH_ASSOC);

if (!$admin) {
    // Créer le premier administrateur
    $username = 'admin'; // Nom d'utilisateur
    $password = password_hash('votreMotDePasse', PASSWORD_DEFAULT); // Hachage du mot de passe
    $email = 'admin@example.com'; // Adresse e-mail

    // Insertion dans la base de données
    $sql = "INSERT INTO administrateurs (username, password, email) VALUES (:username, :password, :email)";
    $stmt = $connexion->prepare($sql);
    if ($stmt->execute(['username' => $username, 'password' => $password, 'email' => $email])) {
        echo "Administrateur créé avec succès.";
    } else {
        echo "Erreur lors de la création de l'administrateur.";
    }
} else {
    echo "L'administrateur existe déjà.";
}
?>
