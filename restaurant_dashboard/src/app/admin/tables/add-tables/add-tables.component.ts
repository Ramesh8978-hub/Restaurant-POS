import { MatSnackBar } from '@angular/material/snack-bar';
import { TablesService } from '../../../shared/services/tables.service';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-tables',
  templateUrl: './add-tables.component.html',
  styleUrls: ['./add-tables.component.scss'],
})
export class AddTablesComponent implements OnInit {
  constructor(
    private snackBar: MatSnackBar,
    private tablesService: TablesService,
    private formBuilder: FormBuilder,
    simpleDialog: MatDialogRef<AddTablesComponent>
  ) {
    simpleDialog.disableClose = true;
  }
  id;
  createdById: number;
  table: any;
  tablesForm: any;
  status: boolean;
  ngOnInit(): void {
    this.createdById = parseInt(window.localStorage.getItem('id'));

    this.tablesForm = new FormGroup({
      createdBy: new FormControl(this.createdById, Validators.required),
      tableNumber: new FormControl('', Validators.required),
      status: new FormControl(true, Validators.required),
      sittingCapacity: new FormControl('', Validators.required),
      updatedBy: new FormControl(''),
    });

    this.id = this.tablesService.getter();
    if (this.id) {
      this.tablesService.getTableDataById(this.id).subscribe((data) => {
        this.table = data;
        this.status = this.table.status;
        this.tablesForm = this.formBuilder.group({
          tableNumber: new FormControl(this.table.tableNumber, Validators.required),
          sittingCapacity: new FormControl(this.table.sittingCapacity, Validators.required),
          status: new FormControl(this.table.status, Validators.required),
          updatedBy: new FormControl(this.table.updatedBy),
        });
      });
    }
  }
  Tables() {
    const tableNumber=parseInt(this.tablesForm.value.tableNumber)
    const sittingCapacity=parseInt(this.tablesForm.value.sittingCapacity)
    this.tablesForm.value.tableNumber=tableNumber;
    this.tablesForm.value.sittingCapacity=sittingCapacity;
    if (this.tablesForm.status === 'INVALID') {
      return;
    }
    if (!this.id) {
      this.tablesService.postTables(this.tablesForm.value).subscribe((data) => {
        if (data) {
          this.snackBar.open('Tables Added!', 'Success', {
            duration: 2000,
          });
        }
      },
      (err) => this.errorHandler(err, 'Table Added Failed.')
      );
    } else {
      this.tablesService.putTables(this.table.id, this.tablesForm.value).subscribe((data) => {
          if (data) {
            this.snackBar.open('Tables Updated!', 'Success', {
              duration: 2000,
            });
          }
        },
        (err) => this.errorHandler(err, 'Table Update Failed.')
        );
    }
  }
  private errorHandler(error: any, message: string) {
    this.snackBar.open(message, 'Error', {
      duration: 2000,
    });
  }
  keyPressNumeric(event) {
    var inp = String.fromCharCode(event.keyCode);
    if (/[0-9]/.test(inp)) {
      return true;
    } else {
      event.preventDefault();
      return false;
    }
  }
}
