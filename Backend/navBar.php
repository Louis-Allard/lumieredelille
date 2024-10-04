<style>

 nav {
        background-color: grey;
        font-style: none;
        display: flex;
        justify-content: center;
        margin-bottom: 20px;
    }

    .navbar{
        position: fixed;
        top: 0;
        left: 0;
        width: 100%; 
        z-index: 1000;
    }

    nav button {
        margin: 10px;
        padding: 10px 20px;
        border: none;
        border-radius: 5px;
        background-color: #333;
        color: white;
        cursor: pointer;
        text-decoration: none;
    }

    nav button a {
        color: white;
        text-decoration: none;
    }

    nav button:hover {
        background-color: #555;
    }
    </style>

<div class="navbar">
    <nav>
        <button ><a href="listeLivres.php">Liste des livres</a></button>
        <button ><a href="upload.php">Ajouter des livres</a></button>
        <button ><a href="textPresentation.php">Texte accueil</a></button>
        <button ><a href="backgroundImage.php">Image de fond</a></button>
        <button ><a href="logout.php">Déconnexion</a></button>
    </nav>
</div>



