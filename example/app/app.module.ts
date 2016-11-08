import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule }   from '@angular/router';

import { PageComponent } from './page.component';
import { MainComponent } from './main.component';
import { AccountComponent } from '../../src/account/account.component';
import { CardNavbarModule } from '../../src/index';

@NgModule({
  declarations: [
    AccountComponent,
    PageComponent,
    MainComponent
  ],
  imports: [
    BrowserModule,
    CardNavbarModule,
    RouterModule.forRoot([
      { path: '', component: PageComponent },
      { path: ':selectedTab/:selectedCard', component: PageComponent }
    ])
  ],
  entryComponents: [
    AccountComponent,
  ],
  providers: [],
  bootstrap: [MainComponent]
})
export class AppModule { }
