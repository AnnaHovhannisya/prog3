class Predator {
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
        var found = [];
        this.getNewCoordinates();
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];

            if (x >= 0 && y >= 0 && x < matrix[0].length && y < matrix.length) {
                if (matrix[y][x] == character) {
                    found.push(this.directions[i])
                }
            }

        }

        return found;
    }

    mul() {
        var newCell = random(this.chooseCell(0));
        if (newCell) {
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = 3;

            var predator = new Predator(newX, newY);
            predatorArr.push(predator);
            this.energy = 0;
        }
    }
    die() {
        matrix[this.y][this.x] = 0;
        for (var i in predatorArr) {
            if (predatorArr[i].x == this.x && predatorArr[i].y == this.y) {
                predatorArr.splice(i, 1);
                break;
            }
        }
    }
    eat() {
        // this.getNewDirections();
        var newCell = random(this.chooseCell(2));
        if (newCell) {
            this.energy += 2;
            var newX = newCell[0];
            let newY = newCell[1];
            matrix[newY][newX] = matrix[this.y][this.x];
            matrix[this.y][this.x] = 0;

            this.y = newY;
            this.x = newX;

            for (var i in grassEaterArr) {
                if (newX == grassEaterArr[i].x && newY == grassEaterArr[i].y) {
                    grassEaterArr.splice(i, 1)
                    break;
                }
            }

            if (this.energy > 60) {
                this.mul()
            }
        }
        else { this.move() }
    }
    move() {
        this.energy--;
        let newCell = random(this.chooseCell(0));
        if (newCell && this.energy >= 0) {
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = matrix[this.y][this.x];
            matrix[this.y][this.x] = 0;

            this.y = newY;
            this.x = newX;
        } else {
            this.die();
        }

    }
}
