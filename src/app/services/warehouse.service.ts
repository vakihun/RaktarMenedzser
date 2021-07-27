import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';

import { Warehouse } from '../warehouse';
import { WAREHOUSES } from '../mock-warehouses';

@Injectable({
  providedIn: 'root',
})
export class WarehouseService {
  warehouses: Warehouse[];

  constructor() {
    this.warehouses = WAREHOUSES;
  }

  getWarehouses(): Observable<Warehouse[]> {
    return of(this.warehouses);
  }
  updateWarehouse(
    warehouse: Warehouse,
    address: string,
    length: number,
    width: number
  ): Observable<void> {
    let objIndex: number = this.warehouses.findIndex(
      (obj) => obj.id == warehouse.id
    );
    this.warehouses[objIndex].address = address;
    this.warehouses[objIndex].length = length;
    this.warehouses[objIndex].width = width;
    return of();
  }

  addWarehouse(name: string, length: number, width: number): Observable<void> {
    let newWarehouse: Warehouse = {
      id: this.makeId(6),
      address: name,
      length: length,
      width: width,
    };
    this.warehouses.push(newWarehouse);
    return of();
  }

  removeWarehouse(warehouse: Warehouse): Observable<any> {
    return of(
      (this.warehouses = this.warehouses.filter((obj) => obj !== warehouse))
    );
  }

  makeId(length: number): string {
    let result: string = '';
    let characters: string =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < length; i++) {
      result += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    }
    return result;
  }
}
