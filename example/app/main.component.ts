import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

declare var require: any;

@Component({
  selector: 'supre-root',
  template: require('./main.component.html')
})
export class MainComponent implements OnInit {

  selectedTab: string;
  selectedCard: string;

  constructor(private _location: Location) {}

  ngOnInit() {
    const paths = this._location.path().split('/');
    [, this.selectedTab = 'segments', this.selectedCard = 'create'] = paths;
    if (paths.length !== 3) {
      this._location.go(`${this.selectedTab}/${this.selectedCard}`);
    }
  }

  accountChanged(name) {
    console.log(name);
  }

}
