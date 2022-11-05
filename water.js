class Water {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.life = 0;
        // this.energy = 5
        this.directions = [];
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
        let arr = [];

        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && y >= 0 && x < matrix[0].length && y < matrix.length) {
                if (matrix[y][x] == character) {
                    arr.push(this.directions[i])
                }
            }
        }

        return arr;
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