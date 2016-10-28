import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { StateManagerService } from './state-manager.service';

@Component({
  selector: 'supre-card-navbar-cards',
  template: require('./card-navbar-cards.component.html'),
  styles: [require('./card-navbar-cards.component.css')]
})
export class CardNavbarCardsComponent implements OnInit {

  show$: Observable<any>;
  mouseInSource: Subject<any> = new Subject();
  mouseIn$ = this.mouseInSource.startWith(false);

  @Input('supreForTab')
  forTab: string;

  constructor(private stateManagerService: StateManagerService) {}

  ngOnInit() {
    const isActiveTab$ = this.stateManagerService.getModel
      .map((currentState) => this.forTab === currentState.activeTab);
    this.show$ = Observable.merge(isActiveTab$, this.mouseIn$);
    this.mouseIn$.subscribe((mouseIn) => {
      this.stateManagerService.updateModel((currentState) => {
        const newState = Object.assign({}, currentState);
        newState.activeTab = void 0;
        return newState;
      });
    });
  }
}
