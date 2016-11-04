import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule }   from '@angular/router';
import { StateManagerService } from './state-manager.service';
import { CardNavbarComponent } from './card-navbar/card-navbar.component';
import { CardNavbarMenuItemComponent } from './card-navbar/menu-item/menu-item.component';
import { CardNavbarCardsComponent } from './card-navbar/cards/cards.component';
import { CardNavbarCardComponent } from './card-navbar/cards/card/card.component';
import { CardNavbarCardTitleComponent } from './card-navbar/cards/card/card-title/card-title.component';
import { CardNavbarCardIconComponent } from './card-navbar/cards/card/card-icon/card-icon.component';

export * from './state-manager.service';
export * from './card-navbar/card-navbar.component';
export * from './card-navbar/menu-item/menu-item.component';
export * from './card-navbar/cards/cards.component';
export * from './card-navbar/cards/card/card.component';
export * from './card-navbar/cards/card/card-title/card-title.component';
export * from './card-navbar/cards/card/card-icon/card-icon.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  providers: [
    StateManagerService
  ],
  declarations: [
    CardNavbarComponent,
    CardNavbarMenuItemComponent,
    CardNavbarCardsComponent,
    CardNavbarCardComponent,
    CardNavbarCardTitleComponent,
    CardNavbarCardIconComponent,
  ],
  exports: [
    CardNavbarComponent,
    CardNavbarMenuItemComponent,
    CardNavbarCardsComponent,
    CardNavbarCardComponent,
    CardNavbarCardTitleComponent,
    CardNavbarCardIconComponent,
  ],
  entryComponents: [
    CardNavbarComponent,
    CardNavbarMenuItemComponent,
    CardNavbarCardsComponent,
    CardNavbarCardComponent,
    CardNavbarCardTitleComponent,
    CardNavbarCardIconComponent,
  ]
})
export class CardNavbarModule {

}
