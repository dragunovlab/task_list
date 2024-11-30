import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { TaskListComponent } from '../components/task-list/task-list.component';
import { TaskManagerService } from '../services/taks-manager.service';
import { TaskStoreService } from '../services/task-store.service';
import { fromEvent, map, Observable, Subject, Subscriber, take, takeUntil } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    TaskListComponent
  ],
  providers: [
    TaskManagerService,
    TaskStoreService
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit, OnDestroy {

  // RxJs

  public destroy$: Subject<void> = new Subject<void>();
  public stream$: Observable<string> = new Observable((observer: Subscriber<string>) => {
    observer.next('10');
    observer.next('7');
    observer.next('15');
    observer.next('20');
    observer.next('30');
  });

  public ngOnInit(): void {
    this.stream$
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe({
        next: value => {
          console.log(value);
        },
        error: () => {
          console.log('error')
        },
        complete: () => {
          console.log('complete')
        }
      });
  }

  public onUnSubscribe(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public ngOnDestroy(): void {
  }

}


// observer -> { next, error, complete }




// ДЗ !!!
// 1) сверстать прогресс бар или найти заготовку
// 2) подумать над исключающими случаями (проверки)
// 3) посмотреть в сторону rxjs (попробовать решить проблему с помощью него), если не получится то тогда с помощью массивов (map)
// 4) проработать стейт с localStorage (удаление, редактирование)
// 5) проработать interface с новым полем isCompleted


// идея по прогресс-бару
// группировка задач -> задача и подзадачи
// 1 - 1.1, 1.2, 1.3