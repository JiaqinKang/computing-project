function HelperFunctions() {

	//Jquery click events. Notice that there is no this. at the
	//start we don't need to do that here because the event will
	//be added to the button and doesn't 'belong' to the object

	//event handler for the clear button event. Clears the screen
	//clear button debug to tell the user to finish their shape then they are able to clear the canvas
    select("#clearButton").mouseClicked(function() {
            //clear background
            background(255, 255, 255);
            //call loadPixels to update the drawing state
            loadPixels();
    });

	//event handler for the save image button. saves the canvsa to the
	//local file system.
	select("#saveImageButton").mouseClicked(function() {
		saveCanvas("myPicture", "jpg");
	});
















}