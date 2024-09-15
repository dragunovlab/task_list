import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ITask } from '../../interfaces/task.interface';

@Component({
    selector: 'app-task',
    standalone: true,
    imports: [CommonModule, RouterOutlet, ReactiveFormsModule],
    templateUrl: './task.component.html',
    styleUrl: './task.component.scss'
})
export class TaskComponent implements OnInit {

    @Input()
    public item!: ITask;

    @Input()
    public id!: string;

    @Output()
    public completeEvent: EventEmitter<void> = new EventEmitter<void>();

    @Output()
    public deleteEvent: EventEmitter<void> = new EventEmitter<void>();

    @Output()
    public editEvent: EventEmitter<string> = new EventEmitter<string>();

    @Output()
    public saveEvent: EventEmitter<string> = new EventEmitter<string>();

    public control!: FormControl;

    public ngOnInit(): void {
        this.control = new FormControl(this.item.title);
    }

    public completeTask(): void {
        this.completeEvent.emit();
    }

    public deleteTask(): void {
        this.deleteEvent.emit();
    }

    public editTask(id: string): void {
        this.editEvent.emit(id);
    }

    public save(): void {
        this.saveEvent.emit(this.control.value);
    }
}

// dump - глупая компонента (не несет в себе никакой логики, а только отображение, принимает данные и отдает данные + эвенты)
