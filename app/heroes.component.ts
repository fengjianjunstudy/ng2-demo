import { Component ,OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Hero } from './Hero';
import { HeroService } from './hero.service';
import * as D3 from 'd3';
@Component({
  selector:'my-heroes',
  template:`
    <ul class="heroes">
      <li *ngFor="let hero of heroes" (click)="onSelect(hero)" [class.selected] = "selectedHero === hero">
        <span class="badge">{{hero.id}}</span> {{hero.name}}
        <button class="delete-button" (click)="deleteHero(hero, $event)">Delete</button>
      </li>
    </ul>
    <div *ngIf="selectedHero">
      <h2>
        {{selectedHero.name | uppercase}} is my hero
      </h2>
      <button (click)="gotoDetail()">View Details</button>
    </div>
    <button (click)="addHero()">Add New Hero</button>
    <div *ngIf="addingHero">
      <my-hero-detail (close)="close($event)"></my-hero-detail>
    </div>
    `,
  styles: [`
  .selected {
    background-color: #CFD8DC !important;
    color: white;
  }
  .heroes {
    margin: 0 0 2em 0;
    list-style-type: none;
    padding: 0;
    width: 15em;
  }
  .heroes li {
    cursor: pointer;
    position: relative;
    left: 0;
    background-color: #EEE;
    margin: .5em;
    padding: .3em 0;
    height: 1.6em;
    border-radius: 4px;
  }
  .heroes li.selected:hover {
    background-color: #BBD8DC !important;
    color: white;
  }
  .heroes li:hover {
    color: #607D8B;
    background-color: #DDD;
    left: .1em;
  }
  .heroes .text {
    position: relative;
    top: -3px;
  }
  .heroes .badge {
    display: inline-block;
    font-size: small;
    color: white;
    padding: 0.8em 0.7em 0 0.7em;
    background-color: #607D8B;
    line-height: 1em;
    position: relative;
    left: -1px;
    top: -4px;
    height: 1.8em;
    margin-right: .8em;
    border-radius: 4px 0 0 4px;
  }
  .error {color:red;}
  button.delete-button{
    float:right;
    background-color: gray !important;
    color:white;
  }
`]
})

export class HeroesComponent implements OnInit {
  heroes:Hero[];
  selectedHero:Hero;
  addingHero = false;
  error:any;
  constructor(private heroService:HeroService,private router:Router) {

  }
  ngOnInit() {
    this.getHeroes();
  }
  onSelect(hero:Hero) {
    this.selectedHero = hero;
  }
  getHeroes() {
    this.heroService.getHeroes().then((heroes) => {
      this.heroes = heroes;
    })
  }
  gotoDetail(hero) {
    let link = ['/detail',this.selectedHero.id];
    this.router.navigate(link);
  }
  addHero() {
    this.addingHero = true;
    this.selectedHero = null;
  }
  close(hero:Hero) {
    this.addingHero = false;
    if(hero) {
      this.getHeroes();
    }
  }
  deleteHero(hero:Hero,event:MouseEvent) {
    event.stopPropagation();
    this.heroService.delete(hero).then(res => {
      this.heroes = this.heroes.filter(h => {
        return h != hero;
      });
      if(this.selectedHero == hero) {
        this.selectedHero = null;
      }
    })
    .catch(err => this.error = err)
  }
}