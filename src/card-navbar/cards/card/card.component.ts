import { Component, Input, OnInit } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/takeUntil';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/merge';
import 'rxjs/add/operator/mapTo';
import 'rxjs/add/operator/combineLatest';
import { StateManagerService } from '../../../state-manager.service';
import { CardStateType } from './card-state.type';

@Component({
  selector: 'supre-card-navbar-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardNavbarCardComponent implements OnInit {
  // ------ Inputs -----------------------------------------------------------

  @Input() supreForTab: string;

  @Input() supreCardId: string;

  @Input() supreDefaultCardForTab = false;

  routerLink: string;
  @Input()
  set supreRouterLink(routerLink) {
    if (routerLink === '') {
      this.routerLink = `${this.supreForTab}/${this.supreCardId}`;
    } else if (routerLink) {
      this.routerLink = routerLink;
    } else {
      this.routerLink = void 0;
    }
  }

  // ------ Properties -------------------------------------------------------

  // The stream the template reads from for its state values
  state$: Observable<CardStateType>;

  // Emits events of raw data from the template
  rawStateSource: Subject<CardStateType> = new Subject<CardStateType>();

  // The stream of state kept locally
  localState$: Observable<CardStateType> = this.rawStateSource.filter(
    state => ['notActive', 'active', 'preSelected'].indexOf(state) > -1
  );

  // The stream of state kept in a service
  stateManagerProxy$ = this.rawStateSource
    .filter(state => ['selected'].indexOf(state) > -1)
    .map(state => ({
      selectedTab: this.supreForTab,
      selectedCard: this.supreCardId,
      activeTab: void 0
    }));

  // ------ Constructor -------------------------------------------------------

  constructor(private stateManagerService: StateManagerService) {}

  // ------ Lifecycle Hooks ---------------------------------------------------

  ngOnInit() {
    // Update the service with the events from the local proxy stream
    this.stateManagerService.updateModelFromObservable(this.stateManagerProxy$);

    // A stream with the latest value of whether the card is selected
    const isSelectedCard$ = this.stateManagerService.getModel
      .distinctUntilChanged()
      .map(
        ({ selectedTab, selectedCard }) =>
          !!(
            (selectedTab === this.supreForTab &&
              selectedCard === this.supreCardId) ||
            (selectedTab === this.supreForTab &&
              !selectedCard &&
              this.supreDefaultCardForTab)
          )
      );

    // A stream derived from the service specific for notActive events
    const notActive$ = this.stateManagerService.getModel
      .filter(
        ({ selectedTab, selectedCard }) =>
          selectedTab !== this.supreForTab ||
          (selectedTab === this.supreForTab &&
            selectedCard !== this.supreCardId)
      )
      .mapTo('notActive');

    // A stream derived from the service specific for selected events
    const selected$ = this.stateManagerService.getModel
      .filter(
        ({ selectedTab, selectedCard }) =>
          selectedTab === this.supreForTab && selectedCard === this.supreCardId
      )
      .mapTo('selected');

    // The state stream to which template listens
    this.state$ = <Observable<CardStateType>>this.localState$
      .merge(notActive$, selected$)
      .combineLatest(isSelectedCard$)
      .map(([state, selected]) => (selected ? 'selected' : state));
  }

  onClick(event) {
    if (!this.routerLink) {
      event.preventDefault();
      return;
    }
  }
}
