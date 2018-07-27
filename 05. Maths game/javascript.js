var playing=false;
var score=0;
var action;
var timeRemaining;
var ans;
document.getElementById("startReset").onclick=function()
{
	if (playing==true) {
		// statement
		location.reload();
	}
	else
	{
		replaceInnerHtml("startReset","Reset Game");
		//document.getElementById("startReset").innerHTML="Reset Game";
		playing=true;

		score=0;
		replaceInnerHtml("score", score);
		// document.getElementById("score").innerHTML=score;

		show("time");
		hide("gameOver");
		timeRemaining=60;
		startCountDown();
		generateQA();

	}

}
function startCountDown()
{
	timeRemaining=60;
	replaceInnerHtml("counter", timeRemaining);
	action=setInterval(
		function(){
			timeRemaining-=1;
			if(timeRemaining==0)
			{
				stopCountDown();
				show("gameOver");
				replaceInnerHtml("finalScore", score);
				// document.getElementById("finalScore").innerHTML=score;
				hide("time");
				hide("correct");
				hide("wrong");
				playing=false;
				replaceInnerHtml("startReset", "Start Game");

			}
			// document.getElementById("counter").innerHTML=timeRemaining;
			replaceInnerHtml("counter", timeRemaining);
		},1000);
}
function stopCountDown()
{
	clearInterval(action);
}
function hide(id)
{
	document.getElementById(id).style.display="none";
}
function show(id)
{
	document.getElementById(id).style.display="block";
}
function replaceInnerHtml(id,text)
{
	document.getElementById(id).innerHTML=text;
}
function generateQA()
{
	x=Math.floor(Math.random()*10+1);
	y=Math.floor(Math.random()*10+1);
	ans=x*y;
	// document.getElementById("question").innerHTML=x+"x"+y;
	replaceInnerHtml("question", x+"x"+y);
	correctPosition= 1+ Math.round(3*Math.random());
	replaceInnerHtml("op"+correctPosition, ans);

	var answers=[ans];

	for(i=1;i<5;i++)
	{
		if(i==correctPosition)
			continue;

		do{
			wrongAns=(Math.round(Math.random()*9+1))*(Math.round(Math.random()*9+1));
		}
		while (answers.indexOf(wrongAns)>-1)

		replaceInnerHtml("op"+i, wrongAns);
		answers.push(wrongAns);
	}
	for(i=1;i<5;i++)
	{
	document.getElementById("op"+i).onclick=function()
	{
		if(playing==true)
		{
			if(this.innerHTML==ans)
			{
				score++;
				replaceInnerHtml("score", score);
				// stopCountDown();
				// startCountDown();
				show("correct");
				hide("wrong");
				setTimeout(function(){hide("correct")}, 1000);
				generateQA();
			}
			else
			{
				show("wrong");
				hide("correct");
				setTimeout(function(){hide("wrong")}, 1000);

			}
		}
	}
	}

}