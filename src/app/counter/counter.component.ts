import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { scan } from 'rxjs/operators';

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.css'],
})
export class CounterComponent implements OnInit {
  counter = 0;
  timer = 0;
  isPaused = false;
  constructor() {}

  increment = () => {
    this.counter++;
  };

  decrement = () => {
    this.counter--;
  };

  startTimer = () => {
    this.isPaused = false;
    setInterval(() => {
      if (!this.isPaused) {
        this.timer++;
      }
    }, 1000);
  };

  pauseTimer = () => {
    this.isPaused = true;
  };

  resetTimer = () => {
    this.timer = 0;
  };

  // Using observables to implement counter
  observableCounter : number
  clickStream$ = new Subject<number>();

  ngOnInit(): void {
    this.clickStream$
      .pipe(
        scan((total, newValue) => total + Number(newValue), 0))
      .subscribe((clicksTotal) => {
        this.observableCounter = clicksTotal
      });
  }

  observableOnClick = (value: number) => {
    this.clickStream$.next(value);
  };
}
