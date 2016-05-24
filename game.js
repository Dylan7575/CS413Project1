/**
 * Created by Dylan on 5/16/2016.
 */
var gameport = document.getElementById("gameport");//Creating gameport variable

//size of game screen
var sizey = 400;
var sizex = 400;
var scorewin=20;
var texas;
var timer;
var tut= false;
//movement speed of the character in the game
var movespeed = 12;
//keeping track of the score in the game
var score=1;
//event listener for keystrokes and game functionality
document.addEventListener('keydown',keydownEventHandler);
document.addEventListener('keyup',keyUpHandler);
var renderer=PIXI.autoDetectRenderer(sizey,sizex,{backgroundColor: 0x3344ee}); //create renderer for game
gameport.appendChild(renderer.view);//adding renderer for gameport
var OrigTime
var difficultTime=7000;
var hero;
var move;
var save;
var loser;
PIXI.loader
    .add("move.mp3")
    .add("test.mp3")
    .add("loser.mp3")
    .add("knight.json")
    .load(ready);


var frames=[];
function ready() {
    move =PIXI.audioManager.getAudio("move.mp3");
    save = PIXI.audioManager.getAudio("test.mp3");
    loser = PIXI.audioManager.getAudio("loser.mp3");
    for (i=1;i<=6;i++){
        frames.push(PIXI.Texture.fromFrame("runner"+i+".png"))
    }
    hero = new PIXI.extras.MovieClip(frames);
    hero.scale.y=1;
    hero.scale.x=1;
    hero.anchor.x=.5;
    hero.anchor.y=.5;
    hero.position.x=32;
    hero.position.y=32;
    hero.animationSpeed=.1;
    game.addChild(hero);
}



//creating containers
var stage= new PIXI.Container();
var game= new PIXI.Container();
var titlescreen = new PIXI.Container();
var credits= new PIXI.Container();
var endLose = new PIXI.Container();
var settings = new PIXI.Container();
var endWin = new PIXI.Container();
endWin.visible=0;
endLose.visible=0;
credits.visible=0;
settings.visible=0;








//*********************************************SETTINGS PAGE*************************************************/
var backSettings = new PIXI.Text("Back");
backSettings.interactive=true;
backSettings.on('mousedown',backToGame);
function backToGame(){
    game.visible=1;
    settings.visible=0;
    score=0;
    text.setText(0);
    time=difficultTime;
    counter.setText(difficultTime);
    decrement=100;
    timer =window.setTimeout(dil,difficultTime);
    texas=setInterval(clock,100);

}


var easy = new PIXI.Text("Easy");
easy.interactive=true;
easy.anchor.x=.5;
easy.anchor.y=.5;
easy.position.x=200;
easy.position.y=100;
easy.on('mousedown',easyMode);
function easyMode() {
    difficultTime = 10000;
    easy.setText("Easy Selected");
    medium.setText("Medium");
    hard.setText("Hard");
    scorewin=10;
}
var medium = new PIXI.Text("Medium Selected");
medium.interactive=true;
medium.anchor.x=.5;
medium.anchor.y=.5;
medium.position.x=200;
medium.position.y=200;
medium.on('mousedown',mediumMode);
function mediumMode(){
    difficultTime=7000;
    easy.setText("Easy");
    medium.setText("Medium Selected");
    hard.setText("Hard");
    scorewin=20;

}
var hard = new PIXI.Text("Hard");
hard.anchor.x=.5;
hard.anchor.y=.5;
hard.position.x=200;
hard.position.y=300;
hard.interactive=true;
hard.on('mousedown',hardMode);
function hardMode(){
    difficultTime=5000;
    hard.setText("Hard Selected");
    medium.setText("Medium ");
    easy.setText("Easy");
    scorewin=30;
}
settings.addChild(backSettings);
settings.addChild(easy);
settings.addChild(medium);
settings.addChild(hard);
stage.addChild(settings);
/*************************************************************************************************************/

