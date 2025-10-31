import { Component } from '@angular/core';
import { InfoLink, LinkInfoComponent } from './link-info/link-info.component';

@Component({
  selector: 'GrigliaCertificazioni',
  imports: [LinkInfoComponent],
  templateUrl: './griglia-certificazioni.component.html',
  styleUrls: [
    '../stile-griglie.scss',
    './griglia-certificazioni.component.scss',
  ],
})
export class GrigliaCertificazioniComponent {
  infoLinkUnito: InfoLink = {
    titolo: 'Programmazione Python: dai rudimenti agli oggetti ',
    descrizione:
      'Corso di 12 ore Programmazione Python: dai rudimenti agli oggetti. Laboratorio Von Neumann (piano terra) 14 e 16 giugno dalle 9 alle 16.',
    link: 'https://laurea.informatica.unito.it/do/avvisi.pl/Show?_id=mqak',
    url_img: 'https://bosio.zip/assets/img/certificazioni/unito.webp',
    favicon: 'https://bosio.zip/assets/img/certificazioni/unito.webp',
  };

  infoLinkCambridge: InfoLink = {
    titolo: 'C1 Advanced | Cambridge English',
    descrizione:
      'The C1 Advanced exam (CAE) is a high-level qualification that shows you have the language skills that employers and universities want.',
    link: 'https://www.cambridgeenglish.org/exams-and-tests/advanced/',
    url_img: 'https://bosio.zip/assets/img/certificazioni/cambridge_bg.webp',
    favicon: 'https://bosio.zip/assets/img/certificazioni/cambridge_icon.webp',
  };

  infoLinkCisco: InfoLink = {
    titolo: 'CCNA - Cisco',
    descrizione:
      'Validate your skills in installing, configuring, and troubleshooting Cisco networks. Earn the globally recognized Cisco CCNA certification.',
    link: 'https://www.cisco.com/site/us/en/learn/training-certifications/certifications/enterprise/ccna/index.html',
    url_img: 'https://bosio.zip/assets/img/certificazioni/cisco_bg.webp',
    favicon: 'https://bosio.zip/assets/img/certificazioni/cisco_icon.webp',
  };
}
