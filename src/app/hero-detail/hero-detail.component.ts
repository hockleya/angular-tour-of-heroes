import { Component, OnInit, Input } from '@angular/core';
import { Hero } from '../hero';
// Routing imports
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {
  // The hero is being given to this component, make it an input. Note that we loaded input in the top import of this class.
  @Input() hero: Hero;
  // Activated route has info abt route to this instance of herodetailcomp. Service gets the data from server. Location interacts w/ browser
  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private location: Location
  ) { }

  ngOnInit() {
    this.getHero();
  }
  // The js "+" operator converts strings to a number, which is what the hero id should be.
  getHero(): void {
    // route.snapshot is a static img of the route info. ParamMap is a dict of route param values from the url. The id key gets the hero id
    const id = +this.route.snapshot.paramMap.get('id');
    this.heroService.getHero(id).subscribe(hero => this.hero = hero);
  }
  // Return to the page before the detail page was selected. Location helps us do this.
  goBack(): void {
    this.location.back();
  }

  save(): void {
    this.heroService.updateHero(this.hero)
      .subscribe(() => this.goBack());
  }
}
