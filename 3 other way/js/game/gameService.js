class Game
{
    constructor(score, multiplier, intervals)
    {
        this.score = score; 
        this.multiplier = multiplier;
        this.intervals = intervals;
    }
    getScore()
    {
        return this.score;
    }

    getMultiplier()
    {
        return this.multiplier;
    }

    setMultiplier()
    {
        if(this.score < (this.multiplyCost()))
            return;
        this.multiplier = this.multiplier*this.multiplier;
        if(this.multiplier === 1)
            this.multiplier = 1.2;
        this.subtract(this.multiplyCost())
    }

    subtract(subtractor)
    {
        this.score = this.score - subtractor;
    }

    add()
    {
        this.score = this.score + (1*this.multiplier);
    }

    test()
    {
        alert("auto test");
    }

    multiplyCost()
    {
        return 10;
    }

    autoClickerCost()
    {
        return 100;
    }

    getAutoClickerCount()
    {
        return this.intervals.length;
    }

    removeAllIntervals()
    {
        let length = this.intervals.length;
        for(let i = 0; i < length; i++)
        {
            clearInterval(this.intervals[i]);
        }
        this.intervals = [];
    }

    addInterval(interval)
    {
        this.intervals.push(interval);
    }

    

    getIntervals()
    {
        return this.intervals;
    }

    toString()
    {
        return "Total: " + this.score;
    }

    reset()
    {
        this.removeAllIntervals();
        this.score = 0;
        this.multiplier = 1;
    }

    static initialState()
    {
        const initialGame = new Game(0, 1, []); 
        return JSON.stringify(initialGame);
    }
    getCookie()
    {
        return JSON.stringify(this);
    }
    /**
     * This function takes a cookie, reads the contents of that cookie, parses it, and then returns a Game
     * @param {*} contents the contents of the cookie
     */
    static parseFromCookie(contents)
    {
        const fileData = JSON.parse(contents);
        return new Game(fileData.score, fileData.multiplier, fileData.intervals);
    }
}

angular.module('gameApp').service('gameService', [function () {
    //alert("test " + document.cookie);
    this.game = new Game(0, 1, []);
    //document.cookie = game.getCookie();
    //alert("test 2 " + document.cookie);
}])