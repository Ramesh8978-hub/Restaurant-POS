import { OrdersStatusModel } from './../../../shared/models/orders-status.model';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { OrderStatusService } from 'src/app/shared/services/order-status.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-orders-status',
  templateUrl: './add-orders-status.component.html',
  styleUrls: ['./add-orders-status.component.scss'],
})
export class AddOrdersStatusComponent implements OnInit {
orderstatus: any;
  id;
  createdById;
  orderStatusForm: FormGroup;
constructor(private orderStatusService: OrderStatusService,
            private snackBar: MatSnackBar,
            private formBuilder: FormBuilder,
            private router: Router,
            private simpleDialog: MatDialogRef<AddOrdersStatusComponent>) {
  simpleDialog.disableClose = true;
}

  ngOnInit(): void {
    this.createdById = parseInt(window.localStorage.getItem('id'));
    this.orderStatusForm = new FormGroup({
      createdBy: new FormControl(this.createdById, Validators.required),
      orderStatus: new FormControl('', Validators.required)
    });
    this.id = this.orderStatusService.getter();
    this.orderStatusService.getOrdersStatusDetailsById(this.id).subscribe(data => {
      this.orderstatus = data;
      this.orderStatusForm = this.formBuilder.group({
        orderStatus: new FormControl(this.orderstatus.orderStatus, Validators.required),
        status : new FormControl(this.orderstatus.status, Validators.required),
        updatedBy: new FormControl(this.orderstatus.updatedBy, Validators.required),
        });
    });


  }
 OrderStatus(){
  if (this.orderStatusForm.status === "INVALID" ) {
    return;
  }
  if (!this.id){
    this.orderStatusService.postOrdersStatus(this.orderStatusForm.value).subscribe(data => {
    if (data) {
      this.snackBar.open('OrderStatus Added!', 'Success', {
        duration: 2000
      });
      this.orderStatusForm.reset();
      this.router.navigate(['/admin/orders-status']);
     }
  },
  (err) => this.errorHandler(err, 'OrderStatus Added Failed.')
  );
   }
   else{
    this.orderStatusService.putOrdersStatus(this.orderstatus.id, this.orderStatusForm.value).subscribe(data => {
      if (data) {
        this.snackBar.open('OrderStatus Updated!', 'Success', {
          duration: 2000
        });
        this.orderStatusForm.reset();
        this.router.navigate(['/admin/orders-status']);

      }
    },
    (err) => this.errorHandler(err, 'OrderStatus Update Failed.')
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
