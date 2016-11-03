import { OnInit, AfterContentInit } from '@angular/core';
import 'rxjs/add/operator/map';
import { StateManagerService } from '../state-manager.service';
export declare class CardNavbarComponent implements OnInit, AfterContentInit {
    private stateManagerService;
    defaultTab: string;
    constructor(stateManagerService: StateManagerService);
    ngOnInit(): void;
    ngAfterContentInit(): void;
}
