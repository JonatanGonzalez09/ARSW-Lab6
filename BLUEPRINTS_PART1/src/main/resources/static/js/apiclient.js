<<<<<<< HEAD
var apiUrl = "http://localhost:8080/blueprints/"
apiclient = (function() {
=======
const apiUrl = "http://localhost:8080/blueprints/"
apiclient = (function() {

>>>>>>> a26f70d59dd229f8bee7be020a7d8904d23b079d
    return {
        getBlueprintsByAuthor: function(name, callback) {
            jQuery.ajax({
                url: apiUrl + name,
                success: function (result) {
                    callback(result);
                },
                async: true
            });
        },
        getBlueprintsByNameAndAuthor: function(author, name, callback) {
            jQuery.ajax({
                url: apiUrl+name+"/"+author,
                success: function (result) {
                    callback(result);
                },
                async: true
            });
<<<<<<< HEAD
        }, 
        setBlueprint: function(author, name, newPlan) {
          
            var putPromise = $.ajax({
              url: "/blueprints/" + author + "/" + name + "/",
              type: "PUT",
              data: newPlan,
              contentType: "application/json"
            });
            putPromise.then(
              function() {
                console.log(putPromise);
                app.getBlueprintsByAuthor(author);
              },
              function() {
                console.info("Error");
              }
            );
          },
          deleteBlueprint: function(author, name) {
          
            var putPromise = $.ajax({
              url: "/blueprints/" + author + "/" + name + "/",
              type: "DELETE",
              contentType: "application/json"
            });
            putPromise.then(
              function() {
                console.log(putPromise);
                app.getBlueprintsByAuthor(author);
              },
              function() {
                console.info("Error");
              }
            );
          }
=======
        }
>>>>>>> a26f70d59dd229f8bee7be020a7d8904d23b079d
    };
})();