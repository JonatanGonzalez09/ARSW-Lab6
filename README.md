# ARSW-Lab5

Realizado por: Jonatan Esteban Gonzalez Rodriguez y David Eduardo Caycedo

### Escuela Colombiana de Ingeniería

### Arquitecturas de Software

Desde el directorio ```/BLUEPRINTS_PART1```



Para correrlo: ```gradle bootRun```

http://localhost:8080


![Captura](https://user-images.githubusercontent.com/48497558/75844464-19f92700-5da4-11ea-9ff8-321400224c8d.JPG)

## Frontend Views

Se creo el siguiente indice que cumple con los criterios requeridos
```html
<!DOCTYPE HTML>
<html>

<body>
    <title>Blueprints</title>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <script src="/webjars/jquery/3.1.0/jquery.min.js"></script>
    <script src="/webjars/bootstrap/4.1.2/js/bootstrap.min.js"></script>
    <link rel="stylesheet" href="/webjars/bootstrap/4.1.2/css/bootstrap.min.css" />

    <h1>Blueprints </h1>
    <div class="row">
        <div class="col-lg-6">
            <div class="input-group">
                <input type="text" class="form-control" placeholder="Author" id="author">
                <span class="input-group-btn">
                    <button type="button" class="btn btn-primary" onclick="app.getBlueprintsByAuthor($('#author').val())">Get Blueprints</button>
                </span>
            </div>
            <div class="col-lg-15">
                <h2 id='tablaAuthor'>Author's blueprints</h2>
                <table class='table' id='bluePrints'>
                    <thead>
                        <tr>
                            <th scope='col'>Blueprint name</th>
                            <th scope='col'>Number of points</th>
                            <th scope='col'>Open</th>
                        </tr>
                    </thead>
                </table>
                <h3 id='puntosTotales'>Total user points:</h3>
            </div>
        </div>
        <div class="col-lg-15">
            <h2 id='nameBlueprint'>Current blueprint:</h2>
            <canvas id='panelCanvas' name='canvas' height='500' width="500" style='border:1px solid blue'></canvas>
        </div>

</body>
<script src="js/apiclient.js"></script>
<script src="js/apimock.js"></script>
<script src="js/app.js"></script>

</html>
```  
## Frontend Logic

Se realizaron los siguientes modulos que me permiten obtener los blueprints existentes en el apimock y me permite crear las tablas para mostrarlos de una manera mucho mas ordenada.

``` app.js``` 

```javascript
* /crear un Módulo JavaScript */
var apiRest = apimock;
/*var apiRest = apiclient;*/

var app = (function () {

    var getBlueprintsByAuthor = function (author) {
        return apiRest.getBlueprintsByAuthor(author, function (err, data) {
            if (author==null) {
                return new Error("Error al consultar los blueprints:" + err)
            }
			alert(data);
            console.log("lista: " + apimock.getBlueprintsByAuthor);
            console.log("data: " + data);
            /*console.log("data: " + data[0].name);
            console.log("data: " + data[1].name);*/
            console.log("author: " + author); 

            $('#tablaAuthor').html(author + "'s blueprints");
            var table = $('#bluePrints')
            table.empty();
            table.append(`
          <thead>
              <tr>
                  <th>Blueprint name</th>
                  <th>Number of points</th>
                  <th>Open</th>
              </tr>
          </thead>
          `)
            var totalPoints = 0;
            for (var i = 0; i < data.length; i++) {
                table.append(`
              <tr>
                  <td>` + data[i].name + `</td>
                  <td>` + data[i].points.length + `</td>
                  <td>
                      <button type="button" class="btn btn-info" onclick="app.getBlueprintsByNameAndAuthor('` + data[i].name + `','` + data[i].author + `')" >Open</button>
                  </td>
              </tr>
              `)
                totalPoints = totalPoints + data[i].points.length;
            }
            table.append('</tbody>');
            $('#puntosTotales').html('Total user points: ' + totalPoints);
        });
    }

    var getBlueprintsByNameAndAuthor = function (author, name) {
        return apimock.getBlueprintsByNameAndAuthor(author, name, function (err, data) {
            if (err) {
                return new Error("Error al consultar los blueprints:" + err)
            }
            $('#nameBlueprint').html("Current blueprint: " + author);
            var canvas = $('#panelCanvas');
            var ctx = canvas[0].getContext("2d");
            ctx.beginPath();
            ctx.moveTo(data.points[0].x, data.points[0].y);
            data.points.forEach(function (point) {
                ctx.lineTo(point.x, point.y);
            })
            ctx.stroke();
        })
    }

    return {
        getBlueprintsByAuthor: getBlueprintsByAuthor,
        getBlueprintsByNameAndAuthor: getBlueprintsByNameAndAuthor
    }

})();
```


En el apimock se crean y guardan todos los blueprints.

```javascript

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

```

## Next Week

Cada vez que se le da al boton de cada blueprint du un autor y nombre especifico se dibuja en el canvas los puntos de ese blueprint.

```javascript
var getBlueprintsByNameAndAuthor = function (author, name) {
        return apimock.getBlueprintsByNameAndAuthor(author, name, function (err, data) {
            if (err) {
                return new Error("Error al consultar los blueprints:" + err)
            }
            $('#nameBlueprint').html("Current blueprint: " + author);
            var canvas = $('#panelCanvas');
            var ctx = canvas[0].getContext("2d");
            ctx.beginPath();
            ctx.moveTo(data.points[0].x, data.points[0].y);
            data.points.forEach(function (point) {
                ctx.lineTo(point.x, point.y);
            })
            ctx.stroke();
        })
    }
```
![Captura](https://user-images.githubusercontent.com/48497558/75845674-d6082100-5da7-11ea-92c6-186b1c486c86.JPG)


Apiclient realizado para conectar el front con el back

```javascript
var apiclient = (function () {


	var getBlueprintsByAuthor	= function (author, callback) {
        $.get("http://localhost:8080/blueprints/"+author, function(data){
            callback(
                data
            );
        });
      };
	  
	var getBlueprintsByNameAndAuthor = function (author, name, callback) {

        $.get( "http://localhost:8080/blueprints/"+author+"/"+name, function(data){
            callback(
                [data],name
            );
        });
      };
	  	    
  	  	
    return {
      getBlueprintsByAuthor: getBlueprintsByAuthor,
	  getBlueprintsByNameAndAuthor: getBlueprintsByNameAndAuthor
    };
  
  })();
```

## Pruebas Realizadas

Autor valido

![Captura](https://user-images.githubusercontent.com/48497558/75845892-870ebb80-5da8-11ea-99dd-8e3e600d339d.JPG)

Autor invalido

![Captura](https://user-images.githubusercontent.com/48497558/75845971-c210ef00-5da8-11ea-9bee-750de0fee32f.JPG)
