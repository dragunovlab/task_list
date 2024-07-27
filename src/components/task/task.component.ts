import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

@Component({
    selector: 'app-task',
    standalone: true,
    imports: [CommonModule, RouterOutlet],
    templateUrl: './task.component.html',
    styleUrl: './task.component.scss'
})
export class TaskComponent {

    @Input()
    public title!: string;

    @Output()
    public deleteEvent: EventEmitter<void> = new EventEmitter<void>();

    @Output()
    public editEvent: EventEmitter<void> = new EventEmitter<void>();

    public deleteTask(): void {
        this.deleteEvent.emit();
    }

    public editTask(): void {
        this.editEvent.emit();
    }
}

// dump - глупая компонента (не несет в себе никакой логики, а только отображение, принимает данные и отдает данные + эвенты)