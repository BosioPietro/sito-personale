import { Component, ChangeDetectionStrategy } from '@angular/core';
import { SfondoComponent } from './sfondo/sfondo.component';
import { IconaComponent } from '../common/icona/icona.component';

@Component({
  selector: 'SezionePrincipale',
  imports: [SfondoComponent, IconaComponent],
  templateUrl: './sezione-principale.component.html',
  styleUrl: './sezione-principale.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SezionePrincipaleComponent {
  Scrolla() {
    const cont = document.getElementById('conoscenze')!;
    cont.scrollIntoView({ behavior: 'smooth' });
  }
}
