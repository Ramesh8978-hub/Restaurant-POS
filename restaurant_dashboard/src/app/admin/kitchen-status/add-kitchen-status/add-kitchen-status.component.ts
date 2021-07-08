import { Router } from '@angular/router';
import { KitchenStatusModel } from './../../../shared/models/kitchen-status.model';
import { OrderStatusService } from './../../../shared/services/order-status.service';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { KitchenStatusService } from 'src/app/shared/services/kitchen-status.service';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-kitchen-status',
  templateUrl: './add-kitchen-status.component.html',
  styleUrls: ['./add-kitchen-status.component.scss'],
})
export class AddKitchenStatusComponent implements OnInit {
  constructor(
    private kitchenStatusService: KitchenStatusService,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private router: Router,
    private simpleDialog: MatDialogRef<AddKitchenStatusComponent>
  ) {
    simpleDialog.disableClose = true;
  }
  kitchenstatus: any;
  id;
  createdById;
  kitchenStatusForm: FormGroup;

  ngOnInit(): void {
    this.createdById = parseInt(window.localStorage.getItem('id'));
    this.kitchenStatusForm = new FormGroup({
      createdBy: new FormControl(this.createdById, Validators.required),
      kitchenStatus: new FormControl('', Validators.required)
    });
    this.id = this.kitchenStatusService.getter();
    this.kitchenStatusService.getKitchenStatusDetailsById(this.id).subscribe(data => {
        this.kitchenstatus = data;
        this.kitchenStatusForm = this.formBuilder.group({
          kitchenStatus: new FormControl(this.kitchenstatus.kitchenStatus, Validators.required),
          status: new FormControl( this.kitchenstatus.status, Validators.required),
          updatedBy: new FormControl(this.kitchenstatus.updatedBy, Validators.required),
        });
      });
  }
  KitchenStatus() {
    if (!this.id){
      this.kitchenStatusService.postKitchenStatus(this.kitchenStatusForm.value).subscribe((data) => {
          if (data) {
            this.snackBar.open('KichenStatus  Added!', 'Success', {
              duration: 2000
            });
            this.kitchenStatusForm.reset();
            this.router.navigate(['/admin/kitchen-status']);
          }
        },
        (err) => this.errorHandler(err, 'KichenStatus Added Failed.')
        );
    }else{
      this.kitchenStatusService.putKitchenStatus(this.kitchenstatus.id, this.kitchenStatusForm.value).subscribe(data => {
        if (data) {
          this.snackBar.open('KichenStatus Updated!', 'Success', {
            duration: 2000
          });
          this.kitchenStatusForm.reset();
          this.router.navigate(['/admin/kitchen-status']);
        }
      },
      (err) => this.errorHandler(err, 'KichenStatus Update Failed.')
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
