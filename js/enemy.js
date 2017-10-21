class Enemy {
    constructor(path) {
        this.x = path[0].x;
        this.y = path[0].y;
        this.path = path;
        this.hp = 10;
        this.maxHP;
        this.radius = 20;
        this.speed = 50;
        this.lastpos = 0;
        this.dead = false;
        
        
        if(this.x != 0){
            this.stagex = this.x*cellsize + (cellsize/2);
        } else {
            this.stagex = 0;
        }
        if(this.y != 0){
            this.stagey = this.y*cellsize + (cellsize/2);
        } else {
            this.stagey = 0;
        }
        

        this.shape = u.circle(this.radius, "Crimson", "Black", 1, this.stagex, this.stagey);
        this.shape.anchor.set(0.5, 0.5);
        stage.addChild(this.shape);
    }

    update() {
        
        //if(path[lastpos])
        console.log(path[lastpos]);



        function distance(pnt1X, pnt1Y, pnt2X, pnt2Y) {
            var xs = 0;
            var ys = 0;
            xs = pnt2X - pnt1X;
            xs = xs * xs;
            ys = pnt2Y - pnt1Y;
            ys = ys * ys;
            return Math.ceil(Math.sqrt(xs + ys));
        }
    }    


}