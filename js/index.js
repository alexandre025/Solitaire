'use strict';


//Placer les cartes

var cards = document.getElementById('tapis').getElementsByClassName('cards');

for (var i = 0; i < cards.length; i++) {
	
	var card = cards[i].getElementsByTagName('img');
	var cpt = 0;

	for (var j = 0; j < card.length; j++) {

		card[j].style.top = cpt+"px";	
		cpt = cpt + 20;

	};

};


//Drag
$('.card').draggable({ revert: "invalid" });
$('droppable').droppable({accept: '.card'

});