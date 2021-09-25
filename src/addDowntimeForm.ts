import { DowntimeState } from "./downtimeState"

interface DowntimeData {
	skills: any[] //TODO This is a StatisticModifier, why isn't that in types?
};

const FORM_TEMPLATE = "modules/downtime-pathfinder2e/templates/add-downtime-form2.html";

class AddDowntimeForm extends FormApplication<FormApplication.Options, DowntimeData> {
	state: DowntimeState;
    
    constructor(state: DowntimeState, [...args]) {
	  super([...args]);
      this.state = state;
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
        const taskLevel: number = Number(formData["task.level"]?.toString()) ?? 0;
        const skillName: string = formData["task.skill"]?.toString() ?? "unknownSkillName";
        const taskName: string = formData["name"]?.toString() ?? "unknownTaskName";
        this.state.createTask(taskName, skillName, taskLevel);
	}

	async getData()
	{
		const skillsList: any[] = CONFIG['PF2E']['skillList'];
		return {
			skills: skillsList
		}
	}
}

export { AddDowntimeForm }