class Player {
    constructor() {
        this.hp = 100;
        this.gold = 100;
        this.buymode = false;
    }

    reset() {
        this.hp = 100;
        this.gold = 100;
        this.buymode = true;
        wave = 1;

        enemies.forEach(function(e) {
            stage.removeChild(e.shape);
            //u.remove(e.shape);
        })

        towers.forEach(function(t) {
            u.remove(t.tower);
        })

        enemies = [];
        towers = [];

        update();

    }
}