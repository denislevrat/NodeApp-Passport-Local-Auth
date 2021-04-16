# NodeApp-Passport-Local-Auth
## Introduction
Ce git est une base d'application NodeJs avec les briques fondamentales de l'authentification.
Dans l'état, il n'est pas conçu pour la production mais peut servir de support de formation ou de base pour construire une application plus complexe.
Il utilise les technologies suivantes : [NodeJs](https://nodejs.org/), [Passport](http://www.passportjs.org/), [MongoDb](https://www.mongodb.com/), [Redis](https://redis.io/) et [Docker](https://www.docker.com/). Le tout est conteneurisé.

Voici le schéma de l'infrastructure global :
![containers structure](https://github.com/denislevrat/NodeApp-Passport-Local-Auth/blob/master/docs/NodeappStructure.png)  
Fig.1: Structure des containers

# Prérequis
Vous devez avoir installé et lancé Docker au préalable

## Installation
Cloner le git, créer l'image de l'app et exécuter le fichier docker-compose
```
git clone https://github.com/denislevrat/NodeApp-Passport-Local-Auth.git
cd NodeApp-Passport-Local-Auth
docker build nodeapp:v1 .
docker-compose up
```

## Résultat
Comme montré dans la Fig.1, les images et les containers sont automatiquement créés.

![docker images screenshot](https://github.com/denislevrat/NodeApp-Passport-Local-Auth/blob/master/docs/DockerImagesScSht.png)  
Fig.2: Images créées

![docker containers screenshot](https://github.com/denislevrat/NodeApp-Passport-Local-Auth/blob/master/docs/containerListScSht.png)  
Fig.3: Containers lancés

Ensuite, rendez-vous sur `http://localhost:8080`pour utiliser l'application
![singup page](https://github.com/denislevrat/NodeApp-Passport-Local-Auth/blob/master/docs/inscritptionScSht.png)  
Fig.4: Page d'inscription

![page d'authentification](https://github.com/denislevrat/NodeApp-Passport-Local-Auth/blob/master/docs/authentificationScSht.png)  
Fig.5: Page d'authentification

![page greatings](https://github.com/denislevrat/NodeApp-Passport-Local-Auth/blob/master/docs/greatingsScSht.png)  
Fig.6: Page de bienvenue

Pour administrer la base de données MongoDb via mongo-express, rendez-vous sur 'http://localhost:8081'
![mongo-express administration](https://github.com/denislevrat/NodeApp-Passport-Local-Auth/blob/master/docs/mongoExpressScSht.png)  
Fig.7: Administration de la base de données utilisateurs

## Idées de Todo
* Passer l'application en mode `https`
* Ajouter les mots de passe et les ip sécurisé sur les containers
* Ajouter l'action supprimer mon compte
* Valider l'inscription via l'envoi d'email
* Ajouter Bootstrap pour rendre l'app responsive
* ...

## les images utilisées
Vous trouverez dans la description de ces images toutes les informations pour implémenter la sécurité
* NodeJs [dockerhub Node](https://hub.docker.com/_/node)
* Redis [dockerhub Redis](https://hub.docker.com/_/redis)
* Mongodb [dockerhub Mongodb](https://hub.docker.com/_/mongo)
* Mongo-Express [dockerhub Mongo-Express](https://hub.docker.com/_/mongo-express)


