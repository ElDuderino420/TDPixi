const u = new SpriteUtilities(PIXI);
const b = new Bump(PIXI);
const easystar = new EasyStar.js();

let ticker = PIXI.ticker.shared;
let renderer, stage;
let cellsize = 48;
let towers = [];
let bullets = [];
let enemies = [];
let path = [];
let map;

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

function init() {
    //Create the renderer
    renderer = PIXI.autoDetectRenderer(map2[0].length*cellsize, map2.length*cellsize, {
        antialias: true,
        transparent: true,
        resolution: 2
    });

    //Add the canvas to the HTML document
    document.body.appendChild(renderer.view);

    //Create a container object called the `stage`
    stage = new PIXI.Container();

    
    

    map = new Map(map2,cellsize);

    map.draw(stage);
    
    //map.spawnwave(1);

    

    requestAnimationFrame(update);
}


function update() {
    bullets.forEach(function(b) {
        b.x += b.vx;
        b.y += b.vy;
    })

    towers.forEach(function(t) {
        t.update();
        t.shoot();
    })


    //Tell the `renderer` to `render` the `stage`
    renderer.render(stage);

    requestAnimationFrame(update);
    u.update();
}


document.addEventListener('DOMContentLoaded', function () {

    init();

});