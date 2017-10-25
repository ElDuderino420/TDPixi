// pierce 
// aoe on hit
// mulitshot

class Beam {
    constructor(shooter, x, y, targets, dmg, angle, arc) {
        
        this.dead    = false;
        this.dmg     = dmg;
        this.shooter = shooter;
        this.angle   = angle;
        this.targets = targets;
        this.x       = x;
        this.y       = y;

        this.arc     = arc;
        //Push the bullet into the `bulletArray`
        bullets.push(this);
    }

    update() {
        
        if(!this.arc){
            this.single();
        }


        
    }

    kill() {
        this.dead = true;
        stage.removeChild(this.bullet);
    }

    single() {
        let a = this.targets[0].x - this.shooter.toGlobal(stage).x;
        let b = this.targets[0].y - this.shooter.toGlobal(stage).y;
        
        let c = Math.sqrt( a*a + b*b );
        console.log(c);
        this.line = u.rectangle(c, 2, "red", "black", 0, this.x, this.y);
        this.line.anchor.set(0, 0.5);
        this.line.rotation = this.angle;

        this.shooter.addChild(this.line);
        
        this.line.x = this.x;
        this.line.y = this.y;
    
        //Find the bullet's global coordinates so that we can use
        //them to position the bullet on the new parent container
        let tempGx = this.line.toGlobal(stage).x,
            tempGy = this.line.toGlobal(stage).y;
            //console.log(bullet.toGlobal(container))
            //console.log(bullet.getGlobalPosition())
        //Add the bullet to the new parent container using
        //the new global coordinates
        //console.log(tempGx);
        this.line.x = tempGx;
        this.line.y = tempGy;

        stage.addChild(this.line);
        

        this.dead = true;

        this.targets[0].hp -= this.dmg;

        let that = this;
        setTimeout(function() {
            stage.removeChild(that.line)
        }, 50);
    }

    impact(hit) {
        let impactr = u.circle(60, "orangered", "orangered", 1, this.bullet.x, this.bullet.y);
        impactr.anchor.set(0.5, 0.5);
        stage.addChild(impactr);
        let that = this;
        let splash = alive.filter(function(e) {
            return bump.hitTestCircle(e.shape,impactr,true)
        });
        //console.log(splash)
        splash.forEach(function(e) {
            e.hp-=that.dmg;
        })
        setTimeout(function() {
            stage.removeChild(impactr);
        }, 20);

    }
}
