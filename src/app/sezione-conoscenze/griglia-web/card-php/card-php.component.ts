import { Component, ChangeDetectionStrategy } from '@angular/core';
import { IconaComponent } from '../../../common/icona/icona.component';

@Component({
  selector: 'CardPhp',
  imports: [IconaComponent],
  templateUrl: './card-php.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './card-php.component.scss',
})
export class CardPhpComponent {}
