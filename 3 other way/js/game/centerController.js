angular.module('gameApp').controller('centerController', ['gameService', function(gameService) {
    
    this.addAmount = gameService.game.getMultiplier();
    this.service = gameService
    /*
    
        this.backgroundColor = { 'background-color': this.bloon.color };
    
    */
    this.add = ()=>{
        
        gameService.game.add();
        //gameService.setCookie();
    }
    
    }])