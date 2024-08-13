import { Component } from '@angular/core';
import { InfoLink, LinkInfoComponent } from './link-info/link-info.component';

@Component({
  selector: 'GrigliaCertificazioni',
  standalone: true,
  imports: [LinkInfoComponent],
  templateUrl: './griglia-certificazioni.component.html',
  styleUrls: ['../stile-griglie.scss', './griglia-certificazioni.component.scss']
})
export class GrigliaCertificazioniComponent {

  infoLinkUnito: InfoLink = {
    titolo : 'Programmazione Python: dai rudimenti agli oggetti ',
    descrizione: 'Corso di 12 ore Programmazione Python: dai rudimenti agli oggetti. Laboratorio Von Neumann (piano terra) 14 e 16 giugno dalle 9 alle 16.',
    link: 'https://laurea.informatica.unito.it/do/avvisi.pl/Show?_id=mqak',
    url_img: 'https://cdn.unito.it/unito-loghi/favicon/favicon.png',
    favicon: 'https://cdn.unito.it/unito-loghi/favicon/favicon.png'
  }

  infoLinkCambridge: InfoLink = {
    titolo: 'C1 Advanced | Cambridge English',
    descrizione: 'The C1 Advanced exam (CAE) is a high-level qualification that shows you have the language skills that employers and universities want.',
    link: 'https://www.cambridgeenglish.org/exams-and-tests/advanced/',
    url_img: 'https://www.cambridgeenglish.org/Images/speaking-english-lecture.jpg',
    favicon: 'https://www.cambridgeenglish.org/assets/img/favicon.ico'
  }

  infoLinkCisco: InfoLink = {
    titolo: 'CCNA - Cisco',
    descrizione: 'Validate your skills in installing, configuring, and troubleshooting Cisco networks. Earn the globally recognized Cisco CCNA certification.',
    link: 'https://www.cisco.com/site/us/en/learn/training-certifications/certifications/enterprise/ccna/index.html',
    url_img: 'https://www.netacad.com/sites/default/files/home-hero-25th-800.png',
    favicon: 'https://www.cisco.com/favicon.ico'
  }
}
