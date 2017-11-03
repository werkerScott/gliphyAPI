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

// REQUIREMENTS TO SATISFY ASSIGNMENT
// 1. Create HTML DONE
// 2. Create topics array and function for creating buttons DONE
// 3. Load images from API from clicked buttons DONE
// 4. toggle animation when clicked DONE
// 5. allow user to add custom topic DONE


// PERSONAL FEATURES TO ADD
// 1. A clear field button
// 2. Error handling if user enters nothing
// 3. Add and understand the trim value features for form submission
// 4. Make it look good, use bootstrap put the user form inline with buttons
// 5. See if can add function where multiple clicks on a button load successive images




$(document).ready(function() {
	
////// VARIABLES //////
// look into moving these into object
	var topics = ["skunk","beaver","panther","flamingo"];
	var buttonSection = $("#page_buttons");
	var resultsSection = $("#page_buttonsResults");

////// METHODS //////
	app = {
		create_buttons: function() {
			buttonSection.empty();

			for (var i=0; i<topics.length; i++) {
				var newButton = $("<button>");
				newButton.addClass("btn_search");
				newButton.attr("type", "button");
				newButton.attr("data-topic", topics[i]);
				newButton.text(topics[i]);
				buttonSection.append(newButton);
			}
		},


		display_results: function(arr) {
		// add search function here
			var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
	        arr + "&api_key=dc6zaTOxFJmzC&limit=10";

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
		},

		toggle_animation: function() {
			// to get this to work need to dynamically create a unique ID in the display_resuls function
			// and pass both the state (arr) and the id (item) to this methid and replace "this"
			// i like not blowing away results each time which requires a algorithm for creating unique IDs
	
		},

		user_addTopic: function() {
		// add user add button function here
		// leaving for now as it is simple enough as is
		}


	};


////// RUN GAME //////

	app.create_buttons();

//// START Query Button Event Listener //// 
	$(document).on("click", ".btn_search", function() {
		// Search term to pass
		var gifTopic = $(this).attr("data-topic");
		// Pass Query, Get Results, and Display
		app.display_results(gifTopic);

	});
//// END Query Button Event Listener //// 
	
//// START Animation toggle Event Listener //// 
// <img src="" data-still="" data-animate="" data-state="still" class="gif">
	$(document).on("click", "img", function() {
		// Capture state of selected item
		var state = $(this).attr("data-state");
		// Capture id of selected item (to do)(make below a method)
		// leave this here for now. very complicated to create unique IDs if not blowing away results each time
		if (state === "still") {
			$(this).attr("src", $(this).attr("data-animate"));
			$(this).attr("data-state", "animate");
		} else {
			$(this).attr("src", $(this).attr("data-still"));
			$(this).attr("data-state", "still");
		}
		app.toggle_animation(state);



	});
//// END Animation toggle Event Listener //// 

//// START User Submission Event Listener //// 
	
    $('#page_userForm').on('submit', function(event) { //use on if jQuery 1.7+
        event.preventDefault();  //prevent form from submitting and refreshing page
        
        // returns an array
        var data = $("#page_userForm :input").serializeArray();
        var dataToAdd = data[0].value;
        // console.log(data);
        // console.log(data[0].value);
        
        // returns a string
        // var data = $("#page_userForm :input").serialize();
        
        // add to array
        topics.push(dataToAdd);

        // write to page
        app.create_buttons();

    });
//// END User Submission Event Listener //// 

});