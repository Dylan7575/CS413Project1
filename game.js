/**
 * Created by Dylan on 5/26/2016.
 */
var GAME_WIDTH =720;
var GAME_HEIGHT=400;
var GAME_SCALE =1;

var gameport =document.getElementById("gameport");
var renderer= new PIXI.autoDetectRenderer(GAME_WIDTH,GAME_HEIGHT,{backgroundColor:0x99d5ff});
var world;

gameport.appendChild(renderer.view);
var stage = new PIXI.Container();
stage.scale.x = GAME_SCALE;
stage.scale.y = GAME_SCALE;
var titlescreen = new PIXI.Container();
var endWin = new PIXI.Container();
var endLose = new PIXI.Container();
endWin.visible=0;
endLose.visible=0;
/***********************************************Creating Title screen*************************************/
var gameTitle = new PIXI.Text("Princess Rescue");
gameTitle.anchor.x=.5;
gameTitle.anchor.y=.5;
gameTitle.position.x=360;
gameTitle.position.y=100;
titlescreen.addChild(gameTitle);
titlescreen.visible=1;
var title = new PIXI.Text("Click Here to play");
title.position.x=360;
title.position.y=200;
title.anchor.x=.5;
title.anchor.y=.5;
title.interactive=true;
title.on('mousedown',mousehandler);
function mousehandler(){
    world.visible=1;
    titlescreen.visible=0;

}
titlescreen.addChild(title);

stage.addChild(titlescreen);

/********************************************************************************************************/


/**************************************Lose Condition***************************************************/
var loseText = new PIXI.Text("You Lose!");
loseText.anchor.x=.5;
loseText.anchor.y=.5;
loseText.position.x=360;
loseText.position.y=200;
var playAgain = new PIXI.Text("Play Again?");
playAgain.anchor.x=.5;
playAgain.anchor.y=.5;
playAgain.position.x=360;
playAgain.position.y=300;
playAgain.interactive=true;
playAgain.on('mousedown',startNewGame2);
function startNewGame2(){
    world.visible=1;
    endLose.visible=0;
    endWin.visible=0;
    prin.visible=1;


}
endLose.addChild(loseText);
endLose.addChild(playAgain);
stage.addChild(endLose);
/********************************************************************************************************/


/***********************************************Win Scenario********************************************/
var winText= new PIXI.Text("You Win!");
winText.anchor.x=.5;
winText.anchor.y=.5;
winText.position.x=360;
winText.position.y=200;
var playAgain2 = new PIXI.Text("Play Again?");
playAgain2.anchor.x=.5;
playAgain2.anchor.y=.5;
playAgain2.position.x=360;
playAgain2.position.y=300;
playAgain2.interactive=true;
playAgain2.on('mousedown',startNewGame);
function startNewGame(){

    world.visible=1;
    endLose.visible=0;
    endWin.visible=0;
    prin.visible=1;
}
endWin.addChild(winText);
endWin.addChild(playAgain2);
stage.addChild(endWin);

/***************************************************************************************************/
PIXI.SCALE_MODES.DEFAULT = PIXI.SCALE_MODES.NEAREST;
PIXI.loader
    .add('map_json','map.json')
    .add("move.mp3")
    .add("Powerup2.mp3")
    .add("loser.mp3")
    .add('tileset','tileset.png')
    .add("knight.json")
    .add('blob','blob.png')
    .add("knight2.json")

    .load(ready);
