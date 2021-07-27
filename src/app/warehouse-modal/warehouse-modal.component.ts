import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

interface DialogData {
  id: string;
  address: string;
  length: number;
  width: number;
  event: string;
}

@Component({
  selector: 'app-warehouse-modal',
  templateUrl: './warehouse-modal.component.html',
  styleUrls: ['./warehouse-modal.component.css'],
})
export class WarehouseModalComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<WarehouseModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  ngOnInit(): void {}

  doAction() : void {
    this.dialogRef.close();
  }

  closeDialog() : void {
    this.dialogRef.close({ event: 'Cancel' });
  }
}
