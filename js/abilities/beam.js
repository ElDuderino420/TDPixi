// pierce 
// aoe on hit
// mulitshot

class Beam {
    constructor(shooter, x, y, targets, dmg, angle, arc = false) {
        
        this.dead    = false;
        this.dmg     = dmg;
        this.shooter = shooter;
        this.angle   = angle;
        this.targets = targets;
        this.x       = x;
        this.y       = y;

        this.targets = targets.sort((a, b) => {
                if (a.waypoint == b.waypoint) {
                    if (Math.abs(a.shape.x - b.shape.x) > Math.abs(a.shape.y - b.shape.y)) {
                        return Math.abs(a.shape.x - b.shape.x)
                    } else {
                        return Math.abs(a.shape.y - b.shape.y)
                    }
                } else {
                    return b.waypoint - a.waypoint
                }
            }) 

        this.arc     = arc;
        //Push the bullet into the `bulletArray`
        bullets.push(this);
    }

    update() {
        
        if(!this.arc){
            this.single();
        } else {
            console.log(this.arc);
            this.single();
            for (let seg = 0; seg < this.arc; seg++) {
                console.log(seg);
                this.bounce(seg);
                
            }
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
        let line = u.rectangle(c, 2, "red", "black", 0, this.x, this.y);
        line.anchor.set(0, 0.5);
        line.rotation = this.angle;

        this.shooter.addChild(line);
        
        line.x = this.x;
        line.y = this.y;
    
        //Find the bullet's global coordinates so that we can use
        //them to position the bullet on the new parent container
        let tempGx = line.toGlobal(stage).x,
            tempGy = line.toGlobal(stage).y;
            //console.log(bullet.toGlobal(container))
            //console.log(bullet.getGlobalPosition())
        //Add the bullet to the new parent container using
        //the new global coordinates
        //console.log(tempGx);
        line.x = tempGx;
        line.y = tempGy;

        stage.addChild(line);
        

        this.dead = true;

        this.targets[0].hp -= this.dmg;

        let that = this;
        setTimeout(function() {
            console.log("removed");
            stage.removeChild(line)
        }, 20);
    }

    bounce(prev){

        if(this.targets[prev+1]){
            let a = this.targets[prev+1].x - this.targets[prev].x;
            let b = this.targets[prev+1].y - this.targets[prev].y;
            
            let c = Math.sqrt( a*a + b*b );
            console.log(c);
            let line = u.rectangle(c, 2, "red", "black", 0, this.targets[prev].x, this.targets[prev].y);
            line.anchor.set(0, 0.5);
            line.rotation = Math.atan2(b, a);
    
            /* this.shooter.addChild(this.line);
            
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
     */
            stage.addChild(line);
            
    
            this.dead = true;
    
            this.targets[prev+1].hp -= this.dmg;
    
            let that = this;
            setTimeout(function() {
                console.log("removed");
                stage.removeChild(line)
            }, 20);
        }
        
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
