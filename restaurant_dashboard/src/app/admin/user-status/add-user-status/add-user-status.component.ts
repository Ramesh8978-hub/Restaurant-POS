import { Component, OnInit } from '@angular/core';
import {FormBuilder,  FormControl, FormGroup, Validators} from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserStatusService } from 'src/app/shared/services/user-status.service';

@Component({
  selector: 'app-add-user-status',
  templateUrl: './add-user-status.component.html',
  styleUrls: ['./add-user-status.component.scss'],
})
export class AddUserStatusComponent implements OnInit {
  constructor(
    private userStatusService: UserStatusService,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private router: Router,
    private simpleDialog: MatDialogRef<AddUserStatusComponent>
  ) {
    simpleDialog.disableClose = true;
  }
  id;
  createdById;
  userstatus: any;
  userstatusForm: any;

  ngOnInit(): void {
    this.createdById = parseInt(window.localStorage.getItem('id'));
    this.userstatusForm = new FormGroup({
      createdBy: new FormControl(this.createdById, Validators.required),
      userStatus: new FormControl('', Validators.required),
    });
    this.id = this.userStatusService.getter();
    if (this.id) {
      this.userStatusService.getUserStatusDetailsById(this.id).subscribe((data) => {
          this.userstatus = data;
          this.userstatusForm = this.formBuilder.group({
            userStatus: new FormControl(this.userstatus.userStatus, Validators.required),
            status: new FormControl(this.userstatus.status, Validators.required),
            updatedBy: new FormControl(this.userstatus.updatedBy, Validators.required),
          });
        });
    }
  }
  UserStatus() {
    if (!this.id) {
      this.userStatusService.postUserStatus(this.userstatusForm.value).subscribe((data) => {
          if (data) {
            this.snackBar.open('UserStatus Added!', 'Success', {
              duration: 2000,
            });
            this.userstatusForm.reset();
            this.router.navigate(['/admin/user-status']);
          }
        },
        (err) => this.errorHandler(err, 'UserStatus Added Failed.')
        );
    } else {
      this.userStatusService.putUserStatus(this.userstatus.id, this.userstatusForm.value).subscribe((data) => {
          if (data) {
            this.snackBar.open('UserStatus Updated!', 'Success', {
              duration: 2000,
            });
            this.userstatusForm.reset();
            this.router.navigate(['/admin/user-status']);
          }
        },
        (err) => this.errorHandler(err, 'UserStatus Update Failed.')
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
