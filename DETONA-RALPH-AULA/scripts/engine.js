const state = {
    views: {
        squares: document.querySelectorAll(".square"),
        enemys: document.querySelector(".enemy"),
        timeLeft: document.querySelector("#time-left"),
        scores: document.querySelector("#score"),
    },
    values: {
        gameVelocity: 1000,
        hitPosition: 0,
        result: 0,
        currentTime : 60,
    },
    actions : {
        //Abaixo, é declarado os intervalos de forma direta, para não precisar criar uma func//
        timerId: setInterval(randomSquare, 1000),
        countDownTimerId: setInterval(countDown, 1000),
    }
}

function countDown(){
    state.values.currentTime--;
    state.views.timeLeft.textContent = state.values.currentTime;

    if (state.values.currentTime <= 0 && state.values.result >= 30){
        alert("Você venceu! O seu resultado foi: " + state.values.result)
    } else if (state.values.currentTime <= 0 && state.values.result <30) {
        alert("Game Over! O seu resultado foi: " + state.values.result)
    }   
    
    if (state.values.currentTime === 0){
    clearInterval(state.actions.countDownTimerId);
    clearInterval(state.actions.timerId);
    }
}

function playSound(){
    let audio = new Audio("/DETONA-RALPH-AULA/audios/src_audios_hit.m4a");
    audio.volume = 0.2;
    audio.play();
}

// Função para adicionar o enemy dentro do square//
function randomSquare (){
    state.views.squares.forEach((squares) => { 
        squares.classList.remove("enemy"); //Acessa o elemento squares, verifica todos os campos e limpa//
});
    let randomNumber = Math.floor(Math.random() * 9); //sorteia um numero aleatorio, inteiro, dentro do range 9

    let randomSquare = state.views.squares[randomNumber];
    randomSquare.classList.add("enemy");

    state.values.hitPosition = randomSquare.id;
}


function moveEnemy (){
    state.values.timerId = setInterval(randomSquare,state.values.gameVelocity);
}

function addListenerHitBox(){
    state.views.squares.forEach((square)=>{
        square.addEventListener("mousedown", () => {
            if(square.id === state.values.hitPosition){
                state.values.result++;
                state.views.scores.textContent = state.values.result;
                state.values.hitPosition = null;
                playSound();
            }
        });
    });
}


function init() {
    moveEnemy()
    addListenerHitBox()
    countDown()
}

init()