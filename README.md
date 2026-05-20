# Projets-Perso-Randonnees

## Résumé

Ce projet contient le backend d'une application de gestion de randonnées. Il fournit des routes pour l'authentification, la gestion des utilisateurs et des randonnées, et utilise une base de données MySQL.

## Structure principale

- `Backend/` : code serveur Node.js/Express
  - `src/` : source (controllers, models, routes, middlewares)
  - `database/schema.sql` : script SQL pour créer la base de données
- `ressources/` : documents (cahier des charges, MCD, MLD)

## Technologies

- Node.js
- Express
- MySQL (mysql2)
- JWT pour l'authentification
- bcrypt pour le hachage des mots de passe
- dotenv pour la configuration

## Prérequis

- Node.js v16+ et `npm`
- MySQL (ou un serveur compatible)

## Installation

1. Ouvrir un terminal à la racine du projet.
2. Installer les dépendances du backend :

```bash
cd Backend
npm install
```

3. Créer un fichier `.env` dans `Backend/` et définir les variables d'environnement suivantes :

```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=hiking_db
PORT=3000
JWT_SECRET=change_this_secret
```

## Base de données

1. Créer la base de données et les tables avec le script fourni :

```bash
# depuis la racine du projet
mysql -u <user> -p < Backend/database/schema.sql
```

2. Vérifier la connexion dans `Backend/src/config/db.js` et ajuster les variables d'environnement si nécessaire.

## Lancer le serveur

Depuis le dossier `Backend/` :

```bash
npm start
```

Le script `start` lance `nodemon src/server.js` (redémarrage automatique en développement). L'API écoutera sur le port défini par `PORT` dans le `.env` (par défaut `3000`).

## Routes principales

Les routes sont définies dans `Backend/src/routes/` :

- Auth : routes d'inscription, connexion, refresh token
- Hike : création, lecture, modification, suppression des randonnées
- User : informations et gestion des utilisateurs

Consultez les fichiers suivants pour les détails :

- `Backend/src/routes/authRoutes.js`
- `Backend/src/routes/hikeRoutes.js`
- `Backend/src/routes/userRoutes.js`

## Variables d'environnement récapitulatives

- `DB_HOST` : hôte MySQL
- `DB_USER` : utilisateur MySQL
- `DB_PASSWORD` : mot de passe MySQL
- `DB_NAME` : nom de la base de données
- `PORT` : port d'écoute de l'API
- `JWT_SECRET` : clé secrète pour la génération des tokens JWT

## Tests et développement

- Le projet ne contient pas encore de tests automatisés. Pour le développement, `npm start` utilise `nodemon` pour recharger automatiquement le serveur.

## Prochaines améliorations possibles

- Ajouter des tests (unitaires et d'intégration)
- Ajouter des scripts Docker pour la base de données
- Documenter les endpoints avec Swagger ou Postman

## Contact

Pour toute question ou amélioration, ouvrez une issue ou contactez l'auteur du dépôt.
