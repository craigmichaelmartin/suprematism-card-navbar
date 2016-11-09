import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Subject } from 'rxjs/Subject';
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

  @Input() supreDefault: string;

  @Input() supreItems: Array<Item>;

  @Output() accountSelected = new EventEmitter();


  // ------ Properties -------------------------------------------------------

  selectedSource: Subject<Item>;
  selected$: Observable<Item>;
  showItemsSource: Subject<'toggle'>;
  showItems$: Observable<boolean>;
  activeItemSource: Subject<Item>;
  activeItem$: Observable<Item>;
  noItem = {name: '', image: ''};


  // ------ Lifecycle Hooks ---------------------------------------------------

  ngOnInit() {
    this.selectedSource = new Subject<Item>();
    this.showItemsSource = new Subject<'toggle'>();
    this.activeItemSource = new Subject<Item>();
    const defaultItem = this.supreDefault
      ? this.supreItems.find((item) => item.name === this.supreDefault)
      : this.supreItems[0];
    this.selected$ = this.selectedSource
      .startWith(defaultItem);
    this.showItems$ = this.showItemsSource
      .scan((current_state) => !current_state, false)
      .startWith(false);
    this.activeItem$ = this.activeItemSource.startWith(this.noItem);
    this.selected$.distinctUntilChanged().subscribe(
      (item: Item) => this.accountSelected.emit(item.name));
  }

}
