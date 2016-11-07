import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { StateManagerService } from '../../state-manager.service';

@Component({
  selector: 'supre-card-navbar-cards',
  template: require('./cards.component.html'),
  styles: [require('./cards.component.css')]
})
export class CardNavbarCardsComponent implements OnInit {

  // ------ Properties -------------------------------------------------------

  show$: Observable<boolean>;
  mouseInSource: Subject<boolean> = new Subject<boolean>();
  mouseIn$: Observable<boolean> = this.mouseInSource.startWith(false);


  // ------ Inputs -----------------------------------------------------------

  @Input('supreForTab')
  forTab: string;


  // ------ Constructor ------------------------------------------------------

  constructor(private stateManagerService: StateManagerService) {}


  // ------ Lifecycle Hooks ---------------------------------------------------

  ngOnInit() {
    const isActiveTab$ = this.stateManagerService.getModel
      .map(({activeTab}) => activeTab)
      .distinctUntilChanged()
      .switchMap((activeTab) =>
        this.forTab === activeTab
          ? activeTab === 'user'
            ? Observable.interval(0).mapTo(true).take(1)
            : Observable.interval(500).mapTo(true).take(1)
          : Observable.interval(100).mapTo(false).take(1));

    this.show$ = Observable.merge(isActiveTab$, this.mouseIn$);

    this.mouseIn$.subscribe((mouseIn) => {
      this.stateManagerService.updateModel((currentState) => {
        const newState = Object.assign({}, currentState);
        newState.activeTab = void 0;
        return newState;
      });
    });
  }


  // ------ Public Methods ---------------------------------------------------

  isInMenuItem($event) {
    // Todo: using document.querySelector doesn't seem like the angular way
    const el = $event.toElement || $event.relatedTarget;
    return document.querySelector(`supre-card-navbar-menu-item[supreTabId="${this.forTab}"] a`).contains(el);
  }

}
