import { OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { StateManagerService } from '../../state-manager.service';
import { CardsStateType } from './cards-state.type';
export declare class CardNavbarCardsComponent implements OnInit {
    private stateManagerService;
    state$: Observable<CardsStateType>;
    rawStateSource: Subject<CardsStateType>;
    stateManagerProxy$: Observable<{
        activeTab: any;
    }>;
    supreForTab: string;
    constructor(stateManagerService: StateManagerService);
    ngOnInit(): void;
    isInMenuItem($event: any): boolean;
}
