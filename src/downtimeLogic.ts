import { IncomeTableEntry } from "./commonClasses";

class DowntimeLogic{
    // Sourced from: https://2e.aonprd.com/Actions.aspx?ID=23
    private lookup: ReadonlyArray<IncomeTableEntry> = [
        {taskLevel: 0, DC: 14, failedReward: 1, trainedReward: 5, expertReward: 5, masterReward: 5, legendaryReward: 5},
        {taskLevel: 1, DC: 15, failedReward: 2, trainedReward: 20, expertReward: 20, masterReward: 20, legendaryReward: 20},
        {taskLevel: 2, DC: 16, failedReward: 4, trainedReward: 30, expertReward: 30, masterReward: 30, legendaryReward: 30},
        {taskLevel: 3, DC: 18, failedReward: 8, trainedReward: 50, expertReward: 50, masterReward: 50, legendaryReward: 50},
        {taskLevel: 4, DC: 19, failedReward: 10, trainedReward: 70, expertReward: 80, masterReward: 80, legendaryReward: 80},
        {taskLevel: 5, DC: 20, failedReward: 20, trainedReward: 90, expertReward: 100, masterReward: 100, legendaryReward: 100},
        {taskLevel: 6, DC: 22, failedReward: 30, trainedReward: 150, expertReward: 200, masterReward: 200, legendaryReward: 200},
        {taskLevel: 7, DC: 23, failedReward: 40, trainedReward: 200, expertReward: 250, masterReward: 250, legendaryReward: 250},
        {taskLevel: 8, DC: 24, failedReward: 50, trainedReward: 250, expertReward: 300, masterReward: 300, legendaryReward: 300},
        {taskLevel: 9, DC: 26, failedReward: 60, trainedReward: 300, expertReward: 400, masterReward: 400, legendaryReward: 400},
        {taskLevel: 10, DC: 27, failedReward: 70, trainedReward: 400, expertReward: 500, masterReward: 600, legendaryReward: 600},
        {taskLevel: 11, DC: 28, failedReward: 80, trainedReward: 500, expertReward: 600, masterReward: 800, legendaryReward: 800},
        {taskLevel: 12, DC: 30, failedReward: 90, trainedReward: 600, expertReward: 800, masterReward: 1000, legendaryReward: 1000},
        {taskLevel: 13, DC: 31, failedReward: 100, trainedReward: 700, expertReward: 1000, masterReward: 1500, legendaryReward: 1500},
        {taskLevel: 14, DC: 32, failedReward: 150, trainedReward: 800, expertReward: 1500, masterReward: 2000, legendaryReward: 2000},
        {taskLevel: 15, DC: 34, failedReward: 200, trainedReward: 1000, expertReward: 2000, masterReward: 2800, legendaryReward: 2800},
        {taskLevel: 16, DC: 35, failedReward: 250, trainedReward: 1300, expertReward: 2500, masterReward: 3600, legendaryReward: 4000},
        {taskLevel: 17, DC: 36, failedReward: 300, trainedReward: 1500, expertReward: 3000, masterReward: 4500, legendaryReward: 5500},
        {taskLevel: 18, DC: 38, failedReward: 400, trainedReward: 2000, expertReward: 4500, masterReward: 7000, legendaryReward: 9000},
        {taskLevel: 19, DC: 39, failedReward: 600, trainedReward: 3000, expertReward: 6000, masterReward: 10000, legendaryReward: 13000},
        {taskLevel: 20, DC: 40, failedReward: 800, trainedReward: 4000, expertReward: 7500, masterReward: 15000, legendaryReward: 20000},
        {taskLevel: 21, DC: -1, failedReward: -1, trainedReward: 5000, expertReward: 9000, masterReward: 17500, legendaryReward: 30000} 
    ]

    calculateReward(taskLevel: number, roll: DiceTerm.Result, expertise: string): number{
        let associatedTableEntry: IncomeTableEntry = this.lookup[taskLevel];
        let successLevel: number = this.rollSkillCheck(roll, associatedTableEntry.DC);

        // Failure states are easy, just return them
        if (successLevel == 0)
        {
            return 0;
        }
        else if(successLevel == 1)
        {
            return associatedTableEntry.failedReward;
        }

        if(successLevel == 3)
        {
            associatedTableEntry = this.lookup[taskLevel];
        }

        switch(expertise)
        {
            case("trained"):
                return associatedTableEntry.trainedReward;
            case("expert"):
                return  associatedTableEntry.expertReward;
            case("master"):
                return associatedTableEntry.masterReward;
            case("legendary"):
                return associatedTableEntry.legendaryReward;
            // Ouch, something broke
            default:
                return -1;
         }
    }

    // This really seems like it should already exist somewhere...
    // TODO use enums, it's cleaner
    rollSkillCheck(roll: DiceTerm.Result, DC: number): number{
        var successLevel;

        // Calculate base success
        if (roll.result <= DC - 10)
        {
            successLevel = 0;
        }
        else if (roll.result < DC)
        {
            successLevel = 1;
        }
        else if (roll.result >= DC + 10)
        {
            successLevel = 3;
        }
        else
        {
            successLevel = 2;
        }

        // Modify for dice crits
        if (roll.success)
        {
            successLevel++;
        }
        else if (roll.failure)
        {
            successLevel--;
        }

        if (successLevel < 0)
        {
            successLevel = 0;
        }
        if (successLevel > 3)
        {
            successLevel = 3;
        }
        return successLevel;
    }
}

export { DowntimeLogic }