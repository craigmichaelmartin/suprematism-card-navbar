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

  statusSource: Subject<string> = new Subject<string>();
  status$: Observable<string> = this.statusSource.startWith('active');
  isSelectedTab$: Observable<boolean>;
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

  ngOnInit() {
    this.status$
      .distinctUntilChanged()
      .filter((state) => state === 'selected')
      .mapTo(this.tabId)
      .subscribe((tabId) =>
        this.stateManagerService.updateModel((currentState) => {
          const newState = Object.assign({}, currentState);
          newState.selectedTab = tabId;
          newState.selectedCard = void 0;
          return newState;
        })
      );
    this.status$
      .distinctUntilChanged()
      .filter((state) => state === 'active')
      // .debounceTime(500)
      .mapTo(this.tabId)
      .subscribe((tabId) =>
        this.stateManagerService.updateModel((currentState) => {
          const newState = Object.assign({}, currentState);
          newState.activeTab = tabId;
          return newState;
        })
      );
    this.status$
      .distinctUntilChanged()
      .filter((state) => state === 'notActive')
      .mapTo(this.tabId)
      .subscribe((tabId) =>
        this.stateManagerService.updateModel((currentState) => {
          const newState = Object.assign({}, currentState);
          newState.activeTab = void 0;
          return newState;
        })
      );
    this.isSelectedTab$ = this.stateManagerService.getModel
      .distinctUntilChanged()
      .map(({selectedTab}) =>
        (selectedTab === this.tabId) || (!selectedTab && this.defaultTab)
      );

    this.state$ = this.status$.merge(
          this.stateManagerService.getModel
            .distinctUntilChanged()
            .filter((currentState) => currentState.activeTab !== this.tabId)
            .mapTo('notActive'),
          this.stateManagerService.getModel
            .distinctUntilChanged()
            .filter((currentState) => currentState.selectedTab !== this.tabId)
            .mapTo('notActive'),
          this.stateManagerService.getModel
            .distinctUntilChanged()
            .filter((currentState) => currentState.selectedTab === this.tabId)
            .mapTo('selected'),
        )
        .combineLatest(this.isSelectedTab$)
        .map(([state, selected]) => selected ? 'selected' : state);

    this.stateManagerService.getModel
      .distinctUntilChanged()
      .filter((currentState) => currentState.activeTab !== this.tabId)
      .mapTo('notActive')
      .subscribe((state) => {
        this.statusSource.next(state);
      });
  }

}
