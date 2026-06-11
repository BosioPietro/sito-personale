import { Component, ChangeDetectionStrategy } from '@angular/core';
import { IconaComponent } from '../../../common/icona/icona.component';

@Component({
  selector: 'CardASP',
  imports: [IconaComponent],
  templateUrl: './card-asp.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './card-asp.component.scss',
})
export class CardASPComponent {}
