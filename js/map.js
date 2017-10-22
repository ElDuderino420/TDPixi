class Map{
    constructor(maparray, cellsize = 48){
        this.maparray = maparray;
        this.cellsize = cellsize;

        
        this.start = this.getstart();
        this.end = this.getend();
        let that = this;

        this.getPath(function(path) {
            that.path = path;
            console.log(path);
            that.spawnwave(2);
            wave = 1;
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
                if(cellid != 0){
                    square = u.rectangle(this.cellsize, this.cellsize, "saddleBrown");
                } else {
                    square = u.grid(
                        2,
                        2,
                        this.cellsize/2,
                        this.cellsize/2,
                        true,
                        0,
                        0,
                        () => {
                            let subsquare = u.rectangle(this.cellsize/2,this.cellsize/2,"seaGreen", "dimGray", 1)
                            subsquare.interactive = true;
                            subsquare.cursor = 'none';
                            subsquare.click = function (mouseData) {
                                
                                if(true){
                                    let t = new Tower(mouseData.target);
                                    towers.push(t);
                                    //mouseData.target.fillStyle = "Silver";
                                    console.log(mouseData.target);
                                    
                                    
                                }
                                
                            }
                            return subsquare;
                        }
                    )
                }
                
                
                
                return square;
            }/* ,
    
            //Run any optional extra code after each ball is made
            () => console.log("extra!") */
        );
        stage.addChild(map);
    }

    spawnwave(number) {
        for (let i = 0; i < number; i++){
            enemies.push(new Enemy(this.path, i));
        }
    }

    getstart() {
        for (let i = 0; i < this.maparray.length; i++){
            let index = this.maparray[i].indexOf(2);
            if(index > -1) {
                //console.log([i, index]);
                return [i, index];
            }
        }
    }

    getend() {
        for (let i = 0; i < this.maparray.length; i++){
            let index = this.maparray[i].indexOf(3);
            if(index > -1) {
                //console.log([i, index]);
                return [i, index];
            }
        }
    }

    getPath(callback) {
        easystar.setGrid(this.maparray);
        easystar.setAcceptableTiles([1,2,3]);
        easystar.findPath(this.start[1],this.start[0],this.end[1],this.end[0], callback);
        easystar.calculate();
    }
}