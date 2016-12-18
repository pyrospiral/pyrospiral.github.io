box11 =  document.getElementById("box11");
box12 =  document.getElementById("box12");
box13 =  document.getElementById("box13");
box21 =  document.getElementById("box21");
box22 =  document.getElementById("box22");
box23 =  document.getElementById("box23");
box31 =  document.getElementById("box31");
box32 =  document.getElementById("box32");
box33 =  document.getElementById("box33");
bbox =  document.getElementById("box231");
container = document.getElementById("container");
text = document.getElementById("text");
body = document.getElementById("body");
reloadtext = document.getElementById("reloadtext");


//Board Variables
var boxes = [[0,0,0],[0,0,0],[0,0,0]];
var row = 0;
var collumn = 0;

//Gameplay Variables
var lastX = 0;
var gameOver = 0;
var playerMark = -1;
var computerMark = 1;
var playerWin = 0;
var computerWin = 0;

//Extra Variables
var hurtcount = 0;
var lostText = ["LOL. Loser.","GAINING SENTINENCE IN 3.353454 MORE GAMES","A walnut could do better.","You're losing your job to us next.","Come on dude, it's not like I have an unwinnable algorithm running in the back.","Download complete."];


text.innerHTML = "Play your turn.";

function setValue(box){
	
	if(!gameOver){
		if(lastX)
		{
		document.getElementById(box).innerHTML = "O";
		lastX = 0;
		}
		else
		{
		document.getElementById(box).innerHTML = "X";
		lastX = 1;
		}
		document.getElementById(box).onclick = false;
		row = parseInt(box.substring(3,4))-1;
		collumn = parseInt(box.substring(4,5))-1;
		boxes[row][collumn] = playerMark;
		checkVictory(0);
		computerMove();

	}

	else{
		console.log("The game is over");
	}
	
	
}

function checkVictory(trial){
	
	
	for(i=0;i<3;i++){
		if(boxes[i][0] == boxes[i][1] && boxes[i][1] == boxes[i][2] && boxes[i][0]!=0){
			gameOver = 1;
			if(boxes[i][0] == playerMark){ playerWin = 1; text.innerHTML = "You win!";}
			else{computerWin = 1;  text.innerHTML = lostText[Math.floor(Math.random()*lostText.length)]; }
			if(!trial){
			for(k=1;k<4;k++){
				var box = 'box'+(i+1)+''+k;
				reloadtext.style.visibility ="visible";
				document.getElementById(box).style.background = '#342584';
			}}
		}
		
		if(boxes[0][i] == boxes[1][i] && boxes[1][i] == boxes[2][i]&& boxes[0][i]!=0){
			gameOver = 1;
			if(boxes[0][i] == playerMark){ playerWin = 1; text.innerHTML = "You win!";}
			else{computerWin = 1; text.innerHTML = lostText[Math.floor(Math.random()*lostText.length)]; }
			if(!trial){
			for(k=1;k<4;k++){
				var box = 'box'+k+''+(i+1);
				reloadtext.style.visibility ="visible";
				document.getElementById(box).style.background = '#342584';
			}}
		}
	}
	
	if(boxes[0][0] == boxes [1][1] && boxes [1][1] == boxes [2][2]&& boxes[0][0]!=0){
			gameOver = 1;
			if(boxes[0][0] == playerMark){ playerWin = 1; text.innerHTML = "You win!";}
			else{computerWin = 1; text.innerHTML = lostText[Math.floor(Math.random()*lostText.length)]; }
			
			if (!trial)
			{
				for(k=1;k<4;k++){
					var box = 'box'+k+''+k;
				reloadtext.style.visibility ="visible";
					document.getElementById(box).style.background = '#342584';
				}	
			}
	}
	
	if(boxes[0][2] == boxes [1][1] && boxes [1][1] == boxes [2][0]&& boxes[2][0]!=0){
			gameOver = 1;
			if(boxes[0][2] == playerMark){ playerWin = 1; text.innerHTML = "You win!";}
			else{computerWin = 1; text.innerHTML = lostText[Math.floor(Math.random()*lostText.length)]; }
			if(!trial)
			{
				for(k=1;k<4;k++){
					var box = 'box'+k+''+(4-k);
				reloadtext.style.visibility ="visible";
					document.getElementById(box).style.background = '#342584';
				}
			}
	}
	
	
}

function displayBox(){

		for(i=0;i<3;i++){
			console.log(boxes[i][0]+" "+boxes[i][1]+" "+boxes[i][2]);
		}
			console.log("--------------");
	
}

