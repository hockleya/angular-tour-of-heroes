import { Injectable } from '@angular/core';
import { Hero } from './hero';
import { HEROES } from './mock-heroes';
// Get an observable to simulate a resmote server method of fetching the mock hero data
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { MessageService } from './message.service';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap} from 'rxjs/operators';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

// Injectable means the class MAY get a dependency or two later on. Even if it doesn't get one, keep this here, it's good practice.
@Injectable()
export class HeroService {
  // Define the url with the address of the heroes resource on the server
  private heroesUrl = 'api/heroes';  // URL to web api

  // Create a custom logger for messages, as we will be making lots of messages
  private log(message: string) {
    this.messageService.add('HeroService: ' + message);
  }

  constructor(private http: HttpClient,
              private messageService: MessageService) { }
  /** GET heroes from the server */
  getHeroes (): Observable<Hero[]> {
    // The '<Hero[]>' part specifies the type to return. It's optional, but this is how you specify what type of data return is. Otherwise
    // it is untyped JSON. CatchError intercepts a failed observable. It passed the error to an error handler
    return this.http.get<Hero[]>(this.heroesUrl)
      .pipe(
        tap(heroes => this.log(`fetched heroes`)),
        catchError(this.handleError('getHeroes', []))
      );
  }
  // Get an individual hero by id
  // getHero(id: number): Observable<Hero> {
    // Todo: send the message _after_ fetching the hero
    // back ticks '`' define a javascript template literal for embedding the id
    // this.messageService.add(`HeroService: fetched hero id=${id}`);
    // return of(HEROES.find(hero => hero.id === id));
  // }

  /** GET hero by id. Will 404 if id not found */
  getHero(id: number): Observable<Hero> {
    const url = `${this.heroesUrl}/${id}`;
    return this.http.get<Hero>(url).pipe(
      tap(_ => this.log(`fetched hero id=${id}`)),
      catchError(this.handleError<Hero>(`getHero id=${id}`))
    );
  }

  /** PUT: update the hero on the server */
  updateHero (hero: Hero): Observable<any> {
    return this.http.put(this.heroesUrl, hero, httpOptions).pipe(
      tap(_ => this.log(`updated hero id=${hero.id}`)),
      catchError(this.handleError<any>('updateHero'))
    );
  }

  /** POST: add a new hero to the server */
  addHero (hero: Hero): Observable<Hero> {
    return this.http.post<Hero>(this.heroesUrl, hero, httpOptions).pipe(
      tap((hero: Hero) => this.log(`added hero w/ id=${hero.id}`)),
      catchError(this.handleError<Hero>('addHero'))
    );
  }

  /** DELETE: delete the hero from the server */
  deleteHero (hero: Hero | number): Observable<Hero> {
    const id = typeof hero === 'number' ? hero : hero.id;
    const url = `${this.heroesUrl}/${id}`;

    return this.http.delete<Hero>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted hero id=${id}`)),
      catchError(this.handleError<Hero>('deleteHero'))
    );
  }

  /* GET heroes whose name contains search term */
  searchHeroes(term: string): Observable<Hero[]> {
    if (!term.trim()) {
      // if not search term, return empty hero array.
      return of([]);
    }
    return this.http.get<Hero[]>(`api/heroes/?name=${term}`).pipe(
      tap(_ => this.log(`found heroes matching "${term}"`)),
      catchError(this.handleError<Hero[]>('searchHeroes', []))
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}


// Return a type observable of heroes, used the of method to do so.
// getHeroes(): Observable<Hero[]> {
  // Todo: send the message _after_ fetching the heroes
//  this.messageService.add('HeroService: fetched heroes');
// return of(HEROES);
// }
