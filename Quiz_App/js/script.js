$(function(){
    $.ajax({
        url: 'admin/validarAccesoQuiz.php',
        type: 'POST',
        success : function(resp){
            
            if (!resp) {
                window.location.href= "../index.html";
            }            

        }
    })
})

//Acedemos a los elementos html
const navbar= document.querySelector('.navigator');
const categoriaNav= document.querySelector('.link-info .categoria');
/* const ayudasNav= document.querySelector('.link-info .ayudas'); */

const info_box = document.querySelector(".info_box");
const exit_btn = info_box.querySelector(".buttons .quit");
const continue_btn = info_box.querySelector(".buttons .restart");

const quiz_box = document.querySelector(".quiz_box");
const timeCount = quiz_box.querySelector(".timer .time_sec");
const timeLine = quiz_box.querySelector("header .time_line");
const timeOff = quiz_box.querySelector("header .time_text");

const option_list= document.querySelector(".option_list"); 
const messageAlert=quiz_box.querySelector(".messageAlert");
const next_btn = document.querySelector(".next_btn");
const help_btn= document.querySelector(".help");

const result_box = document.querySelector(".result_box");
const restart_quiz = result_box.querySelector(".buttons .restart");
const quit_quiz = result_box.querySelector(".buttons .quit");

const helpGame= document.querySelector(".gameRPS");

//Variables

let que_count=0;//Numero de pregunta
let que_numb=1;//Numero de pregunta que va
let counter;//Intervalo de tiempo
let counterLine;//Intervalo de linea de tiempo
let timeValue=15;//Tiempo de contador
let widthValue=0;//ancho de linea
let ayudasUsadas=0;//ayudas usadas

//Calcular el numero de ayudas a usar
consultarNumPreguntas(function(n){
    let nayudas= Math.round(n*0.4);
    document.querySelector('.ayudasTotales').innerHTML = nayudas;
    document.querySelector('.preguntaTotal').innerHTML = n;
});

exit_btn.onclick=()=>{
    window.location.href="salir.php";
};

continue_btn.onclick=()=>{
    info_box.classList.remove("activeInfo");// hide the info box
    quiz_box.classList.add("activeQuiz");// show the quiz box
    navbar.style.display='block';
    showQuestions(0);
    startTimer(15);
    startTimerLine(0);

};

next_btn.onclick=()=>{
    let total = document.querySelector('.preguntaTotal').innerHTML;
    que_count++;
    que_numb++;
    if (que_count < total) {
        showQuestions(que_count);
        clearInterval(counter);
        startTimer(timeValue);
        clearInterval(counterLine);
        startTimerLine(widthValue);
        next_btn.style.display="none";
        messageAlert.style.display="none";
        validateHelp();
    }else{
        navbar.style.display='none';
        showResultBox();
    }

}
help_btn.onclick=()=>{
    clearInterval(counter);
    clearInterval(counterLine);   
    quiz_box.classList.remove("activeQuiz");
    helpGame.classList.add("activeMiniGame");
    navbar.style.display='none';
    help_btn.style.display="none";
}

quit_quiz.onclick=()=>{
    window.location.href="salir.php";
}


//Funciones

//getting questions and options from array
function showQuestions(index){
    document.querySelector('.preguntaActual').innerHTML = que_numb;

    const que_text= document.querySelector(".que_text");
    
    $(function() {
        $.ajax({
            url: 'admin/consultar_pregunta.php',
            type : 'POST',
            data: {posicion: index},
            success : function(resp){
                let pregunta = JSON.parse(resp);

                categoriaNav.innerHTML=pregunta.nombreCate;
                let que_tag= '<span>'+que_numb+'. '+pregunta.pregunta+'</span>';

                let opcionesPregunta = pregunta.opciones;
                let option_tag="";
                opcionesPregunta.forEach(opcion => {
                    option_tag+='<div class="option btn-neon" onclick="optionSelected(this)">'+opcion+'</div>';
                });
                que_text.innerHTML=que_tag;
                option_list.innerHTML=option_tag;
            }
        })    
    })
}

