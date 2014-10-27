'use.strict';

window.addEventListener('load',init,false);

function init(){
	var deck = new Array(52);
	var plate = new Array(7);
	for (var i = 0; i < plate.length; i++) {
		plate[i] = new Array(21);
		for (var y = 0; y < plate[i].length; y++) {
		 	plate[i][y] = 0;
		 }; 
	};

	model.createDeck(deck,function(){

		model.createPlate(deck,plate,function(){

		});
	});
	console.log(deck);
	console.log(plate);
}
