class Tower {
    constructor(tile) {
        //console.log(u._getCenter(tile, tile.width, "x"))
        this.ability    = "beam";
        //this.ability  = "projectile";
        this.tile       = tile;
        this.range      = 70;
        this.targets    = [];
        this.multi      = true;
        this.pierce     = false;
        this.aoe        = false;
        this.dmg        = 5;
        this.tower      = u.rectangle(tile.width - 10, tile.height - 10, "indigo", "black", 1, u._getCenter(tile, tile.width, "x"), u._getCenter(tile, tile.height, "y"));
        this.tower.anchor.set(0.5, 0.5);
        this.tower.type = "single";

        this.rangeshape = u.circle(this.range * 2, "white", "black", 1, this.tower.x, this.tower.y);
        this.rangeview  = u.emptycircle(this.range * 2, "black", 2, this.tower.x + tile.toGlobal(stage).x, this.tower.y + tile.toGlobal(stage).y);

        this.rangeshape.visible = false;
        this.rangeview.visible  = false;
        this.rangeshape.anchor.set(0.5, 0.5);
        this.rangeview.anchor.set(0.5, 0.5);
        //this.tower.rotation  += 2;
        this.tower.interactive = true;
        this.shoottime         = 0;
        this.attackspeed       = 100;
        u.shake(this.tower, 0.5, false);

        let that = this;
        this.tower.click = function (mouseData) {

            //that.rangeview.visible = !that.rangeview.visible
            ui.openTowerMenu(that);
            //GUI OPEN TOWER MENU
            //mouseData.target.fillStyle = "Aqua";

        }
        this.tower.rightclick = function (mouseData) {


            /* that.pierce = !that.pierce;
            console.log("Pierce: " + that.pierce); */

            //mouseData.target.fillStyle = "Lime";

        }
        stage.addChild(this.rangeview);
        tile.addChild(this.rangeshape);
        tile.addChild(this.tower);


        /* if (this.ability == "beam") {
            //this.attackspeed = 0;
            this.beam = new Beam(
                this.tower,
                u._getCenter(this.tower, this.tower.width, "x"),
                u._getCenter(this.tower, this.tower.height, "y"),
                this,
                this.dmg,
                this.tower.rotation
            );
        } */

        Object.defineProperties(that, {
            "radius": {
                get() {
                    return that.range;
                },
                set(value) {
                    console.log(value);
                    that.range += value;

                    this.rangeshape = u.circle(this.range * 2, "white", "black", 1, this.tower.x, this.tower.y);
                    this.rangeview = u.emptycircle(this.range * 2, "black", 2, this.tower.x + tile.toGlobal(stage).x, this.tower.y + tile.toGlobal(stage).y);

                    this.rangeshape.visible = false;
                    this.rangeview.visible = true;
                    this.rangeshape.anchor.set(0.5, 0.5);
                    this.rangeview.anchor.set(0.5, 0.5);
                    console.log(that.rangeview.radius)
                },
                enumerable: true,
                configurable: true
            }
        })

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

        if (this.targets.length > 0) {

            if (this.ability == "projectile") {
                this.shoot();
            }

            if (this.ability == "beam") {
                this.laser(this.targets);
            }


        } else {
            this.shoottime--;
        }
        //console.log(this.targets);
    }

    shoot() {
        if (this.shoottime < 0) {
            this.tower.rotation = Math.atan2(this.targets[0].y - this.rangeshape.gy, this.targets[0].x - this.rangeshape.gx);

            this.shoottime = this.attackspeed;
            new Projectile(
                this.tower,
                u._getCenter(this.tower, this.tower.width, "x"),
                u._getCenter(this.tower, this.tower.height, "y"),
                this.tower.rotation,
                5,
                this.dmg,
                this.pierce,
                this.aoe,
                this.multi
            );
        } else {
            this.shoottime--;
        }
    }

    laser(targets) {
        //this.beam.update(targets);
        if (this.shoottime < 0) {
            this.tower.rotation = Math.atan2(this.targets[0].y - this.rangeshape.gy, this.targets[0].x - this.rangeshape.gx);

            this.shoottime = this.attackspeed;
            new Beam(
                this.tower,
                u._getCenter(this.tower, this.tower.width, "x"),
                u._getCenter(this.tower, this.tower.height, "y"),
                targets,
                this.dmg,
                this.tower.rotation
            );
        } else {
            this.shoottime--;
        }
    }

    upgraderange(value) {
        stage.removeChild(this.rangeview);
        this.tile.removeChild(this.rangeshape);
        console.log(value);
        this.range += value;

        this.rangeshape = u.circle(this.range * 2, "white", "black", 1, this.tower.x, this.tower.y);
        this.rangeview = u.emptycircle(this.range * 2, "black", 2, this.tower.x + this.tile.toGlobal(stage).x, this.tower.y + this.tile.toGlobal(stage).y);

        this.rangeshape.visible = false;
        this.rangeview.visible = true;
        this.rangeshape.anchor.set(0.5, 0.5);
        this.rangeview.anchor.set(0.5, 0.5);
        stage.addChild(this.rangeview);
        this.tile.addChild(this.rangeshape);
        console.log(this.rangeview.radius)
    };



}