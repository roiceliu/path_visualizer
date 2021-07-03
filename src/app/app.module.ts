import { AppRoutingModule } from './app-routing.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';


import { AppComponent } from './app.component';
import { BoardElementModule } from './boardElement/boardElement.module';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule, AppRoutingModule, BoardElementModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
