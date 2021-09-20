# About
Module that provides some basic downtime automation functionality for the [Pathfinder2E system](https://foundryvtt.com/packages/pf2e/) in [FoundryVTT](https://foundryvtt.com/)

# Borrowed Dev Instructions From Template
## Setup:
About Bundler:  
This project uses webpack to bundle your files. What this means is that every script file in src/ will get 'bundled' into one output .js file in dist/.
Likewise every static file (.html, .json, etc.) in static/ will get moved to dist.  
Because of this you should NOT have your development working directory inside the foundryuser folder. Instead you should follow the instructions below
for setting up symantic links between the dist/ folder and foundryuser.

- Run npm install
- run: npm run build  
- Create a symantic link between the dist/ folder to a module folder in FoundryUser/Data/modules/downtime-pathfinder2e  
--	Instructions (for windows) 
--	Open a command prompt and navigate to FoundryUser/Data/modules   
--	Run: mklink /D downtime-pathfinder2e [repo base directory]/dist  

## Usage:
Development: 
To run with hotswap enabled run the command: `npm run start`

Release:
To ready the project for release run the command: `npm run build:production`

CD/CI:
This template is setup with automatic github release, developed by League of Foundry Developers in
their FoundryVtt-Module-Template. https://github.com/League-of-Foundry-Developers/FoundryVTT-Module-Template 

## Troubleshooting:
Hot Reload force refreshes my page!
 - access foundry through localhost:8080 instead of localhost:30000
 - You might have multiple modules running HMR. It is critical that if you are working on multiple modules that only a single module is using hot module reload at a time. 

# Credits:
Webpack-based hot reload template pulled from: https://github.com/Blackcloud010/FoundryVTT-Module-Template-Hotswap
Lots of code and ideas canibalized from: https://github.com/Ethck/Ethck-s-Downtime-Tracking
