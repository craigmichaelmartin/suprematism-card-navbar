import { Injectable } from '@angular/core';
import { Model } from './model';
import { Observable } from 'rxjs/Observable';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/scan';
import 'rxjs/add/operator/share';

export type ActionFunc = (currentState: Model) => Model;

let cid = 0;

@Injectable()
export class StateManagerService {
  private model: Subject<ActionFunc>;
  private currentModel: ReplaySubject<Model>;

  static getUniqueId(prefix = 'cid') {
    cid += 1;
    return `${prefix}_${cid}`;
  }

  constructor() {
    this.model = new Subject<ActionFunc>();
    this.currentModel = new ReplaySubject<Model>(1);
  }

  get getModel(): ReplaySubject<Model> {
    return this.currentModel;
  }

  /* tslint:disable:no-shadowed-variable */
  set setModel(Model: any) {
    this.model
      .startWith(Model)
      .scan((currentState: Model, actionMethod: ActionFunc) =>
        actionMethod(currentState)
      )
      .share()
      .subscribe(currentState => {
        this.currentModel.next(currentState);
      });
  }
  /* tslint:enable:no-shadowed-variable */

  updateModel(action: ActionFunc) {
    this.model.next(action);
  }

  updateModelFromObservable(stream: Observable<Model>) {
    stream.subscribe((model: Model) =>
      this.model.next(currentState => Object.assign({}, currentState, model))
    );
  }
}
