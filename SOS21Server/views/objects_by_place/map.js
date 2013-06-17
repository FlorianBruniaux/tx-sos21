function (obj) {
    
    if(obj.type.match(/object$/gi)) {
        
        emit(obj.place, obj);
        
    }
    
}