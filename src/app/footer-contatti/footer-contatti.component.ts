import { AfterViewInit, Component, CUSTOM_ELEMENTS_SCHEMA, ElementRef, ViewChild } from '@angular/core';
import { SfondoComponent } from './sfondo/sfondo.component';

@Component({
  selector: 'FooterContatti',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [SfondoComponent],
  templateUrl: './footer-contatti.component.html',
  styleUrl: './footer-contatti.component.scss'
})
export class FooterContattiComponent implements AfterViewInit{
  @ViewChild("sfondo")
  sfondo!: ElementRef<HTMLElement>;

  elementi?: HTMLElement[];

  ngAfterViewInit(): void {
    const o1 = new IntersectionObserver((e) => this.Interseca(e), { threshold: .5 });
    const o2 = new IntersectionObserver((e) => this.Interseca(e), { threshold: 0 });

    o1.observe(this.sfondo.nativeElement);
    o2.observe(this.sfondo.nativeElement);
  }

  Interseca(e: IntersectionObserverEntry[]){
    const intersectionRatio = Math.floor(e[0].intersectionRatio * 10) / 10;
    const sfondo = this.sfondo.nativeElement;

    if(!this.elementi){
      this.elementi =  Array.from(sfondo.parentElement!.getElementsByClassName("animato")) as HTMLElement[];
    }

    if(!intersectionRatio){
      this.elementi.forEach((el) => el.classList.remove("appari"))
    }
    else if(intersectionRatio >= .33){
      setTimeout(() => {
        this.elementi!.forEach((el) => el.classList.add("appari"))
      });
    }
  }
}
