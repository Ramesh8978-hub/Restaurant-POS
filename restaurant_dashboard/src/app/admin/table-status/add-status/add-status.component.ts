import { TablesModel } from './../../../shared/models/tables.model';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { TableStatusService } from 'src/app/shared/services/table-status.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-status',
  templateUrl: './add-status.component.html',
  styleUrls: ['./add-status.component.scss'],
})
export class AddStatusComponent implements OnInit {
  constructor(private tableStatusService: TableStatusService,
              private formBuilder: FormBuilder,
              private snackBar: MatSnackBar,
              private router: Router,
              private simpleDialog: MatDialogRef<AddStatusComponent>) {
  simpleDialog.disableClose = true;
   }
   id;
   createdById;
   tablestatus: any;
   tablestatusForm: any;

  ngOnInit(): void {
    this.createdById = parseInt(window.localStorage.getItem('id'));
    this.tablestatusForm = new FormGroup({
      createdBy: new FormControl(this.createdById, Validators.required),
      tableStatus: new FormControl('', Validators.required)
    });
    this.id = this.tableStatusService.getter();
    if (this.id){
    this.tableStatusService.getTablesStatusDetailsById(this.id).subscribe(data => {
      this.tablestatus = data;
      this.tablestatusForm = this.formBuilder.group({
        tableStatus: new FormControl(this.tablestatus.tableStatus, Validators.required),
        status: new FormControl(this.tablestatus.status, Validators.required),
        updatedBy: new FormControl(this.tablestatus.updatedBy, Validators.required)
        });
    });
  }
  }
  TableStatus(){
    if (!this.id){
      this.tableStatusService.postTableStatus(this.tablestatusForm.value).subscribe( data => {
       if (data) {
        this.snackBar.open('TableStatus Added!', 'Success', {
          duration: 2000
        });
        this.tablestatusForm.reset();
        this.router.navigate(['/admin/table-status']);
      }
      },
      (err) => this.errorHandler(err, 'TableStatus Added Failed.')
      );
    }
    else{
      this.tableStatusService.putTablesStatus(this.tablestatus.id, this.tablestatusForm.value).subscribe(data => {
        if (data) {
          this.snackBar.open('TableStatus Updated!', 'Success', {
            duration: 2000
          });
          this.tablestatusForm.reset();
          this.router.navigate(['/admin/table-status']);
        }
      },
      (err) => this.errorHandler(err, 'TableStatus Update Failed.')
      );
    }
  }
  private errorHandler(error: any, message: string) {
    this.snackBar.open(message, 'Error', {
      duration: 2000,
    });
  }
  keyPressAlphaNumeric(event) {
    var inp = String.fromCharCode(event.keyCode);
    if (/[a-zA-Z-_ ]/.test(inp)) {
      return true;
    } else {
      event.preventDefault();
      return false;
    }
  }
}
