import { Component, CUSTOM_ELEMENTS_SCHEMA, Input } from '@angular/core';

@Component({
    selector: 'LinkInfo',
    imports: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    templateUrl: './link-info.component.html',
    styleUrl: './link-info.component.scss'
})
export class LinkInfoComponent {

  @Input()
  info!: InfoLink;

  ApriLink(link: string){
    window.open(link, '_blank');
  }
}

export type InfoLink = {
  titolo: string,
  descrizione: string,
  link: string,
  url_img: string,
  favicon: string
}