var save;
var move;
var loser;
var frames=[];
var frames2=[];
var timer;
var blob;
var castley;
var start;
var cast;
var boyfriend;
var princess;
function ready(){
    move =PIXI.audioManager.getAudio("move.mp3");
    save = PIXI.audioManager.getAudio("Powerup2.mp3");
    loser = PIXI.audioManager.getAudio("loser.mp3");
    var tu = new TileUtilities(PIXI);
    world = tu.makeTiledWorld("map_json","tileset.png");
    stage.addChild(world);
    world.visible=0;

    for (i=1;i<=6;i++){
        frames.push(PIXI.Texture.fromFrame("runner"+i+".png"));

    }
    var j;
    for (i=12;i<=17;i++){
        j=i+1;
        frames2.push(PIXI.Texture.fromFrame("runner"+i+".png"));
    }
    //getting objects from json map file
     start = world.getObject("start");
     cast = world.getObject("castle");
     boyfriend = world.getObject("boyfriend");
     princess = world.getObject("princess");
    
    v = PIXI.Texture.fromImage("princess.png");
    //princess sprite
    prin=new PIXI.Sprite(v);
    prin.position.x=princess.x;
    prin.position.y=princess.y;
    prin.anchor.x = 0.5;
    prin.anchor.y = .3;


    //evil boyyfriend object
    f= PIXI.Texture.fromImage("knight.png");
    boy= new PIXI.Sprite(f);
    boy.position.x=boyfriend.x;
    boy.position.y=boyfriend.y;
    boy.anchor.x = 0.5;
    boy.anchor.y = .3;

    //main playable character
    blob = new PIXI.extras.MovieClip(frames);
    blob.scale.y=1;
    blob.scale.x=1;
    blob.anchor.x = 0.5;
    blob.anchor.y = 0.3;
    blob.position.x=start.x;
    blob.position.y=start.y;
    blob.animationSpeed=.1;

    //castle to return princess to
    var c = PIXI.Texture.fromImage("castle.png");
    castley = new PIXI.Sprite(c);
    castley.position.x=cast.x;
    castley.position.y=cast.y;
    castley.anchor.x = 0.5;
    castley.anchor.y = 0;




    var entity_layer= world.getObject("Entities");
    var building_layer = world.getObject("Buildings");
    entity_layer.addChild(blob);
    building_layer.addChild(castley);
    entity_layer.addChild(boy);
    entity_layer.addChild(prin);

    animate();
}
var moving_left = false;
var moving_right=false;
document.addEventListener("keyup",function (e){
    blob.loop=false;
    if(e.keyCode==68){
        moving_right=false;
    }
    if(e.keyCode==65){
        moving_left=false;
    }
    if(blob.currentFrame==0||blob.currentFrame==1){
        blob.gotoAndStop(1);
    }
});


document.addEventListener("keydown",function (e) {
    if(Math.abs(blob.position.x-castley.position.x)<50&& prin.visible==0){
        endWin.visible=1;
        world.visible=0;
        save.play();
    }
    if(Math.abs(blob.position.x-boy.position.x)<30) {
        loser.play();
    }


    if (blob.position.y==300) {

        if (e.keyCode == 87) {//w Key
            blob.loop = true;
            if (blob.playing == false) {
                blob.gotoAndPlay(0);
            }
            if (moving_left == true) {
                save.play();
                createjs.Tween.get(blob.position).to({x: blob.x - 96, y: blob.y - 96}, 500);
                timer = setTimeout(downleft, 650);
                function downleft() {
                    createjs.Tween.get(blob.position).to({x: blob.x - 96, y: 300}, 500);
                    clearTimeout(timer);
                }
            }
            if (moving_right == true) {
                save.play();
                createjs.Tween.get(blob.position).to({x: blob.x + 96, y: blob.y - 96}, 500);
                timer = setTimeout(downright, 650);

                function downright() {
                    createjs.Tween.get(blob.position).to({x: blob.x + 96, y: 300}, 500);
                    clearTimeout(timer);
                }
            }
            if (moving_left == false && moving_right == false) {
                save.play();
                createjs.Tween.get(blob.position).to({y: blob.y - 96}, 500);
                timer = setTimeout(down, 650);

                function down() {
                    createjs.Tween.get(blob.position).to({y: 300}, 500);
                    clearTimeout(timer);
                }
            }
        }

        if (e.keyCode == 65) {//a key
            move.play();
            blob.loop = true;
            blob.scale.x = -1;
            blob.rotation = 0;

            if (blob.playing == false) {
                blob.gotoAndPlay(3);
            }
            moving_left= true;
            createjs.Tween.get(blob.position).to({x: blob.x - 32}, 500)
        }

        if (e.keyCode == 68) {//d key
            move.play();
            blob.scale.x = 1;
            blob.loop = true;
            blob.rotation = 0;
            if (blob.playing == false) {
                blob.gotoAndPlay(0);
            }
            moving_right = true;
            createjs.Tween.get(blob.position).to({x: blob.x + 32}, 500)
        }
        if (e.keyCode==69){
            if(Math.abs(blob.position.x-prin.position.x)<50||Math.abs(blob.position.y-prin.position.y)<50){
                prin.visible=0;
                save.play();


                //blob.currentFrame()
            }
        }




    }
});














function animate(timestamp) {
    requestAnimationFrame(animate);
    update_camera();
    renderer.render(stage);
}

function update_camera() {
    stage.x = -blob.x*GAME_SCALE + GAME_WIDTH/2 - blob.width/2*GAME_SCALE;
    stage.y = -blob.y*GAME_SCALE + GAME_HEIGHT/2 + blob.height/2*GAME_SCALE;
    stage.x = -Math.max(0, Math.min(world.worldWidth*GAME_SCALE - GAME_WIDTH, -stage.x));
    stage.y = -Math.max(0, Math.min(world.worldHeight*GAME_SCALE - GAME_HEIGHT, -stage.y));
}

