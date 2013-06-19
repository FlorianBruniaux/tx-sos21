function(head, req) {
    
    
    var data = {
        objects : []    
    };
    
        
    while (row = getRow()) {
        data.objects.push(
            row.value
        )
        
    }
    
    send(JSON.stringify(data));
}