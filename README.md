TX SOS21 : Serious Game
=================

Projet Aurélien Benel : [https://github.com/benel/SOS21Server](https://github.com/benel/SOS21Server)


## Présentation:
L’objectif est de développer un jeu sérieux multi-joueurs avec des technologies web récentes. 
Etant 3 à travailler sur le projet nous avons chacun une mission spécifique. 

Voici les intitulés des 3 missions :
- Prototypage d'un jeu en 3D isométrique avec HTML5
- Prototypage d'un jeu multi-joueurs avec Ajax et Comet
- Prototypage d'un jeu persistant avec une base NoSQL

L’intérêt est que nous posions ensembles les bases techniques du jeu afin que celui-ci soit poursuivi et maintenu facilement.

## Requis
- [CouchDB](http://couchdb.apache.org)
- [couchapp](https://github.com/couchapp/couchapp)
- or any other tools that help you to create web application through Couchdb

## Dossiers 
- SOS21Server : dossier du jeu sos21
- Argile-forum : dossier du forum de conception participatif

## Pour démarrer

```bash
$ cd whateverpath
$ git clone https://github.com/FlorianBruniaux/tx-sos21.git <app_name>
$ cd <app_name>
$ couchapp push . http://<user>:<passwd>@localhost:5984/<db_name>
```

## Eléments 

### Personnages
```json
{
   "name": "player_name",
   "pseudo": "player_account",
   "loggedOn": true,
   "place": "ed78748a843191d9c9c5e50887581b77",
   "x": 231,
   "y": 155.33333333333334,
   "updatedAt": [
       2013,
       4,
       15,
       16,
       20
   ],
   "image": "default",
   "spriteheight": 70,
   "spritewidth": 60,
   "type": "character"
}
```

### Objets
```bash
  {
		"name": "obj1",
		"image": "obj1",
		"place": "ed78748a843191d9c9c5e50887581b77",
		"type": "Object",
		"visible": true,
		"x": 330,
		"y": 200,
		"spriteheight": 93,
		"spritewidth": 84,
		"colRect": {"x": 5,"w": 35,"y": 65,"h":20}
  }
```

    Type : ["collectableObject", "changeMapObject", "informationObject", "Object"]
    
### Maps
    Pour ajouter une carte :
    1. Sauvegarder la carte en format JSON dans Tiled Map Editor
    2. Utiliser le formulaire d'upload d'une carte (en bas de la page index)
```bash
{
   "name": "ortho",
   "type": "place",
   "height": 30,
   "layers": [
       {
           "data": [0,0,0,...],
           "height": 30,
           "name": "ref",
           "opacity": 1,
           "type": "tilelayer",
           "visible": true,
           "width": 30,
           "x": 0,
           "y": 0
       }
   ],
   "orientation": "orthogonal",
   "properties": {
   },
   "tileheight": 15,
   "tilesets": [
       {
           "firstgid": 1,
           "image": "../images/backgrounds/fond.png",
           "imageheight": 480,
           "imagewidth": 843,
           "margin": 0,
           "name": "fond",
           "properties": {
           },
           "spacing": 0,
           "tileheight": 420,
           "tilewidth": 840
       },
       {
           "firstgid": 2,
           "image": "../images/tiles/collision_ortho2.png",
           "imageheight": 15,
           "imagewidth": 30,
           "margin": 0,
           "name": "collision_ortho2",
           "properties": {
           },
           "spacing": 0,
           "tileheight": 15,
           "tileproperties": {
               "0": {
                   "type": "solid"
               }
           },
           "tilewidth": 30
       }
   ],
   "tilewidth": 30,
   "version": 1,
   "width": 30
}

```

### Action
```bash
  {
     "character": "NOM_PERSONNAGE",
     "place": "NOM_PLACE",
     "verb": "NOM_ACTION",
     "effects": {
         "economy": 5,
         "energy": 5,
         "money": 5,
         "reputation": 5
     },
     "updatedAt": [
         2013,
         4,
         4,
         21,
         31
     ]
  }
```
