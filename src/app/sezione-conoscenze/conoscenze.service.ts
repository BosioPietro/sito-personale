import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Sezioni } from './switch/switch.component';

@Injectable({
  providedIn: 'root'
})
export class ConoscenzeService {
  private sezioneSubject = new Subject<Sezioni>();
  
  sezione$ = this.sezioneSubject.asObservable();
  
  cambiaSezione(sezione: Sezioni) {
    this.sezioneSubject.next(sezione);
  }
}