import { PaymentsModel } from './../../../shared/models/payments.model';
import { PaymentModeService } from './../../../shared/services/payment-mode.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-payments-mode',
  templateUrl: './add-payments-mode.component.html',
  styleUrls: ['./add-payments-mode.component.scss'],
})
export class AddPaymentsModeComponent implements OnInit {

  constructor(private paymentModeService: PaymentModeService,
              private formBuilder: FormBuilder,
              private snackBar: MatSnackBar,
              private simpleDialog: MatDialogRef<AddPaymentsModeComponent>) {
    simpleDialog.disableClose = true;
  }
  createdById;
  id;
  payments: PaymentsModel[] | any;
  paymentsForm: FormGroup;

  ngOnInit(): void {
    this.createdById = parseInt(window.localStorage.getItem('id'));
    this.paymentsForm = new FormGroup({
      createdBy: new FormControl(this.createdById, Validators.required),
      paymentMode: new FormControl('', Validators.required)
    });

    this.id = this.paymentModeService.getter();
    this.paymentModeService.getpaymentsModeDetailsById(this.id).subscribe(data => {
      this.payments = data;
      this.paymentsForm = this.formBuilder.group({
        paymentMode: new FormControl(this.payments.paymentMode, Validators.required),
        status: new FormControl(this.payments.status, Validators.required),
        updatedBy: new FormControl(this.createdById)
      });
    });
  }
  Payments() {
    if (!this.id) {
      this.paymentModeService.postPaymentMode(this.paymentsForm.value).subscribe(data => {
        if (data) {
          this.snackBar.open('PaymentMode Added!', 'Success', {
            duration: 2000
          });
          this.paymentsForm.reset();
        }
      },
      (err) => this.errorHandler(err, 'PaymentMode Added Failed.')
      );
    }
    else {     
      this.paymentModeService.putPaymentsMode(this.payments.id, this.paymentsForm.value).subscribe(data => {
        if (data) {
          this.snackBar.open('PaymentMode Updated!', 'Success', {
            duration: 2000
          });
          this.paymentsForm.reset();
        }
      },
      (err) => this.errorHandler(err, 'PaymentMode Update Failed.')
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
