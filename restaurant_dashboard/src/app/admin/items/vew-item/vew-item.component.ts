import { environment } from 'src/environments/environment';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ItemsService } from 'src/app/shared/services/items.service';

@Component({
  selector: 'app-vew-item',
  templateUrl: './vew-item.component.html',
  styleUrls: ['./vew-item.component.scss'],
  providers: [ItemsService],
})
export class VewItemComponent implements OnInit {
  Url = environment.root;
  data;
  id;
  itemName;
  price;
  priority;
  discount;
  imagepath: string;

  constructor(
    private itemService: ItemsService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.id = params.id;
      if (!this.id) {
        return;
      }
    });

    this.itemService.getItemById(this.id).subscribe((data) => {
      this.data = data;
      this.imagepath = this.data.imagepath;
      this.itemName = this.data.itemName;
      this.price = this.data.price;
      this.priority = this.data.priority;
      this.discount = this.data.discount;
    });
  }
}
