import { OnInit } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { StateManagerService } from './state-manager.service';
export declare class CardNavbarTopMenuItemComponent implements OnInit {
    private stateManagerService;
    statusSource: Subject<any>;
    status$: Observable<any>;
    isSelectedTab$: Observable<boolean>;
    state$: Observable<any>;
    tabId: string;
    defaultTab: boolean;
    constructor(stateManagerService: StateManagerService);
    isInCards($event: any): boolean;
    ngOnInit(): void;
}
