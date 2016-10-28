import { CommonModule } from '@angular/common';
import { StateManagerService } from './state-manager.service';
import { CardNavbarComponent } from './card-navbar.component';
import { CardNavbarTopMenuItemComponent } from './card-navbar-top-menu-item.component';
import { CardNavbarUserMenuItemComponent } from './card-navbar-user-menu-item.component';
import { CardNavbarCardsComponent } from './card-navbar-cards.component';
import { CardNavbarCardComponent } from './card-navbar-card.component';
import { CardNavbarCardTitleComponent } from './card-navbar-card-title.component';
import { CardNavbarCardIconComponent } from './card-navbar-card-icon.component';
import { NgModule } from '@angular/core';

export * from './state-manager.service';
export * from './card-navbar.component';
export * from './card-navbar-top-menu-item.component';
export * from './card-navbar-user-menu-item.component';
export * from './card-navbar-cards.component';
export * from './card-navbar-card.component';
export * from './card-navbar-card-title.component';
export * from './card-navbar-card-icon.component';

@NgModule({
  imports: [
    CommonModule,
  ],
  providers: [
    StateManagerService
  ],
  declarations: [
    CardNavbarComponent,
    CardNavbarTopMenuItemComponent,
    CardNavbarUserMenuItemComponent,
    CardNavbarCardsComponent,
    CardNavbarCardComponent,
    CardNavbarCardTitleComponent,
    CardNavbarCardIconComponent,
  ],
  exports: [
    CardNavbarComponent,
    CardNavbarTopMenuItemComponent,
    CardNavbarUserMenuItemComponent,
    CardNavbarCardsComponent,
    CardNavbarCardComponent,
    CardNavbarCardTitleComponent,
    CardNavbarCardIconComponent,
  ],
  entryComponents: [
    CardNavbarComponent,
    CardNavbarTopMenuItemComponent,
    CardNavbarUserMenuItemComponent,
    CardNavbarCardsComponent,
    CardNavbarCardComponent,
    CardNavbarCardTitleComponent,
    CardNavbarCardIconComponent,
  ]
})
export class CardNavbarModule {

}
