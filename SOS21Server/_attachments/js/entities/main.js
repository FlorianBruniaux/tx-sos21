define(['lib/melon'], function(melon){
    var api = api || {};
    
    //var serveurURL = "http://localhost:5984/sos21";
    api.entities_folder = "data/images/sprites/";
	api.objects_folder = "data/images/objects/";
    api.entities = [{name: "joueur"}];
	api.objects = [{name: "obj1"}];
    
    //CALCUL ORTHO  
    api.pxToTile = function(x, y){ // TO DO 
            var obj = {};
            obj.x = Math.ceil(x/me.game.collisionMap.tilewidth);
        obj.y = Math.ceil(y/me.game.collisionMap.tileheight);
        return obj;
    }
    
    api.tileToPx = function(x, y){
            var obj = {};
            obj.x = Math.ceil(x*me.game.collisionMap.tilewidth);
            obj.y = Math.ceil(y*me.game.collisionMap.tileheight);
            return obj;
    } 
    
    /*// CALCUL ISO
    var angle = Math.sqrt(3)/2;
    function pxToTile(x, y){ // TO DO 
            var obj = {};
            obj.x = ( (x-(me.game.collisionMap.width/2)) * angle - (y-(me.game.collisionMap.height/2)) * (-angle) ) + me.game.collisionMap.width/2;
        obj.y = ( (x-(me.game.collisionMap.width/2)) * (-angle) + (y-(me.game.collisionMap.height/2)) * angle ) + me.game.collisionMap.height/2;
        return obj;
    }
    
    function tileToPx(x, y){
            var obj = {};
            obj.x = Math.ceil(x*me.game.collisionMap.tilewidth);
            obj.y = Math.ceil(y*me.game.collisionMap.tileheight);
            return obj;
    } */
    
    // DEBUG --- draw path jump points
    api.drawPoint = function(x, y){
            var context = me.video.getScreenContext();
            context.beginPath();
            context.arc(x, y, 5, 0, 2 * Math.PI, false);
            context.fillStyle = 'green';
            context.fill();
            context.lineWidth = 1;
            context.strokeStyle = '#003300';
            context.stroke();
            context.closePath();
    } 
    return api; 
});





