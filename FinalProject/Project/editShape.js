function EditShape(){
    //set an icon and a name for the object
	this.icon = "assets/editshape.jpg";
	this.name = "editshape";

    var editButton;
    var editMode = false;
    var currentShape = [];
    var toolVisited = false;

    this.setup = function(){
        noFill();
	    loadPixels();
        this.EditShapePopUpWindow();
    }

    this.draw = function (){
        noFill();
        //updatePixels to make ensure is not saved during editing and drawing
        updatePixels();
        //call draw shape to enable drawing shapes
        this.drawShape();
        //call showshapeVertices to show shape vertices in red spots
        
        this.showShapeVertices();
        //check if tool has been visited before to stop pop up
        this.EditShapePopUpWindow();
    
    };

    this.drawShape = function (){
        //only if the mouse is pressed in canvas 
        if (mousePressOnCanvas(c) && mouseIsPressed){
            if (!editMode){
                currentShape.push({
                    x:mouseX,
                    y:mouseY
                });
            }
            else {
                for (var i = 0 ; i < currentShape.length; i ++){
                    if (dist(currentShape[i].x,
                            currentShape[i].y,
                            mouseX,
                            mouseY) <15 ){
                        currentShape[i].x = mouseX;
                        currentShape[i].y = mouseY;
                        
                    }
                }	
            }
        }
    }


// function to create button options and switch mode between edit shape and add vertices
    this.populateOptions = function() {
        // create button
		select(".options").html(
            //injecting to html
			`<button id='directionButton'>Click to show vertices</button>`);

		//click handler
        //Edit shape and add vertices button mouse clicked
        select("#directionButton").mouseClicked(function() {
			editButton = select("#" + this.elt.id);
            //if editmode is true
            if (editMode){
                //set editmode to false
                editMode =false;
                //set showVerticesStates to true
                //show Editshape text in button
                editButton.html("Click to Edit Shape");
                console.log("Edding lines to shape mode");
                
            }
            else {
                editMode = true;
                editButton.html("Click to Add Vertices");
                console.log("Show vertices mode");
            }



		});
	};

//unselectTool will finish the shap editing and set all vars and boos back to default
    this.unselectTool = function() {
        //stop editmode
        editMode =false;

		//clear options
		select(".options").html("");

        //clear currentshape array 
        currentShape = [];

        //save drawing 
        loadPixels();

        toolVisited = true;

        
	};


//show Shape Vertices
    this.showShapeVertices = function(){
        updatePixels();
        beginShape();
        for (var i =0; i < currentShape.length;i++){
            vertex(currentShape[i].x,
                   currentShape[i].y);
            
            //add elipse to show vertices
            if (editMode ){
                fill('red');
                ellipse (currentShape[i].x,
                        currentShape[i].y,
                        10);
                //set nofill to avoid shading bug
                noFill();
            }
        }
        endShape();
    }

//window pop up to teach user how to use editshape tool
    this.EditShapePopUpWindow = function (){
        if (toolVisited === false){
            window.alert("To finish shape please switch to another tool or select editshape tool box agian to finish shape");
            toolVisited = true;
        }
    }

}