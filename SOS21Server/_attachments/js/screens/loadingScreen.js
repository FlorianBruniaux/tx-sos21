define(['lib/melon'],
	   function(melon){
    // écran de chargement
   var CustomLoadingScreen = me.DefaultLoadingScreen.extend({
      onResetEvent : function(){
            this.logo1 = new me.Font('century gothic', 32, 'white', 'middle');
			this.logo2 = new me.Font('century gothic', 48, '#55A45A', 'middle');
			this.logo2.bold();
			this.logo1.textBaseline = this.logo2.textBaseline = "alphabetic";
			// setup a callback
			me.loader.onProgress = this.onProgressUpdate.bind(this);
      },
      update: function(){
         return true;
      },
      draw : function(context) {
			// measure the logo size
			var logo1_width = this.logo1.measureText(context, "SOS").width;
			var xpos = (me.video.getWidth() - logo1_width - this.logo2.measureText(context, "21").width) / 2;
			var ypos = me.video.getHeight() / 2;
			// clear surface
			me.video.clearSurface(context, "black");
			// draw the melonJS logo
			this.logo1.draw(context, 'SOS', xpos , ypos);
			xpos += logo1_width;
			this.logo2.draw(context, '21', xpos, ypos);
			ypos += this.logo1.measureText(context, "SOS").height / 2;
			// display a progressive loading bar
			var progress = Math.floor(this.loadPercent * me.video.getWidth());
			// draw the progress bar
			context.strokeStyle = "silver";
			context.strokeRect(0, ypos, me.video.getWidth(), 7);
			context.fillStyle = "#55A45A";
			context.fillRect(2, ypos + 2, progress - 4, 3);
		}
   });
    return CustomLoadingScreen;
});
