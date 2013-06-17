define(['entities', 'lib/melon', 'server', 'client', 'entities/interactiveObject'], function(entities, melon, server, client, InteractiveObject){

    var InformationObject = InteractiveObject.extend({
        applyEffect: function(){
            console.log("information");
        }
    });
	
    return InformationObject;
});
