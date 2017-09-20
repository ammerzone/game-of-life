var field = 	[], 
	play = 		false, 
	speed = 	0, 
	size = 		0;

$(initField);

function drawField(){
	$('#game #game-field').html('');
	
	for(var y = 0; y < size; y++){
		
		for(var x = 0; x < size; x++){
			$('#game #game-field').append('<div class="field-element"></div>');
			$('#game #game-field').children().last('.field-element').attr('data-x', x);
			$('#game #game-field').children().last('.field-element').attr('data-y', y);
			$('#game #game-field').children().last('.field-element').css({
				width: 	(1 / size) * 100 + '%', 
				height: (1 / size) * 100 + '%'
			});
			
			if(field[x][y].status === 'alive'){
				$('#game #game-field').children().last('.field-element').addClass('alive');
			}else if(field[x][y].status === 'dead'){
				$('#game #game-field').children().last('.field-element').addClass('dead');
			}
		}
	}
}

function initField(){
	size = parseInt($('#game-btn-size').val());
	
	for(var x = 0; x < size; x++){
		field[x] = [];
		
		for(var y = 0; y < size; y++){ 
			field[x][y] = {
				status: null
			};    
		}    
	}
	
	drawField();
}

function newSize(newSize){
	size = newSize;
	
	var temp = [];
	for(var x = 0; x < size; x++){
		temp[x] = [];
		
		for(var y = 0; y < size; y++){
			if(field.length > x){
				if(field[x].length > y){
					if(field[x][y].status != 'undefined'){
						temp[x][y] = {
							status: field[x][y].status
						};
						continue;
					}
				}
			}
			
			temp[x][y] = {
				status: null
			};
		}
	}
	
	field = temp;
	
	drawField();
}

function newSpeed(newSpeed){
	speed = newSpeed;
}

function nextField(){
	var temp = [];
	
	for(var x = 0; x < field.length; x++){
		for(var y = 0; y < field[x].length; y++){
			field[x][y].status = getNewStatus(x, y);
		}
	}
	
	drawField();
}

function countNeighbors(x, y){
	var counter = 0;
	
	if(x > 1){
		if(y > 1){
			if(field[x - 1][y - 1].status === 'alive'){
				counter++;
			}
		}
		
		if(field[x - 1][y].status === 'alive'){
			counter++;
		}
		
		if(y < field[x - 1].length - 1){
			if(field[x - 1][y + 1].status === 'alive'){
				counter++;
			}
		}
	}
	
	if(y > 1){
		if(field[x][y - 1].status === 'alive'){
			counter++;
		}
	}
	
	if(y < field[x].length - 1){
		if(field[x][y + 1].status === 'alive'){
			counter++;
		}
	}
	
	if(x < field.length - 1){
		if(y > 1){
			if(field[x + 1][y-1].status === 'alive'){
				counter++;
			}
		}
		
		if(field[x + 1][y].status === 'alive'){
			counter++;
		}
		
		if(y < field[x + 1].length - 1){
			if(field[x + 1][y + 1].status === 'alive'){
				counter++;
			}
		}
	}
	
	return counter;
}

function getNewStatus(x, y){
	switch(field[x][y].status){
		case 'alive': {
			if(countNeighbors(x, y) === 2 || countNeighbors(x, y) === 3){
				
				// Rule 1: Eine Zelle überlebt, wenn sie zwei oder drei lebendige Nachbarn hat.
				return 'alive';
			}else{
				
				// Rule 2: Eine lebendige Zelle stirbt, wenn sie weniger als zwei lebendige Nachbarzellen hat (Einsamkeit).
				// Rule 3: Eine lebendige Zelle stirbt, wenn sie mehr als drei lebendige Nachbarzellen hat (Überbevölkerung).
				return 'dead';
			}
			
			break;
		}
		case 'dead': {
			if(countNeighbors(x, y) === 3){
				
				// Rule 4: Eine Zelle wird wiederbelebt, wenn sie genau drei lebendige Nachbarn hat.
				return 'alive';
			}else{
				
				// Keeps dead
				return 'dead';
			}
			
			break;
		}
		case null: {
			if(countNeighbors(x, y) === 2 || countNeighbors(x, y) === 3){
				
				// Rule 1: Eine Zelle überlebt, wenn sie zwei oder drei lebendige Nachbarn hat.
				return 'alive';
			}else{
				
				// Keep empty
				return null;
			}
			break;
		} 
		default: {
			if(countNeighbors(x, y) === 2 || countNeighbors(x, y) === 3){
				
				// Rule 1: Eine Zelle überlebt, wenn sie zwei oder drei lebendige Nachbarn hat.
				return 'alive';
			}else{
				
				// Keep empty
				return null;
			}
			break;
		}
	}
	
	// Keep empty
	return null;
}