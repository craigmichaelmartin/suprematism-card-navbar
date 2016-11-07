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

  // Emits events of raw data from the template
  rawStateSource: Subject<any> = new Subject();

  // The stream of state kept locally
  localState$ = this.rawStateSource
    .filter((state) => ['preSelected'].indexOf(state) > -1);

  // The stream of state kept in a service
  stateManagerProxy$ = this.rawStateSource
    .filter((state) => ['selected', 'active', 'notActive'].indexOf(state) > -1)
    .map((state) => {
      if (state === 'selected') {
        return { selectedTab: this.tabId, selectedCard: void 0, activeTab: void 0 };
      } else if (state === 'active') {
        return { activeTab: this.tabId };
      } else if (state === 'notActive') {
        return { activeTab: void 0 };
      }
    });


  // ------ Inputs -----------------------------------------------------------

  @Input('supreTabId')
  tabId: string;

  @Input('supreRouterLink')
  routerLink: string;


  // ------ Constructor ------------------------------------------------------

  constructor(private stateManagerService: StateManagerService) {}


  // ------ Lifecycle Hooks ---------------------------------------------------

  ngOnInit() {
    // Update the service with the events from the local proxy stream
    this.stateManagerService.updateModelFromObservable(
      this.stateManagerProxy$);

    // A stream with the latest value of whether the tab is selected
    const isSelectedTab$ = this.stateManagerService.getModel
      .map(({selectedTab}) => !!(selectedTab === this.tabId));

    // A stream derived from the service specific for notActive events
    const notActive$ = this.stateManagerService.getModel
      .filter(({selectedTab}) => selectedTab !== this.tabId)
      .mapTo('notActive');

    // A stream derived from the service specific for selected events
    const selected$ = this.stateManagerService.getModel
      .filter((currentState) => currentState.selectedTab === this.tabId)
      .mapTo('selected');

    // A stream derived from the service specific for active events
    const active$ = this.stateManagerService.getModel
      .filter((currentState) => currentState.activeTab === this.tabId)
      .mapTo('active');

    // The state stream to which template listens
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
