import { Component, DestroyRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { TaskComponent } from '../task/task.component';
import { ITask } from '../../interfaces/task.interface';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { v4 as uuidv4 } from 'uuid';
import { TaskManagerService } from '../../services/taks-manager.service';
import { HttpClientModule } from '@angular/common/http';
import { TaskRequestService } from '../../services/task-request.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { map, Observable, switchMap, tap } from 'rxjs';

// то что пренадлежит компоненте находится в компонененте, например, создание формы - new FormGroup().

@Component({
    selector: 'app-task-list',
    standalone: true,
    imports: [CommonModule, RouterOutlet, TaskComponent, FormsModule, ReactiveFormsModule, HttpClientModule],
    providers: [
        TaskRequestService
    ],
    templateUrl: './task-list.component.html',
    styleUrl: './task-list.component.scss'
})
export class TaskListComponent {

    public readonly taskManagerService: TaskManagerService = inject(TaskManagerService);
    public readonly taskRequestService: TaskRequestService = inject(TaskRequestService);
    public readonly destroyRef: DestroyRef = inject(DestroyRef);

    public counter: number = 0;
    public taskId!: string;
    public tasks$!: Observable<ITask[]>
    public readonly form: FormGroup = new FormGroup({ title: new FormControl<string>('', Validators.required) });

    constructor() {
        this.tasks$ = this.getTaskList();
    }

    public addTask(): void {
        const req: ITask = { title: this.form.controls['title'].value, id: uuidv4(), isCompleted: false };
        this.taskRequestService.addTask(req)
            .pipe(
                tap(() => this.updateTasks()),
                takeUntilDestroyed(this.destroyRef)
            ).subscribe();
        this.form.reset();
    }

    public deleteTask(id: string): void {
        this.taskRequestService.deleteTask(id)
            .pipe(
                takeUntilDestroyed(this.destroyRef)
            )
            .subscribe();
        this.updateTasks();
    }

    private getTaskList(): Observable<ITask[]> {
        return this.taskRequestService.getTaskList();
    }

    private updateTasks(): void {
        this.tasks$ = this.getTaskList();
    }

    public changeTask(id: string): void {
        this.taskId = id;
    }

    public saveEdit(title: string, id: string): void {
        const req: ITask = { title, id };
        this.taskId = '';
        this.taskManagerService.editTask(req);
    }

    public changeCounter(event: boolean): void {
        event ? this.counter++ : this.counter--;
    }

    public trackByFn(index: number, item: ITask): string {
        return `${item.id}`;
    }
}