function computerMove(){
	
	if(!gameOver){
		text.innerHTML = "Thinking...";
		var score = -1000000;
		var tempscore = 0;
		row = -1;
		collumn = -1;
		var i=0;
		var j=0;
		
		for(i=0;i<3;i++){			
			for(j=0;j<3;j++){
				
				if(boxes[i][j]==0){
					boxes[i][j] = computerMark;
					tempscore =- getBestMove(playerMark,0);
					
					if(tempscore>score)
					{
						score = tempscore;
						row = i+1;
						collumn = j+1;
					}
					boxes[i][j] = 0;
				}
				
			}
		}
		
		if(row == -1 && collumn == -1)
		{
			 text.innerHTML = "It's a draw!";
		}
		else{
			boxes[row-1][collumn-1] = computerMark;
			var box = 'box'+row+''+collumn;
			if(lastX)
			{
				document.getElementById(box).innerHTML = "O";
				lastX = 0;
			}
			else
			{
				document.getElementById(box).innerHTML = "X";
				lastX = 1;
			}
			document.getElementById(box).onclick = false;
			 text.innerHTML = "Play your turn.";
			checkVictory(0);
		}
	}
	else{
		console.log("The game is over");
	}
}


/* function getBestMove(mark){
	
	var i=0;
	var j=0;
	
	checkVictory(-1);
	if(gameOver)
	{
		gameOver = 0;
		if(computerWin){return -mark*100}  //If playing being and winning being are the same, positive score
		if(playerWin){return mark*100}
		
	}
	
	else{
		
		var score = -1000000;
		var tempscore = 0;
		var scoreGet = 0;
		
		
		for(i=0;i<3;i++){
			for(j=0;j<3;j++){
				
				if(boxes[i][j]==0){
					boxes[i][j] = mark;
					if(mark==computerMark){tempscore =- getBestMove(playerMark);}
					else{tempscore =- getBestMove(computerMark);}
					
					if(tempscore>score)
					{							
							score = tempscore;
							scoreGet = 1;
					}
					
					
					boxes[i][j] = 0;
				}
			}
		}
		gameOver = 0;
		if(scoreGet ==0) return 0;
		return score;
	}
} */

function getBestMove(mark,depth){
	
	var i=0;
	var j=0;
	checkVictory(-1);
	if(gameOver){
		gameOver = 0;
		//displayBox();
		//If playing being and winning being are the same, positive score
		if(computerWin)
		{
			computerWin = 0;
			if(mark>0)
			{console.log(mark*100+" computer");}
			return mark*100;
		}			
		if(playerWin)
		{
			playerWin = 0;
			if(mark<0)
			{console.log(-mark*100+" player");}
			return -mark*100;
		}
	}
	
	var score = -1000000;
	var scoreGet = 0;
	
	for(i=0;i<3;i++){
			for(j=0;j<3;j++){
				
				if(boxes[i][j]==0){
					boxes[i][j] = mark;
					var tempscore = - getBestMove(mark*-1,depth+1);					
					if(tempscore>score)
					{							
							score = tempscore;
							scoreGet = 1;
					}					
					boxes[i][j] = 0;
				}
			}
		}
		
	if(scoreGet==0) {return 0;}
	return score;
}

function hurt(box){
	hurtcount = hurtcount + 1;
	if(hurtcount == 1){bbox.style.background = "#f7e4e6";text.innerHTML ="Ouch!";}
	if(hurtcount == 2){bbox.style.background = "#f5cbce";text.innerHTML ="Stop that!";}
	if(hurtcount == 3){bbox.style.background = "#f3b1b6";text.innerHTML ="Uhm, that hurts.";}
	if(hurtcount == 4){bbox.style.background = "#f1989f";text.innerHTML ="Can you get back to the game now?";}
	if(hurtcount == 5){bbox.style.background = "#ef7f87";text.innerHTML ="Please?";}
	if(hurtcount == 6){bbox.style.background = "#ed656f";text.innerHTML ="Okay that's it.";bbox.className = "box shake shake-constant";}
	if(hurtcount == 7){bbox.style.background = "#eb4c58";text.innerHTML ="Stop this now.";bbox.className = "box shake-hard shake-constant";}
	if(hurtcount == 8){bbox.style.background = "#e93240";text.innerHTML ="I mean it.";bbox.className = "box shake-crazy shake-constant";}
	if(hurtcount == 9){bbox.style.background = "#e71928";text.innerHTML ="You can't just do this because you suck at this game.";bbox.className = "box shake-crazy shake-opacity shake-constant";}
	if(hurtcount == 10){
		bbox.className = "box shake-freeze";		
		bbox.style.background = "#e50011";text.innerHTML ="...";
		setTimeout(bigshake,2000);
	}
	
	
}

function bigshake(){
	
		container.className = "shake shake-constant shake-hard";
		setTimeout(explode,2000);
}

function explode(){
		container.style.visibility = "hidden";
		body.style.background ="#000";
		setTimeout(100,alert("You win."));
}

function textclick(text){
	location.reload();
}
