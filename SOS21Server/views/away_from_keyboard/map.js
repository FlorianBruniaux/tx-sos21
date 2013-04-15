function(o) {

  function isPlaying(_updatedAt){

	const timestamp = new Date();

	if (
          (_updatedAt[0] == timestamp.getFullYear() && _updatedAt[1] == timestamp.getMonth()+1 && _updatedAt[2] == timestamp.getDate() && _updatedAt[3] == timestamp.getHours()) 
	  &&
	  ( _updatedAt[4] >= timestamp.getMinutes()- 20) 
	){
	  return true;
	}
  }
  
  if (o.loggedOn && !isPlaying(o.updatedAt)) {
    emit([o._id], null);
  }

}