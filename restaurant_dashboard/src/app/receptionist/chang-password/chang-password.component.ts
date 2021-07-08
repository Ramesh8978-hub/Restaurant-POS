import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserModel } from 'src/app/shared/models/users.model';
import { UsersService } from 'src/app/shared/services/users.service';

@Component({
  selector: 'app-chang-password',
  templateUrl: './chang-password.component.html',
  styleUrls: ['./chang-password.component.scss']
})
export class ChangPasswordComponent implements OnInit {
  id: number;
  users: UserModel | any;
  confirmPassword: string

  changePasswordForm;
  constructor(
    private userService: UsersService,
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.id = parseInt(window.localStorage.getItem('id'));
    this.changePasswordForm = new FormGroup({
      password: new FormControl('', Validators.required),
      newpassword: new FormControl('', Validators.required),
      confirmPassword: new FormControl('', Validators.required),
      updatedBy: new FormControl(this.id),
    });
    this.userService.getUsersDetailsById(this.id).subscribe((data) => {
      this.users = data;
    });

  }
  changePassword() {
    if (this.changePasswordForm.value.newpassword === this.changePasswordForm.value.confirmPassword) {
      this.userService.changePassword(this.id, this.changePasswordForm.value).subscribe(data => {
        this.snackBar.open('Password Updated!', 'Success', {
          duration: 2000,
        });
      },
      (err) => this.errorHandler(err, "Old password can't be matched"))
    }
    else{
      this.snackBar.open( "Please match confirm password", 'Error', {
        duration: 2000,
      });    }
  }
  private errorHandler(error: any, message: string) {
    this.snackBar.open(message, 'Error', {
      duration: 2000,
    });
  }

}
