import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PageComponent } from './page.component';
import { MainComponent } from './main.component';
// import { DropdownImageModule } from 'suprematism-dropdown-image';
import { CardNavbarModule } from '../../src/index';

@NgModule({
  declarations: [
    PageComponent,
    MainComponent
  ],
  imports: [
    BrowserModule,
    // DropdownImageModule,
    CardNavbarModule,
    RouterModule.forRoot([
      { path: '', component: PageComponent },
      { path: ':selectedTab/:selectedCard', component: PageComponent }
    ])
  ],
  bootstrap: [MainComponent]
})
export class AppModule { }
