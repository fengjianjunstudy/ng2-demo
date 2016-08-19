/**
 * Created by fengjj on 2016/8/17.
 */
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Hero } from './Hero'

@Injectable()
export class HeroSearchService {
  constructor(private http:Http) {}
  search(name:string) {
    this.http.get(`app/heroes/?name=${name}`)
      .map((res:Response) =>{
        return res.json().data as Hero[];
      })
  }
}