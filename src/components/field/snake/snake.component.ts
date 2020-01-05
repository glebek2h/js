import {
  Component,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges
} from '@angular/core';
import { SnakeService } from '../snake.service';

export interface Square {
  x: number;
  y: number;
}

@Component({
  selector: 'app-snake',
  templateUrl: './snake.component.html',
  styleUrls: ['./snake.component.css']
})
export class SnakeComponent implements OnInit {
  @Input() initPoint: Square;
  @Input() snake: Square[] = [];
  @Input() toToggleChanges: boolean;

  constructor(private snakeService: SnakeService) {}

  ngOnInit() {}

  position(square: Square) {
    return { left: square.x + 'px', top: square.y + 'px' };
  }
}
