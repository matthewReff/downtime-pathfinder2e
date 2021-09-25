interface IncomeTableEntry {
    readonly taskLevel: number;
    readonly DC: number;
    readonly failedReward: number;
    readonly trainedReward: number;
    readonly expertReward: number;
    readonly masterReward: number;
    readonly legendaryReward: number;
}


class Task {
	name: string;
	lore: string;
	level: number;

	constructor(name: string, lore: string,	level: number) {
		this.name = name;
		this.lore = lore;
		this.level = level;
	}
}


enum SuccessLevel {
	CriticalFailure = 0,
	Failure = 1,
	Success = 2,
	CriticalSuccess = 3
}

// Gross reverse mapping
abstract class SuccessLevelInverse {
	static convert(successValue: number) {
        switch (successValue)
        {
            case(0):
                return SuccessLevel.CriticalFailure;
            case(1):
                return SuccessLevel.Failure;
            case(2):
                return SuccessLevel.Success
            case(3):
                return SuccessLevel.CriticalSuccess
            default:
            	throw new RangeError("Success value has no valid conversion")
        }
	}
}

export { IncomeTableEntry, Task, SuccessLevel, SuccessLevelInverse }