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
    this.messageService.add('HeroService: fetched heroes');
    return of(HEROES);
  }

  constructor(private messageService: MessageService) { }
}
