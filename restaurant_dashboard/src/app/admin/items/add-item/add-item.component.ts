import { environment } from 'src/environments/environment';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoryService } from 'src/app/shared/services/category.service';
import { ItemsService } from 'src/app/shared/services/items.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.scss'],
  providers: [ItemsService, CategoryService],
})
export class AddItemComponent implements OnInit {
  Url = environment.root;
  imagePreview: string | ArrayBuffer;
  imageName: any;
  id;
  data;
  itemForm: FormGroup;
  categoryData;
  ById: number;
  itemData;
  imagePath: string;
  file: File = null;
  showImage:boolean;
  
  chartsCards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return [
          { title: 'Orders', cols: 2, rows: 1 },
          { title: 'Revenue', cols: 2, rows: 1 },
        ];
      }
      return [
        { title: 'Orders', cols: 1, rows: 1 },
        { title: 'Revenue', cols: 1, rows: 1 },
      ];
    })
  );

  constructor(
    private breakpointObserver: BreakpointObserver,
    private itemService: ItemsService,
    private categoryService: CategoryService,
    private formBuilder: FormBuilder,
    private snackbar: MatSnackBar,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.id = parseInt(this.route.snapshot.paramMap.get('id'));
    this.ById = parseInt(window.localStorage.getItem('id'));
    this.categoryService.getCategoryDetailsByStatus().subscribe((data) => {
      this.categoryData = data;
    });
    this.initForm();
  }

  initForm() {
    if (this.id) {
      this.showImage = true;
      this.itemService.getItemById(this.id).subscribe((data) => {
        this.data = data;
        this.imagePath = this.data.imagepath;
        this.itemForm = this.formBuilder.group({
          itemName: [this.data.itemName, Validators.required],
          categoryId: [this.data.category.id, Validators.required],
          price: [this.data.price, Validators.required],
          priority: [this.data.priority],
          status: [this.data.status, Validators.required],
          updatedBy: [this.ById, Validators.required],
        });
      });
    } else {
      this.itemForm = this.formBuilder.group({
        categoryId: ['', Validators.required],
        itemName: ['', Validators.required],
        price: ['', Validators.required],
        priority: [''],
        createdBy: [this.ById, Validators.required],
      });
    }
  }

  onFileSelected(event) {
    this.imageName = event.target.files[0].name;
    this.file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result;
    };
    reader.readAsDataURL(this.file);
  }

  Submit(id: number) {
    const fb = new FormData();
    fb.append('imagepath', this.file);
    this.itemService.updateImage(id, fb).subscribe((resp) => {});
  }

  onSubmit() {
    const price=parseInt(this.itemForm.value.price);
    this.itemForm.value.price=price
    if (this.itemForm.status === 'INVALID') {
      return;
    }
    if (!this.id) {
      this.itemService.postItems(this.itemForm.value).subscribe(
        (resp) => {
          this.itemData = resp;
          this.Submit(this.itemData.itemsdata.identifiers[0].id);
          this.snackbar.open('Added Successfully!', 'Success', {
            duration: 2000,
          });
          this.router.navigate(['/admin/items']);
        },
        (err) => this.errorHandler(err, 'Items added Failed.')
      );
    } else {
      this.itemService.updateItem(this.id, this.itemForm.value).subscribe(
        (resp) => {
          this.itemData = resp;
          this.Submit(this.id);
          this.snackbar.open('Updated Successfully!', 'Success', {
            duration: 2000,
          });
          this.router.navigate(['/admin/items']);
        },
        (err) => this.errorHandler(err, 'Items Updated Failed.')
      );
    }
  }

  private errorHandler(error: any, message: string) {
    this.snackbar.open(message, 'Error', {
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
  keyPressNumeric(event) {
    var inp = String.fromCharCode(event.keyCode);
    if (/[0-9]/.test(inp)) {
      return true;
    } else {
      event.preventDefault();
      return false;
    }
  }
}
