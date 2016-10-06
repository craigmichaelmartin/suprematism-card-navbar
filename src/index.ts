import { CommonModule } from '@angular/common';
import { CardNavbarComponent } from './card-navbar.component';
import { NgModule } from '@angular/core';

export * from './card-navbar.component';

@NgModule({
    imports: [
        CommonModule,
    ],
    declarations: [
        CardNavbarComponent,
    ],
    exports: [
        CardNavbarComponent,
    ],
    entryComponents: [
        CardNavbarComponent,
    ]
})
export class CardNavbarModule {

}
