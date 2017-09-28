class Game
{
    constructor(score, multiplier, intervals)
    {
        this.score = score; 
        this.multiplier = multiplier;
        this.intervals = intervals;
    }

    startIntervals($interval)
    {
        //**** FIGURE OUT WHY THESE ARENT STARTING***
        
        const l = this.intervals.length;
        this.removeAllIntervals($interval);
        alert("intervals removed");
        for(let x = 0; x < l; x++)
        {
            alert('going through');    
            const intervalID = $interval(()=>{this.add()}, 1000);
            alert("intervalID: " + JSON.stringify(intervalID));
            this.intervals.push(intervalID);
        }
        
        alert("this.intervals " + this.intervals);
        this.setCookie();
        
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
        this.setCookie();
    }

    subtract(subtractor)
    {
        this.score = this.score - subtractor;
        this.setCookie();
    }

    add()
    {
        this.score = this.score + (1*this.multiplier);
        this.setCookie();
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

    removeAllIntervals($interval)
    {
        let length = this.intervals.length;
        for(let i = 0; i < length; i++)
        {
            $interval.cancel(this.intervals[i]);
            //clearInterval(this.intervals[i]['$$intevalId']);
            
        }
        this.intervals = [];
        this.setCookie();
    }

    addInterval(interval)
    {
        this.intervals.push(interval);
        this.setCookie();
    }

    

    getIntervals()
    {
        return this.intervals;
    }

    toString()
    {
        return "Total: " + this.score;
    }

    reset($interval)
    {
        this.removeAllIntervals($interval);
        this.score = 0;
        this.multiplier = 1;
        this.setCookie();
    }

    static initialState()
    {
        const initialGame = new Game(0, 1, []); 
        return JSON.stringify(initialGame);
    }
    static testState()
    {
        const testGame = new Game(100, 1, []);
        return JSON.stringify(testGame);
    }

    getCookieString()
    {
        return JSON.stringify(this);
    }

    setCookie()
    {
        localStorage.setItem('game', this.getCookieString());
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

angular.module('gameApp').service('gameService', ['$interval',  function ($interval) {
    //localStorage.setItem('game', Game.testState());
    alert("test at beginnning : " + localStorage.getItem('game'));
    if(localStorage.getItem('game'))//we have a game
    {
        this.game = Game.parseFromCookie(localStorage.getItem('game'))//old game
        alert("starting intervals")
        //this.game.removeAllIntervals($interval);
        this.game.startIntervals($interval);
        //localStorage.setItem('game', this.game.getCookieString());
        
        //test code below
        //this.totalCookie = localStorage.getItem('game')
        //alert("total cookie: " + this.totalCookie);
    }    
    else
    {
        this.game = new Game(0, 1, []);//new game
        localStorage.setItem('game', this.game.getCookieString());
        
        //test code below
        this.totalCookie = localStorage.getItem('game')
        alert("total cookie: " + this.totalCookie);
    }    

    this.reset = ()=>
    {
        this.game.reset($interval);
    }

    /*
    this.setCookie = ()=>
    {
        localStorage.setItem('game', this.game.getCookieString());
       
        //test code below
        this.totalCookie = localStorage.getItem('game')
        //alert("total cookie: " + this.totalCookie);
    }
   */
}])

