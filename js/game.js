/* GLOBAL VARIABLES */
var field = 	[], 
	size = 		0, 
	gameTimer = 0;
/* END GLOBALS */

// Init automattically the field (empty)
$(initField);

/**
* Draws the field with the actual array-field
* 
* @access 	public
* @return 	void
* @see 		drawField()
*/
function drawField(){
	
	// Empty html element (field)
	$('#game #game-field').html('');
	
	// For every y (maximum y = size)
	for(var y = 0; y < size; y++){
		
		// For every x in a y (maximum x = size)
		for(var x = 0; x < size; x++){
			
			// Append field-element to html-field
			$('#game #game-field').append('<div class="field-element"></div>');
			
			// Add data-values (coordinates) to field element
			$('#game #game-field').children().last('.field-element').attr('data-x', x);
			$('#game #game-field').children().last('.field-element').attr('data-y', y);
			
			// Set style-size to field element
			$('#game #game-field').children().last('.field-element').css({
				width: 	(1 / size) * 100 + '%', 
				height: (1 / size) * 100 + '%'
			});
			
			// If this field is alive
			if(field[x][y].status === 'alive'){
				
				// Add class 'alive' to field element
				$('#game #game-field').children().last('.field-element').addClass('alive');
			}
		}
	}
}

/**
* Initializes an empty field with actual size
* 
* @access 	public
* @return 	void
* @see 		initField()
*/
function initField(){
	
	// Get field size from html size-display
	size = parseInt($('#game-btn-size').val());
	
	// For every x (maximum x = size)
	for(var x = 0; x < size; x++){
		
		// Init empty x into field array
		field[x] = [];
		
		// For every y (maximum y = size)
		for(var y = 0; y < size; y++){ 
		
			// Init y in x-array with object-parameter status as 'dead'
			field[x][y] = {
				status: 'dead'
			};    
		}    
	}
	
	// Draw the new field
	drawField();
}

/**
* Set a new field-size and draw the field
* 
* @access 	public
* @param 	integer 	newSize
* @return 	void
* @see 		newSize()
*/
function newSize(newSize){
	
	// Set global size to new size
	size = newSize;
	
	// Init a new temp vatiable for new field array
	var temp = [];
	
	// For every x (maximum x = size)
	for(var x = 0; x < size; x++){
		
		// Init empty x into temp array
		temp[x] = [];
		
		// For every y (maximum y = size)
		for(var y = 0; y < size; y++){
			
			// Check if actual x is in field-array
			if(field.length > x){
				
				// Check if actual y is in field-array
				if(field[x].length > y){
					
					// Check if actual field object has a status
					if(field[x][y].status != 'undefined'){
						
						// Write actual field array object into temp array object
						temp[x][y] = {
							status: field[x][y].status
						};
						
						// Go to next for-step
						continue;
					}
				}
			}
			
			// Initialize temp field object with status as 'dead'
			temp[x][y] = {
				status: 'dead'
			};
		}
	}
	
	// Override field array with temp array
	field = temp;
	
	// Draw the new field
	drawField();
}

/**
* Get the next field configuration and draw it
* 
* @access 	public
* @return 	void
* @see 		nextField()
*/
function nextField(){
	
	// Init a new temp vatiable for new field array
	var temp = [];
	
	// For every x (maximum x = size)
	for(var x = 0; x < field.length; x++){
		
		// Init empty x into temp array
		temp[x] = [];
		
		// For every y (maximum y = size)
		for(var y = 0; y < field[x].length; y++){
			
			// Write new field array object into temp array object
			temp[x][y] = {
				status: getNewStatus(x, y)
			};
		}
	}
	
	// Override field array with temp array
	field = temp;
	
	// Draw the new field
	drawField();
	
	// Increase generation display
	$('#game-generation').html(parseInt($('#game-generation').html()) + 1);
}

