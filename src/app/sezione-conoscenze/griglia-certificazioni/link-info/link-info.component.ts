import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'LinkInfo',
  imports: [],
  templateUrl: './link-info.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './link-info.component.scss',
})
export class LinkInfoComponent {
  @Input()
  info!: InfoLink;

  ApriLink(link: string) {
    window.open(link, '_blank');
  }
}

export type InfoLink = {
  titolo: string;
  descrizione: string;
  link: string;
  url_img: string;
  favicon: string;
};
