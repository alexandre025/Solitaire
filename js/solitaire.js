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
            solitaire.dragAndDrop(); // Une nouvelle carte tiré, ajout du drag&drop
        },false);  
        solitaire.dragAndDrop(); // Initialisation du drag&drop
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
    },
    dragAndDrop : function(){
        $('.draggable').draggable({
            revert : 'invalid',
            zIndex : 100
        });
        
        function droppableElement(elem){
            elem.droppable({ // Ici on ne drop que sur les dernieres cartes des stacks
                accept : '.draggable', // Remplacer ici par la fonction qui test la carté draggé et la carte droppé
                drop : function(event,ui){
                    var movedCard = ui.draggable[0]; // Bybebye Jquery

                    // La nouvelle derniere carte de l'ancien emplacement devient dropable
                    droppableElement(ui.draggable.prev());
                    // L'ancienne derniere carte du nouvel emplacement devient dropable
                    $(this).droppable('destroy');


                    movedCard.remove();
                    movedCard = this.parentNode.appendChild(movedCard);
                    var top = this.parentNode.childElementCount;
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


                }
            });
        }
        droppableElement($('.stackList img:last-of-type'));
    }
}
solitaire.init();