import { DOCUMENT } from '@angular/common';
import { Component, inject, input } from '@angular/core';

@Component({
  selector: 'LinkInfo',
  imports: [],
  templateUrl: './link-info.component.html',
  styleUrl: './link-info.component.scss',
})
export class LinkInfoComponent {
  private readonly window = inject(DOCUMENT).defaultView;

  readonly info = input.required<InfoLink>();

  ApriLink(link: string) {
    this.window?.open(link, '_blank');
  }
}

export type InfoLink = Readonly<{
  titolo: string;
  descrizione: string;
  link: string;
  urlImg: string;
  favicon: string;
}>;
