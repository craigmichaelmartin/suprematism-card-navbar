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

  @Input('supreStyle')
  style: string;

  @Input('supreForTab')
  forTab: string;

  @Input('supreDefault')
  defaultCardForTab: boolean = false;

  @Input('supreUltimateDefault')
  defaultCardForAllTabs: boolean = false;

  cid: string;
  statusSource: Subject<any> = new Subject();
  status$: Observable<any> = this.statusSource.asObservable();
  isSelectedCard$: Observable<boolean>;
  state$: Observable<any>;

  constructor(private stateManagerService: StateManagerService) {}

  ngOnInit() {
    this.cid = StateManagerService.getUniqueId();
    this.status$
      .filter((state) => state === 'selected')
      .mapTo({forTab: this.forTab, cid: this.cid})
      .subscribe(({forTab, cid}) =>
        this.stateManagerService.updateModel((currentState) => {
          const newState = Object.assign({}, currentState);
          newState.selectedTab = forTab;
          newState.selectedCard = cid;
          return newState;
        })
      );
    this.isSelectedCard$ = this.stateManagerService.getModel
      .distinctUntilChanged()
      .map(({selectedTab, selectedCard}) =>
        (selectedTab === this.forTab && selectedCard === this.cid)
          || (selectedTab === this.forTab && !selectedCard && this.defaultCardForTab)
          || (!selectedTab && !selectedCard && this.defaultCardForAllTabs)
      );
    this.state$ = this.status$
      .merge(
        this.stateManagerService.getModel
          .distinctUntilChanged()
          .filter(({selectedCard, selectedTab}) =>
            selectedTab !== this.forTab && selectedCard !== this.cid
          )
          .mapTo('notActive')
      )
      .combineLatest(this.isSelectedCard$)
      .map(([state, selected]) => selected ? 'selected' : state);
  }

}
