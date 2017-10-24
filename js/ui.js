class UI {
    constructor() {
        this.towermenu = document.getElementById("towermenu");
        this.t_lvl = document.getElementById("lvl");
        this.t_type = document.getElementById("type");
        this.t_dmg = document.getElementById("dmg");
        this.t_range = document.getElementById("range");
        this.t_pierce = document.getElementById("pierce");
        this.t_aoe = document.getElementById("aoe");
        this.t_multi = document.getElementById("multi");
        this.towermenu.style.display = "none";
    }

    openTowerMenu(tower){
        console.log(tower);
        this.towermenu.style.display = "";
        this.towermenu.style.width = "250px";
        this.towermenu.style.height = selectedmap.length*cellsize*2 + "px";

        this.t_lvl.innerHTML = 1;
        this.t_type.innerHTML = tower.ability;
        this.t_dmg.innerHTML = tower.dmg;
        this.t_range.innerHTML = tower.range;
        this.t_pierce.innerHTML = tower.pierce;
        this.t_aoe.innerHTML = tower.aoe;
        this.t_multi.innerHTML = tower.multi;

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
        

    }
}