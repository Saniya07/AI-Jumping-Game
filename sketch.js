const TOT = 250;          // Stores number of Bots to be created in each generation
let bots = [];            // Array of type Bot
let savedBots = [];       // Array of type Bot
let bars = [];            // Array of type Bar
let counter = 0;
let slider;               // To create slider
let gen = 0;              // Store current generation number
let maxScore = 0;         // Store maxScore of current generation

function setup() {
    // create a Canvas using p5 library
    createCanvas(windowWidth, 3 * windowHeight / 4);
    // to set bg image of canvas
    bg = loadImage('assets/Galaxy1.png')
    tf.setBackend('cpu');

    // create slider to increase speed using ps5 library
    slider = createSlider(1, 10, 5);
    slider.position(windowWidth / 2 - 150, 4 * windowHeight / 5 + 90);
    slider.addClass("slide");

    // Create Bots of current generation
    for (let i = 0; i < TOT; i++) {
        bots[i] = new Bot();
    }
}

function draw() {
    for (let n = 0; n < slider.value(); n++) {

        // create Bar
        if (counter % 70 == 0) {
            pos = random(0, 250);
            b = new Bar(pos);
            bars.push(b);
        }

        // Increment counter
        counter++;

        // Update Bar until it is offScreen
        for (let i = bars.length - 1; i >= 0; i--) {
            bars[i].update();
            // Check if any Bot hit the bar
            for (let j = bots.length - 1; j >= 0; j--) {
                // If Bot hits Bar, push it in savedBots
                if (bars[i].hits(bots[j])) {
                    savedBots.push(bots.splice(j, 1)[0]);
                }
            }
            if (bars[i].offscreen()) {
                bars.splice(i, 1);
            }
        }

        // If Bot hits ground, update it
        // If Bot is offScreen, push it in savedBots
        for (let i = bots.length - 1; i >= 0; i--) {
            // If Bot hits ground, 
            if (bots[i].hitGround()) {
                bots[i].vy = 0;
                bots[i].y = height - bots[i].r / 2;
            }

            if (bots[i].offScreen()) {
                savedBots.push(bots.splice(i, 1)[0]);
            }
        }

        // Make each Bot think and then update it
        for (let bot of bots) {
            bot.think(bars);
            bot.update();
        }

        // If no bots are left, then create next generation
        if (bots.length === 0) {
            counter = 0;
            nextGeneration();
            bars = [];
        }
    }

    // Display which generation is currently going and its 
    // maxScore.
    background(bg)
    textSize(25);
    noStroke();
    fill(0);
    text('Max Score:', 10, 30);
    text('Generation:', 10, 65);

    maxScore = 0
    for (let bot of bots) {
        bot.show();
        maxScore = max(maxScore, bot.score);
    }

    stroke(251, 202, 3);
    fill(251, 202, 3)
    text(str(maxScore), 150, 30);
    text(str(gen), 150, 65);

    for (let bar of bars) {
        bar.show();
    }
}