import { OnInit } from '@angular/core';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/takeUntil';
import { Item } from './item.interface';
export declare class AccountComponent implements OnInit {
    defaultItemName: string;
    items: Array<Item>;
    selectedSource: ReplaySubject<Item>;
    selected$: Observable<Item>;
    showItemsSource: ReplaySubject<'toggle'>;
    showItems$: Observable<boolean>;
    activeItemSource: ReplaySubject<Item>;
    activeItem$: Observable<Item>;
    noItem: {
        name: string;
        image: string;
    };
    constructor();
    ngOnInit(): void;
}
