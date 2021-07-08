import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType } from 'chart.js';
import * as moment from 'moment';
import { Label } from 'ng2-charts';
import { map } from 'rxjs/operators';
import { CategoryModel } from 'src/app/shared/models/category.model';
import { ItemsModel } from 'src/app/shared/models/items.model';
import { OrdersModel } from 'src/app/shared/models/orders.model';
import { TablesModel } from 'src/app/shared/models/tables.model';
import { UserModel } from 'src/app/shared/models/users.model';
import { CategoryService } from 'src/app/shared/services/category.service';
import { ExpensesService } from 'src/app/shared/services/expenses.service';
import { ItemsService } from 'src/app/shared/services/items.service';
import { OrdersService } from 'src/app/shared/services/orders.service';
import { TablesService } from 'src/app/shared/services/tables.service';
import { UsersService } from 'src/app/shared/services/users.service';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {
  // orders: any
  // placeOrders: number;
  // servedOrders: number;
  // constructor(
  //   private orderService: OrdersService
  // ) { }

  // ngOnInit(): void {
  //   this.orderService.placedAndServedCount().subscribe(data => {
  //     this.orders = data;
  //     this.placeOrders = this.orders.placedOrders.length;
  //     this.servedOrders = this.orders.servedOrders.length;
  //   });
  // }

  statusCards: any;
  isLoading: boolean;
  data: any;
  categoriesCount: number;
  tableCount: number;
  waiterCount: number;
  itemsCount: number;
  ordersCount: number;
  categories: CategoryModel[] | any;
  tables: TablesModel[] | any;
  waiters: UserModel[] | any;
  items: ItemsModel[] | any;
  orders: OrdersModel[] | any;
  orderItems: OrdersModel[] | any;
  itemsFor: any[] = [];
  item: any;
  quantity: any;
  totQuantity: any;
  chartData = [];
  date = new Date();

  public pieChartOptions: ChartOptions = {
    responsive: true,
    legend: {
      position: 'top',
    },
    plugins: {
      datalabels: {
        formatter: (value, ctx) => {
          const label = ctx.chart.data.labels[ctx.dataIndex];
          return label;
        },
      },
    },
  };

  public pieChartLabels: Label[] = [];
  public pieChartData: number[] = [];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartColors = [
    {
      backgroundColor: [
        '#F0F8FF',
        '#FAEBD7',
        '#00FFFF',
        '#7FFFD4',
        '#FFEBCD',
        '#34495E',
        '#F39C12',
        '#8A2BE2',
        '#3498DB',
        '#95A5A6',
        '#16A085',
        '#5F9EA0',
        '#7FFF00',
        '#6495ED',
        '#DC143C',
        '#FFF8DC',
        '#008B8B',
        '#2F4F4F',
        '#FF00FF',
        '#228B22',
        '#F8F8FF'
      ],
    },
  ];

  public pieChart2Options: ChartOptions = {
    responsive: true,
    legend: {
      position: 'top',
    },
    plugins: {
      datalabels: {
        formatter: (value, ctx) => {
          const label = ctx.chart.data.labels[ctx.dataIndex];
          return label;
        },
      },
    },
  };

  public pieChart2Labels: Label[] = [];
  public pieChart2Data: number[] = [];
  public pieChart2Type: ChartType = 'pie';
  public pieChart2Legend = true;
  public pieChart2Colors = [
    {
      backgroundColor: [
        '#F0F8FF',
        '#FAEBD7',
        '#00FFFF',
        '#7FFFD4',
        '#FFEBCD',
        '#34495E',
        '#F39C12',
        '#8A2BE2',
        '#3498DB',
        '#95A5A6',
        '#16A085',
        '#5F9EA0',
        '#7FFF00',
        '#6495ED',
        '#DC143C',
        '#FFF8DC',
        '#008B8B',
        '#2F4F4F',
        '#FF00FF',
        '#228B22',
        '#F8F8FF'
      ],
    },
  ];
  public pieChart3Options: ChartOptions = {
    responsive: true,
    legend: {
      position: 'top',
    },
    plugins: {
      datalabels: {
        formatter: (value, ctx) => {
          const label = ctx.chart.data.labels[ctx.dataIndex];
          return label;
        },
      },
    },
  };

  public pieChart3Labels: Label[] = ['Today', 'Month', 'Year', 'All'];
  public pieChart3Data: number[] = [];
  public pieChart3Type: ChartType = 'pie';
  public pieChart3Legend = true;
  public pieChart3Colors = [
    {
      backgroundColor: [
        '#F0F8FF',
        '#FAEBD7',
        '#00FFFF',
        '#7FFFD4',
        '#FFEBCD',
        '#34495E',
        '#F39C12',
        '#8A2BE2',
        '#3498DB',
        '#95A5A6',
        '#16A085',
        '#5F9EA0',
        '#7FFF00',
        '#6495ED',
        '#DC143C',
        '#FFF8DC',
        '#008B8B',
        '#2F4F4F',
        '#FF00FF',
        '#228B22',
        '#F8F8FF'
      ],
    },
  ];

  public barChartOptions: ChartOptions = {
    responsive: true,
    scales: { xAxes: [{}], yAxes: [{}] },
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
      },
    },
  };
  public barChartLabels = [];
  public barChartType: ChartType = 'bar';
  public barChartLegend = false;
  public barChartColors = [
    {
      backgroundColor: [
        'rgba(0,0,255,0.3)',
        'rgba(0,255,0,0.3)',
        'rgba(255,0,0,0.3)',
      ],
    },
  ];

  public barChartData = [
    { data: [], label: 'Quantity' },
  ];

  public barChart2Options: ChartOptions = {
    responsive: true,
    scales: { xAxes: [{}], yAxes: [{}] },
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
      },
    },
  };
  public barChart2Labels = [];
  public barChart2Type: ChartType = 'bar';
  public barChart2Legend = false;

  public barChart2Data = [{ data: [], label: 'Amount' }];


  public barChart3Options: ChartOptions = {
    responsive: true,
    scales: { xAxes: [{}], yAxes: [{}] },
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
      },
    },
  };
  public barChart3Labels = ['Today', 'Month', 'Year', 'All'];
  public barChart3Type: ChartType = 'bar';
  public barChart3Legend = true;
  public barChart3Data = [
    { data: [], label: 'Income' },
    { data: [], label: 'Expense' },
  ];


  cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return [{ title: 'Items', cols: 2, rows: 1 }];
      }

      return [{ title: 'Items', cols: 1, rows: 1 }];
    })
  );
  totalIncomeData: any;
  todayIncomeData: any;
  monthlyIncomeData: any;
  yearlyIncomeData: any;
  totalIncome = 0;
  todayIncome = 0;
  monthlyIncome = 0;
  yearlyIncome = 0;
  totalExpenseData: any;
  todayExpenseData: any;
  monthlyExpenseData: any;
  yearlyExpenseData: any;
  totalExpense = 0;
  todayExpense = 0;
  monthlyExpense = 0;
  yearlyExpense = 0;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private categoryService: CategoryService,
    private tableService: TablesService,
    private userService: UsersService,
    private itemService: ItemsService,
    private orderService: OrdersService,
    private expenseService: ExpensesService
  ) {}

  async ngOnInit(): Promise<void> {
    this.isLoading = true;
    this.categoryService.getCategoryDetails().subscribe((data) => {
      this.categories = data;
      this.categoriesCount = this.categories.length;
    });
    this.tableService.getAvailableTables().subscribe((data) => {
      this.tables = data;
      this.tableCount = this.tables.length;
    });
    this.userService.getAvailableWaiters().subscribe((data) => {
      this.waiters = data;
      this.waiterCount = this.waiters.length;
    });
    this.itemService.getItems().subscribe((data) => {
      this.items = data;
      this.item = this.items.item;
      this.quantity = this.items.quantity;
      this.itemsCount = this.items.length;
    });
    this.orderService.getOrders().subscribe((data) => {
      this.orders = data;
      this.ordersCount = this.orders.length;
      this.isLoading = false;
    });
    this.todayReports();
    this.incomeReports();
    this.expenseReports();
  }

  Reports() {
    this.chartData = [];
    this.barChartLabels = [];
    this.barChart2Labels = [];
    this.barChartData[0].data = [];
    this.barChart2Data[0].data = [];
    this.pieChartData = [];
    this.pieChartLabels = [];
    this.pieChart2Data = [];
    this.pieChart2Labels = [];
    console.log(this.chartData, this.barChart2Data[0].data, this.barChartData[0].data);
    let added = false;
    this.itemsFor.map((items) => {
      const datatemp = {
        itemName: items.itemName,
        quantity: items.quantity,
        amount: items.amount,
      };
      for (const item of this.chartData) {
        if (item.itemName === datatemp.itemName) {
          item.quantity += datatemp.quantity;
          item.amount += datatemp.amount;
          added = true;
          break;
        }
      }
      if (!added) {
        this.chartData.push(datatemp);
      }
      added = false;
    });
    this.chartData.map((data) => {
      this.barChartLabels.push(data.itemName);
      this.pieChartLabels.push(data.itemName);
      this.pieChartData.push(data.quantity);
      this.barChart2Labels.push(data.itemName + ` (${data.quantity})`);
      this.barChartData[0].data.push(data.quantity);
      this.barChart2Data[0].data.push(data.amount);
      this.pieChart2Labels.push(data.itemName + ` (${data.quantity})`);
      this.pieChart2Data.push(data.amount);
    });

  }

  todayReports(){
    const toDay = `${this.date}`;
    console.log(toDay);
    this.orderService.OrderItemReports(toDay, toDay).subscribe(data => {
      console.log(data);
      this.orderItems = data;
      this.itemsFor = this.orderItems;
      this.Reports();
    });
  }
  monthlyReports(){
    const startMonth = moment().startOf('month').format('YYYY-MM-DD');
    const endMonth = moment().endOf('month').format('YYYY-MM-DD');
    console.log(startMonth, endMonth);
    this.orderService.OrderItemReports(startMonth, endMonth).subscribe(data => {
      console.log(data);
      this.orderItems = data;
      this.itemsFor = this.orderItems;
      this.Reports();
    });
  }
  yearlyReports(){
    const startYear = moment().startOf('year').format('YYYY-MM-DD');
    const endYear = moment().endOf('year').format('YYYY-MM-DD');
    console.log(startYear, endYear);
    this.orderService.OrderItemReports(startYear, endYear).subscribe(data => {
      console.log(data);
      this.orderItems = data;
      this.itemsFor = this.orderItems;
      this.Reports();
    });
  }
  allReports(){
    this.orderService.allReports().subscribe(
      (data) => {
        console.log(data);
        this.orderItems = data;
        this.itemsFor = this.orderItems;
        this.Reports();
      },
      (err: HttpErrorResponse) => {
        console.log(err.statusText);
      }
    );
  }

  incomeReports(){
    const toDay = `${this.date}`;
    console.log(toDay);
    this.orderService.OrderItemReports(toDay, toDay).subscribe(data => {
      this.todayIncomeData = data;
      this.todayIncomeData.map(data => {
        this.todayIncome += data.amount;
      });
      this.barChart3Data[0].data.push(this.todayIncome);
      this.pieChart3Data.push(this.todayIncome);
    });
    const startMonth = moment().startOf('month').format('YYYY-MM-DD');
    const endMonth = moment().endOf('month').format('YYYY-MM-DD');
    console.log(startMonth, endMonth);
    this.orderService.OrderItemReports(startMonth, endMonth).subscribe(data => {
      this.monthlyIncomeData = data;
      this.monthlyIncomeData.map(data => {
        this.monthlyIncome += data.amount;
      });
      this.barChart3Data[0].data.push(this.monthlyIncome);
      this.pieChart3Data.push(this.monthlyIncome);
    });
    const startYear = moment().startOf('year').format('YYYY-MM-DD');
    const endYear = moment().endOf('year').format('YYYY-MM-DD');
    console.log(startYear, endYear);
    this.orderService.OrderItemReports(startYear, endYear).subscribe(data => {
      this.yearlyIncomeData = data;
      this.yearlyIncomeData.map(data => {
        this.yearlyIncome += data.amount;
      });
      this.barChart3Data[0].data.push(this.yearlyIncome);
      this.pieChart3Data.push(this.yearlyIncome);
    });
    this.orderService.allReports().subscribe((data) => {
      this.totalIncomeData = data;
      this.totalIncomeData.map(tIncome => {
        this.totalIncome += tIncome.amount;
      });
      this.barChart3Data[0].data.push(this.totalIncome);
      this.pieChart3Data.push(this.totalIncome);
      });
  }

  expenseReports(){
    const toDay = `${this.date}`;
    this.expenseService.ExpenseReports(toDay, toDay).subscribe(data => {
      console.log(data);
      this.todayExpenseData = data;
      this.todayExpenseData.map(data => {
        this.todayExpense += data.amount;
      });
      this.barChart3Data[1].data.push(this.todayExpense);
    });
    const startMonth = moment().startOf('month').format('YYYY-MM-DD');
    const endMonth = moment().endOf('month').format('YYYY-MM-DD');
    console.log(startMonth, endMonth);
    this.expenseService.ExpenseReports(startMonth, endMonth).subscribe(data => {
      this.monthlyExpenseData = data;
      this.monthlyExpenseData.map(data => {
        this.monthlyExpense += data.amount;
      });
      this.barChart3Data[1].data.push(this.monthlyExpense);
    });
    const startYear = moment().startOf('year').format('YYYY-MM-DD');
    const endYear = moment().endOf('year').format('YYYY-MM-DD');
    console.log(startYear, endYear);
    this.expenseService.ExpenseReports(startYear, endYear).subscribe(data => {
      this.yearlyExpenseData = data;
      this.yearlyExpenseData.map(data => {
        this.yearlyExpense += data.amount;
      });
      this.barChart3Data[1].data.push(this.yearlyExpense);
    });
    this.expenseService.getExpenses().subscribe(data => {
      this.totalExpenseData = data;
      this.totalExpenseData.map(tIncome => {
        this.totalExpense += tIncome.amount;
      });
      this.barChart3Data[1].data.push(this.totalExpense);
    });
  }

}