//***************************************************creating credits*****************************************/
var creditNames= new PIXI.Text("Dylan La Frenz");
creditNames.anchor.x=.5;
creditNames.anchor.y=.5;
creditNames.position.x=200;
creditNames.position.y=200;
var back = new PIXI.Text("Back");
back.interactive=true;
back.on('mousedown',backToTitle);

function backToTitle(){
    game.visible=0;
    credits.visible=0;
    titlescreen.visible=1;
}
credits.addChild(creditNames);
credits.addChild(back);
stage.addChild(credits);
/*************************************************************************************************************/

//*******************************************creating lose screen**********************************************/
var loseText = new PIXI.Text("You Lose!");
loseText.anchor.x=.5;
loseText.anchor.y=.5;
loseText.position.x=200;
loseText.position.y=200;
var playAgain = new PIXI.Text("Play Again?");
playAgain.anchor.x=.5;
playAgain.anchor.y=.5;
playAgain.position.x=200;
playAgain.position.y=300;
playAgain.interactive=true;
playAgain.on('mousedown',startNewGame);
function startNewGame(){
    game.visible=1;
    endLose.visible=0;
    endWin.visible=0;
    score=1;
    text.setText(0);
    time=difficultTime;
    counter.setText(difficultTime);
    decrement=100;
    timer =window.setTimeout(dil,difficultTime);
}
function dil(){
    loser.play();
    endLose.visible=1;
    game.visible=0;
    clearTimeout(timer);
    var nx = getRandomInt(50, 350);
    var ny = getRandomInt(50, 350);
    createjs.Tween.get(knight.position).to({x: nx, y: ny}, 500);

}
endLose.addChild(loseText);
endLose.addChild(playAgain);
stage.addChild(endLose);
/*************************************************************************************************************/
/**********************************************creating win screen*******************************************/
var winText= new PIXI.Text("You Win!");
winText.anchor.x=.5;
winText.anchor.y=.5;
winText.position.x=200;
winText.position.y=200;
var playAgain2 = new PIXI.Text("Play Again?");
playAgain2.anchor.x=.5;
playAgain2.anchor.y=.5;
playAgain2.position.x=200;
playAgain2.position.y=300;
playAgain2.interactive=true;
playAgain2.on('mousedown',startNewGame);
function startNewGame(){

    game.visible=1;
    endLose.visible=0;
    endWin.visible=0;
    score=1;
    text.setText(0);
    time=difficultTime;
    counter.setText(difficultTime);
    decrement=100;

    timer =window.setTimeout(dil,difficultTime);
}
endWin.addChild(winText);
endWin.addChild(playAgain2);
stage.addChild(endWin);

//***********************************************setting up title screen***************************************/
titlescreen.visible=1;
var title = new PIXI.Text("Title Screen");
title.position.x=200;
title.position.y=200;
title.anchor.x=.5;
title.anchor.y=.5;
title.interactive=true;
tutorial= new PIXI.Text("Tutorial");
tutorial.position.x=200;
tutorial.position.y=300;
tutorial.anchor.x=.5;
tutorial.anchor.y=.5;
tutorial.interactive=true;
tutorial.on('mousedown',tutorialGame);
var instructions;
var back;
instructions = new PIXI.Text("Press the W key to go up\nPress the S key to go down\nPress the A key to go left\nPress the D key to go right\nPress the E key to save the princess\nAvoid the Evil Knight Protecting her",{font:'12px Arial'});
instructions.anchor.x=.5;
instructions.anchor.y=.5;
instructions.position.x=200;
instructions.position.y=350;
instructions.visible=0;

