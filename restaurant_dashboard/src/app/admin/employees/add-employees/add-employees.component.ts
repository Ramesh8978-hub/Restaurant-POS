import { RolesService } from './../../../shared/services/roles.service';
import { UserModel } from './../../../shared/models/users.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UsersService } from './../../../shared/services/users.service';
import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-add-employees',
  templateUrl: './add-employees.component.html',
  styleUrls: ['./add-employees.component.scss'],
})
export class AddEmployeesComponent implements OnInit {
  Url = environment.root;

  imagePreview: string | ArrayBuffer;
  imageName: any;
  constructor(
    private route: ActivatedRoute,
    private rolesservice: RolesService,
    private usersService: UsersService,
    private router: Router,
    private snackBar: MatSnackBar,
    private formBuilder: FormBuilder
  ) {}
  users: UserModel[] | any;
  id;
  roles;
  userData: any;
  createdById;
  file: File = null;
  usersForm: FormGroup;
  imagePath: string;
  minNum = 5;
  maxNum = 12;
  showImage:boolean;
  ngOnInit(): void {
    this.createdById = parseInt(window.localStorage.getItem('id'));
    this.id = parseInt(this.route.snapshot.paramMap.get('id'));
    this.rolesservice.GetRoles().subscribe((data) => {
      this.roles = data;
    });
   
    this.usersForm = new FormGroup({
      roleId: new FormControl('', Validators.required),
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      username: new FormControl('', Validators.required),
      mobileNo: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[6-9]\d{9}$/),
      ]),
      email: new FormControl('', [
        Validators.required,Validators.email,
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
      ]),
      address: new FormControl('', Validators.required),
      age: new FormControl ('', Validators.required),
      aadharNo: new FormControl('', Validators.required),
      imagepath: new FormControl(''),
      status: new FormControl(true, Validators.required),
      createdBy: new FormControl(this.createdById, Validators.required),
    });

    if (this.id) {
      this.showImage = true
      this.usersService.getUsersDetailsById(this.id).subscribe((data) => {
        this.users = data;
        this.imagePath = this.users.imagepath;
        this.usersForm = this.formBuilder.group({
          id: new FormControl(this.users.id, Validators.required),
          roleId: new FormControl(this.users.role.id, Validators.required),
          firstName: new FormControl(this.users.firstName, Validators.required),
          lastName: new FormControl(this.users.lastName, Validators.required),
          username: new FormControl(
            { value: this.users.username, disabled: true },
            Validators.required
          ),
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
    this.usersService.updateImage(id, fb).subscribe((resp) => {
    });
  }
  Users() {
    const age=parseInt(this.usersForm.value.age);
    this.usersForm.value.age=age
    if (this.usersForm.status === 'INVALID') {
      return;
    }
    if (!this.id) {
    
     console.log(age);
      this.usersService.postUsers(this.usersForm.value).subscribe(
        (resp) => {
          this.userData = resp;
          this.Submit(this.userData.data.identifiers[0].id);
          if (resp) {
            this.snackBar.open('UsersDetails Added!', 'Success', {
              duration: 2000,
            });
            this.usersForm.reset();
            this.router.navigate(['/admin/employees']);
          }
        },
        (err) => this.errorHandler(err, 'UsersDetails Added Failed.')
      );
    } else {
      this.Submit(this.id);
      this.usersService.putUsers(this.users.id, this.usersForm.value).subscribe(
        (data) => {
          if (data) {
            this.userData = data;
            this.snackBar.open('UsersDetails Updated!', 'Success', {
              duration: 2000,
            });
            this.usersForm.reset();
            this.router.navigate(['/admin/employees']);
          }
        },
        (err) => this.errorHandler(err, 'UsersDetails Update Failed.')
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
}