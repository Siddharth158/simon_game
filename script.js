// console.log("hii")
let buttonColors =["red","blue","green","yellow"];
let sound = ["redA","blueA","greenA","yellowA"];
let randomNumber,userButton,randomColor,randomSound;
let gamePattern = [];
let userClickedPattern = [];
let flag = 0;
let level = 0;
let checkCounter = 0;



function nextSequence(){
    checkCounter = 0;
    $("h1").text(`LEVEL ${level}`)
    randomNumber = Math.floor(Math.random()*3);
    randomColor = buttonColors[randomNumber];
    randomSound = sound[randomNumber];
    gamePattern.push(randomColor);
    ++level;
}


function flash(){
    nextSequence();
    $(`#${randomColor}`).fadeOut(200);
    $(`#${randomColor}`).fadeIn(200);
    $(`#${randomSound}`)[0].play();
}
$(document).on("keypress",()=>{
    if(flag === 0 ){
        $(".btn").css("display","inline-block")
        level = 0;
        $("h1").text("LEVEL 0")
        flash();
        flag = 1;
    }
})

function animation(temp){   
    $(temp).addClass("pressed")
    setTimeout(() => {
     $(temp).removeClass("pressed")   
    }, 100);
}

$(".btn").on("click",function(event){
    let temp = event.currentTarget;
    userButton = event.currentTarget.id;
    userClickedPattern.push(userButton);
    event.currentTarget.firstElementChild.play();
    animation(temp);
    checkAnswer(temp);
    // console.log(event.currentTarget.firstElementChild)
})

function checkAnswer(temp){
    if($(temp).attr("id") == gamePattern[checkCounter]){
        // console.log("yay");
        ++checkCounter;
        // console.log(checkCounter,gamePattern.length)

        setTimeout(() => {
            if(checkCounter == gamePattern.length){
                flash();
            }
        }, 1500);
        
    }
    else{
        $("h1").text("GAME OVER!!")
        $(".btn").css("display","none")
        $("#wrongA")[0].play();
        setTimeout(() => {
            $("h1").text("press any key to resart");
            flag = 0;
        }, 2000);
    }
    
}