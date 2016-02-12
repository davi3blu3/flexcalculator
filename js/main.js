// DECLARE GLOBAL VARIABLES
var operand = [];   // array collection input digits
var equation = [];  // each operation array as [operand, operator, operand]
var memory = []; 	// holds the last equation in memory
var answer;			// result of the last equation calculated

$(document).ready(function() {
	
	// CLEAR BUTTON - ON CLICK FUNCTION
	$(".clear").on("click", function() {
		operand = [];   		// clear all variables
		equation = [];
		memory = [];
		answer = undefined;
		$(".display").text(0);	// display 0 in DOM
	});


	// INTEGER BUTTON - ON CLICK FUNCTION
	$(".integer").on("click", function() {
		operand.push($(this).text());
		$(".display").text(operand.join("").substring(0, 10));	// show current operand input in DOM
	});


	// OPERATOR BUTTON - ON CLICK FUNCTION
	$(".operator").on("click", function() {
		if (equation.length < 1) {
			if (operand.length < 1) {					// CONDITION - equation empty, operand empty
				if (answer != undefined) {					// if no last answer, no action
					equation.push(answer);      			// push last answer to equation array
					$(".display").text(answer); 			// display last answer in DOM
					equation.push($(this).text());			// push operator to equation array
				}
			} else {									// CONDITION - equation empty, operand has input
				equation.push(Number(operand.join("").substring(0, 10)));	// push operand to equation array
				operand = [];								// clear operand
				equation.push($(this).text());				// push operator to equation array
			}
		} else {
			if (operand.length < 1) {					// CONDITION - equation has input, operand empty
				equation[1] = $(this).text();				// replace equation operator with new

			} else {									// CONDITION - equation has input, operand has input
				equation.push(Number(operand.join("").substring(0, 10)));	// push operand to equation array
				operand = [];								// clear operand
				calculate(equation);						// solve current equation
				equation.push(answer);
				equation.push($(this).text());				// push operator to equation array
			}
		}
	});


	// EQUAL BUTTON - ON CLICK FUNCTION
	$(".equal").on("click", function() {
		if (equation.length < 1) {
			if (operand.length < 1) {					// CONDITION - equation empty, operand empty
				if (answer != undefined) {					// if no last answer, no action
					equation.push(answer);      				// push last answer to equation array
					equation.push(memory[0]);					// push memory operator to equation array
					equation.push(memory[1]);					// push memory 2nd operand to equation array
					calculate(equation);						// solve current equation
				}
			}
		} else {
			if (operand.length < 1) {					// CONDITION - equation has input, operand empty
				equation.push(0);							// push zero to equation array
				calculate(equation);						// solve current equation
			} else {									// CONDITION - equation has input, operand has input
				equation.push(Number(operand.join("").substring(0, 10)));	// push operand to equation array
				operand = [];								// clear operand
				calculate(equation);						// solve current equation
			}
		}
	});


	// DECIMAL BUTTON - ON CLICK FUNCTION
	$(".decimal").on("click", function() {
		if (operand.length < 1) {						// CONDITION - operand empty, push zero and decimal
			operand.push(0);
			operand.push($(this).text());
			$(".display").text(operand.join(""));
		} else {										// CONDITION - operand has input
			if (operand.indexOf(".") < 0) {
				operand.push($(this).text());
				$(".display").text(operand.join(""));	// show current operand input in DOM
			}
		}
	});


	// SIGN BUTTON - ON CLICK FUNCTION
	$(".sign").on("click", function() {
		if (operand.length < 1) {						// CONDITION - operand empty
			if (equation.length === 0 && answer != undefined) {
				operand.push(answer);
				if (operand[0] != "-") {
					operand.unshift("-");
				} else {
					operand.shift();
				}
				$(".display").text(operand.join(""));
			}
		} else {										// CONDITION - operand has input
			if (operand[0] != "-") {
				operand.unshift("-");
			} else {
				operand.shift();
			}
			$(".display").text(operand.join(""));		// change polarity
		}
	});


	// CALCULATE CURRENT EQUATION FUNCTION
	function calculate(array) {
	switch (equation[1]) {						// calculate equation for appropriate operator
		case "+":
			answer = ( equation[0] + equation[2] );
			break;
		case "-": 
			answer = ( equation[0] - equation[2] );
			break;
		case "×":
			answer = ( equation[0] * equation[2] );
			break;
		case "÷":
			answer = ( equation[0] / equation[2] );
			break;
		case "%":
			answer = ( equation[0] % equation[2] );
			break;
	}
	$(".display").text(answer);	// display answer in DOM
	memory = [];				// clear previous memory then write new
	memory.push(equation[1]);
	memory.push(equation[2]);
	equation = [];				// clear equation
}

});