function(head, req) {
  // !json templates.commentaires
  // !code lib/mustache.js
  start({"headers":{"Content-Type":"text/html;charset=utf-8"}});
  
  //Initialisation de l'objet data, et valeurs par défaut
  var data = {
    topic: "Test",
    topic_id: "Test",
    answered: "",
    texte: [],
    parents_id: [],
    parents_titre: [],
    commentaires: []
  };
  var i = 0;
  
  //On récupère l'objet JSON de la requête
  while (row = getRow()) {
    //Si c'est un document topic, page de discussion
    if (i==0){
        data.topic = row.value.title;
        data.topic_id = row.value._id;
        data.topic_text = row.value.text;
        data.answered = row.value.answered;
        data.answered_date = row.value.answered_date;
        data.date_modification = row.value.created;
        data.type_objet = row.value.type_objet;
        data.auteur = row.value.auteur;
        data.mots_cle = row.value.mots_cle;
        for(var j in row.value.parents){
            data.parents_id.push(row.value.parents[j].id);
            data.parents_titre.push(row.value.parents[j].titre);
        }
        for(var nomFichier in row.value._attachments){
            data.image = nomFichier;
        }
        i++;
    }
    else{
        //On récupère les commentaires associés au fil de discussion
    	data.commentaires.push({
            order: ++i,
            id: row.id,
            rev: row.value._rev,
            text: row.value.text,
            vote_negatif: row.value.vote_negatif,
            vote_positif: row.value.vote_positif,
            date_modification: row.value.created,
            auteur: row.value.auteur
    	});
        //Pour chaque commentaire récupérée, on vérifie si c'est celui validé. 
        //On récupère pour le mettre en avant
        if(row.id==data.answered){
            data.answered_text = row.value.text;
            data.answered_count = row.value.vote_count;
            data.answered_author = row.value.auteur;
        }
    }
  }
  
  //On applique les valeurs à la page html commentaires
  return Mustache.to_html(templates.commentaires, data);
}