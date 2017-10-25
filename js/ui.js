class UI {
    constructor() {
        this.menu       = document.getElementById("menu");
        this.playermenu = document.getElementById("playermenu");
        this.towermenu  = document.getElementById("towermenu");
        this.t_lvl      = document.getElementById("lvl");
        this.t_type     = document.getElementById("type");
        this.t_dmg      = document.getElementById("dmg");
        this.t_range    = document.getElementById("range");
        this.t_pierce   = document.getElementById("pierce");
        this.t_aoe      = document.getElementById("aoe");
        this.t_multi    = document.getElementById("multi");
        this.t_close    = document.getElementById("close");
        this.t_buy      = document.getElementById("buytower");
        this.nxt_wave   = document.getElementById("waveinc");
        this.try_again  = document.getElementById("dead");
        this.p_hp       = document.getElementById("hp");
        this.p_wave     = document.getElementById("wave");
        this.p_gold     = document.getElementById("gold");
        this.towermenu.style.display = "none";
        this.try_again.style.display = "none";
        this.playermenu.style.height  = selectedmap.length*cellsize*2 + "px";
        this.selectedtower = null;
        let that = this;
        this.t_buy.onclick = function() {
            player.buymode = true;
            player.gold-=50;

        }

        this.try_again.onclick = function() {
            if(that.selectedtower){
                stage.removeChild(that.selectedtower.rangeview);
            }
            player.reset();
            that.try_again.style.display = "none";
            that.t_buy.style.display = "";
            that.nxt_wave.style.display = "";
            
        }

        this.nxt_wave.onclick = function() {
            wave++;
            map.spawnwave(wave * 2);
            //playergold--

        }

    }

    update() {
        this.p_hp.innerHTML = player.hp;
        this.p_wave.innerHTML = wave;
        this.p_gold.innerHTML = player.gold;
    }

    openTowerMenu(tower) {
        if(this.selectedtower){
            this.selectedtower.rangeview.visible = false;
        }
        this.selectedtower = tower;
        tower.rangeview.visible  = true;
        console.log(tower);
        this.towermenu.style.display = "";
        this.towermenu.style.width   = "200px";
        this.playermenu.style.height = selectedmap.length*cellsize*2 + "px";
        this.towermenu.style.height  = selectedmap.length*cellsize*2 + "px";

        this.t_lvl.innerHTML    = 1;
        this.t_type.innerHTML   = tower.ability;
        this.t_dmg.innerHTML    = tower.dmg;
        this.t_range.innerHTML  = tower.range;
        this.t_pierce.innerHTML = tower.pierce;
        this.t_aoe.innerHTML    = tower.aoe;
        this.t_multi.innerHTML  = tower.multi;

        this.t_type.onclick = function(){
            if(tower.ability == "projectile"){
                tower.ability = "beam";
            } else if(tower.ability == "beam"){
                tower.ability = "projectile";
            }
            ui.openTowerMenu(tower);
        }

        this.t_dmg.onclick = function(){
            tower.dmg++;
            ui.openTowerMenu(tower);
        }

        this.t_dmg.oncontextmenu = function(){
            tower.dmg--;
            ui.openTowerMenu(tower);
        }

        this.t_range.onclick = function(){
            tower.upgraderange(1);
            ui.openTowerMenu(tower);
        }

        this.t_range.oncontextmenu = function(){
            tower.upgraderange(-1);
            ui.openTowerMenu(tower);
        }

        this.t_pierce.onclick = function(){
            tower.pierce = !tower.pierce;
            ui.openTowerMenu(tower);
        }

        this.t_aoe.onclick = function(){
            tower.aoe = !tower.aoe;
            ui.openTowerMenu(tower);
        }

        this.t_multi.onclick = function(){
            tower.multi = !tower.multi;
            ui.openTowerMenu(tower);
        }

        this.t_close.onclick = function(){
            ui.closeTowerMenu();
        }
        

    }

    closeTowerMenu() {
        this.towermenu.style.display = "none";
        if(this.selectedtower){
            this.selectedtower.rangeview.visible = false;
        }
        this.selectedtower = null;
    }

    dead() {
        this.try_again.style.display = "";
        this.t_buy.style.display = "none";
        this.nxt_wave.style.display = "none";
    }
}