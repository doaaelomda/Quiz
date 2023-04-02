const question=document.getElementById('question');
const choice=document.querySelectorAll('.choice-text');
const progresstext=document.getElementById('progresstext');
const scoretext=document.getElementById('score');
const progressbarfull=document.getElementById('progressbarfull')
const loader=document.getElementById('loader')
const game=document.getElementById('game');

let curquet={};
let accept=true;
let sorce=0;
let count=0;
let availquet=[];
let questions=[]
fetch("https://opentdb.com/api.php?amount=10&category=21&difficulty=easy&type=multiple").then(results=>{
    return results.json();
}).then(loadquet=>{
    questions=loadquet.results.map(loadquet=>{
        const formatquet={question:loadquet.question};
        const answerchoices=[...loadquet.incorrect_answers]
        formatquet.answer=Math.floor(Math.random()*3)+1;
        answerchoices.splice(formatquet.answer - 1 , 0,loadquet.correct_answer);
        answerchoices.forEach((choice,index)=>{
            formatquet['choice'+(index+1)]=choice});
        return formatquet;
    });
    startgame()
})
const correct_bownes=10;
const max_quet=10;

function startgame(){
    count=0;
    sorce=0;
    availquet=[...questions]
    getnewquet();
    game.classList.remove('hidden')
    loader.classList.add('hidden')
}
function getnewquet(){
    if(availquet.length===0 || count>=max_quet){
        localStorage.setItem('recentscore',sorce)
        return window.location.assign('\end.html')}
    count++;
    const x=count/max_quet;
    progresstext.innerText=` Question ${x*10}`;
    progressbarfull.style.width=`${(count/max_quet)* 100}%`;
    const quetindex=Math.floor(Math.random()*availquet.length);
    curquet=availquet[quetindex]
    question.innerText=curquet.question
    choice.forEach(choice=>{
        const number=choice.dataset['number'];
        choice.innerText=curquet['choice'+number]
    })
    availquet.splice(quetindex,1)
    console.log(availquet)
    accept=true;
}
choice.forEach(choice=>{
    choice.addEventListener('click',e=>{
        if(!accept) return;
        accept=false;
        const selectchoice=e.target;
        const selextanswer=selectchoice.dataset['number']
        const classtoappl = selextanswer == curquet.answer?'correct':'incorrect';
         if(classtoappl==='correct'){
            incrementscore(correct_bownes)
         }
         selectchoice.parentElement.classList.add(classtoappl);
           setTimeout(()=>{
            selectchoice.parentElement.classList.remove(classtoappl);
            getnewquet()
           },1000)
        
    });
});
function incrementscore(num){
    sorce+=num;
    scoretext.innerText=sorce;

}
