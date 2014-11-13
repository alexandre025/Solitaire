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
        
        //Création du tas de carte
        model.createDeck(deck,function(){

            model.createPlate(deck,plate,function(){
                UI.initPlate(plate);
                UI.initDeck(deck);
                alert("Êtes vous prêt ?");
                UI.lancerDecompte(function(){
                    
                    var sec = 0; 
                    var min = 0;

                    var interval = setInterval(function(){
                        sec++;
                        if(sec == 60){
                            min++;
                            sec = 0;
                        }
                        
                        UI.MAJchrono(sec, min);
                        
                    },1000);
                });
            });
        });      
        
        //Click pour tourner pioche
        document.getElementById('stack').addEventListener('click',function(){
            solitaire.tournerPioche(deck);
        },false);
        
        //keypress bar d'espace
        $(document).keypress(function(event){
			if(event.keyCode=="32"){
                solitaire.tournerPioche(deck);
            }
        });	
        
        
        solitaire.dragAndDrop(deck); // Initialisation du drag&drop
    },
    
    //Fonction qui permet de tourner les cartes de la pioche
    tournerPioche : function(deck){
        
        model.isStackEmpty(function(){
            UI.initDeck(deck);
        });

        UI.clickStack();
        solitaire.dragAndDrop(deck);
        
    },
    
    dragAndDrop : function(deck){
        $('.draggable').draggable({
            revert : 'invalid',
            zIndex : 100
        });
        
        function droppableEmptyStack(elem){
            elem.droppable({
                accept : '.draggable',
                drop : function(event,ui){
                    $(this).droppable('destroy');
                    var movedCard = ui.draggable[0];
                    
                    if(movedCard.previousElementSibling){
                        droppableStackList(ui.draggable.prev());
                    }
                    else{
                        droppableEmptyStack(ui.draggable.parent());
                    }
                    
                    movedCard.remove();
                    movedCard = this.appendChild(movedCard);
                    var top = this.parentNode.childElementCount;
                    UI.setCardsPosition();
                }
            });
        }
        
        //Drop pour les familles
        function droppableFamilyStack(elem){
            elem.droppable({
                accept : function(dragged){
                    
                    var dragged = dragged[0];

                    // Regarde si le contenaire est vide
                    if(this.childNodes.length == 1){
                        
                        if(dragged.getAttribute('data-valor') == "1"){
                            return true;
                        }
                        else{
                            return false;
                        }
                        
                    }
                    else{
                        
                        var previousFamily = this.getAttribute('data-family');
                        var previousValor = parseInt(this.getAttribute('data-valor'));
                        var actualFamily = dragged.getAttribute('data-family');
                        var actualValor = parseInt(dragged.getAttribute('data-valor'));
                        
                        if(previousFamily == actualFamily && (previousValor+1) == actualValor ){
                            return true;
                            
                        }else{
                            return false;
                        }
                    }
                },
                drop : function(event,ui){
                    
                    var movedCard = ui.draggable[0];

                    this.setAttribute('data-family',movedCard.getAttribute('data-family'));
                    this.setAttribute('data-valor',movedCard.getAttribute('data-valor'));
                    
                    UI.setFamilyCardPosition(movedCard);
                    
                    if(movedCard.parentNode.id=='pioche'){
                        model.delCard(deck,movedCard.getAttribute('data-family'),movedCard.getAttribute('data-valor'));
                    }
                    
                    
                    var previousCard = movedCard.previousElementSibling;
                    if(previousCard){
                        var isReturned = previousCard.getAttribute('src').split('/');
                        isReturned = isReturned[isReturned.length-1];
                        if(isReturned == 'back.png'){
                            var family = previousCard.getAttribute('data-family');
                            var valor = previousCard.getAttribute('data-valor');
                            previousCard.setAttribute('src','img/cards/'+family+valor+'.jpg');
                            ui.draggable.prev().addClass('draggable');
                            solitaire.dragAndDrop(deck);
                        }
                        droppableStackList(ui.draggable.prev());
                    }
                    else{
                        droppableEmptyStack(ui.draggable.parent());
                    }
                    
                    $(this).droppable('destroy');
                    movedCard.remove();
                    movedCard = this.appendChild(movedCard);
                    var top = this.parentNode.childElementCount;
                    
                }
            });
        }
        
        
        function droppableStackList(elem){
            elem.droppable({ // Ici on ne drop que sur les dernieres cartes des stacks
                accept : function(dragged){
                    var dragged = dragged[0];
                    
                    var isReturned = this.getAttribute('src').split('/');
                    isReturned = isReturned[isReturned.length-1];
                    
                    if(isReturned != 'back.png'){
                        var previousFamily = dragged.getAttribute('data-family');
                        var previousValor = dragged.getAttribute('data-valor');
                        var family = this.getAttribute('data-family');
                        var valor = this.getAttribute('data-valor');
                        if(((previousFamily == 'p' || previousFamily == 't')&&(family == 'k' || family == 'c'))||(((previousFamily == 'k' || previousFamily == 'c')&&(family == 't' || family == 'p')))){
                            if(parseInt(previousValor)+1 == parseInt(valor)){
                                return true;
                            }
                        }
                        return false;
                    }
                    else { return false; }
                },
                
                drop : function(event,ui){
                    var movedCard = ui.draggable[0]; // Bybebye Jquery

                    // La nouvelle derniere carte de l'ancien emplacement devient dropable
                    
                    if(movedCard.parentNode.id=='pioche'){
                        model.delCard(deck,movedCard.getAttribute('data-family'),movedCard.getAttribute('data-valor'));
                    }
                    
                    var previousCard = movedCard.previousElementSibling;
                    if(previousCard){
                        var isReturned = previousCard.getAttribute('src').split('/');
                        isReturned = isReturned[isReturned.length-1];
                        if(isReturned == 'back.png'){
                            var family = previousCard.getAttribute('data-family');
                            var valor = previousCard.getAttribute('data-valor');
                            previousCard.setAttribute('src','img/cards/'+family+valor+'.jpg');
                            ui.draggable.prev().addClass('draggable');
                            solitaire.dragAndDrop(deck);
                        }
                        droppableStackList(ui.draggable.prev());
                    }
                    else{
                        droppableEmptyStack(ui.draggable.parent());
                    }
                    
                    // L'ancienne derniere carte du nouvel emplacement devient non-dropable
                    $(this).droppable('destroy');


                    movedCard.remove();
                    movedCard = this.parentNode.appendChild(movedCard);
                    var top = this.parentNode.childElementCount;
                    UI.setCardsPosition();
                    
                }
            });
        }
        
        //Drop sur les stacklist
        droppableStackList($('.stackList img:last-of-type'));
        //Drop des familles
        droppableFamilyStack($('#family .cards'));
    }
}
solitaire.init();