function Eraser(){
	//set an icon and a name for the object
	this.icon = "assets/eraser.jpg";
	this.name = "eraser";

	//default eraser shape will set to ellipse
	var eraseMode = 0;
	//set erasing to true
	var eraserErasing = true;

	this.draw = function(){
		//mouse pressed to erase the area only if mouse is inside canvas
		if (mousePressOnCanvas(c) && mouseIsPressed && eraserErasing === true) {
            //save to canvas
            loadPixels();
            //clear area
            this.eraseArea();
		}
		else {//else show eraser position
                updatePixels();
				this.showEraser();
		}
		//check and grab eraserSize value
		this.getEraserSize();
    }

	//show eraser area at mouse position X,Y
	this.showEraser = function(){
		//eraseMode 0 = ellipse
		//eraseMode 1 = rect 
		//create offsets vars to fix bug when switching shape
		var EraserXYOffset = this.getEraserSize()/2;
		var EraserSizeOffset = this.getEraserSize();
		//set nofill to be able to see through the area and see what is going to be cleared
		noFill();
		//set stroke colour to locate area of the ellipse to be erased
		stroke('black');
		//draw the ellipse or rectangle at mouseX,Y with size value from getEraserSize function
		//set XY position will +1 and size -2 
		//to reduce drawing eraser into the canvas for debug 
		//when moving the mouse too fast
		if (eraseMode===0){
			ellipse(mouseX,mouseY,EraserSizeOffset-2);
		}
		if (eraseMode ===1){
			rect(mouseX+1-EraserXYOffset,
				mouseY+1-EraserXYOffset,
				EraserSizeOffset-2,
				EraserSizeOffset-2);
		}
	}
    
    //funtion to erase with selected shape
	//draw a white filled ellipse or rectand save to the canvas
    this.eraseArea = function (){
		//create offsets vars to fix bug when switching shape
		// as just use the direct getEraserSize will cause rect to stop function
		var EraserXYOffset1 = this.getEraserSize()/2;
		var EraserSizeOffset1 = this.getEraserSize();
        //set colour
        fill('white');
    	//set ellipse with no stroke
    	noStroke();
		//draw the ellipse or rect at mouseX,Y with size value from getEraserSize function
		if (eraseMode ===0){
			ellipse(mouseX,mouseY,this.getEraserSize());
		}
		//draw rect
		if (eraseMode === 1){
			rect(mouseX-EraserXYOffset1,
				mouseY-EraserXYOffset1,
				EraserSizeOffset1,
				EraserSizeOffset1
				);
		}
    }

	//create buttons and slider
	this.populateOptions = function() {
		select(".options").html(
			`<button id='directionButton'>Ellipse</button>
			<button id='directionButton1'>Rectangle</button>
				
			<!--Create Eraser size-->
			<form>
			<b>Eraser Size</b>
			<input type="range" name="amountRange" min="1" max="1000" value="50" class="slider" id="eraserSize" oninput="this.form.amountInput.value=this.value">
			<input type="number" name="amountInput" min="1" max="1000" value="50" class="slider" id="eraserSize" oninput="this.form.amountRange.value=this.value">
			</form>		
			`);
		//click handler
		select("#directionButton").mouseClicked(function() {
				eraseMode =0;
				console.log("ellipse selected");

		});
		select("#directionButton1").mouseClicked(function() {
				eraseMode =1;
				console.log("Rect selected");
		});
	};
	
    //select tool function to set to true
    this.selectTool = function (){
        eraserErasing = true;
    }
    
    //unselect tool and set vars back to original condition for debug 
	this.unselectTool = function() {
		//clear options
		select(".options").html("");
        //setting vars back to original condition
		eraserErasing = false;
        eraseMode = 0;
        //set fill and stroke to default black colour
        fill('black');
        stroke('black');
	};

	//function to grab value from the silder to change the size of the eraser
	this.getEraserSize = function (){
		//return value 
		return document.getElementById('eraserSize').value;
	}

}