import { MessageService } from './message.service';
import { Hero } from './hero';
import { Injectable } from '@angular/core';
import {Observable, of} from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {catchError, map, tap} from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type' : 'application/json'})
};

@Injectable({
  providedIn: 'root'
})

export class HeroService {

  private heroesUrl = 'api/heroes';

  getHeroes(): Observable<Hero[]> {
    this.deleteDuplicateMessage('fetched', this.messageService.messages);
    return this.http.get<Hero[]>(this.heroesUrl).pipe(
      tap(_ => this.log('fetched heroes')),
      catchError(this.handleError('getHeroes', []))
    );
  }

  getHero(id: number): Observable<Hero> {
    const url = `${this.heroesUrl}/${id}`;
    return this.http.get<Hero>(url).pipe(
      tap(_ => this.log(`fetched hero id: ${id}`)),
      catchError(this.handleError<Hero>(`getHero id=${id}`))
    );
  }

  updateHero(hero: Hero): Observable<any> {
    return this.http.put(this.heroesUrl, hero, httpOptions).pipe(
      tap(_ => this.log(`updated hero id = ${hero.id}`)),
      catchError(this.handleError<any>('updateHero'))
    );
  }

  /** POST add a new hero to the server */
  addHero(hero: Hero): Observable<Hero> {
    return this.http.post<Hero>(this.heroesUrl, hero, httpOptions)
    .pipe(
      tap((newHero: Hero) => this.log(`added hero id = ${newHero.id}`)),
      catchError(this.handleError<Hero>('addHero'))
    );
  }
  /** DELETE: delete the hero from the server */
  deleteHero(hero: Hero | number): Observable<Hero> {
    const id = typeof hero === 'number' ? hero : hero.id;
    const url = `${this.heroesUrl}/${id}`;

    return this.http.delete<Hero>(url, httpOptions)
    .pipe(
      tap(_ => this.log(`delete hero id = ${id}`)),
      catchError(this.handleError<Hero>('deleteHero'))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.log(`${operation} failed: ${error.message}`);

      return of(result as T);
    };
  }

  searchHeros(term: string): Observable<Hero[]> {
    if ( !term.trim()) {
       return of([]);
    }
    return this.http.get<Hero[]>(`${this.heroesUrl}/?name=${term}`)
    .pipe(
      tap(_ => this.log(`found heroes matching "${term}"`)),
      catchError(this.handleError<Hero[]>('searchHeroes', []))
    );
  }


  private deleteDuplicateMessage(partialMessage: string, arr: string[]) {
    arr.forEach(el => {
      if (el.includes(partialMessage)) {
        console.log('deleting element from messages array');
        const index: number = arr.indexOf[el];
        arr.splice(index, 1);
      }
    });
  }

  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }

//#region Constructor

  constructor(
    private http: HttpClient,
    private messageService: MessageService
    ) {  }

//#endregion Constructor

}
