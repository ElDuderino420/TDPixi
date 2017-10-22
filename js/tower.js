class Tower {
    constructor(tile) {
        //console.log(u._getCenter(tile, tile.width, "x"))
        this.range = 200;
        this.targets = [];
        
        this.tower = u.rectangle(tile.width-10, tile.height-10, "indigo", "black", 1, u._getCenter(tile, tile.width, "x"), u._getCenter(tile, tile.height, "y"));
        this.tower.anchor.set(0.5, 0.5);
        
        
        this.rangeshape = u.circle(this.range, "white", "black", 1, this.tower.x, this.tower.y);
        this.rangeshape.visible = false;
        this.rangeshape.anchor.set(0.5,0.5);
        //this.tower.rotation+=2;
        this.tower.interactive = true;
        this.shoottime = 0;
        this.attackspeed = 100;
        tile.interactive = false;
        u.shake(this.tower, 0.5, false);
        this.tower.click = function(mouseData) {
            //console.log(mouseData.target.toGlobal(stage));
            mouseData.target.rotation ++;
            console.log(mouseData.target.rotation);
            /* let t = mouseData.target;
            u.shoot(
                t,
                t.rotation,
                t.x,
                t.y,
                //tile.getGlobalPosition().x,
                //tile.getGlobalPosition().y,
                stage,
                1,
                bullets,

                () => u.circle(8,"red")
            ) */
        }
        this.tower.rightclick = function(mouseData) {
            //console.log(mouseData.target.toGlobal(stage));
            mouseData.target.rotation--;
            /* let t = mouseData.target;
            u.shoot(
                t,
                t.rotation,
                t.x,
                t.y,
                //tile.getGlobalPosition().x,
                //tile.getGlobalPosition().y,
                stage,
                1,
                bullets,

                () => u.circle(8,"red")
            ) */
        }
        
        tile.addChild(this.rangeshape);
        tile.addChild(this.tower);
        
    }

    update() {
        //this.tower.rotation++;
        this.targets = [];
        let that = this;
        /* alive.forEach(function(e) {
            //console.log(e);
            //console.log(that.rangeshape);
            if(bump.hitTestCircle(e.shape, that.rangeshape, true)){
                that.targets.push(e);
                console.log("pushed");
            }
        }) */
        this.targets = alive.filter(function (e) {
            return bump.hitTestCircle(e.shape, that.rangeshape, true); 
        })
    }

    shoot() {
        
        if(this.shoottime < 0){
            if(this.targets.length > 0){
                this.tower.rotation = Math.atan2(this.targets[0].y-this.rangeshape.gy, this.targets[0].x-this.rangeshape.gx);
                console.log(this.tower.rotation);
                this.shoottime = this.attackspeed;
                u.shoot(
                    this.tower,
                    this.tower.rotation,
                    u._getCenter(this.tower, this.tower.width, "x"),
                    u._getCenter(this.tower, this.tower.height, "y"),
                    stage,
                    5,
                    bullets,
        
                    () => u.circle(4,"red")
                )
            }
            
        } else {
            this.shoottime--;
        }
        
    }

    
}