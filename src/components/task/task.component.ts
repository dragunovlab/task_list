import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
    selector: 'app-task',
    standalone: true,
    imports: [CommonModule, RouterOutlet, ReactiveFormsModule],
    templateUrl: './task.component.html',
    styleUrl: './task.component.scss'
})
export class TaskComponent {

    @Input()
    public title!: string;

    @Input()
    public isEdit!: boolean;

    @Output()
    public deleteEvent: EventEmitter<void> = new EventEmitter<void>();

    @Output()
    public editEvent: EventEmitter<void> = new EventEmitter<void>();

    @Output()
    public saveEvent: EventEmitter<string> = new EventEmitter<string>();

    public control: FormControl = new FormControl(this.title);

    public deleteTask(): void {
        this.deleteEvent.emit();
    }

    public editTask(): void {
        this.editEvent.emit();
    }

    public save(): void {
        this.saveEvent.emit(this.control.value);
    }
}

// dump - глупая компонента (не несет в себе никакой логики, а только отображение, принимает данные и отдает данные + эвенты)
