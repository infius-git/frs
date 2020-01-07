import { Component, OnInit, Input, Renderer2, Inject, AfterViewInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { monitorMetrics, gatePass, alertEvents, alertFeedMetrics } from '../../../proximity';
import * as $ from 'jquery';
import 'lightslider';
import {  MalihuScrollbarService } from 'ngx-malihu-scrollbar';
@Component({
  selector: 'monitor-metric',
  templateUrl: './gateMetrics.html',
  styleUrls: ['./gateMetrics.component.css']
})
export class GateMetricsComponent implements OnInit, AfterViewInit {
  @Input() monitorMetrics: Array<monitorMetrics>;
  @Input() alertFeedMetrics: Array<alertFeedMetrics>;
  @Input() openReportTable: any;
  @Output() openNewTable = new EventEmitter<any>();
  gateCount: Array<any>;
  selectedGate; any;
  selectedLabel: any;
  selectedMetric: Array<gatePass>;
  selectedalert: Array<gatePass>;
  allAlerts: Array<alertEvents>;
  gateSelected: any;
  scrollbarOptions: any;
  gateTime: any;
  constructor(private mScrollbarService: MalihuScrollbarService, private _renderer2: Renderer2,
    @Inject(DOCUMENT) private _document) {
    this.gateCount = [];
  }
  ngAfterViewInit() {
    this.mScrollbarService.initScrollbar('#gateAlert', { axis: 'y', theme: 'dark-thick', scrollButtons: { enable: true } });
    this.mScrollbarService.initScrollbar('#alertFeed', { axis: 'y', theme: 'dark-thick', scrollButtons: { enable: true } });
  }
  ngOnInit() {
    this.gateTime = new Date().toDateString()
    this.scrollbarOptions = { axis: 'yx', theme: 'minimal-dark' };
    let script = this._renderer2.createElement('script');
    script.type = `text/javascript`;
    script.text = `
        {
            $(document).ready(function () {
    $('#tabsJustified').lightSlider({
      controls: true,
      item: 5,
      loop: false,
      pager: false,
      responsive: [
        {
          breakpoint: 480,
          settings: {
            item: 4
          }
        }
      ]
    })
  })
}`;
    this._renderer2.appendChild(this._document.body, script);
    this.selectedLabel = !!this.monitorMetrics && (this.monitorMetrics[0] !==undefined) && !!this.monitorMetrics[0].label ? !!this.monitorMetrics[0].label : 'No Data Available';
    var temp: any = {};
    if(!!this.monitorMetrics && this.monitorMetrics[0] !==undefined){
    this.monitorMetrics.forEach((item) => {
      temp = {};
      temp.value = item.label;
      temp.label = item.label;
      this.gateCount.push(temp);
    })
    this.selectedGate = 'Gate ' + this.monitorMetrics[0].label;
    this.selectedMetric = this.monitorMetrics[0].gate_pass_metrics;
    this.selectedalert = this.monitorMetrics[0].gate_alert_feed;
  }
  this.allAlerts = !!this.alertFeedMetrics  && this.alertFeedMetrics[0]!==undefined ? this.alertFeedMetrics[0].alert_event_feed : [{category:'None',type:'INFO', color: 'green',zone_name: 'No', text: 'No Alerts' ,deviceId: null,deviceType: null, timestamp: null, cardId: null }];
}

  // onGateSelected = function (label) {
  //   this.monitorMetrics.forEach((item) => {
  //     if (item.label === label) {
  //       this.selectedGate = 'Gate ' + item.label;
  //       this.selectedLabel = item.label;
  //       this.selectedMetric = item.gate_pass_metrics;
  //       this.selectedalert = item.gate_alert_feed;
  //     }
  //   })
  //   this.openPopUp();
  // }
  onGateSelected=function(label) {

     this.gateSelected = label;
     this.openNewTable.emit([this.gateSelected, this.displayedColumnsReport,"GatePopup"]);
    document.getElementById('fade').style.display = 'block';
    // document.getElementById('gatemetricpopup').style.display = 'block';
    // document.getElementById('fade').style.display = 'block';
    // this.monitorMetrics.forEach((item) => {
    //       if (item.label === label) {
    //         this.selectedGate = 'Gate ' + item.label;
    //         this.selectedLabel = item.label;
    //         console.log('label = ' + label);
    //         console.log('gate pass metrics = ' + JSON.stringify(item));
    //         this.selectedMetric = item.gate_pass_metrics;
    //         this.selectedalert = item.gate_alert_feed;
    //       }
    //     });
  };

  openPopUp(): void {
    document.getElementById('gatelight').style.display = 'block';
    document.getElementById('gatefade').style.display = 'block';
    document.getElementById('guestlight').style.display = 'block';
    document.getElementById('guestfade').style.display = 'block';
    document.getElementById('registeredVisitorlight').style.display = 'block';
    document.getElementById('visitorfade').style.display = 'block';
  }
  closePopUp(): void {
    document.getElementById('visitorlight').style.display = 'none';
    document.getElementById('visitor-report').style.display = 'none';
    document.getElementById('zonepopup').style.display = 'none';
    document.getElementById('visitorlight1').style.display = 'none';
    document.getElementById('gatemetricpopup').style.display = 'none';
  document.getElementById('light').style.display = 'none';
  document.getElementById('light2').style.display = 'none';
  document.getElementById('fade').style.display = 'none';
 }
  // closePopUp(): void {
  //   document.getElementById('gatelight').style.display = 'none';
  //   document.getElementById('gatefade').style.display = 'none';

  // }
  closePopUp1(): void {
    document.getElementById('guestlight').style.display = 'none';
    document.getElementById('guestfade').style.display = 'none';
  }
  closePopUp2(): void {

    document.getElementById('registeredVisitorlight').style.display = 'none';
    document.getElementById('visitorfade').style.display = 'none';
  }
  ngOnDestroy() {
    this.mScrollbarService.destroy('#gateAlert');
    this.mScrollbarService.destroy('#alertFeed');
  }
}
