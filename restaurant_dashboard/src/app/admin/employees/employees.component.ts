import { MatSnackBar } from '@angular/material/snack-bar';
import { UsersService } from './../../shared/services/users.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { environment } from 'src/environments/environment';
import * as XLSX from 'xlsx';
import 'jspdf-autotable';
import { jsPDF } from 'jspdf';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss'],
})
export class EmployeesComponent implements OnInit {
  Url = environment.root;
  isLoading: boolean;
  dataSource;
  data;
  id;
  roles;
  pageIndex: number;
  pageSize: number;
  total: number;
  usersForm;
  totalLength = [10];
  noData = {
    noDataFound: 'No Data Found',
    image: '/assets/no_data_found.png'
  };
  constructor(
    private userService: UsersService,
    private router: Router,
    private snackbar: MatSnackBar
  ) { }
  displayedColumns: string[] = [
    'id',
    'imagepath',
    'roleId',
    'firstName',
    'lastName',
    'username',
    'mobileNo',
    'email',
    'status',
    'actions',
  ];
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit(): void {
    this.id = parseInt(window.localStorage.getItem('id'));
    this.ReadUsersDetails();
    this.isLoading = true;
  }

  ReadUsersDetails() {
    this.userService.getUsersDetails().subscribe((data) => {
      this.dataSource = data;
      this.isLoading = false;
      this.dataSource = new MatTableDataSource(this.dataSource);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.total = this.dataSource.data.length;
      this.totalLength = this.dataSource.data.length;
      if (this.total > 100) {
        this.totalLength = [10, 25, 50, 100, this.total];
      } else {
        this.totalLength = [10, 25, 50, 100];
      }
    });
  }

  async changeStatus(id: number, status: boolean) {
    if (status === false) {
      status = true;
    } else {
      status = false;
    }
    this.usersForm = {
      status,
      updatedBy: this.id,
    };
    this.userService.updateStatus(id, this.usersForm).subscribe((data) => {
      this.ReadUsersDetails();
    });
  }

  applyFilter(event: string) {
    this.dataSource.filter = event.trim().toLowerCase();
  }

  UpdateUsers(user: any) {
    this.router.navigate([`admin/employees/${user}/edit`]);
  }

  DeleteUsers(user: number) {
    if (confirm("Are you sure! You want to delete this record?") === true) {
    this.userService.deleteUsers(user).subscribe((data) => {
      console.log(data);
      this.ReadUsersDetails();
      this.snackbar.open('UserDetails Deleted', 'Ok', {
        duration: 2000,
      });
    });
  }
}
  getFileName = (name: string) => {
    let timeSpan = new Date().toISOString();
    let sheetName = name || "EmployeeData";
    let fileName = `${sheetName}-${timeSpan}`;
    return {
      sheetName,
      fileName
    };
  }
  exportTable() {
    if (this.dataSource.filteredData.length === 0) {
      alert("No data available for ExportData");
    }
    else {
      const dataToExport = this.dataSource.filteredData
        .map(x => ({
          roleId: x.role.role,
          firstName: x.firstName,
          lastName: x.lastName,
          userName: x.userName,
          mobileNo: x.mobileNo,
          email: x.email,
          status: x.status

        }));

      let workSheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(dataToExport, <XLSX.Table2SheetOpts>{ sheet: 'Sheet 1' });
      let workBook: XLSX.WorkBook = XLSX.utils.book_new();

      // Adjust column width
      var wscols = [
        { wch: 15 }
      ];

      workSheet["!cols"] = wscols;
      XLSX.utils.book_append_sheet(workBook, workSheet, 'Sheet 1');
      XLSX.writeFile(workBook, `EmployeeData.xlsx`);
    }
  }
}

