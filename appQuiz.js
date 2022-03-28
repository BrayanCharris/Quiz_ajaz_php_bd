//obtener todos los elementos
const navbar= document.querySelector('.navigator');
const categoriaNav= document.querySelector('.link-info .categoria');
const ayudasNav= document.querySelector('.link-info .ayudas');


const info_box = document.querySelector(".info_box");
const exit_btn = info_box.querySelector(".buttons .quit");
const continue_btn = info_box.querySelector(".buttons .restart");

/* const categoryContainer = document.querySelector(".viewCategory"); */
/* const spanAnimation = categoryContainer.querySelector(".spanAnimation"); */
/* const btnCategory= categoryContainer.querySelector(".Start-Category");  */

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

let que_count=0;//posicion de pregunta actual
let que_numb=1;//pregunta
let counter;//intervalo de tiempo
let counterLine;//intervalo de linea de tiempo
let timeValue=15;//valor de tiempo de responder
let widthValue=0;//ancho de linea de tiempo
let userScore= 0;//Puntaje
let ayudasUsadas=0;//ayudas usadas
let nayudas= Math.round(questions.length*0.4);//numero de ayudas totales
let categoriaSeleccionada="";

document.getElementById("textAyudas").innerHTML=nayudas+" ayudas ";

// If Exit Button Clicked
exit_btn.onclick=()=>{
    /* info_box.classList.remove("activeInfo");// hide the info box
    start_btn.style.display="block"; */
    window.location.href="../index.html";
};
// If Continue Button Clicked
continue_btn.onclick=()=>{
    info_box.classList.remove("activeInfo");// hide the info box
    quiz_box.classList.add("activeQuiz");// show the quiz box
    navbar.style.display='block';
    showQuestions(0);
    queCounter(1);
    startTimer(15);
    startTimerLine(0);
    validateHelp();
    ayudasNav.innerHTML=ayudasUsadas+"/"+nayudas;
    
    /* categoryContainer.style.display='block';
        spanAnimation.classList.add("typing"); */
};

//If Start Cateegory

/* btnCategory.onclick=()=>{
    spanAnimation.classList. remove("typing");
    categoryContainer.style.display='none';
    
    quiz_box.classList.add("activeQuiz");// show the quiz box
    navbar.style.display='block';
    ayudasNav.innerHTML=ayudasUsadas+"/"+nayudas;

    showQuestions(que_count);
    queCounter(que_numb);
    clearInterval(counter);
    startTimer(timeValue);
    clearInterval(counterLine);
    startTimerLine(widthValue);
    validateHelp();

    messageAlert.style.display="none";

} */

