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
// strings. NOTE: It is an array of objects now to handle the 
// advanced fucntionality of results paging

// REQUIREMENTS TO SATISFY ASSIGNMENT
// 1. Create HTML DONE
// 2. Create topics array and function for creating buttons DONE
// 3. Load images from API from clicked buttons DONE
// 4. toggle animation when clicked DONE
// 5. allow user to add custom topic DONE


// PERSONAL FEATURES TO ADD
// 1. clear field DONE
// 2. Error handling if user enters nothing or spaces DONE
// 3. Make it look good, put add topic inline with buttons DONE
// 5. Add results offsets, keep clicking, keep getting new results DONE




$(document).ready(function() {
	
////// GLOBAL VARIABLES //////
// just for display
	var topics = [
		{
			topic: "skunk",
			count:-1,
		},
		{
			topic: "beaver",
			count:-1,
		},
		{
			topic: "panther",
			count:-1,
		}
	];
	var gifOffset;
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
				newButton.attr("data-topic", topics[i].topic);
				newButton.text(topics[i].topic);
				buttonSection.append(newButton);
			}
		},


		display_results: function(arr, arr2) {
			var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
	        arr + "&offset=" + arr2 + "&api_key=dc6zaTOxFJmzC&limit=10";

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
	            	
	            	gifDiv.prepend(resultImage);
	            	gifDiv.prepend(p);
	            	// now add the new div as the top child in the results div
	            	resultsSection.prepend(gifDiv);
	            }
	      

	        });
		},

		toggle_animation: function(stateArg, selectedObj) {
			if (stateArg === "still") {
				$(selectedObj).attr("src", $(selectedObj).attr("data-animate"));
				$(selectedObj).attr("data-state", "animate");
			} else {
				$(selectedObj).attr("src", $(selectedObj).attr("data-still"));
				$(selectedObj).attr("data-state", "still");
			}
			return;
		},

		user_addTopic: function() {
			event.preventDefault();  //prevent form from submitting and refreshing page
	        // returns an array
	        var data = $("#page_userForm :input").serializeArray();
	        // trim it and add to the array
	        var dataToAdd = data[0].value.trim();
	        var objectToAdd = {topic:dataToAdd, count:-1}
	        // console.log(data);
	        // console.log(data[0].value);
	        // console.log(dataToAdd);
	        // console.log(dataToAdd.charAt(0));
	        // add to array
	        if (dataToAdd !== "")  {
		        topics.push(objectToAdd);
		        // write to page
		        app.create_buttons(); 
	        };
	        $("#page_userInput").val("");
	        // console.log(topics);
	        return;
		},

		set_paging: function(gifTopicArg) {
				for (var i = 0; i < topics.length; i++) {
			if (gifTopicArg===topics[i].topic) {
				topics[i].count = topics[i].count + 10;
				gifOffset =topics[i].count;
				// console.log(topics[i]);
				return gifOffset;
				};
			};

		},

		setup: function() {
			app.create_buttons();
			// dynamically resize input field
			autosizeInput(document.querySelector('#page_userInput'), { minWidth: true } );
		}
	};


////// RUN APP //////
	app.setup();


//// Query Button Event Listener //// 
	$(document).on("click", ".btn_search", function() {
		// Search term to pass
		var gifTopic = $(this).attr("data-topic");
		// everytime topic clicked, adjust counter to pass offests for results paging
		app.set_paging(gifTopic);
		// Pass Query, Get Results, and Display
		app.display_results(gifTopic, gifOffset);

	});

	
//// Animation toggle Event Listener //// 
	$(document).on("click", "img", function() {
		var state = $(this).attr("data-state");
		var selected = $(this);
		//pass the state and the object
		app.toggle_animation(state, selected);
	});


//// User Submission Event Listener //// 
    $('#page_userForm').on('submit', function() {
    	app.user_addTopic();
    });

});