//Iconos de correcto e incorrecto
let tickIcon = '<div class="icon"><i class="fas fa-check tick"></i></div>';
let crossIcon = '<div class="icon"><i class="fas fa-times cross"></i></div>';
function optionSelected(answer) {
    clearInterval(counter);
    clearInterval(counterLine);    

    let userAns= answer.textContent;
    let allOptions = option_list.children.length;
    //Consultar respuesta correcta
    $(function() {
        $.ajax({
            url: 'admin/consultar_pregunta.php',
            type : 'POST',
            data: {posicion: que_count},
            success : function(resp){
                let pregunta = JSON.parse(resp);
                let correctAns= pregunta.respCorrecta;
                help_btn.style.display="none";
                if (userAns==correctAns) {
                    answer.classList.add("correct");
                    answer.insertAdjacentHTML("beforeend", tickIcon);
                    $(function() {
                        $.ajax({
                            url: 'admin/cargarResultados.php',
                            type : 'POST',
                            data: {codigo: pregunta.codCate},
                            success : function(response){}
                        })    
                    })
                }else{
                    answer.classList.add("incorrect");
                    answer.insertAdjacentHTML("beforeend", crossIcon);
                }
            }
        })    
    })

    for (let i = 0; i < allOptions; i++) {
        option_list.children[i].classList.add("disabled");
    }
    next_btn.style.display="block";
    
}

//Contador
function startTimer(time){
    counter = setInterval(timer,1000);
    function timer(){
        timeCount.textContent = time;   
        time--;
        if(time< 9){
            let addZero= timeCount.textContent;
            timeCount.textContent="0"  + addZero;
        }
        if (time < 0) {
            clearInterval(counter);
            timeCount.textContent = "00";
            
            let allOptions = option_list.children.length;
            for (let i = 0; i < allOptions; i++) {
                option_list.children[i].classList.add("disabled");
            }
            next_btn.style.display="block";
            help_btn.style.display="none";
            messageAlert.style.display="block";
        }
    }
}

function startTimerLine(time) {
    counterLine = setInterval(timer,29);
    function timer(){
        time+=1;
        timeLine.style.width = time + "px";
        if (time > 549) {
            clearInterval(counterLine)
        }
    }
}

//Validar si se puede usar ayuda

function validateHelp() {
    let ayudasTotal = document.querySelector('.ayudasTotales').innerHTML;
    let ayudasUsadas=document.querySelector('.ayudasUsadas').innerHTML;
    $.ajax({
        url: 'admin/consultar_pregunta.php',
        type : 'POST',
        data: {posicion: que_count},
        success : function(resp){
            let pregunta = JSON.parse(resp);
            let nrespuestas=pregunta.opciones.length;
            if ((nrespuestas>2) && (ayudasUsadas<ayudasTotal)) {
                help_btn.style.display="block";
            }else{
                help_btn.style.display="none";
            }
        }
    })
}

//Resultado Final

function showResultBox(){
    info_box.classList.remove("activeInfo");// hide the info box
    quiz_box.classList.remove("activeQuiz");// hide the quiz box
    result_box.classList.add("activeResult");// show the result box
    const scoreText=result_box.querySelector(".score_text");

    $(function() {
        $.ajax({
            url: 'admin/consultarPuntaje.php',
            type : 'POST',            
            success : function(userScore){
                consultarNumPreguntas(function(npregunta){
                    let scoreTag="";
                    if (userScore > 4) {
                        scoreTag='<span>Felicitaciones 😎! ,Obtuviste <p>'+userScore+'</p> de <p>'+npregunta+'</p></span>';
                    }
                    else if (userScore > 2) {
                        scoreTag='<span>Genial 😊,Obtuviste <p>'+userScore+'</p> de <p>'+npregunta+'</p></span>';                        
                    }
                    else{
                        scoreTag='<span>Bien 🙂,Obtuviste <p>'+userScore+'</p> de <p>'+npregunta+'</p></span>';
                    }
                    scoreText.innerHTML = scoreTag;
                });
            }
        })    
    })
}

//Consultar Numero de preguntas
function consultarNumPreguntas(callback) {
    $(function() {
        $.ajax({
            url: 'admin/consultarNumPreguntas.php',
            type : 'POST',
            success : function(resp){
                callback(resp);
            }
        })    
    })
}

