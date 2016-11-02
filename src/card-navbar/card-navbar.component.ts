import { Component, Input, OnInit, AfterContentInit } from '@angular/core';
import 'rxjs/add/operator/map';
import { StateManagerService } from '../state-manager.service';

@Component({
  selector: 'supre-card-navbar',
  template: require('./card-navbar.component.html'),
  styles: [require('./card-navbar.component.css')]
})
export class CardNavbarComponent implements OnInit, AfterContentInit {

  @Input('supreDefaultTab')
  defaultTab: string;

  constructor(private stateManagerService: StateManagerService) {}

  ngOnInit() {
    // this.stateManagerService.setModel = {selectedTab: this.defaultTab};
    this.stateManagerService.setModel = {};
  }

  ngAfterContentInit() {
    // this.stateManagerService.updateModel((currentState) => {
    //   const newState = Object.assign({}, currentState);
    //   newState.selectedTab = this.defaultTab;
    //   return newState;
    // });
  }
}
