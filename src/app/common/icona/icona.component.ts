import { Component, input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'ion-icon',
  templateUrl: './icona.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './icona.component.scss',
})
export class IconaComponent {
  readonly name = input.required<string>();
}
