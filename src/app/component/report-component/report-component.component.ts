import { ProximityService } from './../../service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'report-component',
  templateUrl: './report-component.component.html',
  styleUrls: ['./report-component.component.css']
})
export class ReportComponentComponent implements OnInit {
  displayedColumnsAlertReport: string[];
  dtOptions: any;
  alldata: any[]=[];

  constructor(private service:ProximityService) { }

  ngOnInit() {
    this.service.getAlertData().subscribe(data => {
      this.alldata.push(data);
      console.log('datal',this.alldata);
      this.dtOptions = {
        dom: 'Bfrtip',
        buttons: [
          'copy',
          'print',
          'excel',
          'pdf',
        ]
      };
      this.displayedColumnsAlertReport = ['Pixel',
                            'Name',
                            'Id',
                            'Time',
                            'Date',
                            'Location',
                            'Detection status',
                            'No of Detection'];
    });
    
    
  }

}
