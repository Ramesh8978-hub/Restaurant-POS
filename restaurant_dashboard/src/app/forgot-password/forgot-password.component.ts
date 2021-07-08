import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../auth/core/services/auth.service';
import {
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { showError: true },
    },
  ],
})
export class ForgotPasswordComponent implements OnInit {
  otp: number;
  data: any;
  emailForm: FormGroup;
  passwordForm: FormGroup;
  OTPForm: FormGroup;
  email: string;
  id: number;
  constructor(
    private authService: AuthService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.id = parseInt(window.localStorage.getItem('id'));
    this.emailForm = new FormGroup({
      email: new FormControl('', Validators.required),
    });
    this.passwordForm = new FormGroup({
      password: new FormControl('', Validators.required),
      cnfpassword: new FormControl('', Validators.required)
    });
    this.OTPForm = new FormGroup({
      otp: new FormControl('', Validators.required),
    });
  }
  sendOTP() {
    this.authService.SendOTP(this.emailForm.value).subscribe((data) => {
      this.data = data;
      this.email = this.data.email;
      this.otp = this.data.otp;
      if (this.data) {
        this.snackBar.open('OTP Sent To Your Mail!', 'Success', {
          duration: 2000,
        });
      } else {
        this.snackBar.open('Please Enter Valid EmailId!', 'Error', {
          duration: 2000,
        });
      }
    });
  }

  VerifyOTP() {
    const data = {
      email: this.email,
      otp: parseInt(this.OTPForm.value.otp)
    };
    this.authService.MatchOTP(data).subscribe((data) => {
      this.data = data;
      this.snackBar.open(this.data.messege, 'Success', {
        duration: 2000,
      });
    });
  }

  UpdatePassword() {
    const updateData = {
      email: this.email,
      password: this.passwordForm.value.password
    };
    this.authService.forgotPassword(updateData).subscribe((data) => {
        if (data) {
          this.snackBar.open('Credentials Updated!', 'Success', {
            duration: 2000,
          });
        } else {
          this.snackBar.open('Password Update Failed!', 'Error', {
            duration: 2000,
          });
        }
      });
  }

  private errorHandler(error: any, message: string) {
    this.snackBar.open(message, 'Error', {
      duration: 2000,
    });
  }
}
