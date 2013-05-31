define(['entities', 'lib/melon', 'server'], function(entities, melon, server){
    
    var Sos21Player = me.ObjectEntity.extend({
        init: function(x, y, settings){  
            this.servData = (settings.image != null) ? settings : {image: "joueur", spriteheight: 70, spritewidth: 60};
            this._id = this.GUID = this.servData._id ? this.servData._id : null;
            this._rev = this.servData._rev ? this.servData._rev: null;
            this.parent(x, y, {image: this.servData.image, spriteheight: this.servData.spriteheight, spritewidth: this.servData.spritewidth});
            this.setVelocity(2, 2);
            this.updateColRect(25, 10, 50, 5);
            this.tmp_pos = {"x":this.pos.x, "y":this.pos.y};
            this.cache_vel = {"x": this.vel.x, "y": this.vel.y};
            this.path = [];
            this.cache_path = [];
        },
        update: function() {
            this.computePath();
            // check & update player movement
            this.updateMovement();
            
            // check for collision
            var res = me.game.collide(this);
            
            
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
                //console.log(path);
                // DEBUG - trace path points
                if (typeof path != 'undefined') {
                    path.forEach(function(e){
                        entities.drawPoint(e[0], e[1]);
                    });
                }
                
            }
            else{
                console.log("rejected");
            }
        },
        computePath: function(){
            if((typeof this.path[0] != 'undefined')){
                if (this.path[0]) {
                    // maj de la position à atteindre
                    this.tmp_pos.x = this.path[0][0];
                    this.tmp_pos.y = this.path[0][1];
                    
                    if( (Math.abs(this.tmp_pos.x-this.pos.x)<=(this.accel.x)) && (Math.abs(this.tmp_pos.y-this.pos.y)<=(this.accel.y)) ){ 
                            // arrivé à la position souhaité
                            this.tmp_pos.x = this.pos.x;
                            this.tmp_pos.y = this.pos.y;
                            // passage à la prochaine position à atteindre
                            this.path.shift();
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
    });
    return Sos21Player;
});