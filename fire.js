class Fire {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.energy = 20;
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
            let x = this.directions[i][0];
            let y = this.directions[i][1];

            if (x >= 0 && y >= 0 && x < matrix[0].length && y < matrix.length) {
                if (matrix[y][x] == character) {
                    arr.push(this.directions[i])
                }
            }

        }

        return arr;
    }
    
    mul() {
        let newCell = random(this.chooseCell(0));
        if (newCell) {
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = 5;
            let fire = new Fire(newX,newY);
            fireArr.push(fire);
            this.energy = 0;
        }
    }
    die() {
        matrix[this.y][this.x] = 0;
        for (var i in fireArr) {
            if (fireArr[i].x == this.x && fireArr[i].y == this.y) {
                fireArr.splice(i, 1)
            }
        }
    }
    eat() {
        let newCell = random(this.chooseCell(3).concat(this.chooseCell(2)));
        
        if (newCell) {
            this.energy += 2;
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = matrix[this.y][this.x]
            matrix[this.y][this.x] = 0;
            this.x = newX;
            this.y = newY;


            for (var i in predatorArr) {
                if (predatorArr[i].x == newX && predatorArr[i].y == newY) {
                    predatorArr.splice(i, 1)
                }
            }
            for (var i in grassEaterArr) {
                if (grassEaterArr[i].x == newX && grassEaterArr[i].y == newY) {
                    grassEaterArr.splice(i, 1)
                }
            }

            if (this.energy > 10) {
                this.mul()
            }
        }
        else { this.move() }
    }
    move() {
        this.energy--;
        if (this.energy <= 0) {
            this.die();
        }
        else {
            let newCell = random(this.chooseCell(0));
            if (newCell) {
                var newX = newCell[0];
                var newY = newCell[1];
                matrix[newY][newX] = matrix[this.y][this.x]
                matrix[this.y][this.x] = 0;
    
                this.x = newX
                this.y = newY
            }
        }
    }
}