import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'CardDatabase',
  standalone: true,
  imports: [],
  templateUrl: './card-database.component.html',
  styleUrl: './card-database.component.scss'
})
export class CardDatabaseComponent implements AfterViewInit{
  div = new Array(5);

  @ViewChild("tbody")
  tbody!: ElementRef<HTMLElement>;

  ngAfterViewInit(): void {
    const NOME_CLASSE = "hl";
    const cont = this.tbody.nativeElement;
    const celle = Array.from(cont.querySelectorAll("td"));

    setInterval(() => {
      const numero = Math.floor(Math.random() * celle.length);
      const td = celle[numero];

      if(td.classList.contains(NOME_CLASSE)) return;

      td.classList.add(NOME_CLASSE);
      setTimeout(() => td.classList.remove(NOME_CLASSE), 500);
    }, 100);
  }
}
