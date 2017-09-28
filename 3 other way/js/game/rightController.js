angular.module('gameApp').controller('rightController', ['$interval', 'gameService', function($interval, gameService) {
    
    this.autoClickerCost = gameService.game.autoClickerCost();
    this.service = gameService

    this.addAutoClicker = () =>
    {
        if(gameService.game.getScore() < (gameService.game.autoClickerCost()))
            return;

        const intervalID = $interval(()=>{
            gameService.game.score = gameService.game.score + (gameService.game.multiplier);
            gameService.game.setCookie();
        }, 1000);
        gameService.game.subtract(gameService.game.autoClickerCost());
        gameService.game.intervals.push(intervalID);

        gameService.game.setCookie();
    }
    
    }])