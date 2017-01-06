import { OnInit } from '@angular/core';
import { Router } from '@angular/router';
import 'rxjs/add/operator/map';
import { StateManagerService } from '../state-manager.service';
export declare class CardNavbarComponent implements OnInit {
    private stateManagerService;
    private router;
    supreSelectedTab: string;
    supreSelectedCard: string;
    constructor(stateManagerService: StateManagerService, router: Router);
    ngOnInit(): void;
}
