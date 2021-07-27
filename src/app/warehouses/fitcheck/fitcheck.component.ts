import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ThingService } from 'src/app/services/thing.service';
import { WarehouseService } from 'src/app/services/warehouse.service';
import { forkJoin, Observable, Subscription } from 'rxjs';
import { Warehouse } from 'src/app/warehouse';
import { Thing } from 'src/app/thing';

@Component({
  selector: 'app-warehouse-fitcheck',
  templateUrl: './fitcheck.component.html',
  styleUrls: ['./fitcheck.component.css'],
})
export class FitcheckComponent implements OnInit, OnDestroy {
  isFit?: string;
  eventsSubscription?: Subscription;
  @Input() events?: Observable<void>;
  bgColor?: string;

  constructor(
    private warehouseService: WarehouseService,
    private thingService: ThingService
  ) {}

  ngOnInit(): void {
    this.calculateIsFit();
    this.eventsSubscription = this.events?.subscribe(() =>
      this.calculateIsFit()
    );
  }
  ngOnDestroy(): void {
    this.eventsSubscription?.unsubscribe();
  }
  calculateIsFit(): void {
    forkJoin([
      this.warehouseService.getWarehouses(),
      this.thingService.getThings(),
    ]).subscribe((result) => {
      let warehouses: Warehouse[] = result[0];
      let things : Thing[] = result[1];
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
    });
  }
}