back = new PIXI.Text("Back to Title",{font:"16px Arial"});
back.anchor.x=.5;
back.anchor.y=.5;
back.position.x= 230;
back.position.y=20;
back.interactive=true;
back.visible=0;
function tutBack(){
    game.visible=0;
    back.visible=0;
    instructions.visible=0;
    titlescreen.visible=1;
    settingsClick.visible=1;
    settingsClick.interactive=true;
    scores=0;
    text.settext(0);
    game.removeChild(back);
    game.removeChild(instructions);


}
function tutorialGame(){
    tut=true;
    game.visible=1;
    titlescreen.visible=0;
    instructions.visible=1;
    counter.setText(difficultTime.toString());
    back.visible=1;
    settingsClick.visible=0;
    settingsClick.interactive=false;
    back.on('mousedown',tutBack);
    game.addChild(instructions);
    game.addChild(back);
    game.renderable=true;
}
title.on('mousedown',mouseHandler);
function mouseHandler(){
    tut=false;
    titlescreen.visible=0;
    game.visible=1;
    timer=window.setTimeout(dil,difficultTime);
    texas=setInterval(clock,100);
}
titlescreen.addChild(tutorial);
titlescreen.addChild(title);
/*************************************************************************************************************/

//*************************************************setting up credits*****************************************/
var creditsClick = new PIXI.Text("Credits");
creditsClick.interactive=true;
creditsClick.on('mousedown',mouseHandle);
titlescreen.addChild(creditsClick);
stage.addChild(titlescreen);
function mouseHandle(){
    titlescreen.visible=0;
    game.visible=0;
    credits.visible=1;


}
/*************************************************************************************************************/




/********************************************** DECLARING ACTORS ON STAGE************************************/


settingsClick= new PIXI.Text("Settings");
settingsClick.anchor.x=.5;
settingsClick.anchor.y=.5;
settingsClick.position.x=200;
settingsClick.position.y=20;
settingsClick.interactive=true;
settingsClick.on('mousedown',clickSettings);
var titleBack=new PIXI.Text("To Title");
titleBack.anchor.x=.5;
titleBack.anchor.y=.5;
titleBack.position.x=350;
titleBack.position.y=15;
titleBack.interactive=true;
titleBack.on('mousedown',setBack);
function setBack(){
    settings.visible=0;
    titlescreen.visible=1;
}
settings.addChild(titleBack);
function clickSettings(){
    clearTimeout(timer);
    clearInterval(texas);
    game.visible=0;
    settings.visible=1;

}
game.addChild(settingsClick);

//declaring the princess and sending to the stage
var textureM4=PIXI.Texture.fromImage("princess.png");
var rat =new PIXI.Sprite(textureM4);
rat.anchor.x=0;
rat.anchor.y=.5;
rat.position.x=33;
rat.position.y=33;
game.addChild(rat);
game.visible=0;

var evilKnight = new PIXI.Texture.fromImage("knight.png");
var knight = new PIXI.Sprite(evilKnight);
while (Math.abs(knight.position.x-rat.position.x)<75){
    knight.position.x=getRandomInt(50,350);
}
while(Math.abs(knight.position.y-rat.position.y)<75){
    knight.position.y=getRandomInt(50,350);
}
knight.anchor.x=.5;
knight.anchor.y=.5;
game.addChild(knight);
//setting up time for clock
var time = difficultTime;
var decrement = 100;
var counter = new PIXI.Text(difficultTime.toString());
counter.anchor.x=.5;
counter.anchor.y=.5;
counter.position.x=310;
counter.position.y=20;
game.addChild(counter);

//declaring the score counter on the stage
var text = new PIXI.Text("0");
text.position.x=380;
text.position.y=20;
text.anchor.x=.5;
text.anchor.y=.5;
game.addChild(text);
//creating title screen


//decrementing clock and setting text to it
function clock (){
    time-=100;
    counter.setText(time);
}stage.addChild(game);

/*********************************************************************************************************************/


