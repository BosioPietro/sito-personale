import { Component, input } from '@angular/core';

@Component({
  selector: 'ion-icon',
  templateUrl: './icona.component.html',
  styleUrl: './icona.component.scss',
})
export class IconaComponent {
  readonly name = input.required<string>();
}
