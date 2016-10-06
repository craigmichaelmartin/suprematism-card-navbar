import { Component } from '@angular/core';

@Component({
  selector: 'supre-card-navbar',
  template: require('./card-navbar.component.html'),
  styles: [require('./card-navbar.component.css')]
})
export class CardNavbarComponent {
  title = 'app works!';
}
