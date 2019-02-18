import { MessageService } from './message.service';
import { HEROES } from './mock-heroes';
import { Hero } from './hero';
import { Injectable } from '@angular/core';
import {Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  getHeroes(): Observable<Hero[]> {
    this.deleteDuplicateMessage('fetched', this.messageService.messages);
    this.messageService.add('HeroService: fetched heroes');
    return of(HEROES);
  }

  deleteDuplicateMessage(partialMessage: string, arr: string[]) {
    arr.forEach(element => {
      if (element.includes(partialMessage)) {
        console.log('deleting element');
        const index: number = arr.indexOf[element];
        arr.splice(index, 1);
      }
    });
  }
  constructor(private messageService: MessageService) { }
}
