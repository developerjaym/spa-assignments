angular.module('gameApp').controller('headerController', ['gameService', function(gameService) {
    
    this.score = gameService.game.toString();
    this.service = gameService
    /*
        this.backgroundColor = { 'background-color': this.bloon.color };
    
    */
    this.reset = ()=>{
        gameService.game.reset();
    }
    
    }])