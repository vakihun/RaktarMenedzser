import {AfterContentInit, Component, OnDestroy, ViewChild} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { WarehouseService } from './warehouse.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../shared/confirm-dialog/confirm-dialog.component';
import { AuthService, Role } from '../auth/auth.service';
import { Warehouse } from './warehouse.model';
import { WarehouseEditComponent } from './warehouse-edit/warehouse-edit.component';
import {BehaviorSubject, Subscription} from 'rxjs';
import {take} from "rxjs/operators";
import {Thing} from "../things/thing.model";
import {ThingService} from "../things/thing.service";

@Component({
  selector: 'app-warehouses',
  templateUrl: './warehouses.component.html',
  styleUrls: ['./warehouses.component.css'],
})
export class WarehousesComponent implements AfterContentInit, OnDestroy {
  displayedColumns: string[] = ['id', 'address','length', 'width', 'actions'];
  dataSource: MatTableDataSource<Warehouse>;

  dialogRef: MatDialogRef<ConfirmationDialogComponent>;

  subscription: Subscription;
  userRole: Role;
  Role: typeof Role = Role;

  @ViewChild(MatPaginator) set matPaginator(paginator: MatPaginator) {
    if (!this.dataSource.paginator) {
      this.dataSource.paginator = paginator;
    }
  }
  @ViewChild(MatSort) set matSort(sort: MatSort) {
    if (!this.dataSource.sort) {
      this.dataSource.sort = sort;
    }
  }

  constructor(private warehouseService: WarehouseService, private thingService: ThingService, public dialog: MatDialog, private authService: AuthService) {}

  ngAfterContentInit() {
    this.dataSource = new MatTableDataSource<Warehouse>();
    this.subscription = this.warehouseService.warehousesChanged
      .subscribe(
        (warehouses: Warehouse[]) => {
          this.dataSource.data = warehouses;
        }
      );
    this.dataSource.data = this.warehouseService.getWarehouses();
    this.authService.user.pipe(take(1)).subscribe(user => {
      this.userRole = user.role;
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openEditDialog(element: any): void {
    let editMode = -1;
    if(Object.keys(element).length !== 0) {
      editMode = this.dataSource.sortData(this.dataSource.filteredData,this.dataSource.sort).findIndex( obj => obj === element);
    }
    this.dialog.open(WarehouseEditComponent, {
      width: '350px',
      data: {
        id: element.id,
        address: element.name,
        length: element.length,
        width: element.width,
        editMode: editMode,
      },
    });
  }

  openConfirmationDialog(warehouse: Warehouse): void {
    const index = this.dataSource.sortData(this.dataSource.filteredData,this.dataSource.sort).findIndex( obj => obj === warehouse);
    this.dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      disableClose: false,
    });
    this.dialogRef.componentInstance.confirmMessage =
      'Biztosan törölni akarja a(z) ' + warehouse.address + ' című raktárat?';

    this.dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.warehouseService.deleteWarehouse(index);
      }
    });
  }
}
