import { Component, Input, OnInit } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import 'rxjs/add/operator/map';
import { StateManagerService } from '../state-manager.service';

@Component({
  selector: 'supre-card-navbar',
  template: require('./card-navbar.component.html'),
  styles: [require('./card-navbar.component.css')]
})
export class CardNavbarComponent implements OnInit {

  @Input() supreSelectedTab: string;

  @Input() supreSelectedCard: string;

  constructor(
    private stateManagerService: StateManagerService,
    private router: Router
  ) {}

  ngOnInit() {
    this.stateManagerService.setModel = {
      selectedTab: this.supreSelectedTab,
      selectedCard: this.supreSelectedCard
    };

    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        const [, selectedTab, selectedCard] = event.url.split('/');
        this.stateManagerService.updateModel(currentState =>
          Object.assign({}, currentState, { selectedTab, selectedCard })
        );
      }
    });
  }
}
