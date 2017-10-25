class Enemy {
    constructor(path, number, speed = 1) {
        this.x        = path[0].x;
        this.y        = path[0].y;
        this.path     = path;
        this.hp       = 10;
        this.maxHP    = this.hp;
        this.radius   = 15;
        this.speed    = speed;
        this.waypoint = 0;
        this.dead     = false;
        let that      = this;

        if(this.speed > 9) {
            this.speed = 9;
        }

        if (this.x != 0) {
            this.stagex = this.x * cellsize + (cellsize / 2);
        } else {
            this.stagex = 0 - number * cellsize;
        }
        if (this.y != 0) {
            this.stagey = this.y * cellsize + (cellsize / 2);
        } else {
            this.stagey = 0 - number * cellsize;
        }


        this.shape = u.circle(this.radius, "Crimson", "Black", 1, this.stagex, this.stagey);
        this.shape.anchor.set(0.5, 0.5);


        this.shape.interactive = true;
        this.shape.click = function(mouseData) {
            console.log("clicked");
            that.speed = that.speed/2;
            setTimeout(function() {
                that.speed = 1;
            }, 1000);
        }
        stage.addChild(this.shape);
    }

    update() {
        if (this.hp <= 0) {
            u.remove(this.shape);
            this.dead = true;
            player.gold += this.maxHP;
            
        } else if (this.waypoint < this.path.length) {
            this.x = this.shape.x;
            this.y = this.shape.y;
            //if(path[lastpos])
            //console.log(this.path[this.lastpos]);
            let target = this.path[this.waypoint];
            //console.log(this.waypoint);
            //console.log(this.path.length)
            let pointx = target.x * cellsize + cellsize / 2;
            let pointy = target.y * cellsize + cellsize / 2;
            //console.log("x: " + pointx + " y: " + pointy);
            if ((this.x - pointx) > 3) {
                this.x -= this.speed;
            }
            if ((this.x - pointx) < -3) {
                this.x += this.speed;
            }
            if ((this.y - pointy) > 3) {
                this.y -= this.speed;
            }
            if ((this.y - pointy) < -3) {
                this.y += this.speed;
            }
            this.shape.x = this.x;
            this.shape.y = this.y;
            if (Math.abs(this.x - pointx) <= 3 && Math.abs(this.y - pointy) <= 3) {
                this.waypoint++;

                if (this.waypoint >= this.path.length) {
                    // REACHED THE END
                    u.remove(this.shape);
                    player.hp-=this.maxHP;
                    this.dead = true;
                }
            }
        }






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