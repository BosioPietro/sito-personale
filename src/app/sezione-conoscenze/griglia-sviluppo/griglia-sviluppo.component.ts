import { Component } from '@angular/core';
import { EffettoMouse } from '../sezione-conoscenze.component';
import { CardDesktopComponent } from "./card-desktop/card-desktop.component";
import { CardMobileComponent } from "./card-mobile/card-mobile.component";
import { CardSqlComponent } from "./card-sql/card-sql.component";
import { CardDatabaseComponent } from "./card-database/card-database.component";

@Component({
  selector: 'GrigliaSviluppo',
  standalone: true,
  imports: [CardDesktopComponent, CardMobileComponent, CardSqlComponent, CardDatabaseComponent],
  templateUrl: './griglia-sviluppo.component.html',
  styleUrl: './griglia-sviluppo.component.scss'
})
export class GrigliaSviluppoComponent {
  EffettoMouse = EffettoMouse;
}
