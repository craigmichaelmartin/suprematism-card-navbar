import { OnInit } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { StateManagerService } from '../../state-manager.service';
export declare class CardNavbarMenuItemComponent implements OnInit {
    private stateManagerService;
    state$: Observable<string>;
    rawStateSource: Subject<any>;
    localState$: Observable<any>;
    stateManagerProxy$: Observable<{
        selectedTab: string;
        selectedCard: any;
        activeTab: any;
    } | {
        activeTab: string;
    }>;
    tabId: string;
    routerLink: string;
    constructor(stateManagerService: StateManagerService);
    ngOnInit(): void;
    isInCards($event: any): boolean;
}
