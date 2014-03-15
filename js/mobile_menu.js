$(document).ready(function(){
	

	$('.nav_btn').toggle(
		function(){
			$(this).toggleClass("active");
			$('nav').animate({
				width: '130',
		  	}, 200, function() {
				// Animation complete.
		  	});
		  	$("body").toggleClass("move");	
		},
		function(){
			$(this).toggleClass("active");
			$('nav').animate({
				width: '0',
		  	}, 200, function() {
				// Animation complete.
		  	});
		  	$("body").toggleClass("move");
			
		}
	);	

	
});

