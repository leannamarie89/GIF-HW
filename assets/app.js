$(document).ready(function(){

var topics = ["Chihuhuas", "St. Bernards", "Golden Retrievers", "Yorkshire Terriers", "Beagels", "Pugs", "Greyhounds", "French Bulldogs"] 

function displayInfo(){
  var dog = $(this).attr("dog-name");
  var queryURL = "https://api.giphy.com/v1/gifs/search?q=dogs&api_key=jUkcFT6T3v5xy0hTE6KcdOB9aeq3Ychc&limit=10";


  $.ajax({
    url: queryURL,
    method: "GET"
  }).done(function(response) {

    $("#dogs").empty();

    var results = response.data; 

    for (var i = 0; i < results.length; i++) {
      var dogDiv = $("<div class='userDog'>");

      var rating = results[i].rating;
      var pRate = $("<p>").text("Rating: " + rating);

      var urlStill = results[i].images.fixed_height_still.url;
      var urlAnimate = results[i].images.fixed_height.url;

      var gif = $("<img>").addClass("gif").attr("src", urlStill).attr("data-still", urlStill).attr("data-animate", urlAnimate).attr("data-state", "still");


    dogDiv.append(gif);
    dogDiv.append(pRate);

    $("#dogs").append(dogDiv);

  }

   $(".gif").on("click", function() {
                var state = $(this).attr("data-state");

                if (state === "still") {
                    $(this).attr("src", $(this).attr("data-animate"));
                    $(this).attr("data-state", "animate");
                } else {
                    $(this).attr("src", $(this).attr("data-still"));
                    $(this).attr("data-state", "still");
                }

            });
        });

    }

    function renderButtons() {

      $("#dogButtons").empty();

      for (var i = 0; i < topics.length; i++) {

        var dogRender = $("<button>");

        dogRender.addClass("dog");
        dogRender.attr("dog-name", topics[i]);
        dogRender.text(topics[i]);
        $("#dogButtons").append(dogRender);
      }
    }

$("addDog").on("click", function(event) {
  event.preventDefault();
  var dog = $("#dog-input").val().trim();
  
  topics.push(dog);
  $("#dog-input").val(" ");
  renderButtons();


});

$(document).on("click", ".dog", displayInfo);

renderButtons();

});