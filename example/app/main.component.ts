import { Component } from '@angular/core';

declare var require: any;

@Component({
  selector: 'supre-root',
  template: require('./main.component.html')
})
export class MainComponent {}
