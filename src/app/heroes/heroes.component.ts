import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css'],
})
export class HeroesComponent implements OnInit {
  // selectedHero: Hero;
  heroes: Hero[];

  constructor(
    private heroService: HeroService,
    private messageService: MessageService
  ) {}

  // hero: Hero = {
  //   id: 1,
  //   name: "Windstorm"
  // }
  // changeHeroName = (name) => {
  //   this.hero.name = name
  // }

  ngOnInit(): void {
    this.getHeroesFromService();
    // console.log(this.heroes)
  }

  getHeroesFromService = (): void => {
    // waits for the Observable to emit the array of heroes
    // subscribe() method passes the emitted array to the callback, which sets the component's heroes property.
    this.heroService.getHeroes().subscribe((heroes) => (this.heroes = heroes));
  };

  // onSelect = (hero: Hero): void => {
  //   this.selectedHero = hero;
  //   this.messageService.add(`HeroesComponent: Selected hero id= ${hero.id}`)
  // };

  addHero = (name: string): void => {
    name = name.trim();
    if (!name) {
      return;
    }
    this.heroService.addHero({ name } as Hero).subscribe((hero) => {
      this.heroes.push(hero);
    });
  };

  deleteHero = (hero: Hero): void => {
    this.heroes = this.heroes.filter(heroEntry => heroEntry !== hero)
    this.heroService.deleteHero(hero).subscribe()
  }
}
