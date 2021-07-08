import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { TablesService } from 'src/app/shared/services/tables.service';

@Component({
  selector: 'app-receptionist-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent {
  Url = environment.root;
  lastLogin: string;
  image: string;
  orderStatus;
  tId:number;


  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  constructor(
    private breakpointObserver: BreakpointObserver,
    private router: Router,
    private tableService: TablesService,
  ) {}

  ngOnInit() {
    this.lastLogin = window.localStorage.getItem('lastLogin');
    this.image = window.localStorage.getItem('image');
    this. getTablesData()
  }
  getTablesData() {
    this.tableService.getServedTables().subscribe((data) => {
      this.orderStatus = data;
       this.tId = this.orderStatus[0].id
    });
  }

  logout() {
    window.localStorage.clear();
    this.router.navigate(['/login']);
  }
}
