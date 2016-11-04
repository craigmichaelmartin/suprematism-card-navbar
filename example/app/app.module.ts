import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule }   from '@angular/router';

import { PageComponent } from './page.component';
import { MainComponent } from './main.component';
import { CardNavbarModule } from '../../src/index';

@NgModule({
  declarations: [
    PageComponent,
    MainComponent
  ],
  imports: [
    BrowserModule,
    CardNavbarModule,
    RouterModule.forRoot([
      { path: '', component: PageComponent },
      { path: ':one/:two', component: PageComponent }
    ])
  ],
  providers: [],
  bootstrap: [MainComponent]
})
export class AppModule { }
