import { Component } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { inject } from '@angular/core';
import { SfondoComponent } from './sfondo/sfondo.component';
import { IconaComponent } from '../common/icona/icona.component';

@Component({
  selector: 'SezionePrincipale',
  imports: [SfondoComponent, IconaComponent],
  templateUrl: './sezione-principale.component.html',
  styleUrl: './sezione-principale.component.scss',
})
export class SezionePrincipaleComponent {
  private readonly document = inject(DOCUMENT);

  Scrolla() {
    const cont = this.document.getElementById('conoscenze');
    if (!cont) return;

    cont.scrollIntoView({ behavior: 'smooth' });
  }
}
