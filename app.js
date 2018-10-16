// When user clicks LOGIN
// Get value of language selection
// Display greeting in H1


var g = G$('John', 'Doe');

$('#login').on('click', function(){
	// set variables
	var lang = $('#lang option:checked').val();
	var level = $('#level option:checked').val();
	// create greeting
	g
		// create greeting with appropriate language
		.setLang(lang)
		// display greeting with appropriate level
		.displayGreeting('#greeting', level);
});