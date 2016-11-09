import { OnInit } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { StateManagerService } from '../../state-manager.service';
import { MenuItemStateType } from './menu-item-state.type';
export declare class CardNavbarMenuItemComponent implements OnInit {
    private stateManagerService;
    state$: Observable<MenuItemStateType>;
    rawStateSource: Subject<MenuItemStateType>;
    localState$: Observable<MenuItemStateType>;
    stateManagerProxy$: Observable<{
        selectedTab: string;
        selectedCard: any;
        activeTab: any;
    } | {
        activeTab: string;
    }>;
    supreTabId: string;
    supreRouterLink: string;
    constructor(stateManagerService: StateManagerService);
    ngOnInit(): void;
    isInCards($event: any): boolean;
}
