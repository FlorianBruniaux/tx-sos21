function(head, req) {
    // !json templates.tableau_honneur
    // !code lib/mustache.js
    start({"headers":{"Content-Type":"text/html;charset=utf-8"}});
    
    var data = {
        characters : [],
        attributes : []
    }
    
    characterIdAndName = [];
        
    while (row = getRow()) {
        
        if (row.key[0] == "effect_attribute") {
            data.attributes.push({
                "name" : row.key[1],
                "topcharacter" : "Plusieurs personnages",
                "top" : row.key[2],
                "topvalue" : "/",
                "flopcharacter" : "Plusieurs personnages",
                "flop" : row.key[3],
                "flopvalue" : "/"
            }); 
        }else if (row.key[0] == "character") {
           
            characterIdAndName.push({
                "id" : row.key[1],
                "name" : row.key[2]
            });
             
        }else if( row.key[0] == "characterId_and_attribute"){
            var alreadyAdded = exist(row.key[1]);
            if (alreadyAdded == false) {
                data.characters.push({
                    "id" : row.key[1],
                    "name" : "no",
                    "effects" : []
                });  
            }
            for each (c in data["characters"]) {
                if (c.id == row.key[1]) {
                    c.effects.push({
                        "attribute" : row.key[2],
                        "value" : row.value.sum
                    });
                }
            }   
        }
    }

    for each (c in data["characters"]) {
        
        for each(ch in characterIdAndName) {
            if (c.id == ch.id) {
                c.name = ch.name;
            }
        }
        for each (a in data["attributes"]) {
            
            var copy = true;
            for each(e in c.effects) {
                if (e.attribute == a.name) {
                    copy = false;
                    
                    if (a.topvalue == "/") {
                        a.topcharacter = c.name;
                        a.topvalue = e.value;
                    }else{
                        if (e.value > a.topvalue) {
                            a.topcharacter = c.name;
                            a.topvalue = e.value;   
                        }
                    }
                    
                    if (a.flopvalue == "/") {
                        a.flopcharacter = c.name;
                        a.flopvalue = e.value;
                    }else{
                        if (e.value < a.flopvalue) {
                            a.flopcharacter = c.name;
                            a.flopvalue = e.value;
                        }
                    } 
                }
               
                
            }
            if (copy == true) {
                c.effects.push({
                    "attribute" : a.name,
                    "value" : 0
                })  
            }
        }
        c.effects.sort(compare);
    }
    
    function compare(a,b) {
        if (a.attribute < b.attribute)
           return -1;
        if (a.attribute > b.attribute)
          return 1;
        return 0;
    }
      
    function exist(_id) {
        if (data.characters.length > 0) {
            for each (c in data["characters"]) {
                if (c.id == _id){
                    return true;
                }
            }   
        }
        return false;
    }
    
    return Mustache.to_html(templates.tableau_honneur, data);
}