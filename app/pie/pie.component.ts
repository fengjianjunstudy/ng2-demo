/**
 * Created by feifei on 2016/8/20.
 */
import { Component ,OnInit } from '@angular/core';

import { PieService } from './pie.service';
import {PieData} from "../PieData";
import { PieOptions } from './PieOptions';
@Component({
    selector:'pie-chart',
    templateUrl:'app/pie/pie.component.html',
    styleUrls:['app/pie/pie.component.css']
})
export class PieComponent implements OnInit {
    pieDatas:PieData[];
    opts:PieOptions;
    constructor(private pieService:PieService){
        let options = {r1:100,r2:0,colors:['red','blue','yellow','pink','green','#cc0','#ccc'],selector:'.svg_block',interval:200} ;
        this.opts =new PieOptions(options);
        this.pieDatas = pieService.getPieDatas();
    }
    ngOnInit() {
        //console.log(this.pieDatas);
    }
    changeOptions(opts:PieOptions) {
        this.opts = opts;
    }
}