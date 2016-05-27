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

PIXI.SCALE_MODES.DEFAULT = PIXI.SCALE_MODES.NEAREST;
PIXI.loader
    .add('map_json','map.json')
    .add('tileset','tileset.png')
    .add("knight.json")
    .add('blob','blob.png')
    .load(ready);
var frames=[];
var timer;
var blob;
var castley;
function ready(){
    var tu = new TileUtilities(PIXI);
    world = tu.makeTiledWorld("map_json","tileset.png");
    stage.addChild(world);

    for (i=1;i<=6;i++){
        frames.push(PIXI.Texture.fromFrame("runner"+i+".png"))
    }

    var start = world.getObject("start");
    var cast = world.getObject("castle");
    var boyfriend = world.getObject("boyfriend");
    var princess = world.getObject("princess");

    //var b = PIXI.Texture.fromImage("knight.png");
    //blob = new PIXI.Sprite(b);
    blob = new PIXI.extras.MovieClip(frames);
    blob.scale.y=1;
    blob.scale.x=1;
    blob.anchor.x = 0.5;
    blob.anchor.y = 0.3;
    blob.position.x=start.x;
    blob.position.y=start.y;
    blob.animationSpeed=.1;



/*(



*/
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

    animate();
}
var moving_left = false;
var moving_right=false;
var dubs=false;
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
    if (blob.position.y==300) {

        if (e.keyCode == 87) {//w Key
            blob.loop = true;
            if (blob.playing == false) {
                blob.gotoAndPlay(0);
            }
            if (moving_left == true) {
                createjs.Tween.get(blob.position).to({x: blob.x - 32, y: blob.y - 96}, 500);
                timer = setTimeout(downleft, 650);
                function downleft() {
                    createjs.Tween.get(blob.position).to({x: blob.x - 32, y: 300}, 500);
                    clearTimeout(timer);
                }
            }
            if (moving_right == true) {
                createjs.Tween.get(blob.position).to({x: blob.x + 32, y: blob.y - 96}, 500);
                timer = setTimeout(downright, 650);

                function downright() {
                    createjs.Tween.get(blob.position).to({x: blob.x + 32, y: 300}, 500);
                    clearTimeout(timer);
                }
            }
            if (moving_left == false && moving_right == false) {
                createjs.Tween.get(blob.position).to({y: blob.y - 96}, 500);
                timer = setTimeout(down, 650);

                function down() {
                    createjs.Tween.get(blob.position).to({y: 300}, 500);
                    clearTimeout(timer);
                }
            }
        }

            if (e.keyCode == 65) {//a key
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
                blob.scale.x = 1;
                blob.loop = true;
                blob.rotation = 0;
                if (blob.playing == false) {
                    blob.gotoAndPlay(0);
                }
                moving_right = true;
                createjs.Tween.get(blob.position).to({x: blob.x + 32}, 500)
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

