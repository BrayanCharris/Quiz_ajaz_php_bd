const ROCK="piedra";
const PAPER="papel";
const SCISSORS="tijeras";

const TIE=0;
const WIN=1;
const LOST=2;

let playing=true;

const rockBtn= document.getElementById("rock");
const paperBtn= document.getElementById("paper");
const scissorsBtn= document.getElementById("scissors");
const resultText= document.getElementById("start-text");
const userImg= document.getElementById("user-img");
const machineImg= document.getElementById("machine-img");
const continueQuiz= document.getElementById("continueQue");


rockBtn.addEventListener("click",()=>{
    play(ROCK);
});

paperBtn.addEventListener("click",()=>{
    play(PAPER);
});

scissorsBtn.addEventListener("click",()=>{
    play(SCISSORS);
});

continueQuiz.addEventListener("click",()=>{
    salirGameRPS();
    reiniciarGamesRPS();
});




function play(userOption){

    if (!playing) {
        salirGameRPS();
        reiniciarGamesRPS();
        return null;
    }

    userImg.src="img/"+userOption+".png";
    resultText.innerHTML="Escogiendo⌛....."

    const interval = setInterval(function(){
        const machineOption = calcMachineOption();
        machineImg.src = "img/" + machineOption + ".png";
    }, 200);

    setTimeout(function() {

        clearInterval(interval);

        const machineOption=calcMachineOption();

        const result= calcResult(userOption,machineOption);
    
        machineImg.src="img/"+machineOption+".png";
    
        switch (result) {
            case TIE:
                resultText.innerHTML="TENEMOS UN EMPATE 😐";
                break;
            case WIN:
                ayudasUsadas++;
                resultText.innerHTML="ASOMBROSO,HAS GANADO 🎉";

                $(function(){
                    $.ajax({
                        url: 'admin/eliminarOpciones.php',
                        type: 'POST',
                        data: {posicion: que_count},
                        success: function(response){}
                    })
                })
                /* let ndel=0;
                if (questions[que_count].options.length>3) {
                    ndel=2;
                }else{
                    ndel=1;
                }

                while (ndel>0) {
                    const valorEliminar=Math.floor(Math.random()*questions[que_count].options.length);
                    if (questions[que_count].options[valorEliminar]!=questions[que_count].answer) {
                        questions[que_count].options.splice(valorEliminar,1);
                        ndel--;
                    }
                } */

                break;
            case LOST:
                ayudasUsadas++;
                resultText.innerHTML="PERDISTE,SUERTE PARA LA PROXIMA😔";
                break;
        }

    },2000);
    
    playing=false;
}

function calcMachineOption() {
    const number= Math.floor(Math.random()*3);

    switch (number) {
        case 0:
            return ROCK;
        case 1:
            return PAPER;
        case 2:
            return SCISSORS;
    }
}

function calcResult(userOption,machineOption) {

    if (userOption === machineOption) {
        return TIE;
    }else if(userOption === ROCK){

        if (machineOption === PAPER) return LOST;
        if(machineOption === SCISSORS) return WIN;

    }else if(userOption === PAPER){

        if (machineOption === SCISSORS) return LOST;
        if(machineOption === ROCK) return WIN;

    }else if(userOption === SCISSORS){

        if (machineOption === ROCK) return LOST;
        if(machineOption === PAPER) return WIN;

    }
}

function salirGameRPS() {
    navbar.style.display='block';
    document.querySelector('.ayudasUsadas').innerHTML = ayudasUsadas;
    helpGame.classList.remove("activeMiniGame");
    quiz_box.classList.add("activeQuiz");
    startTimer(timeValue);
    startTimerLine(widthValue);
    showQuestions(que_count);
}


function reiniciarGamesRPS() {
    userImg.src="img/"+ROCK+".png";
    machineImg.src="img/"+ROCK+".png";
    resultText.innerHTML="Elige una opcion para Comenzar";
    playing=true;
}