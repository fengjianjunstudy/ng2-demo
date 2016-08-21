/**
 * Created by feifei on 2016/8/21.
 */
import { Component ,Input ,OnInit ,OnChanges ,SimpleChanges ,AfterViewInit } from '@angular/core';

import { PieOptions } from './PieOptions';
import { PieData } from '../PieData'
import { PieService } from './pie.service'

@Component({
    selector:'pie-show',
    templateUrl:'app/pie/pie-show.component.html',
    styleUrls:['app/pie/pie-show.component.css']
})
export class PieShowComponent implements OnInit ,AfterViewInit {
    @Input() opts:PieOptions;
    @Input() pieDatas:PieData[];
    initFlag = true;
    constructor(private pieService:PieService) {

    }
    ngOnInit() {
        console.log(this.pieDatas);
        console.log(this.opts);
    }
    ngOnChanges(changes: SimpleChanges) {
        for(let k in changes) {
            if(k === 'opts' && !this.initFlag) {
                this.pieService.changeOpts(this.opts);
                this.pieService.showPieChart();
            }
        }
    }
    ngAfterViewInit() {
        this.pieService.init(this.opts,this.pieDatas);
        this.pieService.showPieChart();
        this.initFlag = false;
    }
}