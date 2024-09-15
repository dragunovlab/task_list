import { Injectable } from "@angular/core";
import { ITask } from "../interfaces/task.interface";
import { TaskStoreService } from './task-store.service';

@Injectable()
export class TaskManagerService {

    public get taskList(): ITask[] {
        return JSON.parse(localStorage.getItem('items') ?? '');
    }

    private _taskList: ITask[] = JSON.parse(localStorage.getItem('items') || '') ?? [];

    constructor(private taskStoreService: TaskStoreService) {
    }

    public addTask(task: ITask): void {
        this._taskList.push(task);
        this._taskList = [...this._taskList];
        console.log(this._taskList);

        this.taskStoreService.addStorage(this._taskList);
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
    }
}
