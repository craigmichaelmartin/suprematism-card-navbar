import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CardNavbarModule } from '../../src/index';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    CardNavbarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
