
let gameSeq = [];
let userSeq = [];

let btns = ["red","blue","green","yellow",];

let start = false;
let level = 0;
let h4 = document.querySelector("h4");
let score = 0;
let time = 0;

let modeSelect = document.getElementById("mode");
modeSelect.addEventListener("change", function() {
    // Update time based on selected mode
    if (modeSelect.value === "easy") {
        time = 1000;
    } else if (modeSelect.value === "medium") {
        time = 500;
    } else if (modeSelect.value === "hard") {
        time = 250;
    } else {
        time = 500;
    }
    console.log("Time set to: " + time);
});

document.addEventListener("keypress" ,function() {
    if(start == false) {
        start = true;
        levelUp();
    }
});

function Flash(btn) {
    btn.classList.add("flash");
    setTimeout(function() {
        btn.classList.remove("flash");
    },time);

}
function userFlash(btn) {
    btn.classList.add("userflash");
    setTimeout(function() {
        btn.classList.remove("userflash");
    },500);

}

function levelUp (){
    userSeq =[]; 
    level++;
    h4.innerHTML = "Level: "+ level;
    //random button
    var random = Math.floor(Math.random()*3);
    let randColor = btns[random];
    let randomButton = document.querySelector('.'+randColor);
    gameSeq.push(randColor);
    Flash(randomButton);
}

function check(idx){
    //let idx = level -1;
    if(userSeq[idx] == gameSeq[idx]) {
        score += 1;
        if(userSeq.length == gameSeq.length){
            score += 10;
            setTimeout(levelUp, 1000);
        }
    } else {
        h4.innerHTML = `Game over!<br> Your score was `+ score + `<br>press any key to start`;
        error();
        start = false;
        level = 0;
        userSeq = [];
        gameSeq = [];
        score = 0;
    }
}

function btnPress(){  
    console.log(this);
    let btn = this;
    userFlash(btn);

    let userColor = btn.getAttribute("id");
    console.log(userColor);
    userSeq.push(userColor);

    check(userSeq.length-1);
}

let allBtns = document.querySelectorAll(".btn");
for(btn of allBtns){
    btn.addEventListener("click",btnPress);
}

function error() {
    let body = document.querySelector("body");
    body.classList.add("error");
    setTimeout(function() {
        body.classList.remove("error");
    },500);

}