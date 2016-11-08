import { OnInit } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/takeUntil';
import { StateManagerService } from '../../../state-manager.service';
export declare class CardNavbarCardComponent implements OnInit {
    private stateManagerService;
    forTab: string;
    cardId: string;
    defaultCardForTab: boolean;
    routerLink: string;
    supreRouterLink: any;
    state$: Observable<string>;
    rawStateSource: Subject<string>;
    localState$: Observable<string>;
    stateManagerProxy$: Observable<{
        selectedTab: string;
        selectedCard: string;
        activeTab: any;
    }>;
    constructor(stateManagerService: StateManagerService);
    ngOnInit(): void;
}
