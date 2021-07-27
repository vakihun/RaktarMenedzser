import { AfterContentInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { WarehouseService } from '../services/warehouse.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { AuthService } from '../services/auth.service';
import { Warehouse } from '../warehouse';
import { WarehouseModalComponent } from '../warehouse-modal/warehouse-modal.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-warehouses',
  templateUrl: './warehouses.component.html',
  styleUrls: ['./warehouses.component.css'],
})
export class WarehousesComponent implements AfterContentInit {
  displayedColumns: string[] = ['id', 'address', 'length', 'width', 'actions'];
  dataSource: MatTableDataSource<Warehouse>;

  dialogRef?: MatDialogRef<ConfirmationDialogComponent>;
  eventsSubject: Subject<void> = new Subject<void>();

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

  constructor(
    private warehouseService: WarehouseService,
    public dialog: MatDialog,
    private authservice: AuthService,
    private snackBar: MatSnackBar
  ) {
    this.dataSource = new MatTableDataSource<Warehouse>();
  }

  ngAfterContentInit() {
    this.refreshTable();
  }

  get isAdmin(): boolean {
    return this.authservice.isAdmin();
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  refreshTable(): void {
    this.warehouseService
      .getWarehouses()
      .subscribe((warehouses) => (this.dataSource.data = warehouses));

    this.eventsSubject.next();
  }

  showSnackBar(content: string, action: string, duration: number): void {
    let sb = this.snackBar.open(content, action, {
      duration: duration,
      panelClass: ['snackbar-style'],
    });
    sb.onAction().subscribe(() => {
      sb.dismiss();
    });
  }

  //////////////////////////////////////////////////////////////

  openDialog(action: string, obj: any): void {
    const dialogRef = this.dialog.open(WarehouseModalComponent, {
      width: '250px',
      data: {
        id: obj.id,
        address: obj.address,
        length: obj.length,
        width: obj.width,
        event: action,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === undefined) return;
      if (result.event == 'Létrehozás') {
        this.addData(result);
      } else if (result.event == 'Módosítás') {
        this.updateData(obj, result);
      }
    });
  }

  addData(warehouse: Warehouse): void {
    this.warehouseService.addWarehouse(
      warehouse.address,
      warehouse.length,
      warehouse.width
    );
    this.refreshTable();
    this.showSnackBar('Sikeres mentés', '', 5000);
  }
  updateData(warehouse: Warehouse, result: Warehouse): void {
    this.warehouseService.updateWarehouse(
      warehouse,
      result.address,
      result.length,
      result.width
    );
    this.refreshTable();
    this.showSnackBar('Sikeres mentés', '', 5000);
  }

  //////////////////////////////////////////////////////////////

  openConfirmationDialog(warehouse: Warehouse): void {
    this.dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      disableClose: false,
    });
    this.dialogRef.componentInstance.confirmMessage =
      'Biztosan törölni akarja a(z) ' + warehouse.address + ' című raktárat?';

    this.dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.warehouseService.removeWarehouse(warehouse);
        this.refreshTable();
      }
    });
  }
}
