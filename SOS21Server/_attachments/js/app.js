require.config({
    //By default load any module IDs from js/lib
    //baseUrl: 'js',
    //except, if the module ID starts with "app",
    //load it from the js/app directory. paths
    //config is relative to the baseUrl, and
    //never includes a ".js" extension since
    //the paths config could be for a directory.
    paths: {
        'jquery': 'lib/jquery-1.6.1.min'
    },
    packages: ["client", "entities", "maps", "server"]
});

require(['jquery', 'client/sos21'], function($, sos21){
    $("#form_login").submit(function(event){
        event.preventDefault();
		
        if(sos21.login($(this).find("input[name='pseudo']").val())){
			$("#sos21").show();
			$(this).fadeOut();
		}
    });
    $("#sos21").hide();
});