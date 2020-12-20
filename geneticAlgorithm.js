// Function for creating next Generation
function nextGeneration() {
    // Increment variable gen
    gen++;

    // Chnage maxScore to 0
    maxScore = 0;

    // Call calculateFitness() function
    calculateFitness();

    // Create new Bots
    for (let i = 0; i < TOT; i++) {
        bots[i] = pickOne();
    }
    
    // Dispose previous generation's bots
    for (let i = 0; i < TOT; i++) {
        savedBots[i].dispose();
    }
    savedBots = [];
}

// Function to pick a Bot from the savedBots and creating its child
function pickOne() {
    let index = 0;
    let r = random(1);

    while (r > 0) {
        r = r - savedBots[index].fitness;
        index++;
    }
    index--;

    // Select a Bot from previous generation
    let bot = savedBots[index];

    // Create its child by using its brain
    let child = new Bot(bot.brain);

    // mutate the child
    child.mutate();
    return child;
}

// Function to calculate fitness of each Bot
function calculateFitness() {
    let sum = 0;
    // Calculate sum of scores of all the Bots
    for (let bot of savedBots) {
        sum += bot.score;
    }

    // Fitness of each Bot is calculated by dividing its score
    // by total score
    for (let bot of savedBots) {
        bot.fitness = bot.score / sum;
    }
}