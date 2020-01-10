import { alertFeedMetrics } from './../../../proximity';
import { Component, OnInit,Input } from '@angular/core';
import {entrySummary} from '../../../proximity';
import * as $ from "jquery";
import { Chart } from 'angular-highcharts';
import { AmChart } from "@amcharts/amcharts3-angular";
@Component({
  selector: 'entry-summary',
  templateUrl: './entrySummary.html'
})
export class EntrySummaryComponent implements OnInit {
@Input() entrySummary:entrySummary;
@Input() alertFeedMetrics:alertFeedMetrics;
chart:Chart;
options:any;
  constructor() {
   }

  ngOnInit() {    
   this.drawProgressBar();
   this.drawArmChart();
   this.drawGraphChart();
  }

drawProgressBar = function(){
    
$(".progress-bar").each(function(){
  var bar = $(this).find(".bar2");
  var val = $(this).find("span");
  var per = parseInt( val.text(), 10);
  var $right = $('.right');
  var $back = $('.back');

  $({p:0}).animate({p:per}, {
    duration: 3000,
    step: function(p) {
      bar.css({
        transform: "rotate("+ (45+(p*1.8)) +"deg)"
      });
      val.text(p|0);
    }
  }).delay( 200 );
  
  if (per >= 70) {
   	$back.delay( 2600 ).animate({'top': '18px'}, 200 );
    // $(this).find('.bar2').css({"border-bottom-color":"green", "border-right-color": "green"});
    // $(this).find('em').text('High');
  }
  
  if (per >=31 && per <=69) {
   	$back.delay( 2600 ).animate({'top': '18px'}, 200 );
    // $(this).find('.bar2').css({"border-bottom-color":"blue", "border-right-color": "blue"});
	// $(this).find('em').text('Medium');
  }
       
  if (per <= 30) {
  	$('.left').css('background', 'gray');
    // $(this).find('.bar2').css({"border-bottom-color":"red", "border-right-color": "red"});
	//  $(this).find('em').text('Low');
  }
  
  
});
}
drawArmChart = function(){
 this.options = {
        "type": "pie",
        "theme": "none",
        "dataProvider":this.entrySummary.visit_graph,
        "valueField": "visits",
        "titleField": "country",
        "startEffect": "elastic",
        "colorField": "color",
        "startDuration": 2,
        "labelRadius": 3,
        "innerRadius": "50%",
        "depth3D": 10,
        "balloonText": "[[title]]<br><span style='font-size:14px'><b>[[value]]</b> ([[percents]]%)</span>",
        "angle": 35,
        "export": {
          "enabled": true
        }
      }
}
drawGraphChart = function(){
    var statsData = []; 
   
    this.chart = new Chart(<any> {
        chart: {
          type: 'area'
        },
        title: {
          text: null
        },
        subtitle: {
          text: null
        },
        legend: {
                  align: 'center',
                  verticalAlign: 'top',
                  floating: false,
                  x: 0,
                  y: 0
              },
        xAxis: {
          
              min: 0.5,
              max: 6.5,
              gridLineColor: '#3b3c4a',
              gridLineWidth: 1,
              verticalAlign:'top',
              lineWidth:0,
              offset:0,
              minPadding:0,
              maxPadding:0,
              margin:[0,0,0,0],
              
          categories: ['12-03', '03-06', '06-09', '09-12', '12-03', '03-06', '06-09', '09-12'],
          tickmarkPlacement: 'on',
          title: {
            enabled: false
          }
        },
        yAxis: {
            gridLineColor: '#3b3c4a',
          title: {
            text: null
          },
          labels: {
            formatter: function () {
              //return this.value / 1000;
            }
          }
        },
        tooltip: {
          split: false,
          //valueSuffix: ' millions'
        },
        plotOptions: {
          area: {
            stacking: 'normal',
            lineColor: '#666666',
            lineWidth: 1,
            marker: {
              lineWidth: 1,
              lineColor: '#666666'
            }
          }
        },
        series: this.entrySummary.entry_summary_graph
     
})
}
}
