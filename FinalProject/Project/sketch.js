// Global variables that will store the toolbox colour palette
// and the helper functions.
var toolbox = null;
var colourP = null;
var helpers = null;

//gloable canvas Var
var c;


function setup() {

	//create a canvas to fill the content div from index.html
	canvasContainer = select('#content');
	c = createCanvas(canvasContainer.size().width, canvasContainer.size().height);
	c.parent("content");
	//calling image upload function to draw the uploaded image to the canvas
	UpdateImageToCanvas();


	//create helper functions and the colour palette
    helpers = new HelperFunctions();
	colourP = new ColourPalette();

	//create a toolbox for storing the tools
	toolbox = new Toolbox();

	//add the tools to the toolbox.
	toolbox.addTool(new FreehandTool());
	toolbox.addTool(new LineToTool());
	toolbox.addTool(new SprayCanTool());
	toolbox.addTool(new MirrorDrawTool());
	toolbox.addTool(new Eraser());
	toolbox.addTool(new EditShape());
	toolbox.addTool(new SprayStarsTool());
	background(255);


}

function draw() {
	//call the draw function from the selected tool.
	//hasOwnProperty is a javascript function that tests
	//if an object contains a particular method or property
	//if there isn't a draw method the app will alert the user
	if (toolbox.selectedTool.hasOwnProperty("draw")) {
		toolbox.selectedTool.draw();
	} else {
		alert("it doesn't look like your tool has a draw method!");
	}
    
    //check for additional setting to trigger functions when selected tool is selected. console.log for debug purpose
    if (toolbox.selectedTool.hasOwnProperty('selectTool')){
        toolbox.selectedTool.selectTool();
		//console.log for debug
        //console.log('selectTool function is found');
    } else {
        //console.log('no selectTool function is found');
    }




}

//check mousePressedOnCanvas
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


//function upload and update image in canvas
//reference link: https://medium.com/front-end-weekly/draw-an-image-in-canvas-using-javascript-%EF%B8%8F-2f75b7232c63
function UpdateImageToCanvas(){
	let fileInput = document.getElementById('fileinput');
	//event listener to detect changes to the file input
	fileInput.addEventListener('change',function(ev) {
		if(ev.target.files) {
			//Create a FileReader object, and convert the file uploaded into DataURL with the help of readASDataURL method in FileReader.
			let file = ev.target.files[0];
			var reader  = new FileReader();
			//Add loadend event listener to file reader , this event is triggered when the fileReader finish converting the file into dataURL.
			reader.onloadend = function (e) {
				//Once the fileReader converted the image to dataURL then we need to create an Image object.
				var image = new Image();
				//Set the source of the image as the dataURL
				image.src = e.target.result;
				//Add load event listener to the image,to draw the image to canvas once the image is loaded
				image.onload = function(ev) {
					//create a ctx with property to returns a drawing context on the canvas
					var ctx = canvas.getContext('2d');
					ctx.drawImage(image,100,100);
				}
			}
			//Create a FileReader object, and convert the file uploaded into DataURL with the help of readASDataURL method in FileReader.
			reader.readAsDataURL(file);
		}
	})
}