/**
 * Created by feifei on 2016/8/20.
 */
import { Injectable } from '@angular/core';

import { PieData } from '../PieData'
import { PIEDATAS } from '../mock-pie';
import { PieOptions } from './PieOptions';
import * as d3 from 'd3';
@Injectable()
export class PieService{
    options:PieOptions;
    data:PieData[] = [];
    svgContaier:any;
    getPieDatas() {
        let data:PieData[] = [];
        for(let d of PIEDATAS) {
            data.push(new PieData(d.name,d.dataNum));
        }
        return data;
    }
    init(options:PieOptions,data:PieData[]) {
        this.options = options;
        this.data = data;
        let width =600;
        let height = 600;
        this.svgContaier = d3.select(this.options.selector).append('svg')
            .attr('width',function() {
                return width;
            })
            .attr('height',function() {
                return height;
            })
            .attr('class','svg_pie');

    }
    showPieChart() {
        this.svgContaier.html('');
        let pie = d3.layout.pie().value((d:PieData) => {
            return d.dataNum;
        });
        let pieData = pie(<PieData[]>this.data);
        let arc = d3.svg.arc()
            .innerRadius(this.options.r2)
            .outerRadius(this.options.r1);
        //console.log(pieData);

        let g = this.svgContaier.selectAll('.pie').data(pieData)
            .enter()
            .append('g')
            .attr('class','pie')
            .each(function(d) {
                d.end = d.endAngle;
                d.endAngle = d.startAngle;
            });
        g.append('path')
            .attr('class','path')
            .attr('d',function(d) {
                return arc(d);
            })
            .attr('fill',(d,i) => {
                return this.options.colors[i];
            })
            .attr('transform',(d) => {
                return `translate(${600/3},${600/3})`
            })
            .transition()
            .delay((d,i) => {
                return i*this.options.interval;
            })
            .duration(this.options.interval)
            .each((d) => {
                d.endAngle = d.end;
            })
            .attr('d',(d) => {
                return arc(d);
            });
        //text
        g.append('text')
            .style('opacity',0)
            .text((d) => {
                return d.value;
            })
            .attr('class','text')
            .attr('x',(d) => {
                return arc.centroid(d)[0];
            })
            .attr('y',(d) => {
                return arc.centroid(d)[1];
            })
            .attr('transform',(d) => {
                return `translate(${600/3},${600/3})`
            })
            .attr('text-anchor','middle')
            .transition()
            .delay((d,i) => {
                return i*this.options.interval;
            })
            .duration(this.options.interval)
            .style('opacity',1);
    }
    changeOpts(opts) {
        this.options = opts;
    }
}