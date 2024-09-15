import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { TaskListComponent } from '../components/task-list/task-list.component';
import { TaskManagerService } from '../services/taks-manager.service';
import { TaskStoreService } from '../services/task-store.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, TaskListComponent],
  providers: [
    TaskManagerService,
    TaskStoreService
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
}


// ДЗ !!!
// 1) сверстать прогресс бар или найти заготовку
// 2) подумать над исключающими случаями (проверки)
// 3) посмотреть в сторону rxjs (попробовать решить проблему с помощью него), если не получится то тогда с помощью массивов (map)
// 4) проработать стейт с localStorage (удаление, редактирование)
// 5) проработать interface с новым полем isCompleted


// идея по прогресс-бару
// группировка задач -> задача и подзадачи
// 1 - 1.1, 1.2, 1.3