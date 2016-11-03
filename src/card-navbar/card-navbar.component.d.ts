import { OnInit } from '@angular/core';
import 'rxjs/add/operator/map';
import { StateManagerService } from '../state-manager.service';
export declare class CardNavbarComponent implements OnInit {
    private stateManagerService;
    defaultTab: string;
    constructor(stateManagerService: StateManagerService);
    ngOnInit(): void;
}
