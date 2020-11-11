import { Component, OnInit } from '@angular/core';
import { interval } from 'rxjs';

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

  ngOnInit(): void {}

  increment = () => {
    this.counter++;
  };

  decrement = () => {
    this.counter--;
  };

  startTimer = () => {
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
}
