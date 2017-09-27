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
        this.multiplier = this.multiplier*this.multiplier;
        if(this.multiplier === 1)
            this.multiplier = 1.2;
    }

    subtract(subtractor)
    {
        this.score = this.score - subtractor;
    }

    add()
    {
        this.score = this.score + (1*this.multiplier);
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

    addAutoClicker(interval)
    {
        this.score = this.score - 100;
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

    static initialState()
    {
        const initialGame = new Game(0, 1, []); 
        return JSON.stringify(initialGame);
    }

    /**
     * This function takes a filepath, reads the contents of that file, parses it, and then returns a Game
     * @param {*} contents the contents of the cookie
     */
    static parseFromCookie(contents)
    {
        const fileData = JSON.parse(contents);
        return new Game(fileData.score, fileData.multiplier, fileData.intervals);
    }
}

var game = new Game(0, 1, []);

$(document).ready(()=>
{
    openCookie();
    fixUp();
    $("#resetbutton").click((event)=>
    {
        game.removeAllIntervals();
        game = new Game(0, 1, []);
        fixUp();
    })

    $("#playbutton").click((event)=>
    {
        game.add();
        fixUp();
    });

    $("#multiplybutton").click((event)=>
    {
        if(game.getScore() < game.multiplyCost())
            return;
        game.setMultiplier();
        game.subtract(game.multiplyCost());
        fixUp();
    });

    $("#autoclickbutton").click((event)=>
    {
        if(game.getScore() < game.autoClickerCost())
            return;
        const interval = setInterval(autoclick, 1000);
        game.addAutoClicker(interval);
        fixUp();
        
    });
})

function autoclick()
{
    game.add();
    fixUp();
}

function fixUp()
{
    $("#total").html("<p>"+game.toString() + "</p>");
    $("#multiplybutton").html("<p>"+"*" + game.getMultiplier() + "</p>");
    $("#playbutton").html("<p>"+"+" + game.getMultiplier() + "</p>");
    $("#autoclicklabel").html("<p>"+"Total Added: " + game.getAutoClickerCount() + "</p>");
    if(game.getScore() < game.multiplyCost())
        $("#multiplylabel").css("background-color", "gray");
    else
        $("#multiplylabel").css("background-color", "white");
    if(game.getScore() < game.autoClickerCost())
        $("#autoclickcostlabel").css("background-color", "gray");
    else
        $("#autoclickcostlabel").css("background-color", "white");
    if(JSON.stringify(game) === Game.initialState())
        $("#resetbutton").css("background-color", "gray");
    else
        $("#resetbutton").css("background-color", "white");
    saveCookie();
}

function saveCookie()
{
    document.cookie = JSON.stringify(game);
}

function openCookie()
{
    if(document.cookie)//not undefined
    {
        game = Game.parseFromCookie(document.cookie);

        let length = game.getIntervals().length;
        game.removeAllIntervals();
        for(let i = 0; i < length; i++)
        {
            const interval = setInterval(autoclick, 1000);
            game.addInterval(interval);
        }
    }    
    else
        alert("no cookie");
}