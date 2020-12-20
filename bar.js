// This class defines the bars that need to be jumped by AI
class Bar {
    // constructor for the Bar
    constructor(pos) {
        // height of the Bar is choosen at random
        this.top = random(height / 6, (2 / 3) * height);

        // Bar's x coordinate
        this.x = width + pos;

        // width of Bar
        this.w = 80;

        // speed at which Bar will move
        this.speed = 8;
    }

    // Function to check if the bot/ball hit the Bar or not
    hits(bot) {
        // The y-axis of canvas starts from top
        // The x-axis of canvas starts fron left
        if (bot.y > height - this.top) {
            if (bot.x > this.x && bot.x < this.x + this.w) {
                return true;
            }
        }
        return false;
    }

    // Function to display Bar
    show() {
        // Outline of Bar RGB
        stroke(121, 121, 121);

        // Color of Bar RGB
        fill(121, 121, 121);

        // To draw Bar form corners
        rectMode(CORNER);

        // Draw Bar
        // Takes top left and bottom right
        rect(this.x, height - this.top, this.w, this.top);
    }

    // Function to move Bar 
    update() {
        // Decrement the x - coordinae of Bar by speed
        this.x -= this.speed;
    }

    // Function to check if Bar is out of screen or not
    offscreen() {
        // If x-coordinate of Bar is less than negative of its width,
        // then Bar is off screen.
        if (this.x < -this.w) {
            return true;
        }
        return false;
    }
}