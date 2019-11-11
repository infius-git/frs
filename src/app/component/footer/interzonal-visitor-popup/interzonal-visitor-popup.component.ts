import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';

@Component({
  selector: 'interzonal-visitor-popup',
  templateUrl: './interzonal-visitor-popup.html',
  styleUrls: ['./interzonal-visitor-popup.component.css']
})
export class InterzonalVisitorPopupComponent implements OnInit {
  @Input() dataSource: any;
  @Input() displayColumns: any;
  @Input() openReportTable: any;
  @Output() closeTable = new EventEmitter<any>();
  openTable:boolean;
  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(this.openReportTable=="InterZonal")
    {
      this.openTable=true;
    }
    else
    {
      this.openTable=false;
    }
}
closePopUp = function() {
  this.closeTable.emit("");
  document.getElementById('fade').style.display = 'none';
//      $('.visitor-mat-tbl').hide();
 };

}
