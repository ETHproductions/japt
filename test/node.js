var Japt = require("../src/japt-interpreter");

// If all went well, this will print "Hello user" with no trailing newline
Japt.run(
	'`HÁM {U}',	// Japt code
	'"user"',	// input (Note to self: this would be more useful as an array of inputs, i.e. the input parsing is not a built-in feature of Japt)
	false,		// safe mode
	null,		// function run after transpiling
	function (output) { // function run after program runs successfully
		if (Japt.implicit_output) process.stdout.write(output);
	},
	function (error) { // function run after program errors
		throw error;
	}
);
