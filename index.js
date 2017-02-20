function makeRow(numberOfFields) {
	var number = null;
	var row = [];
	for(var i=0; i<numberOfFields; i++) {
		row.push(number);
	}
	return row;
}  

function makeField(playfieldSize) {
	var field = [];
	var row;
	for(var i =0; i<playfieldSize; i++){
		row = makeRow(playfieldSize);
		field.push(row);
	}
	return field;
}

var playfieldSize = 4;
var playfield = makeField(playfieldSize);
console.log(playfield);

function getRandomCoordinates(playfieldSize) {
	return [
		Math.floor(Math.random()* playfieldSize),
		Math.floor(Math.random()* playfieldSize)
			];
}

function placeNumberAtRandomFreePosition(nextnumber) {
	var x, y;
	// TODO This is an endless loop when the entire playfield is occupied by numbers
	do {
		var coordinates = getRandomCoordinates(playfieldSize);
		x = coordinates[0];
		y = coordinates[1];
		console.log(x, y);
	} while(playfield[x][y] !== null);
	// console.log('old playfield', playfield);
	playfield[x][y] = nextnumber;
	console.log('new playfield', playfield);
}

placeNumberAtRandomFreePosition(2);
																																				

