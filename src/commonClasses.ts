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

const FORM_TEMPLATE = "modules/downtime-pathfinder2e/templates/add-downtime-form.html";

class Form extends FormApplication {
	constructor([...args]) {
	  super([...args]);

	  const temp3: Game = game as Game;
	  temp3.users?.apps?.push(this);
	}

	static get defaultOptions() {
		return mergeObject(super.defaultOptions, {
			id           : "downtime-pathfinder2e",
			template     : FORM_TEMPLATE,
			title        : "Downtime Activity Modification",
			closeOnSubmit: true,
			popOut       : true,
			width        : 800,
			height       : "auto",
		} as FormApplication.Options);
	}

	async _updateObject(event: Event, formData: FormData) {
		console.log(event);
		console.log(formData);
	}
}

export {IncomeTableEntry, Task, Form}