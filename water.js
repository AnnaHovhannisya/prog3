class Water extends LivingCreature{
    constructor(x, y) {
        super(x, y)
        this.life = 0;
        // this.energy = 5
        // this.directions = [];
    }
    getNewCoordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }
    chooseCell(character) {
        this.getNewCoordinates();
        return super.chooseCell(character);
    }
    
    mul() {
        this.life++;
        let newCell = random(this.chooseCell(0).concat(this.chooseCell(1)));
        if (newCell && this.life > 10) {
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = 4;
            let water = new Water(newX, newY);
            waterArr.push(water);
            this.life = 0;
        }
    }

    move() {
        this.energy--;
        let newCell = random(this.chooseCell(0).concat(this.chooseCell(1)));
        if (newCell) {
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = matrix[this.y][this.x];
            matrix[this.y][this.x] = 0;
            for (var i in grassArr) {
                if (grassArr[i].x == x && grassArr[i].y == y) {
                    grassArr.splice(i, 1)
                }
            }

            this.y = newY;
            this.x = newX;
        }
    }

}