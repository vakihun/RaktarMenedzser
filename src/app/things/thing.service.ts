import { Injectable } from '@angular/core';
import { Thing } from './thing.model';
import { Subject } from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class ThingService {
  things: Thing[] = [
      new Thing('váza', 1, 2,new Date(2021, 7, 6, 10, 33, 30 )),
      new Thing('asztal', 2,5,new Date(2021, 7, 6, 11, 22, 30 )),
      new Thing('szék', 2,2,new Date(2021, 7, 6, 12, 43, 30 )),
      new Thing('tv', 3,1,new Date(2021, 7, 6, 13, 12, 30 )),
      new Thing('rádió', 2,2,new Date(2021, 7, 6, 14, 54, 30 )),
      new Thing('hűtő', 1,4,new Date(2021, 7, 6, 15, 1, 30 )),
      new Thing('fagyasztó', 4,3,new Date(2021, 7, 6, 16, 12, 30 )),
      new Thing('doboz', 3,2,new Date(2021, 7, 6, 20, 43, 30 )),
  ];
  thingsChanged = new Subject<Thing[]>();

  constructor() {}

  getThings() {
    return this.things;
  }

  updateThing(index: number, newThing: Thing){
    this.things[index] = newThing;
    this.thingsChanged.next(this.things.slice());
  }

  addThing(thing: Thing) {
    this.things.push(thing);
    this.thingsChanged.next(this.things.slice());
  }

  deleteThing(index: number) {
    this.things.splice(index, 1);
    this.thingsChanged.next(this.things.slice());
  }
}
