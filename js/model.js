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
	},
    
    isStackEmpty : function(callback){
        var stack = document.querySelector('#stack img');
        if(!stack){
            callback.call(this);
        }
    },
    
    clickEvent : function(firstClick,self,previousFamily,previousValor,plate,deck,callback){
        var isReturned = self.getAttribute('src').split('/');
        var isReturned = isReturned[isReturned.length-1];
        console.log(isReturned);
        if(isReturned != 'back.png'){
            var family = self.getAttribute('data-family');
            var valor = self.getAttribute('data-valor');
            if(firstClick == true){
                var selectedCard = self;
                callback.call(this,family,valor, selectedCard, false);
            }
            else {
                console.log('second click');
                if(self.parentNode.id=='pioche'){ // Clique sur la pioche
                    console.log('click sur pioche');
                }
                else if(self.parentNode.id=='family'){ // Clique en haut
                    console.log('click sur family');   
                }
                else { // Clique en bas 
                    console.log('click en bas');
                    if(((previousFamily == 'p' || previousFamily == 't')&&(family == 'k' || family == 'c'))||(((previousFamily == 'k' || previousFamily == 'c')&&(family == 't' || family == 'p')))){
                        console.log('color OK');
                        if(parseInt(previousValor)+1 == parseInt(valor)){
                            console.log('move OK');
                            callback.call(this,family,valor,selectedCard,true);
                        }
                    }
                    else{
                        callback.call(this,family,valor,selectedCard,false);
                     // Le mec s'est planté    
                    }
                }
            }
        }
    }

};