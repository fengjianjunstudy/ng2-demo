/**
 * Created by feifei on 2016/8/21.
 */
export class PieOptions {
    r1:number;
    r2:number;
    selector:string;
    colors:string[];
    interval:number;
    constructor(opts) {
        this.r1 = opts.r1;
        this.r2 = opts.r2;
        this.colors = opts.colors;
        this.selector = opts.selector;
        this.interval = opts.interval;
    }
    changeR1(num:number) {
        this.r1 = this.r1 !== num ? num:this.r1;
    }
    changeR2(num:number) {
        this.r2 = this.r2 !== num ? num:this.r2;
    }
    changeColor(value:string,index:number) {
        this.colors[index] =this.colors[index] !== value ? value :this.colors[index];
    }
    clone() {
        return new PieOptions(this);
    }
}