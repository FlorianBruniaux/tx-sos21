function(head, req) {
    // !json templates.tableau_bord
    // !code lib/mustache.js
    start({"headers":{"Content-Type":"text/html;charset=utf-8"}});
    
    var data = {
        characters : [],
        attributes : [],
        actions: []
    }
    
    var characterIdAndName = [];
    
    var executants = [];
        
    while (row = getRow()) {
        
        if (row.key[0] == "effect_attribute") {
            data.attributes.push({
                "id_attribute": row.key[4],
                "name" : row.key[1],
                "topcharacter" : "Plusieurs personnages",
                "top" : row.key[2],
                "topvalue" : "/",
                "flopcharacter" : "Plusieurs personnages",
                "flop" : row.key[3],
                "flopvalue" : "/"
            }); 
        }
        else if(row.key[0] == "characterId_and_attribute"){
            
            if (existCharacter(row.key[1]) == false) {
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
        else if(row.key[0] == "character"){
            
            characterIdAndName.push({
                "id" : row.key[1],
                "name" : row.key[2]
            });
   
        }
        else if(row.key[0] == "executed-action" ){
            
            data.actions.push({
                "name" : row.key[3],
                "nb_executions" : row.value.count,
                "nb_executants" : 0,
                "id_regle": row.key[1],
                "effects" : row.key[2],
                "executants" : []
            });
            
        }
        else if (row.key[0] == "executant") {
            executants.push({
                "id": row.key[3],
                "name": "no",
                "action" : row.key[2],
                "nb_executions": row.value.count,
                "effects" : row.key[1]
            });
        }
        else{
            if (existAction(row.key[3], row.key[2]) == false) {
                data.actions.push({
                    "name" : row.key[3],
                    "nb_executions" : 0,
                    "nb_executants" : 0,
                    "id_regle": row.key[1],
                    "effects" : row.key[2]
                }); 
            }
        }
    }
    
    function existAction(_name, _effects) {
        if (data["actions"].length > 0) {
            for each (a in data["actions"]) {
                if ((a.name == _name) && (JSON.stringify(a.effects) == JSON.stringify(_effects))){
                    return true;
                }
            }   
        }
        return false;
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
        c.effects.sort(compareAttributes);
    }
    
    data.actions.sort(compareName);
    
    for each(ex in executants) {
        for each(ch in characterIdAndName) {
            if (ex.id == ch.id) {
                ex.name = ch.name;
            }
        }
    }
    
    for each (ac in data["actions"]) {
        
        for each( ex in executants) {
            if ( (ex.action == ac.name) && (JSON.stringify(ex.effects) == JSON.stringify(ac.effects)) ) {
                ac.nb_executants++;
                ac.executants.push({
                    "name" : ex.name,
                    "nb_executions" : ex.nb_executions
                });
            }
        }
        
        /*
        for each (a in data["attributes"]) {
            var copy = true;
            for each(e in ac.effects) {
                if (e.name == a.name) {
                    copy = false;
                }
            }
            if (copy == true) {
                ac.effects.push({
                    "name" : a.name,
                    "value" : 0
                })  
            }
        }
        */
        //ac.effects.sort(compareAttributes);
    }
    
    function compareAttributes(a,b) {
        if (a.attribute < b.attribute)
           return -1;
        if (a.attribute > b.attribute)
          return 1;
        return 0;
    }
    
    function compareName(a,b) {
        if (a.name < b.name)
           return -1;
        if (a.name > b.name)
          return 1;
        return 0;
    }
      
    function existCharacter(_id) {
        if (data["characters"].length > 0) {
            for each (c in data["characters"]) {
                if (c.id == _id){
                    return true;
                }
            }   
        }
        return false;
    }
    
    return Mustache.to_html(templates.tableau_bord, data);
}