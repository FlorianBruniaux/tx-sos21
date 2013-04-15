TX SOS21 : Serious Game
=================

##Présentation:
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

