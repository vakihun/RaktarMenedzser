import { AfterContentInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Thing } from '../thing';
import { ThingService } from '../services/thing.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ThingModalComponent } from '../thing-modal/thing-modal.component';
import { ConfirmationDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { AuthService } from '../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-things',
  templateUrl: './things.component.html',
  styleUrls: ['./things.component.css'],
})
export class ThingsComponent implements AfterContentInit {
  displayedColumns: string[] = ['name', 'length', 'date', 'actions'];
  dataSource: MatTableDataSource<Thing>;

  dialogRef?: MatDialogRef<ConfirmationDialogComponent>;

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
    private thingService: ThingService,
    public dialog: MatDialog,
    private authservice: AuthService,
    private snackBar: MatSnackBar
  ) {
    this.dataSource = new MatTableDataSource<Thing>();
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
    this.thingService
      .getThings()
      .subscribe((things) => (this.dataSource.data = things));
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
    const dialogRef = this.dialog.open(ThingModalComponent, {
      width: '250px',
      data: {
        name: obj.name,
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

  addData(thing: Thing): void {
    this.thingService.addThing(thing.name, thing.length, thing.width);
    this.refreshTable();
    this.showSnackBar('Sikeres mentés', '', 5000);
  }
  updateData(thing: Thing, result: Thing): void {
    this.thingService.updateThing(
      thing,
      result.name,
      result.length,
      result.width
    );
    this.refreshTable();
    this.showSnackBar('Sikeres mentés', '', 5000);
  }

  //////////////////////////////////////////////////////////////

  openConfirmationDialog(thing: Thing): void {
    this.dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      disableClose: false,
    });
    this.dialogRef.componentInstance.confirmMessage =
      'Biztosan törölni akarja a(z) ' + thing.name + ' nevű elemet?';

    this.dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.thingService.removeThing(thing);
        this.refreshTable();
      }
    });
  }
}
