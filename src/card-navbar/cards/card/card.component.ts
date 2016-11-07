import { Component, Input, OnInit } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/takeUntil';
import { StateManagerService } from '../../../state-manager.service';

@Component({
  selector: 'supre-card-navbar-card',
  template: require('./card.component.html'),
  styles: [require('./card.component.css')]
})
export class CardNavbarCardComponent implements OnInit {

  // ------ Inputs -----------------------------------------------------------

  @Input('supreStyle')
  style: string;

  @Input('supreForTab')
  forTab: string;

  @Input('supreCardId')
  cardId: string;

  @Input('supreDefaultCardForTab')
  defaultCardForTab: boolean = false;

  routerLink: string;
  @Input('supreRouterLink')
  set supreRouterLink(routerLink) {
    if (routerLink === '') {
      this.routerLink = `${this.forTab}/${this.cardId}`;
    } else if (routerLink) {
      this.routerLink = routerLink;
    } else {
      this.routerLink = void 0;
    }
  }

  // ------ Properties -------------------------------------------------------

  // The stream the template reads from for its state values
  state$: Observable<string>;

  // Emits events of raw data from the template
  rawStateSource: Subject<string> = new Subject<string>();

  // The stream of state kept locally
  localState$ = this.rawStateSource
    .filter((state) =>
      ['notActive', 'active', 'preSelected'].indexOf(state) > -1);

  // The stream of state kept in a service
  stateManagerProxy$ = this.rawStateSource
    .filter((state) => ['selected'].indexOf(state) > -1)
    .map((state) => ({selectedTab: this.forTab, selectedCard: this.cardId, activeTab: void 0}));


  // ------ Constructor -------------------------------------------------------

  constructor(private stateManagerService: StateManagerService) {}


  // ------ Lifecycle Hooks ---------------------------------------------------

  ngOnInit() {
    // Update the service with the events from the local proxy stream
    this.stateManagerService.updateModelFromObservable(
      this.stateManagerProxy$
    );

    // A stream with the latest value of whether the card is selected
    const isSelectedCard$ = this.stateManagerService.getModel
      .distinctUntilChanged()
      .map(({selectedTab, selectedCard}) => !!(
        (selectedTab === this.forTab && selectedCard === this.cardId)
        || (selectedTab === this.forTab && !selectedCard
            && this.defaultCardForTab))
      );

    // A stream derived from the service specific for notActive events
    const notActive$ = this.stateManagerService.getModel
      .filter (({selectedTab, selectedCard}) =>
        (selectedTab !== this.forTab)
        || (selectedTab === this.forTab && selectedCard !== this.cardId))
      .mapTo('notActive');

    // A stream derived from the service specific for selected events
    const selected$ = this.stateManagerService.getModel
      .filter(({selectedTab, selectedCard}) =>
        selectedTab === this.forTab && selectedCard === this.cardId)
      .mapTo('selected');

    // The state stream to which template listens
    this.state$ = this.localState$.merge(notActive$, selected$)
      .combineLatest(isSelectedCard$)
      .map(([state, selected]) => selected ? 'selected' : state);
  }

}
