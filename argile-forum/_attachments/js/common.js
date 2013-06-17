/***************************/
/*IDENTIFICATION, LOGIN ETC*/
/***************************/

/*
* Enregistrer un nouvel utilisateur
*/
function enregistrement(){
   var login = $('#enregistrementNom').val();
   var mdp = $('#enregistrementMdp').val();
   var email = $('#enregistrementEmail').val();
   var role = $('#enregistrementRole').val();
   
   enregistrer(login,mdp,email,role);
}

/*
* Se connecter
*/
function connexion(){
   var login = $('#connexionNom').val();
   var mdp = $('#connexionMdp').val();
  // alert("connexion");
   connecter(login,mdp);
}
                  
/*
 * Afficher/Masquer le formulaire de connexion
 */
function afficherFormConnexion(){
    var reg = document.getElementById("register");
    var log = document.getElementById("login");
    if(log.style.display=="none"){
        log.style.display="block";    
        reg.style.display="none";
    }
    else{
        log.style.display="none";
    }  
}

/*
 * Afficher/Masquer le formulaire d'enregistrement d'un nouveau compte'
 */
function afficherFormEnregistrement(){
    reg = document.getElementById("register");
    log = document.getElementById("login");
    if(reg.style.display=="none"){
        reg.style.display="block";
        log.style.display="none";
    }
    else{
        reg.style.display="none";
    }
}

/*
 * Enregistrement d'un nouveau compte
 * @param {string}  login   Nom du nouvel utilisateur
 * @param {string}  mdp     Mot de passe choisi
 * @param {string}  email   Email du nouvel utilisateur
 * @param {string}  role    Role du nouvel utilisateur
 * @param {string}  recrut  Si utilisateur ajouté par un recruteur
 */
function enregistrer(login,mdp,email,role,recrut){
    
    if(!role){
      var role = "basique";
    }
    
    db = $.couch.db("sos21");
    
    var laDate = new Date();
    
    db.saveDoc(
        {
            type : "utilisateur", 
            nom_utilisateur : login,
            mot_de_passe : mdp,
            email : email,
            role: role,
            created : laDate.toString()
        },
        {success: function(data){
            //On se connecte tout de suite après enregistrement, sauf si c'est via un recruteur'
            if((!recrut)||(recrut==null)){
                connecter(login,mdp);
            }
        }}
    );
}

/*
 * Connexion de l'utilisateur, cookie créé
 * @param   {string}    login   Nom d'utilisateur renseigné
 * @param   {string}    mdp     Mot de passe renseigné
 */
function connecter(login,mdp){
    
    //Pour savoir si on recharge la page après connexion ou si on affiche une erreur de connexion
    var reussi = false;
    
    db = $.couch.db("sos21");
    db.view("argile-forum/utilisateurs", {
        success: function(data) {
            //On cherche document par document si on trouve l'utilisateur'
            for(i in data.rows){
                if((data.rows[i].value.nom_utilisateur == login)&&((data.rows[i].value.mot_de_passe == mdp)||(data.rows[i].value.mot_de_passe == hex_md5(mdp)))){
                    var today = new Date(), expires = new Date();
                    expires.setTime(today.getTime() + (365*24*60*60*1000));
                    //On enregistre dans les cookies le nom et le role de l'utilisateur'
                    document.cookie = "loginForum" + "=" + encodeURIComponent(login) + ";expires=" + expires.toGMTString() +"; path=/";
                    document.cookie = "roleForum="+encodeURIComponent(data.rows[i].value.role)+";expires=" + expires.toGMTString() +"; path=/";
                    reussi = true;                 
                    window.location.reload();
                }
            }
            if(!reussi){
                alert("Mauvais login/mot de passe");
            }
        },
        error: function(status){
            //alert("erreur");
        } 
   });    
}

/*
 * Vérifier via les cookies si la personne est connectée.
 * @return {string} Renvoie le nom de l'utilisateur ou null
 */
function verifierConnexion(){
   //Via les expressions régulières, on récupère le nom utilisateur
   var oRegex = new RegExp("(?:; )?" + "loginForum" + "=([^;]*);?");

    if (oRegex.test(document.cookie)) {
            //On revoie le nom d'utilisateur'
            return decodeURIComponent(RegExp["$1"]);
    } else {
            return null;
    }
    
    
}

function verifierRole(){
   //Via les expressions régulières, on récupère le rôle
   var oRegex = new RegExp("(?:; )?" + "roleForum" + "=([^;]*);?");

    if (oRegex.test(document.cookie)) {
            //On renvoie le role de l'utilsiateur connecté'
            return decodeURIComponent(RegExp["$1"]);
    } else {
            return null;
    }
    
    
}

/*
 * Déconnection de l'utilisateur.
 * Valeur dans le cookie modifié pour expirer directement.
 */
function deconnecter(){
    var cookie_date = new Date ( );  // current date & time
    cookie_date.setTime ( cookie_date.getTime() - 10 );
    document.cookie = "loginForum" + "=; expires=" + cookie_date.toGMTString() +"; path=/";
    document.cookie = "roleForum" + "=; expires=" + cookie_date.toGMTString() +"; path=/";
    
    window.location.reload();
}


/***************************/
/*TOOLS*/
/***************************/

/*
* Vérifie si la valeur saisie est un entier
*/
function is_int(value){
    if((parseFloat(value) == parseInt(value)) && !isNaN(value)){
        return true;
    } else {
        return false;
    }
}
