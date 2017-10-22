const u = new SpriteUtilities(PIXI);
const bump = new Bump(PIXI);
const easystar = new EasyStar.js();

let ticker = PIXI.ticker.shared;
let renderer, stage;
let cellsize = 30;
let towers = [];
let bullets = [];
let enemies = [];
let alive = [];
let path = [];
let map, selectedmap;
let wave = 0;

let map2 = [
    [0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
    [0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0],
    [0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0],
    [0, 1, 0, 3, 1, 1, 1, 1, 1, 0, 1, 0],
    [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
    [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
];

let map1 = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
    [0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0],
    [0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0],
    [0, 1, 0, 3, 1, 1, 1, 1, 1, 0, 1, 0],
    [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
    [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
];

let map3 = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
    [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
    [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
    [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
    [0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
];


function init() {
    //Create the renderer
    selectedmap = map3;

    renderer = PIXI.autoDetectRenderer(selectedmap[0].length*cellsize, selectedmap.length*cellsize, {
        antialias: true,
        transparent: true,
        resolution: 2
    });

    //Add the canvas to the HTML document
    document.body.appendChild(renderer.view);

    //Create a container object called the `stage`
    stage = new PIXI.Container();

    map = new Map(selectedmap,cellsize);

    map.draw(stage);
    
    //map.spawnwave(1);

    

    requestAnimationFrame(update);
}


function update() {

    alive = enemies.filter(function (e) {
        return e.dead == false;
    });

    alive.sort((a, b) => {
        if(a.waypoint == b.waypoint) {
            if(Math.abs(a.shape.x - b.shape.x) > Math.abs(a.shape.y - b.shape.y)) {
                return Math.abs(a.shape.x - b.shape.x)
            } else {
                return Math.abs(a.shape.y - b.shape.y)
            }
        } else {
            return b.waypoint-a.waypoint
        }
    })

    alive.forEach(function(e) {
        e.update();
        
    })

    bullets = bullets.filter(function(b) {
        if(b.x < 0 || b.y < 0 || b.x > selectedmap[0].length*cellsize || b.y > selectedmap.length*cellsize){
            b.dead = true;
            stage.removeChild(b);
        }
        return b.dead != true;
    })

    bullets.forEach(function(b) {
        b.x += b.vx;
        b.y += b.vy;

        alive.forEach(function(a) {
            if(bump.hitTestCircle(a.shape,b,true)){
                console.log("bang bang")
                a.hp--;
                //a.shape.fillStyle-=500;
                a.speed = a.speed*2
                setTimeout(function() {
                    a.speed = a.speed*5;
                }, 10);

                //b.dead = true;
                
                //stage.removeChild(b);
                
            }
        })

    })

    towers.forEach(function(t) {
        t.update();
        t.shoot();
    })

    

    if(wave >= 1 && alive.length == 0) {
        enemies = [];
        wave++;
        map.spawnwave(wave * 2);
    }


    //Tell the `renderer` to `render` the `stage`
    renderer.render(stage);

    requestAnimationFrame(update);
    u.update();
}


document.addEventListener('DOMContentLoaded', function () {

    init();

});