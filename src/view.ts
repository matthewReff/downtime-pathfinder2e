import { Form } from "./commonClasses";

Hooks.on("init", function() {
  console.log("This code runs once the Foundry VTT software begins it's initialization workflow.");
});

Hooks.on("ready", function() {
  console.log("This code runs once core initialization is ready and game data is available.");
  console.log(CONFIG['PF2E']['skillList']);
  const settingsContainer = document.getElementById("settings-game")
 
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
    const form = new Form([]);
    form.render(true);
  };
  if(settingsContainer){
    settingsContainer.appendChild(button2)
  }
});