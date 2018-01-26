import { Component, OnInit } from '@angular/core';
// Import the class
import { Hero } from '../hero';
// Import moch hero data as a class
// import { HEROES } from '../mock-heroes';

import { HeroService } from '../hero.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
  // Initiate the ts class for hero
  // heroes = HEROES;
  heroes: Hero[];
  // selectedHero: Hero; // The hero that the user has clicked on
  // Typescript hates whitespace, so I am a comment to fill the gap
  hero: Hero = {
    id: 1,
    name: 'Windstorm'
  };
  // As best practice, do not do things in the constructor, except assign parameters if you have to. Do your first actions OnInit.
  constructor(private heroService: HeroService) { }

  ngOnInit() {
    this.getHeroes();
  }

  delete(hero: Hero): void {
    this.heroes = this.heroes.filter(h => h !== hero);
    // Must subscribe as observables do nothing until something subscribes
    this.heroService.deleteHero(hero).subscribe();
  }

  getHeroes(): void {
    this.heroService.getHeroes()
      .subscribe(heroes => this.heroes = heroes);
  }

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.heroService.addHero({ name } as Hero)
      .subscribe(hero => {
        this.heroes.push(hero);
      });
  }

}
// onSelect(hero: Hero): void {
// this.selectedHero = hero;
// }
