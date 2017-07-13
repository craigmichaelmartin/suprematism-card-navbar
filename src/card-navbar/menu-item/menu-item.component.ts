import { Component, Input, OnInit } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { StateManagerService } from '../../state-manager.service';
import { MenuItemStateType } from './menu-item-state.type';

@Component({
  selector: 'supre-card-navbar-menu-item',
  templateUrl: './menu-item.component.html',
  styleUrls: ['./menu-item.component.scss']
})
export class CardNavbarMenuItemComponent implements OnInit {

  // ------ Properties -------------------------------------------------------

  // The stream the template reads from for its state values
  state$: Observable<MenuItemStateType>;

  // Emits events of raw data from the template
  rawStateSource: Subject<MenuItemStateType> = new Subject<MenuItemStateType>();

  // The stream of state kept locally
  localState$: Observable<MenuItemStateType> = this.rawStateSource
    .filter((state) => ['preSelected'].indexOf(state) > -1);

  // The stream of state kept in a service
  stateManagerProxy$ = this.rawStateSource
    .filter((state) => ['selected', 'active', 'notActive'].indexOf(state) > -1)
    .map((state) => {
      if (state === 'selected') {
        return { selectedTab: this.supreTabId, selectedCard: void 0, activeTab: void 0 };
      } else if (state === 'active') {
        return { activeTab: this.supreTabId };
      } else if (state === 'notActive') {
        return { activeTab: void 0 };
      }
    });


  // ------ Inputs -----------------------------------------------------------

  @Input() supreTabId: string;

  routerLink: string;
  @Input()
  set supreRouterLink(routerLink) {
    if (routerLink) {
      this.routerLink = routerLink;
    } else {
      this.routerLink = void 0;
    }
  }


  // ------ Constructor ------------------------------------------------------

  constructor(private stateManagerService: StateManagerService) {}


  // ------ Lifecycle Hooks ---------------------------------------------------

  ngOnInit() {
    // Update the service with the events from the local proxy stream
    this.stateManagerService.updateModelFromObservable(
      this.stateManagerProxy$);

    // A stream derived from the service specific for notActive events
    const notActive$ = this.stateManagerService.getModel
      .filter(({selectedTab}) => selectedTab !== this.supreTabId)
      .mapTo('notActive');

    // A stream derived from the service specific for selected events
    const selected$ = this.stateManagerService.getModel
      .filter(({selectedTab}) => selectedTab === this.supreTabId)
      .mapTo('selected');

    // A stream derived from the service specific for active events
    const active$ = this.stateManagerService.getModel
      .filter(({activeTab}) => activeTab === this.supreTabId)
      .mapTo('active');

    // A stream derived from the service specific for active events
    const selectedBackgrounded$ = this.stateManagerService.getModel
      .filter(({activeTab, selectedTab}) =>
        activeTab && activeTab !== this.supreTabId && selectedTab === this.supreTabId)
      .mapTo('selectedBackgrounded');

    // The state stream to which template listens
    this.state$ = this.localState$.merge(
      notActive$, active$, selected$, selectedBackgrounded$);
  }


  // ------ Public Methods ---------------------------------------------------

  isInCards($event): boolean {
    // Todo: using document.querySelector doesn't seem like the angular way
    const el = $event.toElement || $event.relatedTarget;
    return document.querySelector('.js-cards').contains(el);
  }

  onClick(event) {
    if (!this.routerLink) {
      event.preventDefault();
      return;
    }
  }

}
