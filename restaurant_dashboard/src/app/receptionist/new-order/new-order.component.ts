import { isDataSource } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from 'src/app/shared/services/category.service';
import { ItemsService } from 'src/app/shared/services/items.service';
import { OrdersService } from 'src/app/shared/services/orders.service';
import { TablesService } from 'src/app/shared/services/tables.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-new-order',
  templateUrl: './new-order.component.html',
  styleUrls: ['./new-order.component.scss'],
})
export class NewOrderComponent implements OnInit {
  removable = true;
  isLoading: boolean;
  itemsArray = [];
  orderData: any;
  ELEMENT_DATA: any;
  dataSource: any;
  description: string;
  descriptionId: any;
  tableNumber: number;
  tableDataById;
  comment = false;
  Url = environment.root;
  amount: number;

  constructor(
    private categoryService: CategoryService,
    private tableService: TablesService,
    private itemsService: ItemsService,
    private orderService: OrdersService,
    private route: ActivatedRoute,
    private snackbar: MatSnackBar,
    private router: Router
  ) {}

  data;
  tableData;
  items;
  waiterId: number;
  orderId: number;
  id: number;
  ordersData;
  totalAmount = 0;
  displayedColumns: string[] = [
    'itemName',
    'price',
    'quantity',
    'description',
    'id',
  ];

  ngOnInit(): void {
    this.id = parseInt(this.route.snapshot.paramMap.get('id'));
    this.waiterId = parseInt(window.localStorage.getItem('id'));
    this.isLoading = true;
    this.tableService.getTableDataById(this.id).subscribe(data => {
      this.tableDataById = data;
      this.tableNumber = this.tableDataById.tableNumber;
    });
    this.categoryService.getCategoryDetailsByStatus().subscribe((data) => {
      this.data = data;
    });
    this.tableService.getAvailableTables().subscribe((data) => {
      this.isLoading = false;
      this.tableData = data;
    });
    this.orderService.getPlacedOrders(this.id).subscribe((orders) => {
      this.ordersData = orders;
      this.orderId = this.ordersData[0].id;
      this.amount = this.ordersData[0].amount;
      this.isLoading = false;
    }, err => console.log('orders fetching failed!'));
    this.itemsService.getAvailableItems().subscribe(data => {
      this.items = data;
    });
  }

  categoryData(event) {
    const category = {
      category: event.tab.textLabel,
    };
    if (category.category === 'All') {
      this.itemsService.getAvailableItems().subscribe(data => {
        this.items = data;
      });
    } else {
    this.itemsService.getCategoryItems(category).subscribe((data) => {
      this.items = data;
    });
    }
  }

  selectedItems( id: number, categoryId: number, itemName: string, price: number) {
    const description = '';
    const quantity = 1;
    const data = {
      id,
      categoryId,
      itemName,
      price,
      description,
      quantity,
    };
    let added = false;
    for (const item of this.itemsArray) {
      if (item.id === data.id) {
        item.quantity += 1;
        added = true;
        break;
      }
    }
    if (!added) {
      data.quantity = 1;
      this.itemsArray.push(data);
    }
    this.dataSource = new MatTableDataSource(this.itemsArray);
    this.countAmount();
  }

  async createOrder() {
    if (this.itemsArray[0]) {
      if (!this.orderId) {
        const data = {
          tableId: this.id,
          amount: this.totalAmount,
          waiterId: this.waiterId,
          orderStatusId: 1,
          createdBy: this.waiterId,
        };
        this.orderService.postOrder(data).subscribe((resp) => {
            this.orderData = resp;
            this.orderId = this.orderData.returnData.identifiers[0].id;
            for (let a of this.itemsArray) {
              const counter = {
                orderId: this.orderId,
                itemId: a.id,
                categoryId: a.categoryId,
                quantity: a.quantity,
                description: a.description,
                createdBy: this.waiterId,
              };
              a++;
              this.orderService.postOrderItems(counter).subscribe((resp) => {
                this.ELEMENT_DATA = resp;
                this.snackbar.open('Order Created Successfully!', 'Ok', {
                  duration: 3000,
                });
                this.router.navigate([`/Receptionist/orders/${this.id}`]);
              });
            }
          },
          (err) => this.errorHandler(err, 'Oops! something went wrong.')
        );
      } else {
        const order = {
          amount: this.amount + this.totalAmount,
          discount: 0,
          updatedBy: this.waiterId
        };
        this.orderService.updateOrdersAmount(this.orderId, order).subscribe(resp => {
          for (let a of this.itemsArray) {
            const counter = {
              orderId: this.orderId,
              itemId: a.id,
              categoryId: a.categoryId,
              quantity: a.quantity,
              description: a.description,
              createdBy: this.waiterId,
            };
            a++;
            this.orderService.postOrderItems(counter).subscribe((resp) => {
              this.ELEMENT_DATA = resp;
            }, (err) => this.errorHandler(err, 'Oops! something went wrong.'));
          }
          this.snackbar.open('Order Created Successfully!', 'Ok', {
            duration: 3000,
          });
          this.router.navigate([`/Receptionist/orders/${this.id}`]);
        });
      }
    } else {
      this.snackbar.open('Sorry.. there is no Items!', 'Error', {
        duration: 3000,
      });
    }
  }

  removeItem(id: number) {
    this.itemsArray = this.itemsArray.filter((value, key) => {
      return value.id !== id;
    });
    this.dataSource = new MatTableDataSource(this.itemsArray);
    this.countAmount();
  }

  increaseQty(data: number, id: number) {
    data++;
    this.itemsArray.filter((value) => {
      if (value.id === id) {
        return (value.quantity = data);
      }
    });
    this.dataSource = new MatTableDataSource(this.itemsArray);
    this.countAmount();
  }

  addDescription(id: number) {
    this.comment = true;
    this.itemsArray.filter((value) => {
      if (value.id === id) {
        return (this.description = value.description);
      }
    });
    this.descriptionId = id;
  }

  DescriptionSubmit() {
    this.itemsArray.filter((value) => {
      if (value.id === this.descriptionId) {
        return (value.description = this.description);
      }
    });
    this.descriptionId = 0;
    this.dataSource = new MatTableDataSource(this.itemsArray);
    this.comment = false;
  }

  decreaseQty(data: number, id: number) {
    if (data > 1) {
      data--;
      this.itemsArray.filter((value) => {
        if (value.id === id) {
          return (value.quantity = data);
        }
      });
      this.dataSource = new MatTableDataSource(this.itemsArray);
      this.countAmount();
    }
  }

  countAmount() {
    this.totalAmount = 0;
    this.itemsArray.filter((data) => {
      this.totalAmount += data.quantity * data.price;
    });
  }

  removeAllItems() {
    this.itemsArray = [];
    this.dataSource = new MatTableDataSource(this.itemsArray);
    this.totalAmount = 0;
  }

  private errorHandler(error: any, message: string) {
    this.snackbar.open(message, 'Error', {
      duration: 2000,
    });
  }
}
