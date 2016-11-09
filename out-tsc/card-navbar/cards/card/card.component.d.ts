import { OnInit } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/takeUntil';
import { StateManagerService } from '../../../state-manager.service';
import { CardStateType } from './card-state.type';
export declare class CardNavbarCardComponent implements OnInit {
    private stateManagerService;
    supreForTab: string;
    supreCardId: string;
    supreDefaultCardForTab: boolean;
    routerLink: string;
    supreRouterLink: any;
    state$: Observable<CardStateType>;
    rawStateSource: Subject<CardStateType>;
    localState$: Observable<CardStateType>;
    stateManagerProxy$: Observable<{
        selectedTab: string;
        selectedCard: string;
        activeTab: any;
    }>;
    constructor(stateManagerService: StateManagerService);
    ngOnInit(): void;
}
