class Tower {
    constructor(tile) {
        //console.log(u._getCenter(tile, tile.width, "x"))
        this.tower = u.rectangle(tile.width-10, tile.height-10, "indigo", "black", 1, u._getCenter(tile, tile.width, "x"), u._getCenter(tile, tile.height, "y"));
        this.tower.anchor.set(0.5, 0.5);
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
        

        tile.addChild(this.tower);
    }

    update() {
        this.tower.rotation++;
    }

    shoot() {
        if(this.shoottime < 0){
            this.shoottime = this.attackspeed;
            u.shoot(
                this.tower,
                this.tower.rotation,
                u._getCenter(this.tower, this.tower.width, "x"),
                u._getCenter(this.tower, this.tower.height, "y"),
                stage,
                5,
                bullets,
    
                () => u.circle(8,"red")
            )
        } else {
            this.shoottime--;
        }
        
    }

    
}