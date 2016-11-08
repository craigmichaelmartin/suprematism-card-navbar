import { Component, Input, OnInit } from '@angular/core';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/takeUntil';
import { Item } from './item.interface';

@Component({
  selector: 'supre-account',
  template: require('./account.component.html'),
  styles: [require('./account.component.css')]
})
export class AccountComponent implements OnInit {

  // ------ Inputs -----------------------------------------------------------

  @Input('supreDefault')
  defaultItemName: string;

  @Input('supreItems')
  items: Array<Item>;


  // ------ Properties -------------------------------------------------------

  selectedSource: ReplaySubject<Item>;
  selected$: Observable<Item>;
  showItemsSource: ReplaySubject<'toggle'>;
  showItems$: Observable<boolean>;
  activeItemSource: ReplaySubject<Item>;
  activeItem$: Observable<Item>;
  noItem = {name: '', image: ''};


  // ------ Constructor -------------------------------------------------------

  constructor() {}


  // ------ Lifecycle Hooks ---------------------------------------------------

  ngOnInit() {
    this.selectedSource = new ReplaySubject<Item>();
    this.showItemsSource = new ReplaySubject<'toggle'>();
    this.activeItemSource = new ReplaySubject<Item>();
    const defaultItem = this.defaultItemName
      ? this.items.find((item) => item.name === this.defaultItemName)
      : this.items[0];
    this.selected$ = this.selectedSource.startWith(defaultItem);
    this.showItems$ = this.showItemsSource
      .scan((current_state) => !current_state, false)
      .startWith(false);
    this.activeItem$ = this.activeItemSource.startWith(this.noItem);
  }

}
