const boxes = document.querySelectorAll(".box")
const gameInfo = document.querySelector(".game-info")
const newGameBtn = document.querySelector(".button");

let currentPlayer;
let gameGrid;

const winningPositions = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6],
];
// let create a fuction to initialise the game 
function initGame(){
    currentPlayer ="X";
    gameGrid=["","","","","","","","",""];
    // UI update 
    boxes.forEach((box, index) =>
    {
        box.innerText="";
        boxes[index].style.pointerEvents ="all";
        box.classList=`box box${index+1}`
    })
    newGameBtn.classList.remove("active")
    gameInfo.innerText=`Current Player - ${currentPlayer}`;
}
initGame();
function swapTurn(){
    if(currentPlayer =="X"){
        currentPlayer ="O";
    }
    else{
        currentPlayer ="X"
    }
    // UI update
    gameInfo.innerText=`Current Player - ${currentPlayer}`;
}
function checkGameOver(){
 let answer = " ";

  winningPositions.forEach((position)=>{
    if((gameGrid[position[0]]!==""||gameGrid[position[1]]!==""||gameGrid[position[2]]!=="")
    &&(gameGrid[position[0]]===gameGrid[position[1]])&&(gameGrid[position[1]]===gameGrid[position[2]])){
    //    check if winner is X
    if(gameGrid[position[0]]==="X")
    answer= "X";
    else
   answer="O";
// disable pointer 
boxes.forEach((box)=>{
    box.style.pointerEvents ="none";
})
// now we konow x/o is a winnwer 
  boxes[position[0]].classList.add("win");
  boxes[position[1]].classList.add("win");
  boxes[position[2]].classList.add("win");
    }

  });
//   it's mean we gota win 
   if(answer !==""){
    gameInfo.innerText=`Winner Player -${answer}`;
    newGameBtn.classList.add("active")
    return;
   }
let fillCount =0;
gameGrid.forEach((box)=>{
    if(box!=="")
    fillCount++;
});
if(fillCount===9){
    if (!newGameBtn.classList.contains("active")) {
        gameInfo.innerText = "Game Tied !";
        newGameBtn.classList.add("active");
    }
}
}
function handleclick(index){
    if(gameGrid[index]==""){
        boxes[index].innerHTML = currentPlayer;
        gameGrid[index] =currentPlayer;
        boxes[index].style.pointerEvents ="none";
        // swap 
        swapTurn();
        // check koi jeet toh nahi gya
        checkGameOver();
    }
}

// let create a click to initialise the tictactoe
boxes.forEach((box, index) =>{
box.addEventListener("click",() =>{
    handleclick(index);
})   
});

newGameBtn.addEventListener("click" , initGame);