/**
* Counts the amount of nighbors with staus that is 'alive'
* 
* @access 	public
* @param 	integer 	x
* @param 	integer 	y
* @return 	integer
* @see 		countNeighbors()
*/
function countNeighbors(x, y){
	
	// Init counter with value = 0
	var counter = 0;
	
	// Get the left coordinate modulo size
	minX = (x > 0) ? (x - 1) : (size - 1);
	
	// Get the top coordinate modulo size
	minY = (y > 0) ? (y - 1) : (size - 1);
	
	// Get the right coordinate modulo size
	maxX = (x < size - 2) ? (x + 1) : 0;
	
	// Get the bottom coordinate modulo size
	maxY = (y < size - 2) ? (y + 1) : 0;
	
	// Check if left top neighbor is alive
	if(field[minX][minY].status === 'alive'){
		counter++;
	}
	
	// Check if left neighbor is alive
	if(field[minX][y].status === 'alive'){
		
		// Increase Counter
		counter++;
	}
	
	// Check if left right neighbor is alive
	if(field[minX][maxY].status === 'alive'){
		
		// Increase Counter
		counter++;
	}
	
	// Check if top neighbor is alive
	if(field[x][minY].status === 'alive'){
		
		// Increase Counter
		counter++;
	}
	
	// Check if bottom neighbor is alive
	if(field[x][maxY].status === 'alive'){
		
		// Increase Counter
		counter++;
	}
	
	// Check if right top neighbor is alive
	if(field[maxX][minY].status === 'alive'){
		
		// Increase Counter
		counter++;
	}
	
	// Check if right neighbor is alive
	if(field[maxX][y].status === 'alive'){
		
		// Increase Counter
		counter++;
	}
	
	// Check if right bottom neighbor is alive
	if(field[maxX][maxY].status === 'alive'){
		
		// Increase Counter
		counter++;
	}
	
	// Return number of counter
	return counter;
}

/**
* Gets the new status of a cell with the game rules 
* 	Rule 1: Cell dies with less than 2 neighbors alive
* 	Rule 2: Cell keeps alive with 2 or 3 neighbors alive
* 	Rule 3: Cell dies with more than 3 neighbors alive
* 	Rule 4: Dead cell transforms alive with exact 3 neighbors alive
* 
* @access 	public
* @param 	integer 	x
* @params 	integer 	y
* @return 	void
* @see 		getNewStatus()
*/
function getNewStatus(x, y){
	
	// Switch status of field element with x- and y-coordinate
	switch(field[x][y].status){
		case 'alive': {
			
			// Rule 2: Check if cell has two or three neighbors alive
			return (countNeighbors(x, y) === 2 || countNeighbors(x, y) === 3) ? 'alive' : 'dead';
		}
		case 'dead': {
			
			// Rule 3: Check if dead cell has exact 3 neighbors alive
			return (countNeighbors(x, y) === 3) ? 'alive' : 'dead';
		}
		default: {
			
			// Rule 2: Check if cell has two or three neighbors alive
			return (countNeighbors(x, y) === 2 || countNeighbors(x, y) === 3) ? 'alive' : 'dead';
		}
	}
	
	return 'dead';
}

/**
* Starts the game loop
* 
* @access 	public
* @return 	void
* @see 		gamePlay()
*/
function gamePlay(){
	
	// Fill the gameTimer variable with the timeout, timer is load from actual speed display (calculates FPS to ms)
	gameTimer = setTimeout(
		function(){
			// Build and show next field configuration
			nextField();
			
			// Reload this function
			gamePlay();
		}, 
		parseInt(1000 / parseFloat($('#game-btn-speed').val()))
	);
}

/**
* Clears the game loop Timeout and reset it to 0
* 
* @access 	public
* @return 	void
* @see 		gamePause()
*/
function gamePause(){
	
	// Check if gameTimer exists and is true
	if(gameTimer){
		
		// Clear gameTimer
		clearTimeout(gameTimer);
		
		// Set gameTimer to 0
		gameTimer = 0;
	}
	
	// Show start button
	$('#game-btn-start').removeClass('hidden');
	
	// Hide pause button
	$('#game-btn-pause').removeClass('hidden').addClass('hidden');
}