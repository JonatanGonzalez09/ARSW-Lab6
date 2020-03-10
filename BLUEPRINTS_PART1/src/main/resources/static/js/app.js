/* crear un Módulo JavaScript */
var apiRest = apimock;
/*var apiRest = apiclient;*/

var app = (function () {

    var puntos=[];
    var authorActual;
    var bluePrintActual;

    var getBlueprintsByAuthor = function (author) {
        return apiRest.getBlueprintsByAuthor(author, function (err, data) {
            if (author == null) {
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
            ctx.clearRect(0, 0, canvas[0].width, canvas[0].height);
            ctx.beginPath();
            ctx.moveTo(data.points[0].x, data.points[0].y);
            data.points.forEach(function (point) {
                ctx.lineTo(point.x, point.y);
            })
            ctx.stroke();
        })
    };

    function init() {
        console.log("Ingreso a init");
        var canvas = document.getElementById("panelCanvas"),
            ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        ctx.beginPath();
        if (window.PointerEvent) {
            canvas.addEventListener("pointerdown", draw, false);
        } else {
            canvas.addEventListener("mousedown", draw, false);
        }
    }

    function draw(event) {
        console.log("pintando");
        var canvas = document.getElementById("panelCanvas"),
            ctx = canvas.getContext("2d");
        var offset = getOffset(canvas);
        var posX = event.pageX - offset.left;
        var posY = event.pageY - offset.top;
        ctx.lineTo(posX,posY);
        ctx.fillRect(posX, posY, 3, 3);
        
    }

    function getOffset(obj) {
        var offsetLeft = 0;
        var offsetTop = 0;
        do {
            if (!isNaN(obj.offsetLeft)) {
                offsetLeft += obj.offsetLeft;
            }
            if (!isNaN(obj.offsetTop)) {
                offsetTop += obj.offsetTop;
            }
        } while (obj = obj.offsetParent);
        return {
            left: offsetLeft,
            top: offsetTop
        };
    }

    function newBluePrint(author){
        if (author == null || author == "") {
            alert("Debe ingresar el numbre para el autor");
        }
        init();
    }

    return {
        getBlueprintsByAuthor: getBlueprintsByAuthor,
        getBlueprintsByNameAndAuthor: getBlueprintsByNameAndAuthor,
        newBluePrint: newBluePrint
    }

})();