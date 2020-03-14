/* crear un Módulo JavaScript */
/*var apiRest = apimock;*/
var apiRest = apiclient;

var app = (function () {

    var authorActual;
    var bluePrintActual;
    var abrir = false;
    var nombre; 
    var getBlueprintsByAuthor = function (author) {
<<<<<<< HEAD
        $('#tablaAuthor').html(author + "'s blueprints");
        authorActual = author;
        var canvas=document.getElementById("panelCanvas");
            var ctx=canvas.getContext("2d");
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.beginPath();
        return apiRest.getBlueprintsByAuthor(author, tabla);
    }
     var tabla = function(data){
         console.log("tabla")
         console.log(data)
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
=======
        return apiclient.getBlueprintsByAuthor(author, function (data) {
            if (author == null) {
                return new Error("Error al consultar los blueprints:" )
            }
            alert(data);
            /*console.log("lista: " + apimock.getBlueprintsByAuthor);*/
            console.log("data: " + data);
            /*console.log("data: " + data[0].name);
            console.log("data: " + data[1].name);*/
            console.log("author: " + author);

            $('#tablaAuthor').html(author + "'s blueprints");
            var table = $('#bluePrints')
            table.empty();
>>>>>>> a26f70d59dd229f8bee7be020a7d8904d23b079d
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
     }

<<<<<<< HEAD
    var getBlueprintsByNameAndAuthor = function (name, author) {
        console.log("Entro a getBlueprintsByNameAndAuthor"+author)
        return apimock.getBlueprintsByNameAndAuthor(name, author, pintarCanvas)
    };

    var pintarCanvas= function (data) {
        console.log(data)
        abrir = true;
        nombre= data.name;
        bluePrintActual = data;
        $('#nameBlueprint').html("Current blueprint: " + data.name);
        var canvas = document.getElementById("panelCanvas");
        var ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.beginPath();
            ctx.moveTo(data.points.x, data.points.y);
            data.points.forEach(function (point) {
                ctx.lineTo(point.x, point.y);
            })
            ctx.stroke();
    }
=======
    var getBlueprintsByNameAndAuthor = function (author, name) {
        return apiclient.getBlueprintsByNameAndAuthor(author, name, function (data) {
            console.log(puntos);
            init();
            $('#nameBlueprint').html("Current blueprint: " + author);
            var canvas = $('#panelCanvas');
            var ctx = canvas[0].getContext("2d");
            ctx.clearRect(0, 0, canvas[0].width, canvas[0].height);
            ctx.beginPath();
            ctx.moveTo(data.points[0].x, data.points[0].y);
            puntos=data.points;
            puntos.forEach(function (point) {
                ctx.lineTo(point.x, point.y);
            })
            ctx.stroke();
        })
    };
	
    
>>>>>>> a26f70d59dd229f8bee7be020a7d8904d23b079d

    var init = function(){
        var canvas = document.getElementById("panelCanvas");
        var ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.beginPath();
        if (window.PointerEvent) {
            canvas.addEventListener("pointerdown", function(event) {
                if(abrir){
                    console.log("Escuchando...");
                    var x = event.pageX - parseInt(canvas.offsetLeft, 10);
                    var y = event.pageY - parseInt(canvas.offsetTop, 10);
                    console.log("bluePrintActual--Init"+bluePrintActual);
                    bluePrintActual.points.push({x:x,y:y})
                    pintarCanvas(bluePrintActual);
                }
            });

        }
    }
<<<<<<< HEAD
    
    var newBluePrint = function(author){
        if(author==authorActual){
            $('#newPrint').removeAttr("hidden");
            $('#newPrintBo').removeAttr("hidden");
            abrir =true;
            console.log("Ingreso a newBluePrint");
            var canvas=document.getElementById("panelCanvas");
            var ctx=canvas.getContext("2d");
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.beginPath();
            $('#nameBlueprint').html("Current blueprint: ");
        }
=======

    function draw(event) {
        console.log("pintando");
        var canvas = document.getElementById("panelCanvas"),
            ctx = canvas.getContext("2d");
        var offset = getOffset(canvas);
        var posX = event.pageX - offset.left;
        var posY = event.pageY - offset.top;
        ctx.lineTo(posX,posY);
        ctx.fillRect(posX, posY, 3, 3);
        puntos.push({x:posX,y:posY});
        
>>>>>>> a26f70d59dd229f8bee7be020a7d8904d23b079d
    }

    var guardar = function(name){
        bluePrintActual = {
            author: authorActual,
            points: [],
            name: name
        };
    }
    var saveBluePrint = function(){
        if(nombre == null){
            console.log("final")
            nombre= $('#newPrint').val();   
        }
        console.log("nmmm "+nombre);
        var dibujo = {
            author: authorActual,
            points: bluePrintActual.points,
            name: nombre,
          };
          apiclient.setBlueprint(authorActual, nombre, JSON.stringify(dibujo));
    }

    var deleteBluePrint= function(){
        console.log(authorActual+nombre);
        apiclient.deleteBlueprint(authorActual, nombre);
    }

    return {
        getBlueprintsByAuthor: getBlueprintsByAuthor,
        getBlueprintsByNameAndAuthor: getBlueprintsByNameAndAuthor,
        newBluePrint:newBluePrint,
        init:init,
        saveBluePrint:saveBluePrint,
        guardar:guardar,
        deleteBluePrint:deleteBluePrint
    }

})();