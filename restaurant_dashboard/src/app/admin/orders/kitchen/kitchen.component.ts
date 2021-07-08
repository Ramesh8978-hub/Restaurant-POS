import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/shared/services/users.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-kitchen',
  templateUrl: './kitchen.component.html',
  styleUrls: ['./kitchen.component.scss']
})
export class KitchenComponent implements OnInit {
  Url = environment.root;
  data: any;
  isLoading: boolean;
  total: number;
  noData = {
    noDataFound: 'No Data Found',
    image: '/assets/no_data_found.png'
  };
  constructor(
    private userService: UsersService
  ) { }

  ngOnInit(): void {
    this.isLoading = true;

    this.userService.getKitchenDetails().subscribe(data => {
      this.data = data;
      this.total = this.data.length
      this.isLoading = false;
    });
  }

}
