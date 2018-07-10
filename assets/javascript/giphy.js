    var topics = ["Running", "Dancing", "Laughing", "Hurting", "Staring", "Burping", "Eating", "Farting", "Falling", "Fishing","Traveling", "Jumping", "Drinking"];

    // Displays all gif buttons
    var button;
    for (var index in topics){
      button = $('<button>').text(topics[index]);
      $('#gifButtons').append(button);
    }
    
    $(document).on("click", ".image", function() {
    // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
    var state = $(this).attr("data-state");
    // If the clicked image's state is still, update its src attribute to what its data-animate value is.
    // Then, set the image's data-state to animate
    // Else set src to the data-still value
    if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
    } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
    }
    });  

    $('#addButton').on('click', function(){
    event.preventDefault();

    var topic = $('input').val();

    topics.push(topic);

    var button = $('<button>').text(topic);
    $('#gifButtons').append(button);
    
    $('input').val(''); //clears the input after pushing button 

    });

    $(document).on('click', '#gifButtons button', function(){
        var button = $(this);
        var userInput = button.text();
        var req = "https://api.giphy.com/v1/gifs/search?api_key=wkd9ZSymOFP6gFG30cdU1eQoD65GghBW&q=" + userInput + "&limit=25&offset=0&rating=G&lang=en";
        $.ajax({url: req})
      	.then(function(response){

              $("#gifsView").empty()
              var topics = response.data; //shows topics of gifs

              for (var i=0; i<topics.length; i++){
      
                  var gifDiv = $("<div>"); //div for the gifs to go inside
                  gifDiv.addClass("gifDiv");
                  // pulling rating
                  var gifRating = $("<p>").text("Rating: " + topics[i].rating);
                  gifDiv.append(gifRating);
      
                  var gifImage = $("<img>");
                  gifImage.attr("src", topics[i].images.fixed_height_small_still.url); // still image stored into src of image
                  gifImage.attr("data-still",topics[i].images.fixed_height_small_still.url); // still image
                  gifImage.attr("data-animate",topics[i].images.fixed_height_small.url); // animated image
                  gifImage.attr("data-state", "still"); // set the image state
                  gifImage.addClass("image");
                  gifDiv.append(gifImage);
      
                  $("#gifsView").prepend(gifDiv);
              }   
        })
    
    });

