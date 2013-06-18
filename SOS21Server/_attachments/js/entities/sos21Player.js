define(['entities', 'lib/melon', 'server'], function(entities, melon, server){
    
    var Sos21Player = me.ObjectEntity.extend({
        
        init: function(x, y, settings){
            this.servData = settings;
            this.skin = (settings.image != null)?entities.getSkin(settings.image):entities.getSkin("default");
            this._id = this.servData._id ? this.servData._id : null;
            this._rev = this.servData._rev ? this.servData._rev: null;
            this.parent(x, y, {image: this.skin.name, spriteheight: this.skin.height, spritewidth: this.skin.width});
            this.setVelocity(entities.playerSpeed, entities.playerSpeed);
            this.updateColRect(this.skin.colBox.x, this.skin.colBox.w, this.skin.colBox.y, this.skin.colBox.h);
            this.tmp_pos = {"x":this.pos.x, "y":this.pos.y};
            this.path = [];
            this.lastStep = false;
            this.position = {x: 0, y: 0}; // position du centre de la hitbox du joueur - pour le déplacement
            this.updatePosition();
            this.pos.x -= this.position.x - this.pos.x;
            this.pos.y -= this.position.y - this.pos.y;
            //animationSheet
            for(var name in this.skin.animationSheet){
                this.renderable.addAnimation(name, this.skin.animationSheet[name]);
            }
            this.direction = {x: "", y:""}; // direction en x et en y du personnage
            this.currentAnimation = {action: "stand", x: "", y:""};
            this.renderable.setCurrentAnimation(this.getCurrentAnimation());
        },
        updatePosition: function(){
            this.position.x = ( (this.collisionBox.pos.x+this.collisionBox.colPos.x) + this.collisionBox.width/2);
            this.position.y = ( (this.collisionBox.pos.y+this.collisionBox.colPos.y) + this.collisionBox.height/2);
        },
        updateAnimation: function(){
            var animation = {};
            if (this.direction.x || this.direction.y) {
                animation.action = "run";
                animation.y = (this.direction.y)?this.direction.y:"";
                animation.x = (this.direction.x)?this.direction.x:"";
            }else{
                animation.action = "stand";
                animation.y = this.currentAnimation.y;
                animation.x = this.currentAnimation.x;
            }
            this.currentAnimation = animation;
            this.renderable.setCurrentAnimation(this.getCurrentAnimation());
        },
        getCurrentAnimation: function(){
            str = (this.currentAnimation.action)?this.currentAnimation.action:"stand";
            str += (this.currentAnimation.y)?"-"+this.currentAnimation.y:"";
            str += (this.currentAnimation.x)?"-"+this.currentAnimation.x:"";
            return str;
        },
        update: function() {
            me.game.collide(this);
            this.updatePosition();
            this.computePath();
            this.updateAnimation();
            // check & update player movement
            this.updateMovement();
            if (this.renderUpdate()) {
                this.parent();
                return true;
            }
            else{
                return false;
            }
        },
        /**
         * Définit le chemin à suivre pour aller jusqu'à un point donné : utilisation de la librairie Pathfinding.js ()
         *
         *
         */
        moveTo: function(x, y){
            if(x != this.pos.x || y != this.pos.y){
                var endTile = me.game.currentLevel.mapLayers[0].getTile(x, y); // tile d'arrivée
                var startTile = me.game.currentLevel.mapLayers[0].getTile(this.position.x, this.position.y); // tile de départ
                if(startTile.row!=endTile.row || startTile.col!=endTile.col){
                    var grid = me.game.collisionMap.collisionGrid.clone(); // cloner le collision grid, car détruit par findPath() de Pathfinding.js
                    var path = me.game.collisionMap.pathfinder.findPath(startTile.col, startTile.row, endTile.col, endTile.row, grid);
                    path.forEach(function(coord, i){
                        var tmp = me.game.currentLevel.mapLayers[0].layerData[coord[0]][coord[1]].pos; // marqueur en haut à gauche de la tile
                        // ajuster le marqueur au milieu de la tile
                        tmp.x += me.game.currentLevel.mapLayers[0].layerData[coord[0]][coord[1]].width/2;
                        tmp.y += me.game.currentLevel.mapLayers[0].layerData[coord[0]][coord[1]].height/2;
                        if (i==path.length-1) { // last path step
                            // récupère la position réellement demandée pour la dernière étape
                            path[i][0] = x;
                            path[i][1] = y;
                        }else{
                            // l'étape est au milieu de la tile donnée par le pathfinding
                            path[i][0] = tmp.x;
                            path[i][1] = tmp.y;
                        }
                    });
                    /*if(!path[0]) // cas où le pathfind ne trouve pas de chemin : avancer en ligne droite (ex: demande à aller dans un mur)
                        path = [[x,y]];
                    */
                    path.shift();
                    this.path = path;
                }
            }
        },
        computePath: function(){
            if((typeof this.path != 'undefined')){
                if (this.path[0]) {
                    // maj de la position à atteindre
                    this.tmp_pos.x = this.path[0][0];
                    this.tmp_pos.y = this.path[0][1];
                    
                    if( (Math.abs(this.tmp_pos.x-this.position.x)<=(this.accel.x))
                       && (Math.abs(this.tmp_pos.y-this.position.y)<=(this.accel.y)) ){
                        // arrivé à la position souhaité
                        this.tmp_pos.x = this.position.x;
                        this.tmp_pos.y = this.position.y;
                        // passage à la prochaine position à atteindre
                        this.path.shift();
                        if (this.lastStep) {
                            this.lastStep = false;
                            this.endPath();
                        }
                        if (this.path.length == 1) {
                            this.lastStep = true;
                        }
                    }
                    // choix de la direction // me.timer.tick
                    this.vel.x = this.vel.x = this.tmp_pos.x - this.position.x;
                    if(this.vel.x>0){
                        this.direction.x = "right";
                    }
                    else if(this.vel.x<0){
                        this.direction.x = "left";
                    }
                    else{
                        this.direction.x = "";
                    }
                    this.vel.y = this.tmp_pos.y - this.position.y;
                    if(this.vel.y>0){
                        this.direction.y = "down";
                    }
                    else if(this.vel.y<0){
                        this.direction.y = "up";
                    }
                    else{
                        this.direction.y = "";
                    }
                    //this.updateVel();
                }
            }
        },
        updateVel: function(){
            if (this.direction.x!="" && this.direction.y!="") { 
                this.vel.x /= 2;// problèmes avec la direction
                this.vel.y /= 2;
                //this.vel.x = (this.tmp_pos.x - this.position.x)*0.5;
                //this.vel.y = (this.tmp_pos.y - this.position.y)*0.5;
            }
        },
        endPath: function(){
            
        },
        renderUpdate: function(){
            return (this.vel.x!=0 || this.vel.y!=0);
        }
    });
    return Sos21Player;
});
