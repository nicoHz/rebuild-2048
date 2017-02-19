
function makeField(numberOfRows) {
	var field = [];
	var row;
	for(var i =0; i<numberOfRows; i++){
		row = makeRow(numberOfRows);
		field.push(row);
	}
	return field;
}

function makeRow(numberOfFields) {
	var number = null;
	var row = [];
	for(var i=0; i<numberOfFields; i++) {
		row.push(number);
	}
	return row;
}  


function randomField() {
// this must contain calculation of x and y 
}

var x = Math.floor(Math.random() * 4); // redundanz!? same calculation for y, but its necessary, maybe.
var y = Math.floor(Math.random() * 4);


var playfield = makeField(4); 
var value2 = 2;


playfield[x][y] = value2; // How to check playfield, if value is null? or how can i call randomField() for calculation?
playfield[2][2] = 4;
playfield[0][0] = "first";
playfield[3][3] = "last";
console.log(playfield);


// set a speciefied value in one randomly choosen field if it's current value is null
// 1. choose a field randomly and
// 2. check, if it's holding a null; 
// 3. if the field holds value null, set specified value; if not, back to step 1.

