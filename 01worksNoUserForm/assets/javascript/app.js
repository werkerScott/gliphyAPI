// javascript

// HOW IT WORKS
// 1. There is a default display of buttons written dynamically
// to the top of the results display
// 2. Clicking any button loads a gif with rating, a still, and
// an animated version of the gif
// 3. Clikcing on the loaded still toggles its animation
// 4. The user can add their own button which is appended to the
// list of buttons at the top of the screen

// RULES
// the buttons have to be constructed from an array of strings 
// called "topics". The user adds their term to this array of 
// strings.

// BUILD
// 1. Create HTML DONE
// 2. Create topics array and function for creating buttons DONE
// 3. Load images from API from clicked buttons DONE
// 4. toggle animation when clicked
$(document).ready(function() {
	
////// VARIABLES //////
	var topics = ["skunk","beaver","panther","flamingo"];

	var buttonSection = $("#page_buttons");
	var resultsSection = $("#page_buttonsResults");

////// METHODS //////
	app = {
		create_initalButtons: function() {
			for (var i=0; i<topics.length; i++) {
				var newButton = $("<button>");
				newButton.addClass("btn_search");
				newButton.attr("type", "button");
				newButton.attr("data-topic", topics[i]);
				newButton.text(topics[i]);
				buttonSection.append(newButton);
			}
		},

		display_results: function() {

		}
	};


////// RUN GAME //////

	app.create_initalButtons();

//// START Query Button Event Listener //// 
	$(document).on("click", ".btn_search", function() {
		// Pass Query, Get Results, and Display - having issues moving this to a method
		// Build Query
		var gifTopic = $(this).attr("data-topic");
		var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        gifTopic + "&api_key=dc6zaTOxFJmzC&limit=10";

        $.ajax({ url: queryURL, method: "GET" }).done(function(response) {
        	var results = response.data;

        	for (var i = 0; i < results.length; i++) {
            	//declare a new div that we append everything to then stick inisde reaults div
            	var gifDiv = $("<div class='gif'>");
            	//handling ratings
            	var rating = results[i].rating;
            	var p = $("<p>").text("Rating: " + rating);
            	// handling images
            	var resultImage = $("<img>");
            	resultImage.attr("src", results[i].images.fixed_height_still.url);
            	resultImage.attr("data-still", results[i].images.fixed_height_still.url);
            	resultImage.attr("data-animate", results[i].images.fixed_height.url);
            	resultImage.attr("data-state", "still");
            	// add all the data to the new div which will contain both of these
            	gifDiv.prepend(p);
            	gifDiv.prepend(resultImage);
            	// now add the new div as the top child in the results div
            	resultsSection.prepend(gifDiv);
            }

        });

	});
//// STOP Query Button Event Listener //// 
	
//// START Animation toggle Event Listener //// 
// <img src="" data-still="" data-animate="" data-state="still" class="gif">
	$(document).on("click", "img", function() {
		var state = $(this).attr("data-state");

		if (state === "still") {
			$(this).attr("src", $(this).attr("data-animate"));
			$(this).attr("data-state", "animate");
		} else {
			$(this).attr("src", $(this).attr("data-still"));
			$(this).attr("data-state", "still");
		}

	});
//// STOP Animation toggle Event Listener //// 

//// START User Submission Event Listener //// 
// Add Code
//// START User Submission Event Listener //// 

});