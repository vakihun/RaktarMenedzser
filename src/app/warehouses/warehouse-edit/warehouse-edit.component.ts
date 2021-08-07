import { Component, OnInit, Inject} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { WarehouseService } from "../warehouse.service";
import { SnackbarService } from "../../shared/snackbar.service";
import { Warehouse } from "../warehouse.model";

interface DialogData {
  id: string;
  address: string;
  length: number;
  width: number;
  editMode: number;
}

@Component({
  selector: 'app-warehouse-edit',
  templateUrl: './warehouse-edit.component.html',
  styleUrls: ['./warehouse-edit.component.css'],
})
export class WarehouseEditComponent implements OnInit {

  modalForm: FormGroup;
  editMode: number;

  constructor(public dialogRef: MatDialogRef<WarehouseEditComponent>,
              @Inject(MAT_DIALOG_DATA) private data: DialogData,
              private warehouseService: WarehouseService,
              private snackbarService: SnackbarService) {}

  ngOnInit() {
    this.editMode = this.data.editMode;
    let warehouseId = '';
    let warehouseAddress = '';
    let warehouseLength: number;
    let warehouseWidth: number;
    if(this.editMode !== -1){
      warehouseId= this.data.id;
      warehouseAddress= this.data.address;
      warehouseLength = this.data.length;
      warehouseWidth = this.data.width;
    }
    this.modalForm = new FormGroup({
      id: new FormControl({ value: warehouseId,disabled: true }),
      address: new FormControl(warehouseAddress, [Validators.required,Validators.maxLength(50)]),
      length: new FormControl(warehouseLength, [Validators.required,Validators.min(1),Validators.max(5)]),
      width: new FormControl(warehouseWidth, [Validators.required,Validators.min(1),Validators.max(5)]),
    });
  }

  onSubmit() {
    const warehouse = new Warehouse(this.modalForm.get('id').value,this.modalForm.get('address').value,this.modalForm.get('length').value,this.modalForm.get('width').value);
    if(this.editMode===-1) {
      this.warehouseService.addWarehouse(warehouse);
    } else {
      this.warehouseService.updateWarehouse(this.editMode,warehouse);
    }
    this.snackbarService.open("Sikeres mentés");
    this.dialogRef.close();
  }

  onCancel() {
    this.dialogRef.close();
  }
}

