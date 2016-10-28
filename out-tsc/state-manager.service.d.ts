import * as Rx from 'rxjs';
import { Model } from './model';
export interface ActionFunc {
    (currentState: Model): Model;
}
export declare class StateManagerService {
    private model;
    private currentModel;
    static getUniqueId(prefix?: string): string;
    constructor();
    readonly getModel: Rx.ReplaySubject<Model>;
    setModel: any;
    updateModel(action: ActionFunc): void;
}
