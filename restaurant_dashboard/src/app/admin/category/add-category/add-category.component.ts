import { CategoryService } from './../../../shared/services/category.service';
import { Component, Inject, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { ActivatedRoute} from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss'],
})
export class AddCategoryComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private categoryService: CategoryService,
    private snackBar: MatSnackBar,
    private simpleDialog: MatDialogRef<AddCategoryComponent>,
  ) {
    simpleDialog.disableClose = true;
  }

  id;
  createdById;
  category: any;
  categoryForm: FormGroup;

  ngOnInit(): void {
    this.createdById = parseInt(window.localStorage.getItem('id'));
    this.id = parseInt(this.route.snapshot.paramMap.get('id'));
    this.categoryForm = new FormGroup({
      createdBy: new FormControl(this.createdById, Validators.required),
      category: new FormControl('', Validators.required)
    });

    this.id = this.categoryService.getter();
    this.categoryService.getCategoryById(this.id).subscribe( data => {
      this.category = data;
      this.categoryForm = this.formBuilder.group({
        category: new FormControl(this.category.category, Validators.required),
        status: new FormControl(this.category.status, Validators.required),
        updatedBy: new FormControl(this.createdById),
      });
    });
  //  (err) => this.errorHandler(err, 'Edit Category Failed.')
  }

  Category() {
    if (this.categoryForm.status === 'INVALID') {
      return;
    }
    if (!this.id) {
      this.categoryService.postCategory(this.categoryForm.value).subscribe(data => {
        if (data) {
            this.snackBar.open('Category Added!', 'Success', {
              duration: 2000,
            });
            this.categoryForm.reset();
          }
      },
      (err) => this.errorHandler(err, 'Category Added Failed.')
    );
    } else {
      this.categoryService.putCategory(this.category.id, this.categoryForm.value).subscribe(data => {
        if (data) {
          this.snackBar.open('Category Updated!', 'Success', {
            duration: 2000,
          });
          this.categoryForm.reset();
        }
    },
    (err) => this.errorHandler(err, 'Category Update Failed.')
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
}
