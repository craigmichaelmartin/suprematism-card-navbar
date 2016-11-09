import { ActivatedRoute, Params } from '@angular/router';
import { Component, OnInit } from '@angular/core';

declare var require: any;

@Component({
  template: require('./page.component.html')
})
export class PageComponent implements OnInit {

  selectedTab: string;
  selectedCard: string;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.params.forEach((params: Params) => {
      this.selectedTab = params['selectedTab'];
      this.selectedCard = params['selectedCard'];
    });
  }

}
