import { Injectable } from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {Square} from './snake/snake.component';

@Injectable({
  providedIn: 'root'
})
export class SnakeService {

  private snakeSubject = new Subject<Square[]>();

  constructor() { }

  updateSnakeValue(snake: Square[]) {
    this.snakeSubject.next(snake);
  }

  getSnakeValue(): Observable<Square[]> {
    return this.snakeSubject.asObservable();
  }
}
