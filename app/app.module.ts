import { NgModule ,NgModuleMetadataType}  from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
// Imports for loading & configuring the in-memory web api
import { HttpModule, XHRBackend } from '@angular/http';
import { InMemoryBackendService, SEED_DATA } from 'angular2-in-memory-web-api';
import { InMemoryDataService } from './in-memory-data.service';

import { AppComponent } from './app.component';
import { HeroDetailComponent } from './hero-detail.component';
import { HeroesComponent } from './heroes.component';
import { DashboardComponent } from './dashboard.component';
import { HeroSearchComponent } from './hero-search.component';

import { HeroService } from './hero.service';
import { routing } from './app.routing'


@NgModule(<NgModuleMetadataType>{
  imports: [BrowserModule,FormsModule,routing,HttpModule],
  declarations: [AppComponent,HeroDetailComponent,HeroesComponent,DashboardComponent,HeroSearchComponent],
  bootstrap: [AppComponent],
  providers:[
    HeroService,
    { provide: XHRBackend, useClass: InMemoryBackendService }, // in-mem server
    { provide: SEED_DATA,  useClass: InMemoryDataService }     // in-mem server data
  ]
})

export class AppModule { }