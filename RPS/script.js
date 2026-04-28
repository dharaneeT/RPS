let score = JSON.parse(localStorage.getItem('score')) || {
    Win: 0,
    Losses: 0,
    Ties: 0
};

let playerresult = document.querySelector('.yourmove');
let compare = document.querySelector('.movecompare');
let resultelement = document.querySelector('.result');

resultelement.innerHTML = `Wins=${score.Win},Loss=${score.Losses},Tie=${score.Ties}`;

document.querySelector('.rockbutton').addEventListener('click', () => {
    game('Rock');
});

document.querySelector('.paperbutton').addEventListener('click', () => {
    game('Paper');
})

document.querySelector('.scissorsbutton').addEventListener('click', () => {
    game('Scissors');
})

document.body.addEventListener('keydown', (event) => {
    if (event.key === 'r') {
        game('Rock');
    }
    else if (event.key === 'p') {
        game('Paper');
    }

    else if (event.key === 's') {
        game('Scissors');
    }
});

function pcmove() {
    let num = Math.random();
    if (num >= 0 && num <= 1 / 3) {
        return 'Rock';
    }
    else if (num > 1 / 3 && num <= 1 / 2) {
        return 'Paper';
    }
    else {
        return 'Scissors';
    }
}

let isautoplaying = false;
let intervalid;
let autoplaybutton = document.querySelector('.Autoplay');

function autoplay() {
    
    if (!isautoplaying) {
        intervalid=setInterval(function () {
        const playermove = pcmove();
        game(playermove);
    }, 1000);
        autoplaybutton.innerHTML = "Stop";
        isautoplaying=true
    }
    else {
        clearInterval(intervalid);
        autoplaybutton.innerHTML = "Autoplay";
    }
}



function game(move) {
    let computermove = pcmove();
    let result = '';
    if (move==='Rock') {
        if (move === computermove) {
            result = 'Tie';
        }
        else if (computermove === 'Scissors') {
            result = 'You win';
        }
        else {
            result = 'You loose';
        }
    }

    else if (move==='Paper') {
        if (move === computermove) {
            result = 'Tie';
        }
        else if (computermove === 'Rock') {
            result = 'You win';
        }
        else {
            result = 'You loose';
        }
    }
    
    else if (move === 'Scissors') {
        if (move === computermove) {
            result = 'Tie';
        }
        else if(computermove === 'Paper'){
            result = 'You win';
        }
        else {
            result = 'You loose';
        }

    }

    if (result === 'You win') {
        score.Win++;
        resultshow(move,computermove,result);
    }
    else if (result === 'You loose') {
        score.Losses++;
        resultshow(move,computermove,result);
    }
    else if(result==='Tie'){
        score.Ties++;
        resultshow(move,computermove,result);
    }

    localStorage.setItem('score',JSON.stringify(score));
}

function scorereset() {
    score.Win = 0;
    score.Losses = 0;
    score.Ties = 0;
    resultelement.innerHTML = 'wins=0,Losses=0,Ties=0';
    compare.innerHTML = '';
    playerresult.innerHTML = '';
}

function resultshow(move,computermove,result) {
    playerresult.innerHTML = `${result}`;
    compare.innerHTML = `You choose <img src="RPSIMAGES/${move}.png" class="compareimg">
         computer choose <img src="RPSIMAGES/${computermove}.png" class="compareimg">`;
    resultelement.innerHTML = `Wins=${score.Win},Loss=${score.Losses},Tie=${score.Ties}`;
}
