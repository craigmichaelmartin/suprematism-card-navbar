import { Injectable } from '@angular/core';
import * as Rx from 'rxjs';
import { Model } from './model';

export interface ActionFunc {
  (currentState: Model): Model;
}

let cid = 0;

@Injectable()
export class StateManagerService {
  private model: Rx.Subject<ActionFunc>;
  private currentModel: Rx.ReplaySubject<Model>;

  static getUniqueId(prefix = 'cid') {
    cid += 1;
    return `${prefix}_${cid}`;
  }

  constructor() {
    this.model = new Rx.Subject<ActionFunc>();
    this.currentModel = new Rx.ReplaySubject<Model>(1);
  }

  get getModel(): Rx.ReplaySubject<Model> {
    return this.currentModel;
  }

  set setModel(Model: any) {
    this.model
      .startWith(Model)
      .scan((currentState: Model, actionMethod: ActionFunc) => actionMethod(currentState))
      .share()
      .subscribe((currentState) => {
        this.currentModel.next(currentState);
      });
  }

  updateModel(action: ActionFunc) {
    this.model.next(action);
  }
}
