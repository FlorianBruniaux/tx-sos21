require.config({
    //By default load any module IDs from js/lib
    //baseUrl: 'js',
    //except, if the module ID starts with "app",
    //load it from the js/app directory. paths
    //config is relative to the baseUrl, and
    //never includes a ".js" extension since
    //the paths config could be for a directory.
    paths: {
        'jquery': 'lib/jquery-1.10.0.min'
    },
    packages: ["client", "entities", "event", "maps", "gui", "screen", "server"]
});

require(['jquery', 'client/game'], function($, Game){
    //formulaire d'upload des maps
    $("#form_addMap").submit(function(event){
        event.preventDefault();
        var fileMap = $("#mapChooser").get(0).files[0];
        console.log(fileMap);
        var reader = new FileReader();
        reader.readAsBinaryString(fileMap);
        reader.onloadend = function(e){
            dataToSend = JSON.parse(e.target.result);
            dataToSend["file"] = fileMap.name;
            dataToSend["name"] = fileMap.name.substr(0, fileMap.name.length - fileMap.name.match(/\..*/)[0].length);
            dataToSend["type"] = "place";
            console.log(dataToSend["name"]);
            $.ajax({
                url: "http://localhost:5984/sos21",
                method: "POST",
                contentType: "application/json; charset=UTF-8",
                data: JSON.stringify(dataToSend)
            });
        }
    });
    //formulaire de connexion au jeu
    $("#form_login").submit(function(event){
        event.preventDefault();
	var sos21 = new Game("sos21"); 	
        if(sos21.login($(this).find("input[name='pseudo']").val())){
			$("#sos21").show();
			$(this).fadeOut();
		}
    });
    $("#sos21").hide();
});
