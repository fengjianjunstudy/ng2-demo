/**
 * Created by fengjj on 2016/8/15.
 */
import { Injectable } from '@angular/core';
import { Http ,Headers , Response } from '@angular/http';

import { HEROES } from './mock-heroes';
import {Hero} from "./Hero";
import {resolve} from "url";

import 'rxjs/add/operator/toPromise';

const  QUERY_BY_NAME_URL = 'app/heroes/?name=';
const HEROES_URL = 'app/heroes';

@Injectable()
export class HeroService {
  constructor(private http:Http) { }
  getHeroes() {
    return this.http.get(HEROES_URL).toPromise().then((response:Response) => {
      console.log(response.json().data);
      return response.json().data as Hero[];
    })
  }
  getHero(id:string) {
    return this.getHeroes().then((heroes:Hero[]) => {
      return heroes.find(hero => hero.id.toString() == id);
    }).catch(this.handleError)
  }
  save(hero:Hero):Promise<Hero> {
    console.log('save',hero);
    if(hero.id) {
      return this.put(hero);
    }else {
      return this.post(hero);
    }
  }
  delete(hero:Hero) {
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    let url = `${HEROES_URL}/${hero.id}`;
    return this.http
      .delete(url,{headers: headers})
      .toPromise()
      .catch(this.handleError);
  }
  search(name:string) {
    return this.http
      .get(`${QUERY_BY_NAME_URL}${name}`)
      .map((r: Response) => {
        console.log(r.json());
        return r.json().data as Hero[];
      });
  }
  private post(hero:Hero):Promise<Hero> {
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.post(HEROES_URL,JSON.stringify(hero), {headers: headers})
              .toPromise()
              .then((res:Response) => {
                return res.json().data;
              })
              .catch(this.handleError);
  }
  private put(hero:Hero) {
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    let url = `${HEROES_URL}/${hero.id}`;
    return this.http.put(url,JSON.stringify(hero), {headers: headers})
      .toPromise()
      .then(() => hero)
      .catch(this.handleError);
  }
  private handleError(err:any) {
    console.log('an error occurred',err);
    return Promise.reject(err.message || err);
  }
}