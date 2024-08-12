import { Component } from '@angular/core';

@Component({
  selector: 'CardDatabase',
  standalone: true,
  imports: [],
  templateUrl: './card-database.component.html',
  styleUrl: './card-database.component.scss'
})
export class CardDatabaseComponent {
  div = new Array(5);
}
