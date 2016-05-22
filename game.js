/**
 * Created by Dylan on 5/16/2016.
 */
var gameport = document.getElementById("gameport");//Creating gameport variable

//size of game screen
var sizey = 400;
var sizex = 400;

//movement speed of the character in the game
var movespeed = 12;
//keeping track of the score in the game
var score=1;
//event listener for keystrokes and game functionality
document.addEventListener('keydown',keydownEventHandler);

var renderer=PIXI.autoDetectRenderer(sizey,sizex,{backgroundColor: 0x3344ee}); //create renderer for game
gameport.appendChild(renderer.view);//adding renderer for gameport

PIXI.loader
    .add("move.mp3")
    .add("test.mp3")
    .add("loser.mp3")
    .load(ready);

var move;
var save;
var loser;
function ready() {
    move =PIXI.audioManager.getAudio("move.mp3");
    save = PIXI.audioManager.getAudio("test.mp3");
    loser = PIXI.audioManager.getAudio("loser.mp3");

}

var stage= new PIXI.Container();//setting default container for graphics
var timer=window.setTimeout(dil,5000);

function dil(){
        //creating alert to notify users they lost and thensetting all time calculations back to normal
        loser.play();
        alert('YOU LOST\nWould you like to play again? ');
        score=0;
        text.setText(0);
        time=5000;
        counter.setText(5000);
        decrement=100;
        timer =window.setTimeout(dil,5000);


}
//decrementing clock and setting text to it
function clock (){
    time-=100;
    counter.setText(time);
}

var title = new PIXI.Text("Title Screen");
title.position.x=200;
title.position.y=200;
title.anchor.x=.5;
title.anchor.y=.5;
stage.addChild(title);


//setting up time for clock
var time = 5000;
var decrement = 100;
var counter = new PIXI.Text("5000");
counter.anchor.x=.5;
counter.anchor.y=.5;
counter.position.x=310;
counter.position.y=20;
var texas=setInterval(clock,100);
stage.addChild(counter);


//creating the hero object and sending to the stage
var texture = PIXI.Texture.fromImage("knight.png");
var hero = new PIXI.Sprite(texture);
hero.anchor.x=0.5;
hero.anchor.y=0.5;
hero.position.x=32;
hero.position.y=32;
stage.addChild(hero);

//declaring the score counter on the stage
var text = new PIXI.Text("0");
text.position.x=380;
text.position.y=20;
text.anchor.x=.5;
text.anchor.y=.5;
stage.addChild(text);

//declaring the princess and sending to the stage
var textureM4=PIXI.Texture.fromImage("princess.png");
var rat =new PIXI.Sprite(textureM4);
rat.anchor.x=0;
rat.anchor.y=.5;
rat.position.x=33;
rat.position.y=33;
stage.addChild(rat);

//function for putting the princess on the screen
function getRandomInt(min,max) {
    return Math.floor(Math.random()*(max-min))+min;

}

function animate(){
    //animating the game
    requestAnimationFrame(animate);
    renderer.render(stage);
}
function keydownEventHandler(e){
    if(e.keyCode==87){//w key
        //making sure user doesn't go out of bounds
        if(hero.position.y-32>0 ){
                hero.position.y-=movespeed;
                move.play();

        }
    }
    if(e.keyCode==83){//s key
        //making sure user doesn't go out of bounds
        if(hero.position.y+32<sizey){
                hero.position.y+=movespeed;
                move.play();
            }

        }


    if(e.keyCode==65){//a Key
        //making sure user doesn't go out of bounds
        if(hero.position.x-32>0){
                hero.position.x-=movespeed;
                move.play();
            }



    }
    if(e.keyCode==68){//d key
        //making sure user doesn't go out of bounds
        if(hero.position.x+32<sizex){
            hero.position.x+=movespeed;
            move.play();
        }
    }
    if (e.keyCode==69){
        //if the user is within 40 pixel of the princess they can save her
        if(Math.abs(hero.position.x-rat.position.x)<50||Math.abs(hero.position.y-rat.position.y)<50){
            save.play();
            //clearing timeout so game does not end
            clearTimeout(timer);

            //removing the princess and inserting another one
            var nx=getRandomInt(50,350);
            var ny=getRandomInt(50,350);
            createjs.Tween.get(rat.position).to({x:nx,y:ny},500 );

            //incrementing score.

            text.setText(score++);

            //creating new timeout event and removing 100 milliseconds from the timeout clock
            timer =window.setTimeout(dil,5000-decrement);

            //clearing interval for accuracy
            window.clearInterval(texas);

            //keeping track of time for time clock
            time=5000-decrement;

            //creating new interval with updated time.
            texas=window.setInterval(clock,100);

            //setting new clock
            counter.setText(time);

            //increasing decrement
            decrement+=100;
        }
    }
}



animate();