// Trigger when move-button is clicked
$(document).on('mousedown', '#game-button-move', function(e){
	e.preventDefault();
	
	gamePause();
	
	// Make game box draggable
	$('#game').draggable({
		cursor: 		'move', 
		snap: 			'#content-box', 
		containment: 	'#content-box', 
		snapMode: 		'inner', 
		disabled: 		false
	});
	
	$('#game').addClass('ui-draggable-dragging');
});

// Trigger when move-button is released
$(document).on('mouseup', '#game-button-move', function(e){
	e.preventDefault();
	
	// Disable game box drag function
	$('#game').draggable({
		disabled: true
	});
});

// Trigger when speed up button is clicked
$(document).on('click', '#game-btn-speed-decrease', function(e){
	e.preventDefault();
	
	// Set new speed to speed bar
	$('#game-btn-speed').val(
		Math.max(
			parseFloat($('#game-btn-speed').attr('min')), 
			parseFloat($('#game-btn-speed').val()) - parseFloat($('#game-btn-speed').attr('step'))
		)
	);
	
	// Update speed display
	$('#game-speed').html($('#game-btn-speed').val());
});

// Trigger when speed down button is clicked
$(document).on('click', '#game-btn-speed-increase', function(e){
	e.preventDefault();
	
	// Set new speed to speed bar
	$('#game-btn-speed').val(
		Math.min(
			parseFloat($('#game-btn-speed').attr('max')), 
			parseFloat($('#game-btn-speed').val()) + parseFloat($('#game-btn-speed').attr('step'))
		)
	);
	
	// Update speed display
	$('#game-speed').html($('#game-btn-speed').val());
});

// Trigger when speed bar is changed
$(document).on('change', '#game-btn-speed', function(e){
	e.preventDefault();
	
	// Update speed display
	$('#game-speed').html($('#game-btn-speed').val());
});

// Trigger when field size decrease button is clicked
$(document).on('click', '#game-btn-size-decrease', function(e){
	e.preventDefault();
	
	// Set new field size to field size bar
	$('#game-btn-size').val(
		Math.max(
			parseInt($('#game-btn-size').attr('min')), 
			parseInt($('#game-btn-size').val()) - parseInt($('#game-btn-size').attr('step'))
		)
	);
	
	// Update field size display
	$('#game-size').html($('#game-btn-size').val() + 'x' + $('#game-btn-size').val());
	
	// Update field size variable
	newSize($('#game-btn-size').val());
});

// Trigger when field size increase button is clicked
$(document).on('click', '#game-btn-size-increase', function(e){
	e.preventDefault();
	
	// Set new field size to field size bar
	$('#game-btn-size').val(
		Math.min(
			parseInt($('#game-btn-size').attr('max')), 
			parseInt($('#game-btn-size').val()) + parseInt($('#game-btn-size').attr('step'))
		)
	);
	
	// Update field size display
	$('#game-size').html($('#game-btn-size').val() + 'x' + $('#game-btn-size').val());
	
	// Update field size variable
	newSize($('#game-btn-size').val());
});

// Trigger when field size bar is changed
$(document).on('change', '#game-btn-size', function(e){
	e.preventDefault();
	
	// Update field size display
	$('#game-size').html($('#game-btn-size').val() + 'x' + $('#game-btn-size').val());
	
	// Update field size variable
	newSize($('#game-btn-size').val());
});

// Trigger when rule-button is clicked
$(document).on('click', '#game-button-rules', function(e){
	e.preventDefault();
	
	gamePause();
	
	// Open popup box
	$('#game-popup').show().html(loadingSpinner());
	
	// Load rules content into box
	$('#game-popup').load('popup/rules.html', function(){
		$('#game-popup').hide().slideDown(400);
		
		// Append closing button to box
		$('#game-popup').append(
			'<center><a href="#" class="btn btn-lg btn-danger" id="game-button-close-popup">Close</a></center>'
		);
	});
});

// Trigger when configuration-button is clicked
$(document).on('click', '#game-button-configurations', function(e){
	e.preventDefault();
	
	gamePause();
	
	// Open popup box
	$('#game-popup').show().html(loadingSpinner());
	
	// Load configurations to box
	$('#game-popup').load('popup/configurations.html', function(){
		$('#game-popup').hide().slideDown(400);
		
		// Append closing button to box
		$('#game-popup').append(
			'<center><a href="#" class="btn btn-lg btn-danger" id="game-button-close-popup">Close</a></center>'
		);
	});
});

// Trigger when closing popup button is clicked
$(document).on('click', '#game-button-close-popup', function(e){
	e.preventDefault();
	
	// Close popup box
	$('#game-popup').fadeOut(400, function(){
		
		// Empty popup box
		$('#game-popup').html('');
	});
});

// Trigger when clear button is clicked in game
$(document).on('click', '#game-btn-clear', function(e){
	e.preventDefault();
	
	gamePause();
	
	// Empty field
	initField();
	
	// Reset generation display to 0
	$('#game-generation').html('0');
});

// Trigger when next button is clicked in game
$(document).on('click', '#game-btn-next', function(e){
	e.preventDefault();
	
	gamePause();
	
	// Load next field view
	nextField();
});

// Trigger when start button is clicked in game
$(document).on('click', '#game-btn-start', function(e){
	e.preventDefault();
	
	// Hide start button
	$('#game-btn-start').removeClass('hidden').addClass('hidden');
	
	// Show pause button
	$('#game-btn-pause').removeClass('hidden');
	
	// Start game loop
	gamePlay();
});

// Trigger when pause button is clicked in game
$(document).on('click', '#game-btn-pause', function(e){
	e.preventDefault();
	
	gamePause();
});

// Trigger when clicked in a field element in game
$(document).on('click', '.field-element', function(e){
	e.preventDefault();
	
	// Check if clicked element is alive
	if($(this).hasClass('alive')){
		
		// Remove alive (kill)
		$(this).removeClass('alive');
		
		// Update element to dead in array
		field[$(this).attr('data-x')][$(this).attr('data-y')].status = 'dead';
	}else{
		
		// Add alive
		$(this).addClass('alive');
		
		// Add element to alive in array
		field[$(this).attr('data-x')][$(this).attr('data-y')].status = 'alive';
	}
});

// Function to get HTML loading spinner
function loadingSpinner(){
	var html = '';
	html += '<div class="spinner-circle">';
	html += 	'<div class="spinner-circle1 spinner-child"></div>';
	html += 	'<div class="spinner-circle2 spinner-child"></div>';
	html += 	'<div class="spinner-circle3 spinner-child"></div>';
	html += 	'<div class="spinner-circle4 spinner-child"></div>';
	html += 	'<div class="spinner-circle5 spinner-child"></div>';
	html += 	'<div class="spinner-circle6 spinner-child"></div>';
	html += 	'<div class="spinner-circle7 spinner-child"></div>';
	html += 	'<div class="spinner-circle8 spinner-child"></div>';
	html += 	'<div class="spinner-circle9 spinner-child"></div>';
	html += 	'<div class="spinner-circle10 spinner-child"></div>';
	html += 	'<div class="spinner-circle11 spinner-child"></div>';
	html += 	'<div class="spinner-circle12 spinner-child"></div>';
	html += '</div>';
	
	return html;
}