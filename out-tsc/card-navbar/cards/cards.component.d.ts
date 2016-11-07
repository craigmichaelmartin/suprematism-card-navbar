import { OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { StateManagerService } from '../../state-manager.service';
export declare class CardNavbarCardsComponent implements OnInit {
    private stateManagerService;
    show$: Observable<boolean>;
    mouseInSource: Subject<boolean>;
    mouseIn$: Observable<boolean>;
    forTab: string;
    constructor(stateManagerService: StateManagerService);
    ngOnInit(): void;
    isInMenuItem($event: any): boolean;
}
