interface IncomeTableEntry {
    readonly taskLevel: number;
    readonly DC: number;
    readonly failedReward: number;
    readonly trainedReward: number;
    readonly expertReward: number;
    readonly masterReward: number;
    readonly legendaryReward: number;
}

interface DowntimeData {
	skills: any[] //TODO This is a StatisticModifier, why isn't that in types?
};

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

const FORM_TEMPLATE = "modules/downtime-pathfinder2e/templates/add-downtime-form2.html";

class AddDowntimeTypeForm extends FormApplication<FormApplication.Options, DowntimeData> {
	constructor([...args]) {
	  super([...args]);
	}

	static get defaultOptions() {
		return mergeObject(super.defaultOptions, {
			id           : "downtime-pathfinder2e",
			template     : FORM_TEMPLATE,
			title        : "Downtime Activity Modification",
			closeOnSubmit: true,
			popOut       : true,
			width        : 800,
			height       : 800,
		} as FormApplication.Options);
	}

	async _updateObject(event: Event, formData: FormData) {
		console.log(event);
		console.log(formData);
		// TODO Use formData to set settings
	}

	async getData()
	{
		const skillsList: any[] = CONFIG['PF2E']['skillList'];
		return {
			skills: skillsList
		}
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

export {IncomeTableEntry, Task, AddDowntimeTypeForm, SuccessLevel, SuccessLevelInverse}