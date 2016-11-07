import { ActivatedRoute } from '@angular/router';
import { OnInit } from '@angular/core';
export declare class PageComponent implements OnInit {
    private route;
    one: string;
    two: string;
    constructor(route: ActivatedRoute);
    ngOnInit(): void;
}
