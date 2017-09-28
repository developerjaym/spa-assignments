angular.module('gameApp').controller('leftController', ['gameService', function(gameService) {
    
    this.multiplier = gameService.game.getMultiplier();
    this.total = gameService.game.toString();
    this.service = gameService
    /*
    
        this.showName = () => {
    
            alert('Name: ' + this.bloon.name)
    
        }
    
        
    
        this.increasePrice = bloonService.increasePrice(this)
    
    
    
        this.backgroundColor = { 'background-color': this.bloon.color };
    
    */
    this.test = ()=>{
        gameService.game.setMultiplier();
        alert('Left Controller Test' + gameService.game.getMultiplier());
    }
    
    }])