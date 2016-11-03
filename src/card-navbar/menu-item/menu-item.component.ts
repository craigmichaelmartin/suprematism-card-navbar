import { Component, Input, OnInit } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { StateManagerService } from '../../state-manager.service';

@Component({
  selector: 'supre-card-navbar-menu-item',
  template: require('./menu-item.component.html'),
  styles: [require('./menu-item.component.css')]
})
export class CardNavbarMenuItemComponent implements OnInit {

  localStateSource: Subject<string> = new Subject<string>();
  localState$: Observable<string> = this.localStateSource.startWith('notActive');
  state$: Observable<string>;

  @Input('supreTabId')
  tabId: string;

  @Input('supreDefaultTab')
  defaultTab: boolean = false;

  constructor(private stateManagerService: StateManagerService) {}

  isInCards($event) {
    // Todo: using document.querySelector doesn't seem like the angular way
    return document.querySelector('.js-cards').contains(($event.toElement || $event.relatedTarget));
  }

  pushSelected() {
    this.stateManagerService.updateModel((currentState) => {
      const newState = Object.assign({}, currentState);
      newState.selectedTab = this.tabId;
      newState.selectedCard = void 0;
      return newState;
    });
  }

  pushPreSelected() {
    this.localStateSource.next('preSelected');
  }

  pushActive() {
    this.stateManagerService.updateModel((currentState) => {
      const newState = Object.assign({}, currentState);
      newState.activeTab = this.tabId;
      return newState;
    });
  }

  pushNotActive() {
    this.stateManagerService.updateModel((currentState) => {
      const newState = Object.assign({}, currentState);
      newState.activeTab = void 0;
      return newState;
    });
  }

  ngOnInit() {
    const isSelectedTab$ = this.stateManagerService.getModel
      .map(({selectedTab}) =>
        !!((selectedTab === this.tabId) || (!selectedTab && this.defaultTab)));
    const notActive$ = this.stateManagerService.getModel
      .filter(({activeTab, selectedTab}) =>
        activeTab !== this.tabId || selectedTab !== this.tabId)
      .mapTo('notActive');
    const active$ = this.stateManagerService.getModel
      .filter((currentState) => currentState.activeTab === this.tabId)
      .mapTo('active');
    const selected$ = this.stateManagerService.getModel
      .filter((currentState) => currentState.selectedTab === this.tabId)
      .mapTo('selected');
    this.state$ = this.localState$.merge(notActive$, active$, selected$)
      .combineLatest(isSelectedTab$)
      .map(([state, selected]) => selected ? 'selected' : state);
  }

}
