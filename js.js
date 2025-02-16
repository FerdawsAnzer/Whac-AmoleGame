let curreMoleTile;
let currPlantTile;
let score=0;
let gameOver=false;
const bttnStart=document.querySelector("#start");
const bttnReset=document.querySelector("#reset");
bttnReset.addEventListener('click',()=>{
  document.querySelector("#score").innerHTML=0;
  resetGame();
  setGame();
})
bttnStart.addEventListener('click',setGame);
/*window.onload=function(){
  setGame();
}*/
function setGame(){
  //set up the grid for the game board in html
  for(let i=0;i<9;i++){
    let tile=document.createElement("div");
    //id goes from 0 to 8
    tile.id=i.toString();
    //when click on the tile we hsould check if it a mole or plant
    tile.addEventListener('click',selectTile);

    document.getElementById("board").appendChild(tile);
}
setInterval(setMole,1000);//every 2000ms= 2s the function setMole() will be called
setInterval(setPlant,2000);
}
function getRandomTitle(){
  //math.random-->(0-1)*9=(0-9)-->when we rounded it down it will become (0-8) integer
  let num=Math.floor(Math.random()*9);
  return num.toString();//returned the num to string that we can be able to use it in the id
}


function setMole(){
  if(gameOver){
    return;
    }
  //if the tile was full it wil be removed before the sencond one pop up
  if(curreMoleTile){
    curreMoleTile.innerHTML= "";
  }

  let mole=document.createElement("img");
  mole.src="/imgs/monty-mole.png";
  
  let randomNum=getRandomTitle();
  if(currPlantTile && currPlantTile.id==randomNum){
    return ;
  }
  curreMoleTile=document.getElementById(randomNum);
  curreMoleTile.appendChild(mole);
}

function setPlant(){
  if(gameOver){
    return;
    }
  if(currPlantTile){
    currPlantTile.innerHTML="";
  }
  let plant=document.createElement("img");
  plant.src="imgs/piranha-plant.png";
  let randomNum=getRandomTitle();
  if(curreMoleTile && curreMoleTile.id==randomNum){
    // If the current mole tile exists and its ID matches the new randomNum,
    // it means we are trying to place the mole in the same tile again.
    // Return early to avoid placing the mole in the same spot consecutively.
    return ;
  }
  currPlantTile=document.getElementById(randomNum);
  currPlantTile.appendChild(plant);
}
function selectTile(){
  if(gameOver){
    return;
    }
  //this-->refers to the tile that was clicked
  if(this == curreMoleTile){
  
     score += 10;
     document.getElementById("score").innerText=score.toString();//update score
  }
  else if(this == currPlantTile){
    //IF THE USER TOTCH THE PLANT IT WILL DISPLAY GAME OVER
     document.getElementById("score").innerText="GAME OVER :"+ score.toString();
     gameOver=true;
  }
}
function resetGame() {
  // Reset game variables
  curreMoleTile = null;
  currPlantTile = null;
  gameOver = false;
  score = 0;
  // Clear the board
  document.querySelector("#board").innerHTML = "";
  // Reset score display
  document.querySelector("#score").innerText = "0";
  // Stop any running intervals
  clearInterval(moleInterval);
  clearInterval(plantInterval);
}