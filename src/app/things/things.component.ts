import { AfterContentInit, Component, OnDestroy, ViewChild} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Thing } from './thing.model';
import { ThingService } from './thing.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ThingEditComponent } from './thing-edit/thing-edit.component';
import { ConfirmationDialogComponent } from '../shared/confirm-dialog/confirm-dialog.component';
import { AuthService, Role} from '../auth/auth.service';
import { Subscription } from "rxjs";
import { take } from "rxjs/operators";

@Component({
  selector: 'app-things',
  templateUrl: './things.component.html',
  styleUrls: ['./things.component.css'],
})
export class ThingsComponent implements AfterContentInit, OnDestroy {
  displayedColumns: string[] = ['name', 'length', 'date', 'actions'];
  dataSource: MatTableDataSource<Thing>;

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

  constructor(private thingService: ThingService, public dialog: MatDialog, private authService: AuthService) {}

  ngAfterContentInit() {
    this.dataSource = new MatTableDataSource<Thing>();
    this.subscription = this.thingService.thingsChanged
      .subscribe(
        (things: Thing[]) => {
          this.dataSource.data = things;
        }
      );
    this.dataSource.data = this.thingService.getThings();
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
    this.dialog.open(ThingEditComponent, {
      width: '350px',
      data: {
        name: element.name,
        length: element.length,
        width: element.width,
        editMode: editMode,
      },
    });
  }

  openConfirmationDialog(thing: Thing): void {
    const index = this.dataSource.sortData(this.dataSource.filteredData,this.dataSource.sort).findIndex( obj => obj === thing);
    this.dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      disableClose: false,
    });
    this.dialogRef.componentInstance.confirmMessage =
      'Biztosan törölni akarja a(z) ' + thing.name + ' nevű elemet?';

    this.dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.thingService.deleteThing(index);
      }
    });
  }
}
