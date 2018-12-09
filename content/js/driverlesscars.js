// Select a level
const level = metacar.level.level1;
// Create an instance of the environment
const env = new metacar.env("canvas", level);
// Load it
//env.load();

// Load the agent we created
var agent = new PolicyAgent(env);

env.loop(() => {
    let state = env.getState().lidar;
    displayState("realtime_viewer", state, 200, 200);
    let scores = agent.getStateValues(state);
    let reward = env.getLastReward();
    displayScores("realtime_viewer", scores, reward, ["Top", "Left", "Right"]);
});

// Once the environment is loaded, Add methods to listen to the activity
env.load().then(() => {

    env.addEvent("train", () =>{
        let train = confirm("The training process is computationally demanding. This may make your tab unresponsive. Sure you want to continue?");
        if (train) {
            agent.train();
        }
    });

    env.addEvent("play", () => agent.play());
    env.addEvent("stop", () => agent.stop());
    env.addEvent("save", () => agent.save());

    env.addEvent("load", () => {
        document.getElementById("metacar_canvas_button_train").style.display = "none";
        agent.restore();
    });

})
