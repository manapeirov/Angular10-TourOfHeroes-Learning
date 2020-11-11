import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

import { Hero } from '../hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-hero-search',
  templateUrl: './hero-search.component.html',
  styleUrls: ['./hero-search.component.css'],
})
export class HeroSearchComponent implements OnInit {
  heroes$: Observable<Hero[]>;

  // The searchTerms property is an RxJS Subject.
  // A Subject is both a source of observable values and an Observable itself.
  // You can subscribe to a Subject as you would any Observable.
  // You can also push values into that Observable by calling its next(value) method as the search() method does.
  private searchTerms = new Subject<string>();

  constructor(private heroService: HeroService) {}

  // Push a search term into the observable stream.
  searchHeroes = (term: string): void => {
    this.searchTerms.next(term);
  };

  ngOnInit(): void {
    this.heroes$ = this.searchTerms.pipe(
      // wait until the flow of new string events pauses for 300 milliseconds before passing along the latest string
      debounceTime(300),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      // switchMap() calls the search service for each search term that makes it through debounce() and distinctUntilChanged(). 
      // It cancels and discards previous search observables, returning only the latest search service observable.
      switchMap((term: string) => this.heroService.searchHeroes(term))
    );
  }
}

// The ngOnInit() method pipes the searchTerms observable through a sequence of RxJS operators that reduce the number of calls to the searchHeroes(),
// ultimately returning an observable of timely hero search results (each a Hero[]).




// Observables vs promise 

/*
  Example 1: Promises
*/

// const promise = new Promise(resolve => {
//   setTimeout(() => {
//     resolve('Hello from a Promise!');
//   }, 2000);
// });

// promise.then(value => console.log(value));


/*
  Example 2: Observables
*/

// import { Observable } from 'rxjs';

// const observable = new Observable(observer => {
//   setTimeout(() => {
//     observer.next('Hello from a Observable!');
//   }, 2000);
// });

// observable.subscribe(value => console.log(value));



/*
  Example 3: Observables - Multiple Values & Unsubscribing
*/

// import { Observable } from 'rxjs';

// const interval$ = new Observable(observer => {
//   let count = 0;
//   const interval = setInterval(() => {
//     observer.next(count++);
//   }, 1000);

//   return () => {
//     clearInterval(interval);
//   }
// });

// const subscription = interval$.subscribe(value => console.log(value));
// setTimeout(() => subscription.unsubscribe(), 3000);


// *
//   Example 4: Observables and Functional Operators (map & filter)
// */

// import { Observable } from 'rxjs';
// import { map, filter } from 'rxjs/operators';

// const interval$ = new Observable<number>(observer => {
//   let count = 1;
//   const interval = setInterval(() => {
//     observer.next(count++);
//   }, 1000);

//   return () => {
//     clearInterval(interval);
//   }
// });



// const subscription1 = interval$.pipe(
//   map(value => value * value)
// ).subscribe(value => console.log(value));

// // ----1----2----3----4--->
// //      map => x * x
// // ----1----4----9----16--->



// const subscription2 = interval$.pipe(
//   filter(value => value % 2 === 0)
// ).subscribe(value => console.log(value));

// // ----1----2----3----4--->
// //          filter
// // ---------2---------4--->



// const subscription3 = interval$.pipe(
//   map(value => value * value),
//   filter(value => value % 2 === 0)
// ).subscribe(value => console.log(value));

// // ----1----2----3----4---->
// //      map => x * x
// // ----1----4----9----16--->
// //          filter
// // ---------4---------16--->



// setTimeout(() => {
//   subscription1.unsubscribe();
//   subscription2.unsubscribe();
//   subscription3.unsubscribe();
// }, 4000);


/*
  Example 5: Observables and Composing Operators
*/

// import { fromEvent } from 'rxjs';
// import { map, scan, merge } from 'rxjs/operators';

// const incrementClicks$ = fromEvent(document.getElementById('increment'), 'click');
// const decrementClicks$ = fromEvent(document.getElementById('decrement'), 'click');

// const clicks$ = incrementClicks$.pipe(
//   merge(decrementClicks$),
//   map((event: any) => parseInt(event.target.value, 10))
// );

// const total$ = clicks$.pipe(
//   scan((total, value) => total + value, 0)
// );

// total$.subscribe(total => {
//   document.getElementById('counter').innerText = total.toString();
// });

// // ----i------------------>
// // -------d---------d----->
// //          merge
// // ----i--d---------d----->
// //           map
// // ----p--n---------n----->
// //           scan
// // 0---1--0-------(-1)---->


/* 
Example in Angular
*/

/*
  In app.component.ts
*/

// import { Component } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { FormControl } from '@angular/forms';
// import { Observable } from 'rxjs';
// import { map, filter, tap, switchMap, debounceTime, distinctUntilChanged } from 'rxjs/operators';

// import { API_KEY } from './api-key';

// const API_URL = 'https://www.googleapis.com/youtube/v3/search';

// interface YouTubeResult {
//   items: {}[];
// }

// @Component({
//   selector: 'app-root',
//   templateUrl: './app.component.html',
//   styleUrls: ['./app.component.css']
// })
// export class AppComponent {
//   search = new FormControl('');
//   results: Observable<{}[]>;

//   constructor(private http: HttpClient) {
//     this.results = this.search.valueChanges.pipe(
//       filter(value => value.length > 2),
//       debounceTime(500),
//       distinctUntilChanged(),
//       switchMap(query => this.http.get<YouTubeResult>(`${API_URL}?q=${query}&key=${API_KEY}&part=snippet`)),
//       map(res => res.items)
//     );
//   }
// }

/*
  In app.component.html
*/

// <h3>Angular &amp; RxJS Observables Search Demo</h3>

// <label for="search">Search YouTube</label>
// <input [formControl]="search" id="search" />

// <a *ngFor="let result of results | async" [href]="'https://www.youtube.com/watch?v=' + result.id.videoId" target="_blank">
//   <h3>{{result.snippet.title}}</h3>
//   <p>{{result.snippet.description}}</p>
//   <img [src]="result.snippet.thumbnails.default.url" />
// </a>

