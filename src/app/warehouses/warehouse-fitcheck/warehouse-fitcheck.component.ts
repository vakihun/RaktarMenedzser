import { Component, OnInit } from '@angular/core';
import { WarehouseService } from 'src/app/warehouses/warehouse.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-warehouse-fitcheck',
  templateUrl: './warehouse-fitcheck.component.html',
  styleUrls: ['./warehouse-fitcheck.component.css'],
})
export class WarehouseFitcheckComponent implements OnInit {
  fitCheckUpdate$: Observable<{ isFit: string, bgColor: string }>;

  constructor(private warehouseService: WarehouseService) {
  }

  ngOnInit(): void {
    this.fitCheckUpdate$ = this.warehouseService.fitCheckUpdate.pipe(
      map(this.calculateIsFit)
    );
  }

  calculateIsFit({ things, warehouses }): { isFit: string, bgColor: string } {
    warehouses.forEach(warehouse => {
      let warehouseLength: number = warehouse.length;
      let warehouseWidth: number = warehouse.width;
      things.forEach(thing => {
        if (
          thing.length <= warehouseLength &&
          thing.width <= warehouseWidth
        ) {
          warehouseLength -= thing.length;
          warehouseWidth -= thing.width;
          things = things.filter((obj) => obj !== thing);
        }
      });
    });
    if (things.length == 0) {
      return {
        isFit: 'Befér',
        bgColor: 'green'
      }
    } else {
      return {
        isFit: 'Nem fér',
        bgColor: 'red'
      }
    }
  }
}
