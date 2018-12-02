// Select a level
const level = metacar.level.level1;
// Create the environement
const env = new metacar.env("env", level);
// Load it
//env.load();

env.setAgentLidar({pts: 3, width: 1.5, height: 1.5, pos: 1});

env.load().then(() => {

    env.addEvent("play", () => {
        // Move forward
        const reward = env.step(0);
        // Log the reward
        console.log(reward);
    });

    env.addEvent("stop", () => {
        console.log("The stop button has been pressed.");
    });

    env.addEvent("Shuffle only the agent", () => {
        env.shuffle({cars: false});
    });

    env.addEvent("Shuffle all", () => {
        env.shuffle();
    });

    env.addEvent("train", () => {
        for (let s=0; s < 100; s++){
            // Get the current state of the lidar
            const state = env.getState();
            // Move forward
            const reward = env.step(0);
        }
        // Log the reward
        env.render(true);
    });

})
