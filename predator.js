class Predator extends LivingCreature{
    constructor(x, y) {
        super(x, y)
        this.energy = 20;
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
