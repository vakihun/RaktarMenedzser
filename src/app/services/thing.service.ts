import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';

import { Thing } from '../thing';
import { THINGS } from '../mock-things';

@Injectable({
  providedIn: 'root',
})
export class ThingService {
  things: Thing[];

  constructor() {
    this.things = THINGS;
  }

  getThings(): Observable<Thing[]> {
    return of(this.things);
  }
  updateThing(
    thing: Thing,
    name: string,
    length: number,
    width: number
  ): Observable<void> {
    let objIndex: number = this.things.findIndex((obj) => obj.id == thing.id);
    this.things[objIndex].name = name;
    this.things[objIndex].length = length;
    this.things[objIndex].width = width;
    return of();
  }

  addThing(name: string, length: number, width: number): Observable<void> {
    let newThing = {
      id: this.things.length,
      name: name,
      length: length,
      width: width,
      date: Math.floor(Date.now() / 1000),
    };
    this.things.push(newThing);
    return of();
  }

  removeThing(thing: Thing): Observable<any> {
    return of((this.things = this.things.filter((obj) => obj !== thing)));
  }
}
