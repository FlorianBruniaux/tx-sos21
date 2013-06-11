function(head, req) {
  // !json templates.commentaires_regles
  // !code lib/mustache.js
  start({"headers":{"Content-Type":"text/html;charset=utf-8"}});
  
  //Initialisation de l'objet data, et valeurs par défaut
  var data = {
    answered: "no",
    commentaires:[]
  };
  
  var i = 0;
  
  //On récupère l'objet JSON de la requête
  while (row = getRow()) {
    
    if (i == 0){
      data.description_regle = row.value.description;
      data.id_regle = row.value._id;
      data.auteur_regle = row.value.auteur;
      data.titre_regle = row.value.title;
      data.date_creation_regle = row.value.created;
      data.logs = row.value.logs;
      data.answered = row.value.answered;
      data.answered_date = row.value.answered_date;
      data.answered_action_rev = row.value.answered_action_rev;
      data.answered_action_id = row.value.answered_action_id;
      i++;
    }
    else{
      
      if (row.value.target == data.id_regle ) {
	data.commentaires.push({
	    order: ++i,
	    id: row.value._id,
	    rev: row.value._rev,
	    target: row.value.target,
	    texte: row.value.texte,
	    vote_negatif: row.value.vote_negatif,
	    vote_positif: row.value.vote_positif,
	    date_modification: row.value.created,
	    auteur: row.value.auteur,
	    effects : row.value.effects
	});
      }
      
      if( row.value._id == data.answered){
	  data.answered_rev = row.value._rev;
	  data.answered_text = row.value.texte;
	  data.answered_effects = row.value.effects;
	  data.answered_count = row.value.vote_count;
	  data.answered_author = row.value.auteur;
      }
    }
  }
  
  return Mustache.to_html(templates.commentaires_regles, data);
}