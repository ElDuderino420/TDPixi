class Map {
    constructor(maparray, cellsize = 48) {
        this.maparray = maparray;
        this.cellsize = cellsize;
        this.spawnspeed = 50;
        this.counter = [];
        this.waves = [];
        this.ready = false;
        this.start = this.getstart();
        this.end = this.getend();
        let that = this;

        this.getPath(function (path) {
            that.path = path;
            console.log(path);
            //that.spawnwave(2);
            that.ready = true;
            
        });
    }

    draw() {
        let map = u.gridmap(
            this.maparray,
            this.maparray[0].length, //The number of columns
            this.maparray.length, //The number of rows
            this.cellsize, //The width of each cell
            this.cellsize, //The height of each cell
            true, //Should the sprite be centered in the cell?
            0, //The sprite's xOffset from the left of the cell 
            0, //The sprite's yOffset from the top of the cell

            //A function that describes how to make each peg in the grid. 
            //A random diameter and color are selected for each one
            (cellid) => {
                let square;
                if (cellid != 0) {
                    square = u.rectangle(this.cellsize, this.cellsize, "saddleBrown");
                } else {
                    square = u.grid(
                        2,
                        2,
                        this.cellsize / 2,
                        this.cellsize / 2,
                        true,
                        1,
                        1,
                        () => {
                            let subsquare = u.rectangle(this.cellsize / 2, this.cellsize / 2, "seaGreen", "dimGray", 1)
                            subsquare.interactive = true;
                            subsquare.click = function (mouseData) {
                                if (player.buymode) {
                                    let t = new Tower(mouseData.target);
                                    towers.push(t);
                                    //mouseData.target.fillStyle = "Silver";
                                    //console.log(mouseData.target);
                                    ui.openTowerMenu(t);
                                    player.buymode = false;


                                }

                            }
                            return subsquare;
                        }
                    )
                }



                return square;
            }
            /* ,
                
                        //Run any optional extra code after each ball is made
                        () => console.log("extra!") */
        );
        stage.addChild(map);
    }

    spawnenemies() {
        if(this.ready && this.waves.length == 0 && alive.length == 0){
            wave++;
            this.spawnwave(wave * 2);
        }
        
        //console.log(this.waves.length);
        let that = this;
        this.counter = this.counter.map(function(c) {
            return c - 1;
            //console.log(c);
        });
        for (let i = 0; i < this.counter.length; i++) {
            if(this.counter[i] <= 0) {
                this.counter[i] = this.spawnspeed;
                if(this.waves[i][0]) {
                    let enem = this.waves[i][0];

                    let e = new Enemy(this.path, i, enem[1]);
                    e.hp = enem[0];
                    enemies.push(e);

                    this.waves[i].splice(0,1);

                    
                } else {
                    this.counter.splice(i,1);
                    this.waves.splice(i,1);
                    i--;
                }
            }            
        }
    }

    spawnwave(number) {

        this.counter.push(1);
        let arr = [];
        for (let i = 0; i < number; i++) {
            //enemies.push(new Enemy(this.path, i));
            let hp = (10 + wave);
            let speed = 1 + (wave/5);
            console.log(hp + " " + speed);
            arr.push([hp,speed]);
        }
        
        this.waves.push(arr);
    }

    getstart() {
        for (let i = 0; i < this.maparray.length; i++) {
            let index = this.maparray[i].indexOf(2);
            if (index > -1) {
                //console.log([i, index]);
                return [i, index];
            }
        }
    }

    getend() {
        for (let i = 0; i < this.maparray.length; i++) {
            let index = this.maparray[i].indexOf(3);
            if (index > -1) {
                //console.log([i, index]);
                return [i, index];
            }
        }
    }

    getPath(callback) {
        easystar.setGrid(this.maparray);
        easystar.setAcceptableTiles([1, 2, 3]);
        easystar.findPath(this.start[1], this.start[0], this.end[1], this.end[0], callback);
        easystar.calculate();
    }
}