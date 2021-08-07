import { Component, OnDestroy, OnInit } from '@angular/core';
import { WarehouseService } from 'src/app/warehouses/warehouse.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-warehouse-fitcheck',
  templateUrl: './warehouse-fitcheck.component.html',
  styleUrls: ['./warehouse-fitcheck.component.css'],
})
export class WarehouseFitcheckComponent implements OnInit, OnDestroy {
  isFit: string;
  eventSubscription: Subscription;
  bgColor: string;

  constructor(private warehouseService: WarehouseService) {}

  ngOnInit(): void {
    this.eventSubscription = this.warehouseService.fitCheckUpdate.subscribe(this.calculateIsFit);
  }
  ngOnDestroy(): void {
    this.eventSubscription.unsubscribe();
  }
  calculateIsFit({things, warehouses})
  {
      for (let warehouse of warehouses) {
        let warehouseLength: number = warehouse.length;
        let warehouseWidth: number = warehouse.width;
        for (let thing of things) {
          if (
            thing.length <= warehouseLength &&
            thing.width <= warehouseWidth
          ) {
            warehouseLength -= thing.length;
            warehouseWidth -= thing.width;
            things = things.filter((obj) => obj !== thing);
          }
        }
      }
      if (things.length == 0) {
        this.isFit = 'BEFÉR';
        this.bgColor = 'green';
      } else {
        this.isFit = 'NEM FÉR';
        this.bgColor = 'red';
      }
  }
}
