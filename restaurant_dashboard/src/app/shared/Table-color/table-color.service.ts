import { Injectable } from '@angular/core';
import { Table } from 'src/app/shared/enums/table.enum';

@Injectable({
  providedIn: 'root'
})
export class TableColorService {

  constructor() { }

  colors(value: Table) {
    switch (value) {
      case (Table.Available):
        return '#00c853';

      case (Table.Placed):
          return '#3F8EDF';

      case (Table.Booked):
        return '#8E44AD';

      case (Table.Served):
        return '#F1C40F';

      case (Table.NotAvailable):
        return '#E74C3C';
    }
  }
}
