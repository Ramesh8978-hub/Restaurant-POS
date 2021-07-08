import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserModel } from 'src/app/shared/models/users.model';
import { UsersService } from 'src/app/shared/services/users.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  Url = environment.root;
  imagePreview: string | ArrayBuffer;
  imageName: any;
  id: number;
  firstName: string;
  lastName: string;
  imagepath: string;
  status: boolean;
  role: string;
  users: UserModel[] | any;
  imagePath: string;
  file: File = null;
  userData: any;
  confirmPassword: string;
  changePasswordForm;

  usersForm = new FormGroup({
    roleId: new FormControl('', Validators.required),
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    username: new FormControl('', Validators.required),
    mobileNo: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email,
    Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),]),
    address: new FormControl('', Validators.required),
    age: new FormControl('', Validators.required),
    aadharNo: new FormControl('', Validators.required),
    imagepath: new FormControl(''),
    status: new FormControl(true, Validators.required),
    createdBy: new FormControl('', Validators.required),
  });

  constructor(
    private usersService: UsersService,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.id = parseInt(window.localStorage.getItem('id'));

    if (this.id) {
      this.usersService.getUsersDetailsById(this.id).subscribe((data) => {
        this.users = data;
        this.imagePath = this.users.imagepath;
        this.firstName = this.users.firstName;
        this.lastName = this.users.lastName;
        this.role = this.users.role.role;
        window.localStorage.setItem('image', this.users.imagepath);
        this.usersForm = this.formBuilder.group({
          id: new FormControl(this.users.id, Validators.required),
          roleId: new FormControl(this.users.role.id, Validators.required),
          firstName: new FormControl(this.users.firstName, Validators.required),
          lastName: new FormControl(this.users.lastName, Validators.required),
          username: new FormControl({ value: this.users.username, disabled: true }, Validators.required),
          mobileNo: new FormControl(this.users.mobileNo, Validators.required),
          aadharNo: new FormControl(this.users.aadharNo, Validators.required),
          email: new FormControl(this.users.email, Validators.required),
          age: new FormControl(this.users.age, Validators.required),
          status: new FormControl(this.users.status, Validators.required),
          address: new FormControl(this.users.address, Validators.required),
          imagepath: new FormControl(this.users.imagepath),
        });
      });
    }
    this.changePasswordsForm();
  }

  changePasswordsForm() {
    this.changePasswordForm = new FormGroup({
      password: new FormControl('', Validators.required),
      newpassword: new FormControl('', Validators.required),
      confirmPassword: new FormControl('', Validators.required),
      updatedBy: new FormControl(this.id),
    });
  }

  changePassword() {
    if (this.changePasswordForm.status === 'INVALID') {
      return;
    }
    if (this.changePasswordForm.value.newpassword === this.changePasswordForm.value.confirmPassword) {
      this.usersService.changePassword(this.id, this.changePasswordForm.value).subscribe(data => {
        this.snackBar.open('Password Updated!', 'Success', {
          duration: 2000,
        });
      },
        (err) => this.errorHandler(err, 'Old password can\'t be matched'));
    }
    else {
      this.snackBar.open('Please match confirm password', 'Error', {
        duration: 2000,
      });
    }
  }

  private errorHandler(error: any, message: string) {
    this.snackBar.open(message, 'Error', {
      duration: 2000,
    });
  }

  onFileSelected(event) {
    this.imageName = event.target.files[0].name;
    this.file = event.target.files[0];
    this.usersForm.controls.imagepath.setValue(this.file ? this.file : '');
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result;
    };
    reader.readAsDataURL(this.file);
  }

  Submit(id: number) {
    const fb = new FormData();
    fb.append('imagepath', this.file);
    this.usersService.updateImage(id, fb).subscribe((resp) => { });
  }

  Users() {
    const age = parseInt(this.usersForm.value.age);
    this.usersForm.value.age = age
    if (this.usersForm.status === 'INVALID') {
      return;
    }
    this.Submit(this.id);
    this.usersService.putUsers(this.users.id, this.usersForm.value).subscribe((data) => {
      if (data) {
        this.userData = data;
        this.snackBar.open('Profile Updated!', 'Success', {
          duration: 2000,
        });
      }
    });
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
  keyPressAlpha(event) {
    var inp = String.fromCharCode(event.keyCode);
    if (/[a-zA-Z0-9-_@()*#:,/ ]/.test(inp)) {
      return true;
    } else {
      event.preventDefault();
      return false;
    }
  }
  keyPressNumericAlpha(event) {
    var inp = String.fromCharCode(event.keyCode);
    if (/[a-zA-Z0-9]/.test(inp)) {
      return true;
    } else {
      event.preventDefault();
      return false;

    }
  }
}
