import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/shared/services/users.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-waiters',
  templateUrl: './waiters.component.html',
  styleUrls: ['./waiters.component.scss'],
  providers: [UsersService],
})
export class WaitersComponent implements OnInit {
  Url = environment.root;
  data: any;
  isLoading: boolean;
  total: number;
  noData = {
    noDataFound: 'No Data Found',
    image: '/assets/no_data_found.png'
  };
  constructor(private userService: UsersService) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.userService.getWaiterDetails().subscribe((data) => {
      this.data = data;
      this.total = this.data.length
      this.isLoading = false;
    });
  }
}
