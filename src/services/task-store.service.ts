import { Injectable } from '@angular/core';
import { ITask } from '../interfaces/task.interface';

@Injectable()
export class TaskStoreService {

    public addStorage(items: ITask[]): void {
        localStorage.setItem('items', JSON.stringify(items));
    }

    // public removeStorage(items: ITask[]): void {
    //     localStorage('items', JSON.stringify(items));
    // }

}