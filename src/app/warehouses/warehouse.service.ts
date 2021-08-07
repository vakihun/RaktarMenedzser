import { Injectable } from '@angular/core';

import { Warehouse } from './warehouse.model';
import {BehaviorSubject, Subject} from "rxjs";
import {Thing} from "../things/thing.model";
import {ThingService} from "../things/thing.service";

@Injectable({
  providedIn: 'root',
})
export class WarehouseService {
  warehouses: Warehouse[] = [
    new Warehouse('w0XpJK', 'Eger', 5, 4 ),
    new Warehouse('Hjkl2X','Budapest', 2,  4 ),
    new Warehouse('Pjqs5k',  'Debrecen', 2,  5 )
  ];
  warehousesChanged = new Subject<Warehouse[]>();
  fitCheckUpdate = new BehaviorSubject<{things: Thing[], warehouses: Warehouse[]}>({things: this.thingService.getThings(), warehouses: this.getWarehouses()});

  constructor(private thingService: ThingService) {
  }

  getWarehouses() {
    return this.warehouses;
  }

  updateWarehouse(index: number, newWarehouse: Warehouse){
    this.warehouses[index] = newWarehouse;
    this.warehousesChanged.next(this.warehouses.slice());
    this.fitCheckUpdate.next({things: this.thingService.getThings(),warehouses: this.getWarehouses()});
  }

  addWarehouse(newWarehouse: Warehouse) {
    newWarehouse.id=this.makeId(6);
    this.warehouses.push(newWarehouse);
    this.warehousesChanged.next(this.warehouses.slice());
    this.fitCheckUpdate.next({things: this.thingService.getThings(),warehouses: this.getWarehouses()});
  }

  deleteWarehouse(index: number) {
    this.warehouses.splice(index, 1);
    this.warehousesChanged.next(this.warehouses.slice());
    this.fitCheckUpdate.next({things: this.thingService.getThings(),warehouses: this.getWarehouses()});
  }

  makeId(length: number): string {
    let result: string = '';
    let characters: string =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < length; i++) {
      result += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    }
    return result;
  }
}
