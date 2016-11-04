import { ActivatedRoute, Params } from '@angular/router';
import { Component, OnInit } from '@angular/core';

declare var require: any;

@Component({
  template: require('./page.component.html')
})
export class PageComponent implements OnInit {

  one: string;
  two: string;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.params.forEach((params: Params) => {
      this.one = params['one'];
      this.two = params['two'];
    });
  }

}
