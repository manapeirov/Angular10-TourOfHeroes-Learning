import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Hero } from './hero';
import { HEROES } from './mock-heroes';

import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root',
})
export class HeroService {
  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) {}

  // Log a HeroService message with the MessageService
  private log = (message: string) => {
    this.messageService.add(`HeroService: ${message}`);
  };

  private handleError = <T>(operation = 'operation', result?: T) => {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error);

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      // each service method returns a different kind of Observable result, handleError() takes a type parameter so it can return the safe value as the type that the app expects.
      return of(result as T);
    };
  };
  // URL to web api
  // :baseURL/:collectionName for hero by it, its in the form :baseURL/:id.
  //  base is the resource to which requests are made, and collectionName is the heroes data object in the in-memory-data-service.ts.
  private heroesUrl = 'api/heroes';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  // getHeroes = (): Observable<Hero[]> => {
  //   this.log("fetched heroes")
  //   return of(HEROES)
  // }

  // GET heroes from the server
  // Other APIs may bury the data that you want within an object. You might have to dig that data out by processing the Observable result with the RxJS map() operator.
  // Tap into the flow of observable values and send a message with the RxJS tap() operator,
  // which looks at the observable values, does something with those values, and passes them along.
  // The tap() call back doesn't touch the values themselves.
  getHeroes = (): Observable<Hero[]> => {
    return this.http.get<Hero[]>(this.heroesUrl).pipe(
      tap(() => this.log('fetched heroes')),
      catchError(this.handleError<Hero[]>('getHeroes', []))
    );
  };

  // getHero = (id: number): Observable<Hero> => {
  //   this.log(`${id}`);
  //   return of(HEROES.find((hero) => hero.id === id));
  // };

  getHero = (id: number): Observable<Hero> => {
    const url = `${this.heroesUrl}/${id}`;
    return this.http.get<Hero>(url).pipe(
      tap(() => this.log(`fetched hero id= ${id}`)),
      catchError(this.handleError<Hero>(`getHero id= ${id}`))
    );
  };

  updateHero = (hero: Hero): Observable<any> => {
    return this.http.put(this.heroesUrl, hero, this.httpOptions).pipe(
      tap(() => this.log(`updated hero id= ${hero.id}`)),
      catchError(this.handleError<any>(`updateHero`))
    );
  };

  addHero = (hero: Hero): Observable<Hero> => {
    return this.http.post<Hero>(this.heroesUrl, hero, this.httpOptions).pipe(
      tap((newHero: Hero) => this.log(`added hero w/ id=${newHero.id}`)),
      catchError(this.handleError<Hero>('addHero'))
    );
  };

  deleteHero = (hero: Hero): Observable<Hero> => {
    const id = typeof hero === 'number' ? hero : hero.id;
    const url = `${this.heroesUrl}/${id}`;

    return this.http.delete<Hero>(url, this.httpOptions).pipe(
      tap(() => this.log(`deleted hero id= ${id}`)),
      catchError(this.handleError<Hero>(`deleteHero`))
    );
  };

  searchHeroes = (term: string): Observable<Hero[]> => {
    if (!term.trim()) {
      // if not search term, return empty hero array.
      return of([]);
    }
    return this.http.get<Hero[]>(`${this.heroesUrl}/?name=${term}`).pipe(
      tap((x) =>
        x.length
          ? this.log(`found heroes matching "${term}"`)
          : this.log(`no heroes matching "${term}"`)
      ),
      catchError(this.handleError<Hero[]>(`searchHeroes`, []))
    );
  };
}
