define(['lib/melon'], function(melon){
	var api = api || {};
	
	api.maps_folder = "data/maps/";
	api.tiles_folder = "data/images/tiles/";
	api.bg_folder = "data/images/backgrounds/";
	api.maps = [
	    {
	        name : "ortho",
	        tiles: ["collision_ortho2"],
	        bg: ["fond"]
	    }
	];

	api.firstMap = "ortho";
	
	return api;
});
