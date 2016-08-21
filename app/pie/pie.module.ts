/**
 * Created by feifei on 2016/8/20.
 */
import { NgModule ,NgModuleMetadataType}           from '@angular/core';
import { CommonModule }       from '@angular/common';
import { FormsModule }        from '@angular/forms';

import { PieComponent } from './pie.component';
import { PieSetComponent } from './pie-set.component';
import { PieShowComponent } from './pie-show.component';
import { PieService } from './pie.service'
import { routing } from './pie.routing';
@NgModule(<NgModuleMetadataType>{
    imports: [CommonModule, FormsModule,routing],
    declarations: [PieComponent,PieSetComponent,PieShowComponent],
    providers: [PieService]
})
export class PieModule {

}