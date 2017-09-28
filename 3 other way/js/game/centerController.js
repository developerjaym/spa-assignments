angular.module('gameApp').controller('centerController', ['gameService', function(gameService) {
    
    this.addAmount = gameService.game.getMultiplier();
    this.service = gameService
    
    this.add = ()=>{
        
        gameService.game.add();
    }
    
    }])