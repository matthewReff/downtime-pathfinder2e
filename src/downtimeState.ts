import { Set } from "typescript-collections";
import { Task } from "./commonClasses";

// All state modification *should* be transactional and nice
class DowntimeState {
	private createdTasks: Set<Task>;

	constructor() {
		this.createdTasks = new Set<Task>();
	}

	createTask(taskName: string, loreString: string, taskLevel: number): boolean{
		let compareTask: Task = new Task(taskName, loreString, taskLevel);
		if (this.createdTasks.contains(compareTask)){
			return false
		}
		this.createdTasks.add(compareTask);
		return true;
	}

	updateTask(oldTaskName: string, oldloreString: string, oldTaskLevel: number, newTaskName: string, newLoreString: string, newTaskLevel: number): boolean{
		// check if old task exists
		let oldTask: Task = new Task(oldTaskName, oldloreString, oldTaskLevel);
		if (!this.createdTasks.contains(oldTask)){
			return false;
		}

		// Check if new task exists
		let newTask: Task = new Task(newTaskName, newLoreString, newTaskLevel);
		if (this.createdTasks.contains(newTask)){
			return false;
		}

		// Delete old task, create new task
		return this.deleteTask(oldTaskName, oldloreString, oldTaskLevel) && this.createTask(newTaskName, newLoreString, newTaskLevel)
	}

	deleteTask(taskName: string, loreString: string, taskLevel: number): boolean{
		let compareTask: Task = new Task(taskName, loreString, taskLevel);
		if (this.createdTasks.contains(compareTask)){
			this.createdTasks.remove(compareTask);
			return true;
		}
		return false;
	}

	getTasks(): Task[]{
		return this.createdTasks.toArray();
	}
}

export { DowntimeState }