/************************************************HANDLING KEY EVENTS*************************************************/
function keyUpHandler(){
    hero.loop=false;
    if(hero.currentFrame==0||hero.currentFrame==1){
        hero.gotoAndStop(1);
    }

};
function keydownEventHandler(e){

    if(e.keyCode==87){//w key
        //making sure user doesn't go out of bounds
        if(hero.position.y-32>0 ){
            if(Math.abs(hero.position.y-knight.position.y)+Math.abs(hero.position.x-knight.position.x)>25) {
                hero.loop = true;
                hero.rotation = -1.5;
                hero.scale.x = 1;
                if (hero.playing == false) {
                    hero.gotoAndPlay(0);
                }
                hero.position.y -= movespeed;
                move.play();
            }
            else{
                dil();
            }
        }
    }
    if(e.keyCode==83){//s key
        //making sure user doesn't go out of bounds
        if(hero.position.y+32<sizey){
            if(Math.abs(hero.position.y-knight.position.y)+Math.abs(hero.position.x-knight.position.x)>25) {
                hero.loop = true;
                hero.rotation = 1.5;
                hero.scale.x = 1;
                if (hero.playing == false) {
                    hero.gotoAndPlay(0);
                }
                hero.position.y += movespeed;
                move.play();

            }
            else{
                dil();
            }
        }

        }


    if(e.keyCode==65){//a Key
        //making sure user doesn't go out of bounds
        if(hero.position.x-32>0) {
            if(Math.abs(hero.position.y-knight.position.y)+Math.abs(hero.position.x-knight.position.x)>25) {
            hero.loop=true;
            hero.scale.x=-1;
            hero.rotation=0;

            if(hero.playing==false){
                hero.gotoAndPlay(3);
            }
                hero.position.x-=movespeed;
                move.play();
            }
            else{
                dil();
            }
        }
    }
    if(e.keyCode==68){//d key
        //making sure user doesn't go out of bounds
        if(hero.position.x+32<sizex){
            if(Math.abs(hero.position.y-knight.position.y)+Math.abs(hero.position.x-knight.position.x)>25) {
                hero.scale.x = 1;
                hero.loop = true;
                hero.rotation = 0;
                if (hero.playing == false) {
                    hero.gotoAndPlay(0);
                }
                hero.position.x += movespeed;
                move.play();
            }
            else{
                dil();
            }
        }
    }
    if (e.keyCode==69){
        //if the user is within 40 pixel of the princess they can save her
        if(Math.abs(hero.position.x-rat.position.x)<50||Math.abs(hero.position.y-rat.position.y)<50) {
            save.play();
            //clearing timeout so game does not end
            clearTimeout(timer);

            //removing the princess and inserting another one
            var nx = getRandomInt(50, 350);
            var ny = getRandomInt(50, 350);
            createjs.Tween.get(rat.position).to({x: nx, y: ny}, 500);
            var nx = getRandomInt(50, 350);
            var ny = getRandomInt(50, 350);
            createjs.Tween.get(knight.position).to({x: nx, y: ny}, 500);
            //incrementing score.
            var f=false;
            text.setText(score++);
            if (scorewin==score-1){
                f=true;
                endWin.visible=1;
                endLose.visible=0;
                game.visible=0;
                clearTimeout(timer);
                clearInterval(counter);
            }

            if (tut == false && f==false) {


                //creating new timeout event and removing 100 milliseconds from the timeout clock
                time = difficultTime - decrement;
                timer = window.setTimeout(dil, time);

                //clearing interval for accuracy
                window.clearInterval(texas);

                //keeping track of time for time clock

                //creating new interval with updated time.
                texas = window.setInterval(clock, 100);

                //setting new clock
                counter.setText(time);

                //increasing decrement
                decrement += 100;
            }
        }
    }
}
function animate(){
    //animating the game
    requestAnimationFrame(animate);
    renderer.render(stage);
}

//function for putting the princess on the screen
function getRandomInt(min,max) {
    return Math.floor(Math.random()*(max-min))+min;

}

animate();