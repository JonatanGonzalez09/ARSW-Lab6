/* En este agregue más planos (con más puntos) a los autores 'quemados' en el código. */

var apimock = (function () {

  var mockdata = [];

  mockdata["JhonConnor"] = [
      {
          author: "JhonConnor",
          name: "house",
          points: [
              {
                  x: 50,
                  y: 50
              },
              {
                  x: 50,
                  y: 100
              },
              {
                  x: 100,
                  y: 50
              },
              {
                  x: 100,
                  y: 150
              },
              {
                  x: 50,
                  y: 50
              },
              {
                  x: 70,
                  y: 25
              },
              {
                x: 100,
                y: 50
              },
              {
                x: 50,
                y: 50
              },
          ]
      },
      {
          author: "JhonConnor",
          name: "gear",
          points: [
              {
                  x: 25,
                  y: 25
              },
              {
                  x: 5,
                  y: 75
              },
              {
                x: 50,
                y: 25
            },
            {
                x: 5,
                y: 50
            },
            {
                x: 50,
                y: 75
            },
            {
                x: 25,
                y: 25
            }
          ]
      }
  ]
  mockdata["DiomedezDiaz"] = [
    {
      author: "DiomedezDiaz",
	  name: "LaPlata",
      points: [
        { x: 200, y: 200 },
        { x: 400, y: 200 },
        { x: 300, y: 100 },
        { x: 200, y: 200 },
        { x: 200, y: 400 },
        { x: 400, y: 400 },
        { x: 400, y: 200 }
      ]
      
    },
	{
      author: "DiomedezDiaz",
	  name: "VentanaMarroncita",
      points: [
        { x: 100, y: 120 },
        { x: 50, y: 300 },
        { x: 70, y: 100 },
        { x: 80, y: 110 },
        { x: 100, y: 120 }
      ]
      
    }
  ];


  return {
      getBlueprintsByAuthor: function(author, callback) {
          callback(null, mockdata[author]);
      },

      getBlueprintsByNameAndAuthor: function(name, author, callback ){
        blueprint = mockdata[author].find(function(blueprint) {
            return blueprint.name == name
        });
        callback(null, blueprint)
      }
  }

})();