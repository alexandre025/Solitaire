'use.strict';

var UI = {
	initPlate:function(plate){
        var family, valor, newCard;
        var stackList = document.getElementsByClassName('stackList');
        for (var i = 0; i < plate.length; i++) {
            for (var y = 0; y < plate[i].length; y++) {
                family = plate[i][y].family;
                valor = plate[i][y].valor;
                if(family && valor){
                    newCard = document.createElement('img');
                    newCard.classList.add('card');
                    if(plate[i][y+1]){
                        newCard.setAttribute('src','img/cards/back.png');
                    }
                    else {
                        newCard.setAttribute('src','img/cards/'+family+valor+'.jpg');
                        newCard.classList.add('draggable');
                    }
                    newCard.setAttribute('data-family',family);
                    newCard.setAttribute('data-valor',valor);
                    stackList[i].appendChild(newCard);
                }
                
             }; 
        };
        UI.setCardsPosition();
	},
    setCardsPosition : function(){
        var cards = document.getElementById('tapis').getElementsByClassName('cards');
        for (var i = 0; i < cards.length; i++) {
            var card = cards[i].getElementsByTagName('img');
            var cpt = 0;
            for (var j = 0; j < card.length; j++) {
                card[j].style.cssText='';
                card[j].style.top = cpt+"px";	
                cpt = cpt + 20;
           };
        };        
    },
    initDeck : function(deck){
        var family, valor, newCard;
        var pioche = document.getElementById('pioche');
        var stack = document.getElementById('stack');
        pioche.innerHTML='';
        for (var i = 0; i < deck.length; i++) {
            if(deck[i]){
                family = deck[i].family;
                valor = deck[i].valor;
                newCard = document.createElement('img');
                newCard.classList.add('card');
                newCard.setAttribute('src','img/cards/back.png');
                newCard.setAttribute('data-family',family);
                newCard.setAttribute('data-valor',valor);
                stack.appendChild(newCard);
            }
        };
    },
    clickStack : function(){
        var cardTop = document.querySelector('#stack img');
        var family = cardTop.getAttribute('data-family');
        var valor = cardTop.getAttribute('data-valor');
        console.log(cardTop);
        document.getElementById('stack').removeChild(cardTop);
        cardTop.setAttribute('src','img/cards/'+family+valor+'.jpg');
        cardTop.classList.add('draggable');
        var pioche = document.getElementById('pioche');
        pioche.appendChild(cardTop);
    },
    clickEvent : function(self){
        self.classList.add('focus');   
    },
    
    moveCard : function(previousCard, secondCard){
        console.log(secondCard.parentNode);
        console.log(previousCard);
        secondCard.parentNode.appendChild(previousCard);
        
    }
};