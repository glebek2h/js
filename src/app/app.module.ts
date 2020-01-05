import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { FieldModule } from '../components/field/field.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
@NgModule({
  declarations: [AppComponent],
  imports: [ BrowserModule,BrowserAnimationsModule,FieldModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
