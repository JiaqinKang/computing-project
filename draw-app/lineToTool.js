function LineToTool(){
	//load lineTo.jpg icon from assets folder 
	this.icon = "assets/lineTo.jpg";
	//set the tool property name to lineTo
	this.name = "LineTo";
	
	//set start mouse X position to -1
	var startMouseX = -1;
	//set start mouse Y position to -1
	var startMouseY = -1;
	
	//set var drawing to false
	var drawing = false;

	//call draw function to darw the line
	this.draw = function(){
		//if statement when mouse is pressed 
		if(mouseIsPressed){
			//if startMouseX is == to -1
			//start mouse x is set to current mouse X and Y
			//set var drawing to true and then loadpixels
			if(startMouseX == -1){
				startMouseX = mouseX;
				startMouseY = mouseY;
				drawing = true;
				loadPixels();
			}
			//else updatepixels and draw the line with starting line mouse X and Y position and end with stopped mouse X and Y position
			else{
				updatePixels();
				line(startMouseX, startMouseY, mouseX, mouseY);
			}

		}
		//else if set darwing to false and not excute to draw any lines.
		else if(drawing){
			drawing = false;
			startMouseX = -1;
			startMouseY = -1;
		}
	};

}
