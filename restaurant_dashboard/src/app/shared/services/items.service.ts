import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ItemsModel } from '../models/items.model';

@Injectable({
  providedIn: 'root'
})
export class ItemsService {

  serverUrl = environment.root;
  constructor(private httpClient: HttpClient) { }

  postItems(item: any){
    return this.httpClient.post(`${this.serverUrl}/items`, item);
  }

  getCategoryItems(item){
    return this.httpClient.post(`${this.serverUrl}/items/category`, item);
  }

  updateImage(id: number, files: any){
    return this.httpClient.put(`${this.serverUrl}/items/image/${id}`, files);
  }

  getItems(){
    return this.httpClient.get(`${this.serverUrl}/items`);
  }

  getAvailableItems(){
    return this.httpClient.get(`${this.serverUrl}/items/status`);
  }

  getItemById(id: number){
    return this.httpClient.get(`${this.serverUrl}/items/${id}`);
  }

  updateItem(id: number, item: ItemsModel){
    return this.httpClient.put(`${this.serverUrl}/items/${id}`, item);
  }

  updateItemStatus(id: number, item: any){
    return this.httpClient.put(`${this.serverUrl}/items/${id}`, item);
  }

  deleteItem(id: number){
    return this.httpClient.delete(`${this.serverUrl}/items/${id}`);
  }
  
}
