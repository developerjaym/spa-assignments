angular.module('gameApp').controller('headerController', ['gameService', function(gameService) {
    
    this.score = gameService.game.toString();
    this.service = gameService
    
    this.reset = ()=>{
        gameService.reset();
    }
    
    }])