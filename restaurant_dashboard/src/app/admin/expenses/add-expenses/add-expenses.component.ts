import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { ExpensesTypeService } from 'src/app/shared/services/expenses-type.service';
import { ExpensesService } from 'src/app/shared/services/expenses.service';
import { PaymentModeService } from 'src/app/shared/services/payment-mode.service';
import { UsersService } from 'src/app/shared/services/users.service';

@Component({
  selector: 'app-add-expenses',
  templateUrl: './add-expenses.component.html',
  styleUrls: ['./add-expenses.component.scss']
})
export class AddExpensesComponent implements OnInit {
  createdBy: number;
  expensesForm: FormGroup;
  expensesData: any;
  userdata: any;
  id: any;
  expenseType: any;
  paymentType: any;
  eid: number;
  constructor(private snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private expensesService: ExpensesService,
    private expenseTypeService: ExpensesTypeService,
    private userService: UsersService,
    private paymentModeService: PaymentModeService,
    private formBuilder: FormBuilder,
    simpleDialog: MatDialogRef<AddExpensesComponent>) {
    simpleDialog.disableClose = true;
  }

  ngOnInit(): void {
    this.createdBy = parseInt(window.localStorage.getItem('id'))
    //this.id = parseInt(this.route.snapshot.paramMap.get('id'));
    this.getData();
    this.expensesForm = new FormGroup({
      expenseTypeId: new FormControl('', Validators.required),
      name: new FormControl('', Validators.required),
      discription: new FormControl(''),
      amount: new FormControl('', Validators.required),
      createdBy: new FormControl(this.createdBy, Validators.required),
      employeeId: new FormControl(''),
      paymentModeId: new FormControl('', Validators.required),

    });
    this.id = this.expensesService.getter();
    this.expensesService.getExpensesById(this.id).subscribe(data => {
      this.expensesData = data;
      this.expensesForm = this.formBuilder.group({
        expenseTypeId: new FormControl(this.expensesData.expensestype.id, Validators.required),
        name: new FormControl(this.expensesData.name, Validators.required),
        discription: new FormControl(this.expensesData.discription),
        amount: new FormControl(this.expensesData.amount, Validators.required),
        paymentModeId: new FormControl(this.expensesData.paymentMode.id, Validators.required),
        employeeId: new FormControl(this.expensesData.employee.id),
        updatedBy: new FormControl(this.createdBy, Validators.required),
      });
    });
  }
  getData(){
    this.expenseTypeService.getExpensesType().subscribe(data => {
      this.expenseType = data
    })
    this.paymentModeService.getpaymentsModeDetails().subscribe(data => {
      this.paymentType = data
    })
    this.userService.getUsersDetails().subscribe(data => {
      this.userdata = data
    })
  }
  expenses(){
    const amount = parseInt(this.expensesForm.value.amount);
    this.expensesForm.value.amount = amount
    console.log(this.expensesForm.value);
    if (!this.id) {
      this.expensesService.addExpenses(this.expensesForm.value).subscribe(data => {
        if (data) {
          console.log(data);
          
          this.snackBar.open('Expenses Added!', 'Success', {
            duration: 2000,
          });
          this.expensesForm.reset();

        }
      });
    }
    else {
      this.expensesService.updateExpenses(this.id, this.expensesForm.value).subscribe(data => {
        if (data) {
          this.snackBar.open('Expenses Updated!', 'Success', {
            duration: 2000,
          });
          this.expensesForm.reset();
        }
      });
    }
  }

  keyPressAlphaNumeric(event) {
    var inp = String.fromCharCode(event.keyCode);
    if (/[a-zA-Z ]/.test(inp)) {
      return true;
    } else {
      event.preventDefault();
      return false;
    }
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
