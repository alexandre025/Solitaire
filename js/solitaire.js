'use.strict';


var solitaire = {
    
    init : function(){
        var deck = new Array(52);
        var plate = new Array(7);
        var firstClick = true;
        for (var i = 0; i < plate.length; i++) {
            plate[i] = new Array(21);
            for (var y = 0; y < plate[i].length; y++) {
                plate[i][y] = 0;
             }; 
        };

        model.createDeck(deck,function(){

            model.createPlate(deck,plate,function(){
                UI.initPlate(plate);
                UI.initDeck(deck);
            });
        });      
    
        document.getElementById('stack').addEventListener('click',function(){
            model.isStackEmpty(function(){
                UI.initDeck(deck);
            });
            UI.clickStack();
        },false);  
/*
        var cliquableCards = document.querySelectorAll('.stackList > img, #family > .card');
        var selectedFamily = null, selectedValor = null, previousCard = null;
        for(var i = 0; i < cliquableCards.length; i++){
            cliquableCards[i].addEventListener('click',function(evt){
                var self = this;
                model.clickEvent(firstClick,self,selectedFamily,selectedValor,plate,deck,function(family,valor, selectedCard, movable){
                    selectedFamily = family;
                    selectedValor = valor;
                    previousCard = selectedCard;
                    if(firstClick == true){UI.clickEvent(self); firstClick = false;}
                    else if(firstClick == false && movable == true){
                        UI.moveCard(previousCard,self);
                    }
                    else if(firstClick == false && movable == false){
                    // RESET UI
                    }

                });
            },false);
        };
        */
    }
}
solitaire.init();