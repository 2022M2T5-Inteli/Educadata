//Funções de troca de tela

function profileBtn(){
    document.getElementById("profile").style.display = "block";
    document.getElementById("survey").style.display = "none";
    document.getElementById("results").style.display = "none";
    resetSurvey();
}

function surveyBtn(){
    document.getElementById("profile").style.display = "none";
    document.getElementById("survey").style.display = "block";
    document.getElementById("results").style.display = "none";
    loadSurvey();
}

function resultsBtn(){
    document.getElementById("profile").style.display = "none";
    document.getElementById("survey").style.display = "none";
    document.getElementById("results").style.display = "block";
    resetSurvey();
}

var url = "http://127.0.0.1:3080/pergunta/users";
var resposta;
var xhttp = new XMLHttpRequest();
xhttp.open("GET", url, false);
xhttp.send();//A execução do script pára aqui até a requisição retornar do servidor
resposta = JSON.parse(xhttp.responseText);
var notLoaded = true;
var multiplier;
var lastQuestion = 0;
var gray = '#C4C4C4'
var eixo1 = 0;
var eixo2 = 0;

function loadSurvey(){
    if(notLoaded === true){
        for(var i=0; i < resposta.length; i++){
            var getQuestion = document.createElement("button")
            getQuestion.setAttribute("id", "getQuestion" + i);
            getQuestion.setAttribute("class", "questionBtn");
            getQuestion.setAttribute("onclick", "mudarQuestao(" + i + ")");
            document.getElementById("questionsBox").appendChild(getQuestion);
            document.getElementById("getQuestion" + i).innerHTML = i + 1;
    
            var question = document.createElement("p");
            question.textContent = i + 1 + ". " + resposta[i].Pergunta;
            question.setAttribute("style", "display: none");
            question.setAttribute("id", "question" + i);
            question.setAttribute("class", "text-primarycolor");
            document.getElementById("container").appendChild(question);
    
            var answerDiv = document.createElement("div");
            answerDiv.setAttribute("style", "display: none");
            answerDiv.setAttribute("id", "answerDivID" + i);
            document.getElementById("container").appendChild(answerDiv);
    
            var url1 = "http://127.0.0.1:3080/resposta/users";
            var resposta1;
            var xhttp1 = new XMLHttpRequest();
            xhttp1.open("GET", url1, false);
            xhttp1.send();//A execução do script pára aqui até a requisição retornar do servidor
            resposta1 = JSON.parse(xhttp1.responseText);
        }
        for(var a=0; a < resposta1.length; a++){
            var answers = document.createElement("button")
            answers.setAttribute("id", "answerID" + resposta1[a].idPergunta + a);
            answers.setAttribute("class", "answers_Btn");
            answers.setAttribute("onclick", "compute(" + resposta1[a].idPergunta + ", " + resposta1[a].Maturidade +")");
            document.getElementById("answerDivID" + (resposta1[a].idPergunta-1)).appendChild(answers);
            document.getElementById("answerID" + resposta1[a].idPergunta + a).innerHTML = resposta1[a].Resposta;
        }
        notLoaded = false;
    }
}

function mudarQuestao(i) {
    //passar pra questão que foi clicada
    multiplier = resposta[i].Peso
    document.getElementById("question" + lastQuestion).style.display = "none";
    document.getElementById("question" + i).style.display = "block";
    document.getElementById("answerDivID" + lastQuestion).style.display = "none";
    document.getElementById("answerDivID" + i).style.display = "block";
    document.getElementById("getQuestion" + lastQuestion).style.backgroundColor = gray;
    document.getElementById("getQuestion" + lastQuestion).disabled = false;
    document.getElementById("getQuestion" + i).style.backgroundColor = '#948d28';
    document.getElementById("getQuestion" + i).disabled = true;
    lastQuestion = i;
}

function compute(i, a){
    //passar pra questão que foi clicada
    multiplier = resposta[i].Peso
    document.getElementById("question" + lastQuestion).style.display = "none";
    document.getElementById("question" + i).style.display = "block";
    document.getElementById("answerDivID" + lastQuestion).style.display = "none";
    document.getElementById("answerDivID" + i).style.display = "block";
    document.getElementById("getQuestion" + lastQuestion).style.backgroundColor = gray;
    document.getElementById("getQuestion" + lastQuestion).disabled = false;
    document.getElementById("getQuestion" + i).style.backgroundColor = '#948d28';
    document.getElementById("getQuestion" + i).disabled = true;
    lastQuestion = i;


    eixo1 += (a * (100/5));
    console.log(eixo1)
    console.log(resposta[i].Peso)

    // var totalWeight = 0;
    // var point = 0;
    // for (var b = 0; b < resposta.length; b++){
    //     totalWeight += resposta[b].Peso;
    // }
    // for (var b = 0; b < resposta.length; b++){
    //     if(resposta[b].idEixo === 1){
    //         eixo1 += (b * multiplier * ((100/totalWeight)/5));
    //     }
    //     else{
    //         eixo2 += (b * multiplier * ((100/totalWeight)/5));
    //     }
    // }
}