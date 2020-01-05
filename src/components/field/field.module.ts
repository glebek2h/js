import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FieldComponent } from './field.component';
import { SnakeComponent } from './snake/snake.component';
import {MatButtonModule} from '@angular/material';


@NgModule({
  declarations: [FieldComponent, SnakeComponent],
  exports: [
    FieldComponent,
  ],
  imports: [
    CommonModule,
    MatButtonModule
  ]
})
export class FieldModule { }
