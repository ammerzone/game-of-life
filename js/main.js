$(document).on('mousedown', '#game-button-move', function(e){
	e.preventDefault();
	
	$('#game').draggable({
		cursor: 		'move', 
		snap: 			'#content-box', 
		containment: 	'#content-box', 
		snapMode: 		'inner', 
		disabled: 		false
	});
	$('#game').addClass('ui-draggable-dragging');
});

$(document).on('mouseup', '#game-button-move', function(e){
	e.preventDefault();
	
	$('#game').draggable({
		disabled: true
	});
});

$(document).on('click', '#game-btn-speed-decrease', function(e){
	e.preventDefault();
	
	$('#game-btn-speed').val(
		Math.max(
			parseFloat($('#game-btn-speed').attr('min')), 
			parseFloat($('#game-btn-speed').val()) - parseFloat($('#game-btn-speed').attr('step'))
		)
	);
	
	$('#game-speed').html($('#game-btn-speed').val());
	
	//
});

$(document).on('click', '#game-btn-speed-increase', function(e){
	e.preventDefault();
	
	$('#game-btn-speed').val(
		Math.min(
			parseFloat($('#game-btn-speed').attr('max')), 
			parseFloat($('#game-btn-speed').val()) + parseFloat($('#game-btn-speed').attr('step'))
		)
	);
	
	$('#game-speed').html($('#game-btn-speed').val());
	
	//
});

$(document).on('change', '#game-btn-speed', function(e){
	e.preventDefault();
	
	$('#game-speed').html($('#game-btn-speed').val());
	
	//
});

$(document).on('click', '#game-btn-size-decrease', function(e){
	e.preventDefault();
	
	$('#game-btn-size').val(
		Math.max(
			parseInt($('#game-btn-size').attr('min')), 
			parseInt($('#game-btn-size').val()) - parseInt($('#game-btn-size').attr('step'))
		)
	);
	
	$('#game-size').html($('#game-btn-size').val() + 'x' + $('#game-btn-size').val());
	
	newSize($('#game-btn-size').val());
});

$(document).on('click', '#game-btn-size-increase', function(e){
	e.preventDefault();
	
	$('#game-btn-size').val(
		Math.min(
			parseInt($('#game-btn-size').attr('max')), 
			parseInt($('#game-btn-size').val()) + parseInt($('#game-btn-size').attr('step'))
		)
	);
	
	$('#game-size').html($('#game-btn-size').val() + 'x' + $('#game-btn-size').val());
	
	newSize($('#game-btn-size').val());
});

$(document).on('change', '#game-btn-size', function(e){
	e.preventDefault();
	
	$('#game-size').html($('#game-btn-size').val() + 'x' + $('#game-btn-size').val());
	
	newSize($('#game-btn-size').val());
});

$(document).on('click', '#game-button-rules', function(e){
	e.preventDefault();
	
	// pause
	
	// popup
	$('game-popup').load('popup/rules.html');
});

$(document).on('click', '#game-button-configurations', function(e){
	e.preventDefault();
	
	// pause
	
	// popup
	$('game-popup').load('popup/configurations.html');
});

$(document).on('click', '#game-btn-clear', function(e){
	e.preventDefault();
	
	
});

$(document).on('click', '#game-btn-next', function(e){
	e.preventDefault();
	
	nextField();
});

$(document).on('click', '#game-btn-start', function(e){
	e.preventDefault();
	
	$('#game-btn-start').removeClass('hidden').addClass('hidden');
	$('#game-btn-pause').removeClass('hidden');
});

$(document).on('click', '#game-btn-pause', function(e){
	e.preventDefault();
	
	$('#game-btn-start').removeClass('hidden');
	$('#game-btn-pause').removeClass('hidden').addClass('hidden');
});

$(document).on('click', '.field-element', function(e){
	e.preventDefault();
	
	if($(this).hasClass('alive')){
		$(this).removeClass('alive');
		
		field[$(this).attr('data-x')][$(this).attr('data-y')].status = '';
	}else{
		$(this).addClass('alive');
		
		field[$(this).attr('data-x')][$(this).attr('data-y')].status = 'alive';
	}
});