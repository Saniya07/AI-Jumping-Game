// This class defines a Bot/Ball
class Bot {
    // constructor for Bot
    constructor(brain) {
        // Radius of Bot/Ball
        this.r = 32;

        // Starting coordinates of Bot/Ball
        this.y = height - this.r / 2;
        this.x = 64;

        // Gravity of Bot/Ball, for when it falls
        this.gravity = 0.9;

        // Initial velocities of Bot/Ball
        this.vy = 0;
        this.vx = 0;

        // Absolute coordinates
        this.ax = 0;
        this.ay = 0;

        // Score and Fitness of Bot/Ball
        this.score = 0;
        this.fitness = 0;

        if (brain) {
            this.brain = brain.copy();
        }
        // Create brain for Bot/Ball
        else {
            this.brain = new NeuralNetwork(6, 8, 2);
        }
    }

    // Dispose Bot's brain
    dispose() {
        this.brain.dispose();
    }

    // Styling of Bot
    show() {
        // Outline of Bot
        stroke(79, 182, 159);

        // Color of Bot and its transparency
        fill(79, 182, 159, 100);
        // stroke(245, 81, 76);
        // fill(245, 81, 76, 100);

        // Shape of Bot
        // Takes centre and minor and major radius
        ellipse(this.x, this.y, this.r, this.r);
    }

    // Mutate Bot's brain
    mutate() {
        // call mutate function of brain by passing argument 0.1,
        // which is the rate
        this.brain.mutate(0.1);
    }

    // This function helps Bot to think
    // Parameter is the approaching Bars
    think(bars) {
        let closestBar = null;
        let closestD = Infinity;

        // Get closest Bar
        for (let i = 0; i < bars.length; i++) {
            let d = bars[i].x + bars[i].w - this.x;
            if (d < closestD && d > 0) {
                closestBar = bars[i];
                closestD = d;
            }
        }

        // Find position and height of closest Bar
        let posBar = 0
        let heiBar = 0
        if (closestBar) {
            if (closestBar.x <= width) {
                posBar = closestBar.x;
                heiBar = closestBar.top;
            }
        }

        // If Bot is on ground
        if (this.y == height - this.r / 2) {
            // Create inputs[], to create Tensor
            let inputs = [];
            inputs[0] = this.vx / 10;
            inputs[1] = this.vy / 10;
            inputs[2] = this.x / width;
            inputs[3] = this.y / height;
            inputs[4] = posBar / width;
            inputs[5] = heiBar / height;

            // Get the output for the Bot to peform
            let output = this.brain.predict(inputs);

            // Update ax and ay
            this.ax = output[0];
            this.ay = output[1];
        }
        else {
            this.ax = 0;
            this.ay = 0;
        }
    }

    // Function to check if Bot is off screen
    offScreen() {
        // If height of Bot is less than 0.
        if (this.y < 0) return true;

        // If x-coordinate of Bot is less than or more than screen
        if (this.x > width || this.x < 0) return true;
        return false;
    }

    // If Bot hits ground
    hitGround() {
        if (this.y + this.r / 2 >= height) return true;
        return false;
    }

    // Updafe score and velocities of Bot
    update() {
        // Increment Bot's score
        this.score++;

        // Change velocities and position of Bot
        this.vy = this.vy + this.gravity - this.ay;
        this.y += this.vy;

        this.vx += this.ax;
        this.x += this.vx;
    }
}