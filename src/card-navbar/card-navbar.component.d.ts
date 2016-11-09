import { OnInit } from '@angular/core';
import 'rxjs/add/operator/map';
import { StateManagerService } from '../state-manager.service';
export declare class CardNavbarComponent implements OnInit {
    private stateManagerService;
    supreSelectedTab: string;
    supreSelectedCard: string;
    constructor(stateManagerService: StateManagerService);
    ngOnInit(): void;
}
