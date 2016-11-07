import { ActivatedRoute } from '@angular/router';
import { OnInit } from '@angular/core';
export declare class PageComponent implements OnInit {
    private route;
    selectedTab: string;
    selectedCard: string;
    constructor(route: ActivatedRoute);
    ngOnInit(): void;
}
