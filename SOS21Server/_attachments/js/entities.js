
var entities_folder = "data/images/sprites/";
var entities = [
        {
            name: "joueur"
        }
    ];

var PlayerEntity = me.ObjectEntity.extend({
        init: function(x, y, settings) {
                this.parent(x, y, settings);
                this.setVelocity(3, 3);
                this.updateColRect(15, 25, 5, 55);
                //me.game.viewport.follow(this.pos, me.game.viewport.AXIS.BOTH);
        },
        update: function() {
                if (me.input.isKeyPressed('left')) {
                        // flip the sprite on horizontal axis
                        //this.flipX(true);
                        // update the entity velocity
                        this.doWalk(true);
                        //this.vel.x -= this.accel.x * me.timer.tick;
                } else if (me.input.isKeyPressed('right')) {
                        // unflip the sprite
                        this.flipX(true);
                        // update the entity velocity
                        this.vel.x += this.accel.x * me.timer.tick;
                } else {
                        this.vel.x = 0;
                }
                if (me.input.isKeyPressed('up')) {
                        // flip the sprite on horizontal axis
                        this.flipY(false);
                        // update the entity velocity
                        this.vel.y -= this.accel.y * me.timer.tick;
                } else if (me.input.isKeyPressed('down')) {
                        // unflip the sprite
                        this.flipY(false);
                        // update the entity velocity
                        this.vel.y += this.accel.y * me.timer.tick;
                }
                else{
                    this.vel.y = 0;
                }
                // check & update player movement
                this.updateMovement();
                
                // update animation if necessary
                if (this.vel.x!=0 || this.vel.y!=0) {
                        this.parent();
                        return true;
                }
                return false; // else inform the engine we did not perform
        },
}); //gestion de l'entité joueur