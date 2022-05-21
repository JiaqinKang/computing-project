function SprayStarsTool(){
	
	this.name = "sprayStarsTool";
	//icon pic resource link://https://lh3.googleusercontent.com/proxy/Lz1MYpq3Uz7EBd6fEReeV381sinYT-FYkdi0dqoWkRIQY8QWXHta8Hc8CTDLkU3UWLf7Wnkl1cBPADH2CN-FQ2X9plTj3dc
	this.icon = "assets/star.jpg";
	var points =1;
	var spread = 10;

	this.draw = function(){
		var r = random(5,10);
		if(mouseIsPressed){
			for(var i = 0; i < points; i++){
				//call draw starts funtion to draw starts at random with fixed size
				this.star(random(mouseX-spread, mouseX+spread),
						  random(mouseY-spread, mouseY+spread),
						  0.3*this.getStarSizes(),
						  0.7*this.getStarSizes(),
						  this.getStarPoints()
						  );
			}
		}
	};

	//function to draw stars
	//reference: https://p5js.org/examples/form-star.html
	this.star= function(x, y, radius1, radius2, npoints) {
		//radius1 = outer ellipse radius
		//radius2 = inner ellipse radius
		//npoints = number of angles of the shape
		let angle = TWO_PI / npoints;
		let halfAngle = angle / 2.0;
		beginShape();
		for (let a = 0; a < TWO_PI; a += angle) {
		let sx = x + cos(a) * radius2;
		let sy = y + sin(a) * radius2;
		vertex(sx, sy);
		sx = x + cos(a + halfAngle) * radius1;
		sy = y + sin(a + halfAngle) * radius1;
		vertex(sx, sy);
		}
		endShape(CLOSE);
	}

	//create buttons and slider
	this.populateOptions = function() {
		select(".options").html(
			`
			<form>
			<!--Creating slider and input box for star size-->
			<b>Star size</b>
			<input type="range" name="amountRange" min="1" max="10" value="1" class="slider" id="starSize" oninput="this.form.amountInput.value=this.value" >
			<input type="number" name="amountInput" min="1" max="10" value="1" id="starSize" oninput="this.form.amountRange.value=this.value" >

			<br><!--break to next line-->

			<!--Creating slider and input box number of points-->
			<b>Number of points</b>
			<input type="range" name="amountRange2" min="1" max="100" value="5" class="slider" id="starPoints" oninput="this.form.amountInput2.value=this.value">
			<input type="number" name="amountInput2" min="1" max="100" value="5" id="starPoints" oninput="this.form.amountRange2.value=this.value">
			</form>

			`);
	};

	//function to grab value from the silder to change the size of stars
	this.getStarSizes = function (){
		//return value 
		return document.getElementById('starSize').value;
	}

	//function to grab value from the silder to change the size of stars
	this.getStarPoints = function (){
		//return value 
		return document.getElementById('starPoints').value;
	}


	//unselectTool to remove options
	this.unselectTool = function() {
		//clear options
		select(".options").html("");
	}






}