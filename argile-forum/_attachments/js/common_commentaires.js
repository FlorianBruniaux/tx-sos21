/*
* Incrémenter la valeur du commentaire
* @param {string}   id  ID du commentaire à noter. 
*/
function vote_up(id){

   db = $.couch.db("sos21");
   db.openDoc(id, {
           success: function(doc) {
               doc.vote_positif++;
               db.saveDoc(doc, {
                   success: function() {
                        var count = $("#positif_"+id);
                        count.text(doc.vote_positif);
                   }
                });
           }
       }
   );
} 

/*
* Décrémenter la valeur du commentaire
* @param {string}   id  ID du commentaire à noter. 
*/
function vote_down(id){

   db = $.couch.db("sos21");
   db.openDoc(id, {
       success: function(doc) {
           doc.vote_negatif++;
           db.saveDoc(doc, {
               success: function() {
                    var count = $("#negatif_"+id);
                    count.text(doc.vote_negatif);
               }
            });
       }
   });
}

