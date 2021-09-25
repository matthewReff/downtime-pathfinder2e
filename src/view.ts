import { AddDowntimeForm } from "./addDowntimeForm";
import { DowntimeState } from "./downtimeState";
//import { DowntimeLogic } from "./downtimeLogic";


const state: DowntimeState = new DowntimeState()
//let logic: DowntimeLogic = new DowntimeLogic()

Hooks.on("init", function() {
  console.log("This code runs once the Foundry VTT software begins it's initialization workflow.");
});

Hooks.on("ready", function() {
  console.log("This code runs once core initialization is ready and game data is available.");
  const pathfinderConfig = CONFIG['PF2E'];
  console.log(pathfinderConfig['skillList']);
  const settingsContainer = document.getElementById("settings-game")
  //const temp3: Game = game as Game;
  //temp3.users?.apps?.push(this);

  const button = document.createElement("button")
  button.innerText = "Print Debug 1"
  button.onclick = function(){
    if(canvas?.tokens)
    {
      const tokens = canvas.tokens.controlled;
      if (tokens.length > 0){
        const actor = tokens[0].actor;
        if (actor && actor.data.type != "npc")
        {
          console.log(actor.getRollData());
        }
      } else {
        console.log("No Tokens were selected");
      }
    }
  };
  if(settingsContainer){
    settingsContainer.appendChild(button)
  }

  const button2 = document.createElement("button")
  button2.innerText = "Print Debug 2"
  button2.onclick = function(){
    // Add New Downtime Activity
    const form = new AddDowntimeForm(state, []);
    form.render(true);
  };
  if(settingsContainer){
    settingsContainer.appendChild(button2)
  }
});