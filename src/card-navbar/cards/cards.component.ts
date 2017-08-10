import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { StateManagerService } from '../../state-manager.service';
import { CardsStateType } from './cards-state.type';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/observable/interval';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'supre-card-navbar-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss']
})
export class CardNavbarCardsComponent implements OnInit {
  // ------ Properties -------------------------------------------------------

  // The stream the template reads from for its state values
  state$: Observable<CardsStateType>;

  // Emits events of raw data from the template
  rawStateSource: Subject<CardsStateType> = new Subject<CardsStateType>();

  // The stream of state kept in a service
  stateManagerProxy$ = this.rawStateSource
    .filter(state => ['notActive'].indexOf(state) > -1)
    .map(state => {
      if (state === 'notActive') {
        return { activeTab: void 0 };
      }
    });

  // ------ Inputs -----------------------------------------------------------

  @Input() supreForTab: string;

  // ------ Constructor ------------------------------------------------------

  constructor(private stateManagerService: StateManagerService) {}

  // ------ Lifecycle Hooks ---------------------------------------------------

  ngOnInit() {
    // Update the service with the events from the local proxy stream
    this.stateManagerService.updateModelFromObservable(this.stateManagerProxy$);

    // A stream derived from the service specific for active / notActive events
    const active$ = this.stateManagerService.getModel
      .map(({ activeTab }) => activeTab)
      .distinctUntilChanged()
      .switchMap(
        activeTab =>
          this.supreForTab === activeTab
            ? Observable.interval(0).mapTo('active').take(1)
            : Observable.interval(0).mapTo('notActive').take(1)
      );

    // The state stream to which template listens
    this.state$ = <Observable<CardsStateType>>Observable.merge(active$);
  }

  // ------ Public Methods ---------------------------------------------------

  isInMenuItem($event) {
    // Todo: using document.querySelector doesn't seem like the angular way
    const el = $event.toElement || $event.relatedTarget;
    return document
      .querySelector(
        `supre-card-navbar-menu-item[supreTabId="${this.supreForTab}"] a`
      )
      .contains(el);
  }
}
