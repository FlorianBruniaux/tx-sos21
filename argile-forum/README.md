###Rappel :

Le forum Argile est un outil développé par le laboratoire Tech-Cico. 
Ce forum repose sur l’architecture ARGILE (Architecture for Representations, Games, Interactions, and Learning among Experts) adaptée au jeu sérieux « participatif et intensif en connaissances ».

Vous pouvez en apprendre plus sur cette architecture à l’adresse suivante :
http://publications.icd.utt.fr/6ada7cb718c613dcf8962006f186f1df/elmawas_RIHM_2012.pdf 

Le forum argile est une plate-forme web de co-conception participative permettant de concevoir collectivement les règles du jeu. 
Il a été concu par Nour el Mawas, J-p Cahier et Aurélien Bénel et réalisé par 2 étudiants lors d’une précédente TX.
En effet, un certain nombre de choix de conceptions qu’ils avaient effectué ont été repris et respectés. 

>**RQ**: Thierry TAN et Abderrazak BOUYOULLI : Réalisation d’un forum de discussion avec jQuery, HTML et CouchDB.

Ce dossier est issu du github de [Jp Cahier](https://github.com/cahier/Argile-Forum "Dossier argile d'origine").


Voyons ensembles à quoi ressemble l’architecture du forum ArgileV2. Dans l’ensemble elle ne change pas énormément de celle de l’ArgileV1.
Nous avons ajouté une rubrique include (dossier _attachments). On retrouve dans ce dossier 2 fichiers html : top.html et footer.html. 
Ce sont des bouts de codes html communs à toutes les pages. Afin d’éviter la redondance et faciliter les modifications, nous avons les avons isolés dans des fichiers externes que nous intégrons aux templates grâce à la fonction $.load de jQuery. 

*Ex : intégration du contenu de footer.html dans la div #footer.*
 
Le dossier js (également dans _attachments) contient désormais plusieurs fichiers JavaScripts regroupant les fonctions communes à différentes pages. Comme pour le code html, nous avons tenu à isoler le code commun et l’intégrons aux pages nécessaires en appelant les scripts. 
Le fichier rewrites.json a aussi était modifié afin de faciliter l’accès aux différents dossiers de l’application. 

Nous avons également ajouté des listes, templates et vues. Attention, nous ne présentons ici que la fonction de chacun de ces fichiers. Si vous souhaitez découvrir leur fonctionnement veuillez-vous reporter au code source et aux commentaires qu’il contient. 

###Nouvelles listes et templates :

>**RQ** : nous présentons ici les listes en même temps que le template qu’elles utilisent dans la mesure où ces derniers sont complémentaires. Retenez juste que la liste traite des données récupérées via une vue et les affiche via un template. Le rendu final est présenté en III.2.B.ii et III.2.C.ii.

  * **Commentaires_attributes** : Affiche une page web permettant de débattre et choisir les valeurs du top et du flop d’un attribut de règle.

>**RQ** : Un attribut de règle correspond en quelque sort à un effet sur le jeu ou les personnages. Par exemple, l’action « courir » aura pour effet une diminution de 2 points sur l’attribut « énergie » d’un personnage.  Ex : Steven à 10 points d’énergie. Il effectue l’action courir. Il perd donc 2 points et se retrouve désormais à 8 points d’énergie. Le top et le flop correspondent à l’adjectif que l’on donne respectivement aux personnages qui obtiennent le meilleur et le pire score pour un attribut donné.


  * **Commentaires_regles** : Affiche une page web qui permet de débattre et choisir quels seront les effets d’une action donnée. 

>**RQ** : Le débat se fait sous la forme d’un échange de commentaires constructifs. Chaque membre (ayant les droits nécessaires) peut participer au débat, donner son avis et proposer un ensemble d’effets. 

  * **Regles** : Affiche une page web présentant les règles et attributs déjà créés ainsi qu’un formulaire de création de règle.

###Nouvelles vues :

  * **Actions-executed** : Permet de récupérer le nom des actions qui ont déjà été exécutées ainsi que le nom du personnage qui l’a exécuté.

  * **Commentaires-attributes** : Permet de récupérer les objets «effects_attribute » (par ex : energie, moral etc) ainsi que les commentaires qui leurs sont liés (pour débattre du top et du flop…).

  * **Commentaires-regles** : Récupère les objets « règle » et les commentaires liés (pour débattre de l’effet de l’action).

  * **Effects-attributes** : Récupère les objets «effects_attribute » uniquement.

  * **Regles** : Récupère les objets « règle » uniquement


