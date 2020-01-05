import { Component, HostListener, OnInit } from '@angular/core';
import { Square } from './snake/snake.component';
import { SnakeService } from './snake.service';

export enum Direction {
  Up,
  Down,
  Left,
  Right
}
@Component({
  selector: 'app-field',
  templateUrl: './field.component.html',
  styleUrls: ['./field.component.css'],
  providers: [SnakeService]
})
export class FieldComponent implements OnInit {
  initPoint: Square;
  apple: Square;
  snake: Square[] = [];
  toToggleChanges: boolean;
  curDirection: Direction = Direction.Up;
  wrapper: HTMLDivElement;
  fieldCoordinates: Square;
  constructor(private snakeService: SnakeService) {}

  ngOnInit() {
    this.wrapper = document.querySelector('.wrapper');
    this.fieldCoordinates = {
      x: this.wrapper.offsetLeft + this.modulo(-this.wrapper.offsetLeft),
      y: this.wrapper.offsetTop + this.modulo(-this.wrapper.offsetTop)
    };
    this.initPoint = this.generatePoint();
    this.apple = this.generatePoint();
    console.log(this.apple);
    this.snake.push(this.initPoint, {
      x: this.initPoint.x,
      y: this.initPoint.y + 16
    });
    this.move();
  }

  generatePoint(): Square {
    return {
      x: this.rand(this.fieldCoordinates.x + 32, 448 + this.fieldCoordinates.x),
      y: this.rand(this.fieldCoordinates.y + 32, 448 + this.fieldCoordinates.y)
    };
  }

  move() {
    let head = Object.assign({}, this.snake[0]);
    if (!this.checkBound(head)) {
      switch (this.curDirection) {
        case Direction.Up:
          this.snake[0].y -= 16;
          if (this.checkApple(this.snake[0])) {
            this.snake.unshift({x: this.snake[0].x, y: this.snake[0].y - 16});
            this.apple = this.generatePoint();
          }
          break;
        case Direction.Down:
          this.snake[0].y += 16;
          if (this.checkApple(this.snake[0])) {
            this.snake.unshift({x: this.snake[0].x, y: this.snake[0].y + 16});
            this.apple = this.generatePoint();
          }
          break;
        case Direction.Left:
          this.snake[0].x -= 16;
          if (this.checkApple(this.snake[0])) {
            this.snake.unshift({x: this.snake[0].x - 16, y: this.snake[0].y});
            this.apple = this.generatePoint();
          }
          break;
        case Direction.Right:
          this.snake[0].x += 16;
          if (this.checkApple(this.snake[0])) {
            this.snake.unshift({x: this.snake[0].x + 16, y: this.snake[0].y});
            this.apple = this.generatePoint();
          }
          break;
      }
      head = Object.assign({}, this.snake[0]);
      this.snake.forEach((square, index) => {
        if (index !== 0) {
          const tmp = this.snake[index];
          this.snake[index] = head;
          head = tmp;
        }
      });
      console.log(this.apple);
      setTimeout(() => requestAnimationFrame(this.move.bind(this)), 100);
    }
  }

  restart() {
    this.snake = [];
    this.ngOnInit();
  }

  checkBound(head: Square) {
    return (
      head.x === this.fieldCoordinates.x ||
      head.x === this.fieldCoordinates.x + 464 ||
      head.y === this.fieldCoordinates.y ||
      head.y === this.fieldCoordinates.y + 464
    );
  }

  checkApple(head: Square) {
    return (
      (head.x === this.apple.x &&
      head.y === this.apple.y)
    );
  }

  rand(min, max, num = 16) {
    return (
      Math.floor(Math.floor(Math.random() * (max - min + 1) + min) / num) * num
    );
  }

  @HostListener('document:keydown', ['$event'])
  onKeyUp(ev: KeyboardEvent) {
    switch (ev.key) {
      case 'ArrowUp':
        this.curDirection = Direction.Up;
        break;
      case 'ArrowDown':
        this.curDirection = Direction.Down;
        break;
      case 'ArrowLeft':
        this.curDirection = Direction.Left;
        break;
      case 'ArrowRight':
        this.curDirection = Direction.Right;
        break;
    }
    this.toToggleChanges = !this.toToggleChanges;
  }

  position(square: Square) {
    return { left: square.x + 'px', top: square.y + 'px' };
  }

  modulo(p, q = 16) {
    q = Math.abs(q);
    let result = p % q;
    if (result < 0) {
      result += q;
    }
    return result;
  }
}