//If Next Button Clicked 
next_btn.onclick=()=>{
    if (que_count < questions.length-1) {
        que_count++;
        que_numb++;
        showQuestions(que_count);
        queCounter(que_numb);
        clearInterval(counter);
        startTimer(timeValue);
        clearInterval(counterLine);
        startTimerLine(widthValue);
        validateHelp();
        next_btn.style.display="none";
        messageAlert.style.display="none";
        /* document.querySelector("body").style.background="#007bff"; */
    }else{
        /* document.querySelector("body").style.background="#007bff"; */
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

restart_quiz.onclick= ()=>{
    /* quiz_box.classList.add("activeQuiz");
    result_box.classList.remove("activeResult");
    que_count=0;
    que_numb=1;
    timeValue=15;
    widthValue=0;
    userScore= 0;
    showQuestions(que_count);
    queCounter(que_numb);
    clearInterval(counter);
    startTimer(timeValue);
    clearInterval(counterLine);
    startTimerLine(widthValue);
    next_btn.style.display="none";
    messageAlert.style.display="none"; */
    /* timeOff.textContent="Tiempo restante"; */
}

quit_quiz.onclick=()=>{
    window.location.reload();
    window.location.href="../index.html";
}


//getting questions and options from array
function showQuestions(index){
    const que_text= document.querySelector(".que_text");

    /* let que_tag= '<span>'+questions[index].numb+'. '+questions[index].question+'</span>'; */
    /* animacionDecategoria(questions[index].category); */

    categoriaNav.innerHTML=questions[index].category;

    let que_tag= '<span>'+que_numb+'. '+questions[index].question+'</span>';

    let option_tag="";

    for (let resp = 0; resp < questions[index].options.length; resp++) {
        option_tag+='<div class="option btn-neon">'+questions[index].options[resp]+'</div>';
    }

    /* let option_tag = '<div class="option">'+questions[index].options[0]+'</div>'
                    +'<div class="option">'+questions[index].options[1]+'</div>'
                    +'<div class="option">'+questions[index].options[2]+'</div>'
                    +'<div class="option">'+questions[index].options[3]+'</div>'; */
    
    que_text.innerHTML=que_tag;
    option_list.innerHTML=option_tag;
    const option = option_list.querySelectorAll(".option");
    for (let i = 0; i < option.length; i++) {
        option[i].setAttribute("onclick","optionSelected(this)");
    }
}

/* function animacionDecategoria(categoriaPregunta) {
    if (categoriaPregunta!=categoriaSeleccionada) {
        clearInterval(counter);
        clearInterval(counterLine);   
        
        categoriaSeleccionada=categoriaPregunta;
        quiz_box.classList.remove("activeQuiz");
        navbar.style.display='none';

        categoryContainer.style.display='block';
        
        spanAnimation.style.width = (categoriaPregunta).length+"ch";
        spanAnimation.innerHTML = categoriaPregunta;

        spanAnimation.classList.add("typing");

    }
    categoriaNav.innerHTML=categoriaPregunta;
} */

let tickIcon = '<div class="icon"><i class="fas fa-check tick"></i></div>';
let crossIcon = '<div class="icon"><i class="fas fa-times cross"></i></div>';


function optionSelected(answer) {
    clearInterval(counter);
    clearInterval(counterLine);
    let userAns = answer.textContent;
    let correctAns= questions[que_count].answer;
    let allOptions = option_list.children.length;

    help_btn.style.display="none";
    if (userAns==correctAns) {
        userScore+=1;
        answer.classList.add("correct");
        answer.insertAdjacentHTML("beforeend", tickIcon);
        /* document.querySelector("body").style.background="green"; */
    }else{
        answer.classList.add("incorrect");
        answer.insertAdjacentHTML("beforeend", crossIcon);
        /* document.querySelector("body").style.background="#ce0b1f"; */

        // If answers is incorrect then automatically selected the correct asnwer
        /* for (let i = 0; i < allOptions; i++) {
            if (option_list.children[i].textContent == correctAns) {
                option_list.children[i].classList.add("correct");
                option_list.children[i].insertAdjacentHTML("beforeend", tickIcon);
            }
        } */
    }

    //once user selected disabled all options

    for (let i = 0; i < allOptions; i++) {
        option_list.children[i].classList.add("disabled");
    }

    next_btn.style.display="block";
}

function startTimer(time) {
    counter = setInterval(timer,1000);
    function timer() {
        timeCount.textContent = time;
        time--;
        if(time< 9){
            let addZero= timeCount.textContent;
            timeCount.textContent="0"  + addZero;
        }

        if (time < 0) {
            clearInterval(counter);
            timeCount.textContent = "00";
            /* document.querySelector("body").style.background="#ce0b1f"; */
            
            let allOptions = option_list.children.length;
            /* let correctAns= questions[que_count].answer; */

            /* for (let i = 0; i < allOptions; i++) {
                if (option_list.children[i].textContent == correctAns) {
                    option_list.children[i].classList.add("correct");
                    option_list.children[i].insertAdjacentHTML("beforeend", tickIcon);
                }
            } */

            for (let i = 0; i < allOptions; i++) {
                option_list.children[i].classList.add("disabled");
            }
            
            messageAlert.style.display="block";
            next_btn.style.display="block";
            help_btn.style.display="none";
        }        
    }
}

function showResultBox(){
    info_box.classList.remove("activeInfo");// hide the info box
    quiz_box.classList.remove("activeQuiz");// hide the quiz box
    result_box.classList.add("activeResult");// show the result box
    
    const scoreText=result_box.querySelector(".score_text");
    if (userScore > 4) {
        let scoreTag='<span>Felicitaciones 😎! ,Obtuviste <p>'+userScore+'</p> de <p>'+questions.length+'</p></span>';
        scoreText.innerHTML = scoreTag;
    }
    else if (userScore > 2) {
        let scoreTag='<span>Genial 😊,Obtuviste <p>'+userScore+'</p> de <p>'+questions.length+'</p></span>';
        scoreText.innerHTML = scoreTag;
    }
    else{
        let scoreTag='<span>Lo siento 😔,Obtuviste <p>'+userScore+'</p> de <p>'+questions.length+'</p></span>';
        scoreText.innerHTML = scoreTag;
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


function queCounter(index) {
    const bottom_ques_counter = quiz_box.querySelector(".total_que");
    let totalQuesCountTag='<span><p>'+index+'</p>de<p>'+questions.length+'</p>Preguntas</span>';
    bottom_ques_counter.innerHTML=totalQuesCountTag;
}

function validateHelp() {
    if ((questions[que_count].options.length>2) && (ayudasUsadas<nayudas)) {
        help_btn.style.display="block";
    }else{
        help_btn.style.display="none";
    }
}