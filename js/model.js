'use.strict';

var model = {

	createDeck:function(deck,callback){
		var n = 1;
		for (var i = 0; i < deck.length; i++) {
			deck[i] = new Object();
		};

		for(var i = 0;i < deck.length;i = i + 4) {
			deck[i].family = 'c';
			deck[i+1].family = 'k';
			deck[i+2].family = 'p';
			deck[i+3].family = 't';

			deck[i].valor = n;
			deck[i+1].valor = n;
			deck[i+2].valor = n;
			deck[i+3].valor = n;

			n++;
		};

		deck = Shuffle(deck);

		function Shuffle(o) {
			for(var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
			return o;
		};

		callback.call(this);
	},

	createPlate:function(deck,plate,callback){

		function remplirPlate(deck){
			var lastCard = deck.length - 1;
			lastCard = deck[lastCard];
			deck.pop();
			return lastCard;
		}
		var cpt = 1;
		for (var i = 0; i < plate.length; i++) {
			for (var y = 0; y < cpt; y++) {
				plate[i][y] = remplirPlate(deck);
			};
			cpt++;
		};

		callback.call(this);
	}

};