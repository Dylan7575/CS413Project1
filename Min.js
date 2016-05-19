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

var renderer=PIXI.autoDetectRenderer(sizey,sizex,{backgroundColor: 0x3344ee}); //create renderer for game
gameport.appendChild(renderer.view);//adding renderer for gameport


var stage= new PIXI.Container();//setting default container for graphics

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
    requestAnimationFrame(animate);
    renderer.render(stage);
}
function keydownEventHandler(e){
    if(e.keyCode==87){
        if(hero.position.y-32>0 ){

                hero.position.y-=movespeed;

        }
    }
    if(e.keyCode==83){
        if(hero.position.y+32<sizey){

                hero.position.y+=movespeed;
            }

        }


    if(e.keyCode==65){//a Key
        if(hero.position.x-32>0){
                hero.position.x-=movespeed;
            }



    }
    if(e.keyCode==68){//d key
        if(hero.position.x+32<sizex){
            hero.position.x+=movespeed;
        }
        else{

        }

    }
    if (e.keyCode==32){
        if(Math.abs(hero.position.x-rat.position.x)<40){
            stage.removeChild(rat);
            rat.anchor.x=.5;
            rat.anchor.y=.5;
            rat.position.x=getRandomInt(50,350);
            rat.position.y=getRandomInt(50,350);
            stage.addChild(rat);
            //incrementing score.
            text.setText(score++);

        }




    }

}

document.addEventListener('keydown',keydownEventHandler);

animate();


