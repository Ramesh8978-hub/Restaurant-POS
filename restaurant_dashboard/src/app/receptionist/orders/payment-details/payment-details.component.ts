import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { OrdersService } from 'src/app/shared/services/orders.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { PaymentModeService } from 'src/app/shared/services/payment-mode.service';

@Component({
  selector: 'app-payment-details',
  templateUrl: './payment-details.component.html',
  styleUrls: ['./payment-details.component.scss']
})
export class PaymentDetailsComponent implements OnInit {

  tablenumber: number;
  orderItems: any;
  totalAmountt = 0;
  amount: any;
  discount = 0;
  orderid: any;
  paymentForm: FormGroup;
  updatedBy: number;
  paymentModes;

  constructor(
    private ordersService: OrdersService,
    private paymentService: PaymentModeService,
    private snackBar: MatSnackBar, private router: Router,
    simpleDialog: MatDialogRef<PaymentDetailsComponent>
  ) {
    simpleDialog.disableClose = true;
  }

  ngOnInit(): void {
    this.updatedBy = parseInt(window.localStorage.getItem('id'));
    this.tablenumber = this.ordersService.getter();
    this.getOrderedItems();
    this.paymentService.getpaymentsModeDetails().subscribe(data => {
      this.paymentModes = data;
    });
    this.paymentForm = new FormGroup({
      updatedBy: new FormControl('', Validators.required),
      amount: new FormControl(this.totalAmountt, Validators.required),
      discount: new FormControl('', Validators.required),
      mopId: new FormControl('', Validators.required)
    });
  }

  getOrderedItems() {
    this.ordersService.getOrderItems(this.tablenumber).subscribe(orders => {
      this.orderItems = orders;
      this.orderid = this.orderItems[0].order.id;
      this.orderItems.map((total) => {
        this.amount = total.amount;
        this.totalAmountt = this.totalAmountt + this.amount;
        this.paymentForm = new FormGroup({
          updatedBy: new FormControl(this.updatedBy, Validators.required),
          mopId: new FormControl('', Validators.required),
          amount: new FormControl(this.totalAmountt, Validators.required),
          discount: new FormControl('', Validators.required),
        });
      });
    });
  }

  payments() {
    if (this.paymentForm.status === 'INVALID') {
      return;
    }
    this.ordersService.updateOrdersAmount(this.orderid, this.paymentForm.value).subscribe((data) => {
      this.ordersService.updatePaymentMode(this.orderid, this.paymentForm.value).subscribe(resp => {
      });
      if (data) {
        this.snackBar.open(' OrderDetails Updated!', 'Success', {
          duration: 2000,
        });
        this.router.navigate([`Receptionist/invoice/${this.tablenumber}`]);
      }
      else{
        this.snackBar.open(' OrderDetails Not Updated!', 'Success', {
          duration: 2000,
        });
      }
    });
  }

}

