define(['entities', 'lib/melon', 'client/scene', 'client', 'entities/gameObject', 'event/mediator'],
       function(entities, melon, scene, client, GameObject, mediator){
    /**
     * Objet interactif de base
     * Ne pas instacier, utiliser un surcouche comme CollectableObject ou ChangeMapObject
     */
    var InteractiveObject = GameObject.extend({
        hasBeenClicked: false,
        effectTriggered: false,
        init: function(x, y, settings){
            this.parent(x,y,settings);
            me.input.registerPointerEvent("mousedown", this.collisionBox, function(e){
				me.event.publish("event_"+this.GUID);
			}.bind(this));
			this.mouseDown = (function(){
				this.hasBeenClicked = true;
			}).bind(this);
			this.unregisterMouseClick = (function(){
				var mouse = client.getMouse();
				if (!this.collisionBox.containsPoint(mouse.x, mouse.y) && this.hasBeenClicked){
					this.hasBeenClicked = false;
				}
			}).bind(this);
			this.mouseHandler = me.event.subscribe("mousedown", this.unregisterMouseClick);
			me.event.subscribe("event_"+this.GUID, this.mouseDown);
        },
        update: function(){
            this.checkMouseOver();
            this.checkInteraction();
            this.parent();
        },
        onCollision : function(res, obj) {
			if (obj.servData.pseudo == scene.mainPlayerData.pseudo && this.hasBeenClicked) {
				this.triggerEffect();
			}
		},
        /**
         * Controle la fin de l'interaction avec le personnage -> reset eventTrigger
         */
        checkInteraction: function(){
            var collision = me.game.collide(this);
            if (!collision && this.effectTriggered) {
                this.effectTriggered = false;
            }
        },
        /**
         * Déclenche l'effet de l'objet
         */
        triggerEffect: function(){
			if (!this.effectTriggered) {
				this.effectTriggered = true;
				this.applyEffect();
			}
		},
        /**
         * Applique l'éffet
         */
		applyEffect: function(){
			mediator.publish("objectInteraction", [this.servData]);
		},
        /**
         * Déclenche les effets de mouseOver, mouseOut
         */
        checkMouseOver: function(){
			var mouse = client.getMouse();
			if (this.collisionBox.containsPoint(mouse.x, mouse.y)) {
				this.onMouseOver();
			}
			else{
				this.onMouseOut();
			}
		},
        /**
         * Effet du mouseOver
         */
        onMouseOver: function(){
            me.video.getScreenCanvas().style.cursor="move"; // BETA TEST
			this.setAnimation("mouseover");
        },
        /**
         * effet Du mouseOut
         */
		onMouseOut: function(){
			me.video.getScreenCanvas().style.cursor="auto"; // BETA TEST
			this.setAnimation("default");
		},
		onDestroyEvent: function(){
			me.event.unsubscribe(this.mouseHandler);
			this.parent();
		}
    });
    
    return InteractiveObject;
});
