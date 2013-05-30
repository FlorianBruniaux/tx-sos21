define(['jquery', 'lib/melon', 'entities', 'server', 'entities/sos21Player'], function($, melon, entities, server, Sos21Player){
    // TODO : gérer le path finding pour les autres joueurs
    var OtherPlayer = Sos21Player.extend({
        init: function(x, y, settings) {
            this.parent(x, y, settings);
            
            //Ecoute d'un message "goTo", qui déclanche le déplacement via le pathfinder
            //V_JQuery
            $(server).on("move"+"."+this.servData._id, function(event, x, y){this.moveTo(x, y)}.bind(this));
            //V_1
            //goTo_callback = (function(objId, x, y){
            //    console.log(objId+" == "+this.servData._id+" ?")
            //    if (objId == this._id) {
            //        console.log("moveTo : "+x+" / "+y)
            //        this.moveTo(x, y);
            //    }
            //}).bind(this); //on bind this à l'objet courrant, et non à l'objet global
            //me.event.subscribe("moveTo", goTo_callback);
            
        },
        moveTo: function(x, y){
                y -= this.height/1.5;
                //console.log("from "+this.pos.x+";"+this.pos.y+" // to "+x+";"+y);
                this.parent(x, y);
        }
        //registerEvent: function(eventName, handler, eventData){
        //    $.on(eventName+"."+this.servData._id, , )
        //}
    });
    return OtherPlayer;
});