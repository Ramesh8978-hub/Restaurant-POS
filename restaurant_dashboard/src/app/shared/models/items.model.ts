import { CategoryModel } from './category.model';

export class ItemsModel {
    id: number;
    category: CategoryModel;
    item: string;
    price: string;
    discount: string;
    priority: number;
    image: string;
    status: string;
    createdAt: string;
    createdBy: number;
    updatedAt: string;
    udatedBy: number;
}