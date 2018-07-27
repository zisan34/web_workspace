playing=false;
var ans;
var timeRemaining=60;
var mycounter;
var finalScore=0;
document.getElementById('startReset').onclick=function(){
	if (playing==false) {
	playing=true;
	replaceInnerHtml("startReset", "Reset Game");
	showElement("scoreBox");
	showElement("time");
	hideElement("gameOver");
	hideElement("correct");
	hideElement("wrong");
	timeRemaining=60;
	finalScore=0;
	generateQA();
	startTimer();

}
else
{
	location.reload();
}
}

function generateQA()
{
	replaceInnerHtml("score",finalScore);
	x=Math.floor(Math.random()*10)+1;
	y=Math.floor(Math.random()*10)+1;
	ans=x*y;
	replaceInnerHtml("question", x+"x"+y);
	correctPosition=Math.round(Math.random()*3)+1;
	replaceInnerHtml("op"+correctPosition, ans);
	answers=[ans];
	for(i=1;i<5;i++)
	{
		if (i==correctPosition) {
			continue;
		}
		else
		{
			do{
				wrongAns=(Math.floor(Math.random()*10)+1)*(Math.floor(Math.random()*10)+1);
			}
			while(answers.indexOf(wrongAns)>-1)
			replaceInnerHtml("op"+i, wrongAns);
			answers.push(wrongAns);
		}
	}
	for(i=1;i<5;i++){
		document.getElementById("op"+i).onclick=function()
		{
			if (this.innerHTML==ans) {
				finalScore++;
				replaceInnerHtml("score", finalScore);
				showElement("correct");
				hideElement("wrong");
				setTimeout(function(){hideElement("correct")},500);
				generateQA();
				// statement
			}
			else
			{
				showElement("wrong");
				setTimeout(function(){hideElement("wrong")},500);
			}
		}
	}
}	
function startTimer(){
	timeRemaining=60;
	replaceInnerHtml("counter", timeRemaining);
	mycounter=setInterval(function(){
		timeRemaining-=1;
		if(timeRemaining==0){
		stopCountDown();				
		showElement("gameOver");
		hideElement("time");
		hideElement("scoreBox");
		replaceInnerHtml("finalScore", finalScore);
		replaceInnerHtml("counter", timeRemaining);
		playing=false;
		replaceInnerHtml("startReset", "Play Again");
	}
		replaceInnerHtml("counter", timeRemaining);
	},1000);			

}
function stopCountDown()
{
	clearInterval(mycounter);
}
function replaceInnerHtml(id, text)
{
	document.getElementById(id).innerHTML=text;
}
function showElement(id)
{
	document.getElementById(id).style.display="block";
}
function hideElement(id)
{
	document.getElementById(id).style.display="none";
}
