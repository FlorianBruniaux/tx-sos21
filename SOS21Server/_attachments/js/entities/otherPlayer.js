define(['entities', 'lib/melon'], function(entities, melon){
    // TODO : gérer le path finding pour les autres joueurs
    var OtherPlayer = me.ObjectEntity.extend({
            init: function(x, y, settings) {
                this.servData = settings ? settings : {image: "joueur", spriteheight: 70, spritewidth: 60};
                this.parent(x, y, this.servData);
                this._id = this.GUID = this.servData._id ? this.servData._id : null;
                this._rev = this.servData._rev ? this.servData._rev: null;
                this.setVelocity(3, 3);
                this.updateColRect(15, 25, 5, 55);
                this.tmp_pos = {"x":this.pos.x, "y":this.pos.y};
            },
            update: function() {
                
                var coef_x = (this.tmp_pos.x>=this.pos.x)?((this.tmp_pos.x-this.pos.x)):-((this.pos.x-this.tmp_pos.x));
                this.vel.x = (this.tmp_pos.x==this.pos.x)?0:this.vel.x+(this.accel.x * me.timer.tick * coef_x);   
                
                var coef_y = (this.tmp_pos.y>=this.pos.y)?(this.tmp_pos.y-this.pos.y):-(this.pos.y-this.tmp_pos.y);
                this.vel.y = (this.tmp_pos.y==this.pos.y)?0:this.vel.y+(this.accel.y * me.timer.tick * coef_y);    
                // check & update player movement
                this.updateMovement();
                // update animation if necessary
                if (this.vel.x!=0 || this.vel.y!=0) {
                        this.parent();
                        return true;
                }
                return false; // else inform the engine we did not perform
            },
            
            longpollMvt: function(x, y){
                this.tmp_pos.x = x;
                this.tmp_pos.y = y;
            }
    });
    return OtherPlayer;
});