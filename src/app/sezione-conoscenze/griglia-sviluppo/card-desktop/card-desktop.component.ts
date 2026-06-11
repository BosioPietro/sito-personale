import { Component, ChangeDetectionStrategy } from '@angular/core';
import { IconaComponent } from '../../../common/icona/icona.component';

@Component({
  selector: 'CardDesktop',
  imports: [IconaComponent],
  templateUrl: './card-desktop.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './card-desktop.component.scss',
})
export class CardDesktopComponent {}
