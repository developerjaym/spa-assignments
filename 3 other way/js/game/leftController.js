angular.module('gameApp').controller('leftController', ['gameService', function(gameService) {
    
    this.service = gameService
    
    this.setMultiplier = ()=>{
        gameService.game.setMultiplier();
    }
    
    }])