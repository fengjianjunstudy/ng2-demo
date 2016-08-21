/**
 * Created by fengjj on 2016/8/16.
 */
import { Routes , RouterModule } from '@angular/router';
import { HeroesComponent } from './heroes.component';
import { DashboardComponent } from './dashboard.component';
import { HeroDetailComponent } from './hero-detail.component'
const appRoutes:Routes = [
  {
    path:'',
    redirectTo:'/dashboard',
    pathMatch:'full'
  },
  {
    path: 'heroes',
    component: HeroesComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent,

  },
  {
    path: 'detail/:id',
    component: HeroDetailComponent,

  },
  {
    path: 'pie',
    loadChildren: 'app/pie/pie.module'
  }
]
export const routing = RouterModule.forRoot(appRoutes);