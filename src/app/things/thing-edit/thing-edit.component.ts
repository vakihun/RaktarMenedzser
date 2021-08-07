import {Component, OnInit, Inject, OnDestroy} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {FormGroup, FormControl, Validators} from "@angular/forms";
import {ThingService} from "../thing.service";
import {SnackbarService} from "../../shared/snackbar.service";
import {Thing} from "../thing.model";

interface DialogData {
  name: string;
  length: number;
  width: number;
  editMode: number;
}

@Component({
  selector: 'app-thing-modal',
  templateUrl: './thing-edit.component.html',
  styleUrls: ['./thing-edit.component.css'],
})
export class ThingEditComponent implements OnInit {

  modalForm: FormGroup;
  editMode: number;

  constructor(public dialogRef: MatDialogRef<ThingEditComponent>, @Inject(MAT_DIALOG_DATA) private data: DialogData, private thingService: ThingService, private snackbarService: SnackbarService) {}

  ngOnInit() {
    this.editMode = this.data.editMode;
    let thingName = '';
    let thingLength: number;
    let thingWidth: number;
    if(this.editMode !== -1){
      thingName = this.data.name;
      thingLength = this.data.length;
      thingWidth = this.data.width;
    }
    this.modalForm = new FormGroup({
      name: new FormControl(thingName, [Validators.required,Validators.maxLength(50)]),
      length: new FormControl(thingLength, [Validators.required,Validators.min(1),Validators.max(5)]),
      width: new FormControl(thingWidth, [Validators.required,Validators.min(1),Validators.max(5)]),
    });
  }

  onSubmit() {
    const thing = new Thing(this.modalForm.get('name').value,this.modalForm.get('length').value,this.modalForm.get('width').value,new Date());
    if(this.editMode==-1) {
      this.thingService.addThing(thing);
    } else {
      this.thingService.updateThing(this.editMode,thing);
    }
    this.snackbarService.open("Sikeres mentés");
    this.dialogRef.close();
  }

  onCancel() {
    this.dialogRef.close();
  }
}

