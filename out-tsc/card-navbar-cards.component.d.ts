import { OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { StateManagerService } from './state-manager.service';
export declare class CardNavbarCardsComponent implements OnInit {
    private stateManagerService;
    show$: Observable<any>;
    mouseInSource: Subject<any>;
    mouseIn$: Observable<any>;
    forTab: string;
    constructor(stateManagerService: StateManagerService);
    ngOnInit(): void;
}
