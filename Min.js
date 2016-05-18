/**
 * Created by Dylan on 5/16/2016.
 */
var gameport = document.getElementById("gameport");//Creating gameport variable
var sizey = 400;
var sizex = 400;
var renderer=PIXI.autoDetectRenderer(sizey,sizex,{backgroundColor: 0x3344ee}); //create renderer for game
gameport.appendChild(renderer.view);//adding renderer for gameport

var stage= new PIXI.Container();//setting default container for graphics

var texture = PIXI.Texture.fromImage("knight.png");

var hero = new PIXI.Sprite(texture);

hero.anchor.x=0.5;
hero.anchor.y=0.5;

hero.position.x=32;
hero.position.y=32;
var textureM=PIXI.Texture.fromImage("maZE.PNG");
var maze1 =PIXI.Sprite(textureM);

maze1.anchor.x=.5;
maze1.anchor.y=.5;

maze1.position.x=33;
maze1.position.y=33;


stage.addChild(hero);
var movespeed = 2;
function keydownEventHandler(e){
    if(e.keyCode==87){
        if(hero.position.y-32>0){
            hero.position.y-=movespeed;
        }
        else{

        }
    }
    if(e.keyCode==83){
        if(hero.position.y+32<sizey){
            hero.position.y+=movespeed;
        }
        else{

        }

    }
    if(e.keyCode==65){
        if(hero.position.x-32>0){
            hero.position.x-=movespeed;
        }
        else{

        }

    }
    if(e.keyCode==68){
        if(hero.position.x+32<sizex){
            hero.position.x+=movespeed;
        }
        else{

        }

    }

}
document.addEventListener('keydown',keydownEventHandler);
function animate(){
    requestAnimationFrame(animate);
    renderer.render(stage);
}
animate();


