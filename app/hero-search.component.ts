/**
 * Created by fengjj on 2016/8/17.
 */
import { Component ,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/observable';
import { Subject } from 'rxjs/Subject';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/of';


import { HeroService } from './hero.service';
import {Hero} from "./Hero";

@Component({
  selector:'hero-search',
  styles:[`
    .search-result{
      border-bottom: 1px solid gray;
      border-left: 1px solid gray;
      border-right: 1px solid gray;
      width:195px;
      height: 20px;
      padding: 5px;
      background-color: white;
      cursor: pointer;
    }
    #search-box{
      width: 200px;
      height: 20px;
    }
  `],
  template:`
    <div id="search-component">
      <h4>Hero Search</h4>
      <input #searchBox id="search-box" (keyup)="search(searchBox.value)" />
      <div>
        <div *ngFor="let hero of heroes | async"
             (click)="gotoDetail(hero)" class="search-result" >
          {{hero.name}}
        </div>
      </div>
    </div>
  `
})

export class HeroSearchComponent implements OnInit {
  heroes: Observable<Hero[]>;
  private searchTerms = new Subject<string>();
  constructor(
    private heroService: HeroService,
    private router: Router) {}
  // Push a search term into the observable stream.
  search(term: string) { this.searchTerms.next(term); }
  ngOnInit() {
    this.heroes = this.searchTerms
      .debounceTime(300)        // wait for 300ms pause in events
      .distinctUntilChanged()   // ignore if next search term is same as previous
      .switchMap(term => {
        console.log('term',term);
        return term   // switch to new observable each time
        // return the http search observable
        ? this.heroService.search(term)
        // or the observable of empty heroes if no search term
        : Observable.of<Hero[]>([])

      })
      .catch(error => {
        // TODO: real error handling
        console.log(error);
        console.log(Observable.of<Hero[]>([]));
        return Observable.of<Hero[]>([]);
      });
  }
  gotoDetail(hero: Hero) {
    let link = ['/detail', hero.id];
    this.router.navigate(link);
  }
}