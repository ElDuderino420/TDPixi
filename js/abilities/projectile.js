// pierce 
// aoe on hit
// mulitshot

class Projectile {
    constructor(shooter, x, y, angle, bulletSpeed, dmg, pierce, aoe, multi) {
        //this.type = type;
        this.pierce  = pierce;
        this.aoe     = aoe;
        this.dead    = false;
        this.dmg     = dmg;
        this.bullet  = u.circle(4,"red");
        this.shooter = shooter;
        //Set the bullet's anchor point to its center
        this.bullet.anchor.set(0.5, 0.5);
    
        //Temporarily add the bullet to the shooter
        //so that we can position it relative to the
        //shooter's position
        shooter.addChild(this.bullet);
        
        this.bullet.x = x;
        this.bullet.y = y;
    
        //Find the bullet's global coordinates so that we can use
        //them to position the bullet on the new parent container
        let tempGx = this.bullet.toGlobal(stage).x,
            tempGy = this.bullet.toGlobal(stage).y;
            //console.log(bullet.toGlobal(container))
            //console.log(bullet.getGlobalPosition())
        //Add the bullet to the new parent container using
        //the new global coordinates
        stage.addChild(this.bullet);
        this.bullet.x = tempGx;
        this.bullet.y = tempGy;
        

        if(multi){
            new Projectile(
                shooter, x, y, angle-(Math.PI/12), bulletSpeed, dmg, pierce, aoe
            );
            new Projectile(
                shooter, x, y, angle+(Math.PI/12), bulletSpeed, dmg, pierce, aoe
            );
        }

        //Set the bullet's velocity
        this.bullet.vx = Math.cos(angle) * bulletSpeed;
        this.bullet.vy = Math.sin(angle) * bulletSpeed;
    
        //Push the bullet into the `bulletArray`
        bullets.push(this);
    }

    update() {
        if(this.bullet.x < 0 || this.bullet.y < 0 || this.bullet.x > selectedmap[0].length*cellsize || this.bullet.y > selectedmap.length*cellsize){
            this.dead = true;
            stage.removeChild(this.bullet);
        } else {
            this.bullet.x += this.bullet.vx;
            this.bullet.y += this.bullet.vy;

            let that = this;
            //that.bullet.radius = that.bullet.radius*2;
            let proximity = alive.filter(function(a) {
                return bump.hitTestCircle(a.shape,that.bullet,true);
            })

            console.log(proximity);
            if(proximity.length > 0){
                proximity.forEach(function(p){
                    that.hit(p);
                })
            }
            /* proximity.forEach(function(a) {
                if(bump.hitTestCircle(a.shape,that.bullet,true)){
                    
                    if(that.aoe) {
                        that.impact(a);

                        if(!that.pierce){
                            that.kill();
                        }
                    } else {
                        a.hp-= that.dmg;

                        if(!that.pierce){
                            that.kill();
                        }
                    }
                    //a.hp-=that.dmg;
                    //a.shape.fillStyle-=500;
                    //a.speed = a.speed/2
                    //setTimeout(function() {
                        //a.speed = a.speed*2;
                    //}, 100);
                }
            }) */
        }
        
    }

    kill() {
        this.dead = true;
        stage.removeChild(this.bullet);
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

    hit(a) {
        if(this.aoe) {
            this.impact(a);

            if(!this.pierce){
                this.kill();
            }
        } else {
            a.hp-= this.dmg;

            if(!this.pierce){
                this.kill();
            }
        }
    }
}
