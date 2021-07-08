import { OrdersService } from 'src/app/shared/services/orders.service';
import { ItemsService } from 'src/app/shared/services/items.service';
import { CategoryService } from './../../../shared/services/category.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TablesService } from 'src/app/shared/services/tables.service';

@Component({
  selector: 'app-new-order-item',
  templateUrl: './new-order-item.component.html',
  styleUrls: ['./new-order-item.component.scss'],
})
export class NewOrderItemComponent implements OnInit {
  createdById: number;

  categoryData;
  orderItems;
  tableId: number
  items;
  orderId: number;
  id: number;
  kitchenStatusId: number;
  orderItemForm = new FormGroup({
    orderId: new FormControl('', Validators.required),
    categoryId: new FormControl('', Validators.required),
    itemId: new FormControl('', Validators.required),
    quantity: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    kitchenStatusId: new FormControl('', Validators.required),
    createdBy: new FormControl('', Validators.required),
  });
  constructor(
    private categoryService: CategoryService,
    private itemsService: ItemsService,
    private orderItemsService: OrdersService,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar,
    private ordersService: OrdersService
  ) { }

  ngOnInit(): void {
    this.tableId = parseInt(this.route.snapshot.paramMap.get('id'));
    this.createdById = parseInt(window.localStorage.getItem('id'));
    this.kitchenStatusId = parseInt(window.localStorage.getItem('id'));
    this.id = parseInt(this.route.snapshot.paramMap.get('id'));

    this.categoryService.getCategoryDetails().subscribe((data) => {
      this.categoryData = data;
    });
    this.itemsService.getItems().subscribe((itemsdata) => {
      this.items = itemsdata;
    });

    this.ordersService.getOrderItems(this.tableId).subscribe(orders => {
      this.orderItems = orders;
      this.orderId = this.orderItems[0].order.id
      this.orderItemForm = new FormGroup({
        orderId: new FormControl(this.orderId, Validators.required),
        categoryId: new FormControl('', Validators.required),
        itemId: new FormControl('', Validators.required),
        quantity: new FormControl('', Validators.required),
        description: new FormControl('', Validators.required),
        kitchenStatusId: new FormControl(this.kitchenStatusId, Validators.required),
        createdBy: new FormControl(this.createdById, Validators.required),
      });

    });



  }


  onSubmit() {
    this.orderItemsService.postOrderItems(this.orderItemForm.value).subscribe(data => {
      if (data) {
        this.snackBar.open('Items Ordered Successfully!', 'Success', {
          duration: 2000,
        });
      }
    });
    this.router.navigate(['/Receptionist/orders'])
  }
}
