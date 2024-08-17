import { Injectable } from "@angular/core";
import { ITask } from "../interfaces/task.interface";

@Injectable()
export class TaskManagerService {

    public get taskList(): ITask[] {
        return this._taskList;
    }

    private _taskList: ITask[] = [];

    public addTask(task: ITask): void {
        this._taskList.push(task);
        this._taskList = [...this._taskList];
    }

    public deleteTask(id: string): void {
        this._taskList = this._taskList.filter(item => item.id !== id);
    }

    public editTask(task: ITask): void {
        this._taskList = this._taskList.map(item => {
            if (item.id === task.id) {
                return task
            }

            return item;
        });

        console.log(this._taskList);
    }
}
