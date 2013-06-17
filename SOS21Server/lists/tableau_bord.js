function(head, req) {
    // !json templates.tableau_bord
    // !code lib/mustache.js
    start({"headers":{"Content-Type":"text/html;charset=utf-8"}});
    
    var data = {
        characters : [],
        attributes : [],
        actions: []
    }
    
    var executants = [];
        
    while (row = getRow()) {
        
        if (row.key[0] == "effet_attribute") {
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
        else if(row.key[0] == "character"){
            
            if (existCharacter(row.key[1]) == false) {
                data.characters.push({
                    "pseudo" : row.key[1],
                    "effets" : []
                });  
            }
            
            for each (c in data["characters"]) {
                if (c.pseudo == row.key[1]) {
                    c.effets.push({
                        "attribute" : row.key[2],
                        "value" : row.value.sum
                    });
                }
            }   
        }
        else if(row.key[0] == "executed-action" ){
            
            data.actions.push({
                "name" : row.key[3],
                "nb_executions" : row.value.count,
                "nb_executants" : 0,
                "id_regle": row.key[1],
                "effets" : row.key[2],
                "executants" : []
            });
            
        }
        else if (row.key[0] == "executant") {
            executants.push({
                "name": row.key[3],
                "action" : row.key[2],
                "nb_executions": row.value.count,
                "effets" : row.key[1]
            });
        }
        else{
            if (existAction(row.key[3], row.key[2]) == false) {
                data.actions.push({
                    "name" : row.key[3],
                    "nb_executions" : 0,
                    "nb_executants" : 0,
                    "id_regle": row.key[1],
                    "effets" : row.key[2]
                }); 
            }
        }
    }
    
    function existAction(_name, _effets) {
        if (data["actions"].length > 0) {
            for each (a in data["actions"]) {
                if ((a.name == _name) && (JSON.stringify(a.effets) == JSON.stringify(_effets))){
                    return true;
                }
            }   
        }
        return false;
    }

    for each (c in data["characters"]) {
        for each (a in data["attributes"]) {
            var copy = true;
            for each(e in c.effets) {
                if (e.attribute == a.name) {
                    copy = false;
                    
                    if (a.topvalue == "/") {
                        a.topcharacter = c.pseudo;
                        a.topvalue = e.value;
                    }else{
                        if (e.value > a.topvalue) {
                            a.topcharacter = c.pseudo;
                            a.topvalue = e.value;   
                        }
                    }
                    
                    if (a.flopvalue == "/") {
                        a.flopcharacter = c.pseudo;
                        a.flopvalue = e.value;
                    }else{
                        if (e.value < a.flopvalue) {
                            a.flopcharacter = c.pseudo;
                            a.flopvalue = e.value;
                        }
                    }
                }
            }
            if (copy == true) {
                c.effets.push({
                    "attribute" : a.name,
                    "value" : 0
                })  
            }
        }
        c.effets.sort(compareAttributes);
    }
    
    data.actions.sort(compareName);
    
    
    for each (ac in data["actions"]) {

        for each( ex in executants) {
            if ( (ex.action == ac.name) && (JSON.stringify(ex.effets) == JSON.stringify(ac.effets)) ) {
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
            for each(e in ac.effets) {
                if (e.name == a.name) {
                    copy = false;
                }
            }
            if (copy == true) {
                ac.effets.push({
                    "name" : a.name,
                    "value" : 0
                })  
            }
        }
        */
        //ac.effets.sort(compareAttributes);
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
      
    function existCharacter(_pseudo) {
        if (data["characters"].length > 0) {
            for each (c in data["characters"]) {
                if (c.pseudo == _pseudo){
                    return true;
                }
            }   
        }
        return false;
    }
    
    return Mustache.to_html(templates.tableau_bord, data);
}