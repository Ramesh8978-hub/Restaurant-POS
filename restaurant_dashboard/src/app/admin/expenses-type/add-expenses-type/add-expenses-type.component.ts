import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { ExpensesTypesModel } from 'src/app/shared/models/expenses-types.model';
import { ExpensesTypeService } from 'src/app/shared/services/expenses-type.service';

@Component({
  selector: 'app-add-expenses-type',
  templateUrl: './add-expenses-type.component.html',
  styleUrls: ['./add-expenses-type.component.scss']
})
export class AddExpensesTypeComponent implements OnInit {

  id: any;
//payments: PaymentsModel[] | any;
  expensestypeData: ExpensesTypesModel[] | any;
  expensesTypeForm: any;
  createdById: number;
  typedata:any
  constructor(private snackBar: MatSnackBar,
    private router: Router,
    private route: ActivatedRoute,
    private expenseTypeService:ExpensesTypeService,
    private formBuilder: FormBuilder,
    simpleDialog: MatDialogRef<AddExpensesTypeComponent>) {
    simpleDialog.disableClose = true;
  }

  ngOnInit(): void {
    this.createdById = parseInt(window.localStorage.getItem('id'));
      //this.id = parseInt(this.route.snapshot.paramMap.get('id'));
    this.expensesTypeForm = new FormGroup({
      type: new FormControl('', Validators.required),
      createdBy: new FormControl(this.createdById, Validators.required),

    });
    this.id = this.expenseTypeService.getter();
    this.expenseTypeService.getExpensesTypeById(this.id).subscribe(data => {
      this.typedata = data;
      this.expensesTypeForm = this.formBuilder.group({
        type: new FormControl(this.typedata.ExpensesData.type, Validators.required),
        status: new FormControl(this.typedata.ExpensesData.status, Validators.required),
        updatedBy: new FormControl(this.createdById),
      });
    });
  }
  expensesType() {
    if (this.expensesTypeForm.status === 'INVALID') {
      return;
    }
    if (!this.id) {
      this.expenseTypeService.addExpensesType(this.expensesTypeForm.value).subscribe(data => {
        if (data) {
          this.snackBar.open('ExpensesType Added!', 'Success', {
            duration: 2000,
          });
          this.expensesTypeForm.reset();
        }
      },
      (err) => this.errorHandler(err, 'ExpensesType Added Failed.'));
    }
    else {
      this.expenseTypeService.updateExpensesType(this.id, this.expensesTypeForm.value).subscribe(data => {
        if (data) {
          this.snackBar.open('ExpensesType Updated!', 'Success', {
            duration: 2000,
          });
          this.expensesTypeForm.reset();

        }
      },
      
      (err) => this.errorHandler(err, 'ExpensesType update Failed.')
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
