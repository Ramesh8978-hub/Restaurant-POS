import { environment } from 'src/environments/environment';
import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/shared/services/users.service';

@Component({
  selector: 'app-available-waiters',
  templateUrl: './available-waiters.component.html',
  styleUrls: ['./available-waiters.component.scss'],
})
export class AvailableWaitersComponent implements OnInit {
  Url = environment.root;
  data: any;
  isLoading: boolean;

  constructor(private userService: UsersService) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.userService.getAvailableWaiters().subscribe((data) => {
      this.data = data;
      this.isLoading = false;
    });
  }
}
