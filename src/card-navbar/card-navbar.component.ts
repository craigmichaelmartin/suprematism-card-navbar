import { Component, Input, OnInit } from '@angular/core';
import 'rxjs/add/operator/map';
import { StateManagerService } from '../state-manager.service';

@Component({
  selector: 'supre-card-navbar',
  template: require('./card-navbar.component.html'),
  styles: [require('./card-navbar.component.css')]
})
export class CardNavbarComponent implements OnInit {

  @Input('supreSelectedTab')
  selectedTab: string;

  @Input('supreSelectedCard')
  selectedCard: string;

  constructor(private stateManagerService: StateManagerService) {}

  ngOnInit() {
    this.stateManagerService.setModel = {
      selectedTab: this.selectedTab,
      selectedCard: this.selectedCard
    };
  }
}
