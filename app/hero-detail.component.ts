import { Component ,Input , OnInit ,Output , EventEmitter } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { Hero } from './Hero';
import { HeroService } from './hero.service'
@Component({
  selector:'my-hero-detail',
  template:`
    <div *ngIf = "hero">
      <h2>{{hero.name}} details!</h2>
      <div *ngIf = "hero.id"><label>id:</label>{{hero.id}}</div>
      <div><label>name:</label><input type="text" [(ngModel)] = "hero.name" placeholder="name"></div>
    </div>
    <button (click)="save()">Save</button>
    `
})

export class HeroDetailComponent implements  OnInit {
  @Input() hero:Hero;
  @Output() close = new EventEmitter();
  error:any;
  navigated = true; // true if navigated here
  constructor(private heroService:HeroService,private route:ActivatedRoute) {

  }
  ngOnInit() {
    this.route.params.forEach((params:Params) => {
      if(params['id'] != undefined) {
        let id = ''+params['id'];
        this.heroService.getHero(id).then((hero:Hero) => {
          this.hero = hero;
        });
      }else {
        this.navigated = false;
        this.hero = new Hero();
      }
    })
  }
  goBack(hero:Hero = null) {
    this.close.emit(hero);
    if(this.navigated) {
      window.history.back();
    }
  }
  save() {
    this.heroService.save(this.hero).then(hero => {
      this.hero = hero;
      this.goBack(hero);
    })
  }
  private handleError(err:any) {
    console.log('an error is',err);
    return {message:err.message};
  }
}