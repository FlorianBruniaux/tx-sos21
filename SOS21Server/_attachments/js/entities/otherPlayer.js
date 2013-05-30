define(['jquery', 'lib/melon', 'entities', 'server'], function($, melon, entities, server){
    // TODO : gérer le path finding pour les autres joueurs
    var OtherPlayer = me.ObjectEntity.extend({
        init: function(x, y, settings) {
            this.servData = (settings.image != null) ? settings : {image: "joueur", spriteheight: 70, spritewidth: 60};
            this.parent(x, y, {image: this.servData.image, spriteheight: this.servData.spriteheight, spritewidth: this.servData.spritewidth});
            this._id = this.GUID = this.servData._id ? this.servData._id : null;
            this._rev = this.servData._rev ? this.servData._rev: null;
            this.setVelocity(3, 3);
            this.updateColRect(15, 25, 50, 10);
            this.tmp_pos = {"x":this.pos.x, "y":this.pos.y};
            //variables pour le déplacement en pathfinding 
            this.cache_vel = {"x": this.vel.x, "y": this.vel.y};
            this.path = [];
            this.cache_path = [];
            
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
        update: function() {
            this.computePath(); 
            // check & update player movement
            this.updateMovement();
            if (this.renderUpdate()) {
                        this.updateCacheVelocity();
                this.parent();
                return true;
            }
            else{
                this.updateCacheVelocity();
                return false; // else inform the engine we did not perform  
            }
        },
        moveTo: function(x, y){
                y -= this.height/1.5;
                console.log("from "+this.pos.x+";"+this.pos.y+" // to "+x+";"+y);
                if(x != this.pos.x && y != this.pos.y){
                        var endTile = entities.pxToTile(x, y);
                        var startTile = entities.pxToTile(this.pos.x, this.pos.y);
                        if(!(startTile.x==endTile.x && startTile.y==endTile.y)){
                                    var grid = me.game.collisionMap.collisionGrid.clone();
                                    var path = me.game.collisionMap.pathfinder.findPath(startTile.x, startTile.y, endTile.x, endTile.y, grid);
                                    path.forEach(function(coord, i){
                                        var tmp = entities.tileToPx(coord[0], coord[1]);
                                        path[i][0] = tmp.x;
                                        path[i][1] = tmp.y;
                                    });
                                    if(!path[0])
                                        path = [[x,y]];
                                }
                                this.path = path;
                                this.cache_path = [this.path];
                                console.log(path);
                        
                                // DEBUG - trace path points
                                path.forEach(function(e){
                                        entities.drawPoint(e[0], e[1]);
                                });
                        }
                        else{
                                console.log("rejected");
                        }
        },
        computePath: function(){
            if(this.path[0]){
                // maj de la position à atteindre
                this.tmp_pos.x = this.path[0][0];
                this.tmp_pos.y = this.path[0][1];
                
                if( (Math.abs(this.tmp_pos.x-this.pos.x)<=(this.accel.x)) && (Math.abs(this.tmp_pos.y-this.pos.y)<=(this.accel.y)) ){ 
                    // arrivé à la position souhaité
                    this.tmp_pos.x = this.pos.x;
                    this.tmp_pos.y = this.pos.y;
                    // passage à la prochaine position à atteindre
                    this.path.shift();
                    console.log("reach point");
                }
                // Calcul de la vélocité pour aller sur la position
                if(this.tmp_pos.x>this.pos.x){
                        this.vel.x += this.accel.x * me.timer.tick;
                }
                else if(this.tmp_pos.x<this.pos.x){
                        this.vel.x -= this.accel.x * me.timer.tick;
                }
                else{
                        this.vel.x = 0;
                }
                
                if(this.tmp_pos.y>this.pos.y){
                        this.vel.y += this.accel.y * me.timer.tick;
                }
                else if(this.tmp_pos.y<this.pos.y){
                        this.vel.y -= this.accel.y * me.timer.tick;
                }
                else{
                        this.vel.y = 0;
                }
            }
            else if(this.cache_path[0]){
                this.endPath();
            }
        },
        endPath: function(){
            // reset cache path
            this.cache_path = [];
        },
        updateCacheVelocity: function(){
            // update cache velocity
            this.cache_vel.x = this.vel.x;
            this.cache_vel.y = this.vel.y;
        },
        renderUpdate: function(){
            return this.cache_vel.x!=0 || this.cache_vel.y!=0;
        }
        //registerEvent: function(eventName, handler, eventData){
        //    $.on(eventName+"."+this.servData._id, , )
        //}
    });
    return OtherPlayer;
});