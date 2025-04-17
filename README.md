# TP Final - Projet Memory

ATTENTION : Marianne du futur a commit à la date du 20 avril apres avoir fait des tests en ayant modifié la date de son PC 🫠

Rendu final du cours de développement front-end avancé par **Tony De Donato** et **Marianne Corbel**, avec toutes nos excuses pour le retard et la gêne que celui-ci a pu occasionner.

Afin qu'il serve à nos portfolio respectifs, ce rendu est susceptible d'évoluer dans les jours/semaines suivants le rendu mais il s'agirait surtout de rangement de code et de fonctionnalités QoL, pas des éléments du barème.

## Spécifications techniques

Ce projet a été réalisé avec les technologies suivantes :
- **Framework** : Vue3
- **Stockage** : IndexedDB 
- **Persistance** : Pinia
- **Routage** : vue-router 

**Versions** :
- npm 10.9
- Node 22 (LTS)

## Installation

Pour récupérer le projet depuis GitHub : 
```
git clone https://github.com/mzribel/Projet-Memory.git
```
### Installation des dépendances
Dans le dossier du projet : 
```bash
cd .\Projet-Memory\
npm i
```
### Mode dév
L'utilisateur peut choisir de lancer le projet en mode dév via la commande suivante : 
```bash
cd .\Projet-Memory\
npm run dev
```
### Build 
Cependant, puisque ce projet utilise des service workers, il est fortement conseillé de build et de serve afin de pouvoir profiter au maximum des fonctionnalités de l'application :
```bash
cd .\Projet-Memory\
npm run build
cd .\dist\
npx serve -s
```

## Fonctionnalités
**Concept** : l'application repose sur le système Leitner, une méthode d'apprentissage par répétition espacée. Les cartes à mémoriser (regroupées par thèmes) sont réparties sur différents niveaux selon leur niveau de maîtrise. Lorsqu'une carte est correctement mémorisée, elle passe à un niveau moins fréquemment révisé. En cas d'erreur, elle descent d'un niveau, révisé plus souvent. 

L'application permet de :
- Créer des catégories, contenant des thèmes
- Créer des thèmes, contenant des cartes de révision
- Réviser chaque jour les cartes qui doivent l'être, ainsi qu'un nombre de nouvelles cartes par thème défini dans ceux-ci (s'il en reste).

### Liste exhaustive
- [x] Création de catégories, thèmes et cartes
- [x] Révision et répétition espacée
- [x] Notification quotidiennes paramétrables
- [x] Application téléchargeable et fonctionnement hors-ligne 
- [x] Gestion multimédia
- [X] Données de test *(dans `./data/` et importables via les paramètres)*
- [ ] Responsive *(en cours de réalisation)*
- [ ] Atomic Design : les composants ont été réalisés pour, mais la documentation associée n'a pas été réalisée par manque de temps

### Fonctionnalités supplémentaires
- [x] Personnalisation de l'application (username / photo de profil / notifications)
- [x]  Possibilités d'importer directement un JSON via les paramètres
- [x] Calendrier de révision
- [x] Possibilités de reset la progression d'un thème

### Fonctionnalités envisagées :
- [ ] Révision par catégorie ou par thème

## Organisation du code
Le code source se trouve dans le dossier `.\Projet-Memory\src\`.

Ce dossier contient d'autres dossiers et des fichiers qui peuvent être répartis par fonctionnalités :
```txt
// Données :
- database.ts		-> Configuration initiale de l'Indexed DB
> types					-> Interfaces pour les types de données
> stores				-> Configuration et gestion des stores Pinia

// Métier 
> composables		-> Fonctions réactives réutilisables

// Interfaces
> assets				-> Ressouces statiques (img, logo, scss...)
> components		-> Composants Vue réutilisables et isolés, regroupés par fonctionnalité
> layouts				-> Layouts de page utilisés sur plusieurs vues 
> views					-> Pages principales liées aux routes

// Routage
> router				-> Configuration de vue-router

// Application
- main.ts				-> Configuration et point d'entrée de l'application
- app.vue				-> Composant racine de l'application			
```
