angular.module('gameApp').controller('leftController', ['gameService', function(gameService) {
    
    this.multiplier = gameService.game.getMultiplier();
    this.total = gameService.game.toString();
    this.service = gameService

    this.setMultiplier = ()=>{
        gameService.game.setMultiplier();
        //gameService.setCookie();
    }
    
    }])