import { OnInit } from '@angular/core';
import { Location } from '@angular/common';
export declare class MainComponent implements OnInit {
    private _location;
    selectedTab: string;
    selectedCard: string;
    constructor(_location: Location);
    ngOnInit(): void;
}
