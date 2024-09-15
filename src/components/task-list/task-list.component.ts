import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { TaskComponent } from '../task/task.component';
import { ITask } from '../../interfaces/task.interface';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { v4 as uuidv4 } from 'uuid';
import { TaskManagerService } from '../../services/taks-manager.service';

// то что пренадлежит компоненте находится в компонененте, например, создание формы - new FormGroup().

@Component({
    selector: 'app-task-list',
    standalone: true,
    imports: [CommonModule, RouterOutlet, TaskComponent, FormsModule, ReactiveFormsModule],
    templateUrl: './task-list.component.html',
    styleUrl: './task-list.component.scss'
})
export class TaskListComponent {

    public readonly form: FormGroup = new FormGroup({ title: new FormControl<string>('', Validators.required) });
    public counter: number = 0;
    public taskId!: string;
    public readonly taskManagerService: TaskManagerService = inject(TaskManagerService);

    public addTask(): void {
        const req: ITask = { title: this.form.controls['title'].value, id: uuidv4() };
        this.taskManagerService.addTask(req);
        this.form.reset();
    }

    public deleteTask(id: string): void {
        this.taskManagerService.deleteTask(id);
        this.counter--;
    }

    public changeTask(id: string): void {
        this.taskId = id;
    }

    public saveEdit(title: string, id: string): void {
        const req: ITask = { title, id };
        this.taskId = '';
        this.taskManagerService.editTask(req);
    }

    public changeCounter(): void {
        this.counter++;
    }

    public trackByFn(index: number, item: ITask): string {
        return `${item.id}`;
    }
}
