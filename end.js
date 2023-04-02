const username=document.getElementById('username');
const savescorebtn=document.getElementById('savescorebtn')
const recentscore=localStorage.getItem('recentscore');
const finalscore=document.getElementById('finalscore');

const highscore=((localStorage.getItem('highscore')))  ||  [];

const maxscore=5;

finalscore.innerText=recentscore;

username.addEventListener('keyup',()=>{
    savescorebtn.disabled =!username.value;
});
function savehighscore(e){
    e.preventDefault()
    const score={
        score:Math.floor(Math.random()*100),
        name:username.value
    };
    highscore.push(score)
    highscore.sort((a,b)=>b.score-a.score)
    highscore.splice(5)
    localStorage.setItem("highscore",JSON.stringify(highscore))
    window.location.assign("/")
};