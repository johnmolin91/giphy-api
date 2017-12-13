$( document ).ready(function() {

	var topics = ["gravity", "spacetime", "universe", "supernova", "dimensions", "solar"];
	var gif;
	var input;

	for (var i = 0; i < topics.length; i++) {
		var a = $("<button>");
		a.attr("data-name", topics[i]);
		a.addClass('favorite');   //tk added
		a.text(topics[i]);
		$("#buttons").append(a);
	}

	function displayGifs() {
		console.log("hello");
		console.log(this);
		$("#results").empty();
		//var favorite = $(this).attr('data-name');
		gif = $(this).attr('data-name');
		console.log("gif=" + gif);
		var queryURL = "https://api.giphy.com/v1/gifs/search?&api_key=JyXgEfiLf1LGEF19zNicIpnm4kK6lI0i&limit=10&q=" + gif;
		console.log("queryURL=" + queryURL);
		 $.ajax({
          url: queryURL,
          method: "GET"
        }).done(function(response) {
        	console.log(response);
        	for (var i = 0; i < 9; i++) {
        		var gifURL = response.data[i].images.fixed_height_small_still.url;
        		var gifMoving = response.data[i].images.fixed_height_small.url;
        		var rating = response.data[i].rating;
        		var image = $("<img>")
        		.attr("src", gifURL)
        		.attr("data-still", gifURL)
        		.attr("data-animate", gifMoving)
        		.attr("data-state", "still")
        		.addClass("gifImage");
        		$("#results").append(image);
        		$("#results").append(rating);
        	}
        	console.log(gif);
		})
	}


	//$(document).on('click', '#buttons', displayGifs); // tk commented out, must click at the class level.
	$(document).on('click', '.favorite', displayGifs);//tk changed

	$(document).on("click", ".gifImage", function() {
		var state = $(this).attr("data-state");
		if (state === "still") {
			$(this).attr("src", $(this).attr("data-animate"));
			$(this).attr("data-state", "animate");
		} else {
			$(this).attr("src", $(this).attr("data-still"));
			$(this).attr("data-state", "still");
		}
	});

	$("#add-button").on("click", function() {
		event.preventDefault();
		input = $("#button-input").val().trim();
		var b = $("<button>");
		b.attr("data-name", input);
		b.addClass('favorite');   //tk added
		b.text(input);
		$("#buttons").append(b);
	})


})