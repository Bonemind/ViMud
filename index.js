var blessed = require('blessed');

//Create the blessed screen
var screen = blessed.screen({
	smartCSR: true
});

screen.title = 'ViMud';

// Create the box that will hold the main output
var box = blessed.text({
	width: '100%',
    	height: '100%-3',
    	content: 'This is test content',
    	border: {
		type: 'line'
	},

	scrollable: true,
    	scrollbar: {
		fg: 'red',
    		bg: 'blue'
	},
    	alwaysScroll: true,
});

//Create the box we will type our commands into
var inputfield = blessed.textbox({
	width: '100%',
    	height: 3,
    	content: 'Bottom',
    	border: {
		type: 'line'
	},
    	bottom: 0
});

//Add our boxes to the screen
screen.append(box);
screen.append(inputfield);

//Spam 60 lines into the main box for testing
screen.key(['p'], function(x) {
	for (var i = 0; i < 60; i++) {
		box.insertBottom('This is a new line, numer: '+ i);
	}
	screen.render();
});

//Scroll down
screen.key(['j'], function(x) {
	box.scroll(1);
	screen.render();
});

//Scroll up
screen.key(['k'], function(x) {
	box.scroll(-1);
	screen.render();
});

//Quit vimud
screen.key(['q'], function(x) {
	return process.exit(0);
});

//Start typing a command
screen.key(['i'], function(x) {
	inputfield.readInput();
	inputfield.clearValue();
	screen.render();
});

//Add the command to the output screen on submit
inputfield.on('submit', function(data) {
	box.insertBottom(data);
	screen.render();
});


//Render the screen for the first time
screen.render();
