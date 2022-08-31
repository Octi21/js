
const quizData = [
    {
        question: 'What is the most used programing language in 2019?',
        a: 'java',
        b: 'C',
        c: 'Python',
        d: 'PHP',
        correct: 'a'
    },
    {
        question: 'The most used OS?',
        a: 'IOS',
        b: 'Windows',
        c: 'Linux',
        d: 'another',
        correct: 'b'
    },
    {
        question: 'When was javascript launched?',
        a: '1994',
        b: '1995',
        c: '1996',
        d: 'none of the above',
        correct: 'b'
    }

]

//console.log(quizData[0]);

const question = document.getElementById("question");
const quiz = document.getElementById("quiz");

const aText = document.getElementById("aText");
const bText = document.getElementById("bText");
const cText = document.getElementById("cText");
const dText = document.getElementById("dText");

const h1llo = document.getElementById("title");

var i = 0;

function loadQuiz(){
    if (i != 0)
    {
        h1llo.innerHTML = '';
    }

    question.innerHTML = quizData[i].question;
    aText.innerHTML = quizData[i].a;
    bText.innerHTML = quizData[i].b;
    cText.innerHTML = quizData[i].c;

    
    dText.innerHTML = quizData[i].d;
    // if (quizData[i].d == null)
    // {
    //     // dText.parentNode.parentNode.removeChild(dText); 
    //     var ghe = document.getElementById("sterg")
    //     ghe.parentNode.removeChild(ghe);
    // }

    // i++;
}
loadQuiz();


function getSelected(){
    const a = document.getElementById("a");
    const b = document.getElementById("b");
    const c = document.getElementById("c");
    const d = document.getElementById("d");

    var ans = undefined;

    if (a.checked)
        ans =  'a';
    if (b.checked)
       ans = 'b';
    if (c.checked)
        ans = 'c';
    if (d.checked)
        ans =   'd';
       
    return ans;
    
}

// function getSelected(){
//     const answers = document.querySelectorAll(".answer");
    
//     console.log(answers[0]);

//     let answer = undefined;
    
//     answers.forEach((rasp) => {
//         if(rasp.checked)
//         {    
//             answer = rasp.id;
//             answer = 1;
//         }

//         })
//     //console.log(answer);
//     return answer;
// }


const buton = document.getElementById("btn");
var nrCorecte = 0;



buton.addEventListener("click", () => {
    
    const raspuns = getSelected();

    console.log(raspuns);


    if(raspuns)
    {
        if(quizData[i].correct == raspuns)
        {
            nrCorecte +=1;
            console.log(1);
        }
        
        i+=1;
        
        if(i < quizData.length){
            loadQuiz();
        }
        else{
            quiz.innerHTML = `<h2>You answered\
             correctly at ${nrCorecte}/${quizData.length} questions.</h2>`;
        }

    }

    
}

)




// loadQuiz();


