import { Component, Input, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css'],
})
export class HeroDetailComponent implements OnInit {
  // @Input() hero: Hero;
  hero: Hero
  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getHeroFromService()
  }

  getHeroFromService = () : void => {
    //Route parameters are always strings. The JavaScript (+) operator converts the string to a number
    const id = +this.route.snapshot.paramMap.get("id")
    this.heroService.getHero(id).subscribe(hero => this.hero = hero)
  }

  goBack = (): void=> {
    this.location.back()
  }

  save = (): void => {
    this.heroService.updateHero(this.hero).subscribe(() => this.goBack())
  }
}
