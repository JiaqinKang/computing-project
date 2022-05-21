var canvas;
/*
	1. plot out of a shape as a series of vertices
		--Add a button switching between
		creating new vertices and editing
		
		--Click the canvas to add a vertex
		
		--don't draw right away add vertext to an array 
		then draw but dont save to canvas
		
		
	2. Edit the vertices using a mouse drag
		--if editing is on 
		highlight the location of the vertices
		
		--when mousepressed is near vertex (using the dist)
		update vertex(x,y)with the mouseX and mouse Y
			
			
			
	3. confirm the final shape
*/



var editButton;
var finishButton;

var editMode = false;
var currentShape = [];

var c ;

function setup() {
	c = createCanvas(400, 400);
	background(200);
	noFill();
	loadPixels();
	
	editButton = createButton ('Edit Shape');
	editButton.mousePressed(function(){
		if (editMode){
			editMode =false;
			editButton.html("Edit Shape");
		}
		else {
			editMode = true;
			editButton.html("Add Vertices");
		}
	})
	
	finishButton = createButton ('Finish Shape');
	finishButton.mousePressed(function(){
		//enter finish will turn off vertices spots
		editMode = false;
		//call draw() to avoid spots
		draw();
		loadPixels();
		currentShape = [];
	})

}

function draw() {
	
	updatePixels();
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
	
	beginShape();
	for (var i =0; i < currentShape.length;i++){
		vertex(currentShape[i].x,
			   currentShape[i].y);
		
		//add elipse to show vertices
		if (editMode){
			fill('red');
			ellipse (currentShape[i].x,
					currentShape[i].y,
					10);
			
			//fix also fill shape
			noFill();
		}
	}
	endShape();
	
	
	
	
	
	
	
}



function mousePressOnCanvas(canvas) {
	if (mouseX > canvas.elt.offsetLeft &&
		mouseX < (canvas.elt.offsetLeft + canvas.width) &&
		mouseY > canvas.elt.offsetTop &&
		mouseY < (canvas.elt.offsetTop + canvas.height)
	) {
		return true;
	}
	return false;
}

