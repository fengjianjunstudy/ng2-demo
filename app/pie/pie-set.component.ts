/**
 * Created by feifei on 2016/8/21.
 */
import { Component ,OnInit ,Input ,Output ,EventEmitter } from '@angular/core';

import { PieData } from '../PieData';
import { PieOptions } from './PieOptions';
@Component({
    selector:'pie-set',
    templateUrl:'app/pie/pie-set.component.html',
    styleUrls:['app/pie/pie-set.component.css']
})
export class PieSetComponent implements  OnInit {
    @Input() pieDatas:PieData[];
    @Input() opts:PieOptions;
    @Output() onChangeOpts:EventEmitter<any> = new EventEmitter();
    constructor() {

    }
    ngOnInit() {

    }
    changeR1(val:number) {
        if(this.opts.r1 !== val) {
            this.opts.changeR1(val);
            this.onChangeOpts.emit(this.opts.clone());
        }
    }
    changeR2(val:number) {
        if(this.opts.r2 !== val) {
            this.opts.changeR2(val);
            this.onChangeOpts.emit(this.opts.clone());
        }
    }
    changeColor(e:any,index:number) {
        if(e.target && e.target.value && (this.opts.colors[index] !== e.target.value)) {
            this.opts.changeColor(e.target.value,index);
            this.onChangeOpts.emit(this.opts.clone());
        }
    }
}