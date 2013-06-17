function(head, req) {
  // !json templates.commentaires_attributes
  // !code lib/mustache.js
  start({"headers":{"Content-Type":"text/html;charset=utf-8"}});
  
  var data = {
    answered: "no",
    commentaires : []
  };
  var i = 0;
  while (row = getRow()) {
    
    if (i == 0){
      data.id_attribute = row.value._id;
      data.name = row.value.effets_attribute;
      data.top = row.value.top;
      data.flop = row.value.flop;
      data.answered = row.value.answered;
      data.answered_date = row.value.answered_date;
      data.logs = row.value.logs;
      i++;
    }
    else{
      
      if( row.value._id == data.answered){
	  data.answered_rev = row.value._rev;
	  data.answered_text = row.value.texte;
	  data.answered_top = row.value.top;
          data.answered_flop = row.value.flop;
          data.answered_author = row.value.auteur;
      }
      
      if (row.value.target == data.id_attribute ) {
        data.commentaires.push({
            id: row.value._id,
            rev: row.value._rev,
            target: row.value.target,
            texte: row.value.texte,
            vote_negatif: row.value.vote_negatif,
            vote_positif: row.value.vote_positif,
            date_modification: row.value.created,
            auteur: row.value.auteur,
            top : row.value.top,
            flop: row.value.flop    
        });
      }
    }
  }
  
  return Mustache.to_html(templates.commentaires_attributes, data);
}