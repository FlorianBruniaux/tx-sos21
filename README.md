Actions
=======

* Character "Galaad II" buys a "glass yogurt pot" in "Paris Dairy"

POST /

    {
      "character": "Galaad_II",
      "verb": "buyGlassYogurtPot",
      "timestamp": "2011-02-04 18:02:45",
      "place": "parisDairy",
      "effects": {
        "economy": -5,
        "environment": 5
      }
    }

* Global effects from the actions carried out by "Galaad II" (aka points)

GET /effects_by_character/Galaad_II

    {"rows":[
      {"key":["Galaad_II","economy"],"value":{"sum":-12,"count":2}},
      {"key":["Galaad_II","environment"],"value":{"sum":15,"count":3}}
    ]}


* Global effects from the actions carried out in "Paris Dairy"

GET /effects_by_place/parisDairy

    {"rows":[
      {"key":["parisDairy","economy"],"value":{"sum":-150,"count":30}},
      {"key":["parisDairy","environment"],"value":{"sum":150,"count":40}}
    ]}


* Global effects of all actions

GET /effects

    {"rows":[
      {"key":["economy"],"value":{"sum":-515,"count":303}},
      {"key":["environment"],"value":{"sum":600,"count":504}}
    ]}


Locations
=========

* Character "Galaad II" moves to (26, 15)

GET /playable_character/Galaad_II

    {
      "_id":"Galaad_II",
      "_rev":"70-1c4e788411ce3f48a20149a09e98daa8",
      "loggedOn":true,
      "place":"parisDairy",
      "x":29,
      "y":18,
      "updatedAt":[2011,2,5,18,54]
    }

PUT /playable_character/Galaad_II

    {
      "_id":"Galaad_II",
      "_rev": "70-1c4e788411ce3f48a20149a09e98daa8",
      "loggedOn": true,
      "place": "parisDairy",
      "x": 26,
      "y": 15,
      "updatedAt":[2011,2,5,18,54]
    }


* Characters locations in "Paris Dairy"

GET /characters_by_place/parisDairy

    {"rows":[
      {"doc":{
        "_id":"Galaad_II",
        "loggedOn":true,
        "place":"parisDairy",
        "x":29,
        "y":18,
        "updatedAt":[2011,2,5,18,54]
      }}
    ]}


* Idle characters since 2011-2-6

GET /away_from_keyboard?startkey=[2011,2,6]

    {"rows":[
      {"id":"Galaad_II","key":[2011,2,5,18,54]}
    ]}


Ongoing actions and moves in a place
====================================

* Wait for next event in "Paris Dairy"

GET /_changes_on_place/parisDairy

    {"last_seq":133}

GET /_changes_on_place/parisDairy?since=133&include_docs=true

    {"results":[
      {"seq":134,"doc":{"_id":"Galaad_II","place":"parisDairy","x":29,"y":17,"updatedAt":[2011,2,5,18,54]}}
    ], "last_seq":134}