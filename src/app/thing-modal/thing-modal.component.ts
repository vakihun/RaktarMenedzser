import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

interface DialogData {
  name: string;
  length: number;
  width: number;
  event: string;
}

@Component({
  selector: 'app-thing-modal',
  templateUrl: './thing-modal.component.html',
  styleUrls: ['./thing-modal.component.css'],
})
export class ThingModalComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<ThingModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  ngOnInit(): void {}

  doAction() :void {
    this.dialogRef.close();
  }

  closeDialog() :void {
    this.dialogRef.close({ event: 'Cancel' });
  }
}
