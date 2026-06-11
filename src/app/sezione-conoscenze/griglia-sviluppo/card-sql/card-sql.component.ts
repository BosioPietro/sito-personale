import { Component, ChangeDetectionStrategy } from '@angular/core';
import { IconaComponent } from '../../../common/icona/icona.component';

@Component({
  selector: 'CardSQL',
  imports: [IconaComponent],
  templateUrl: './card-sql.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './card-sql.component.scss',
})
export class CardSqlComponent {}
