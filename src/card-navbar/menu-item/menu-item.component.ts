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

  // ------ Properties -------------------------------------------------------

  // The stream the template reads from for its state values
  state$: Observable<string>;

  // Emits events of raw datafrom the template
  rawStateSource: Subject<any> = new Subject();

  // The stream of state kept locally
  localState$ = this.rawStateSource
    .filter((state) => ['preSelected'].indexOf(state) > -1);

  // The stream of state kept in a service
  stateManagerProxy$ = this.rawStateSource
    .filter((state) => ['selected', 'active', 'notActive'].indexOf(state) > -1)
    .map((state) => {
      if (state === 'selected') {
        return { selectedTab: this.tabId, selectedCard: void 0 };
      } else if (state === 'active') {
        return { activeTab: this.tabId };
      } else if (state === 'notActive') {
        return { activeTab: void 0 };
      }
    });


  // ------ Inputs -----------------------------------------------------------

  @Input('supreTabId')
  tabId: string;

  @Input('supreDefaultTab')
  defaultTab: boolean = false;


  // ------ Constructor ------------------------------------------------------

  constructor(private stateManagerService: StateManagerService) {}


  // ------ Lifecycle Hooks ---------------------------------------------------

  ngOnInit() {
    this.stateManagerService.updateModelFromObservable(
      this.stateManagerProxy$
    );
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


  // ------ Public Methods ---------------------------------------------------

  isInCards($event) {
    // Todo: using document.querySelector doesn't seem like the angular way
    const el = $event.toElement || $event.relatedTarget;
    return document.querySelector('.js-cards').contains(el);
  }

}
