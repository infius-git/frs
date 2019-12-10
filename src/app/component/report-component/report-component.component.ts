import { ProximityService } from './../../service';
import { Component, OnInit } from '@angular/core';
import { webSocket } from "rxjs/webSocket";
import * as $ from 'jquery';
const subject = webSocket("ws://localhost:9000/demo/server.php");
@Component({
  selector: 'report-component',
  templateUrl: './report-component.component.html',
  styleUrls: ['./report-component.component.css']
})
export class ReportComponentComponent implements OnInit {
  displayedColumnsAlertReport: string[];
  dtOptions: any;
  alldatas: any=[];
  count:number=0;
  tablearray:any;
  tablerow:any;

  constructor(private service:ProximityService) { 
   
  }
  adddata(r) {
    if(r.message.indexOf("connected")<0)
      {
        this.tablearray=[];
        this.tablearray.push({"Id":this.count,"AlarmType":"User Identified","CameraId":"Source4","Comments":"","SubjectGroup":"IT","SubjectId":54,"SubjectLastName":"awale","SubjectName":"vishal","TimeStamp":"\/Date(-62135596800000+0530)\/","total":0});
        this.tablearray.forEach(element => {
          this.tablerow=`<tr _ngcontent-mib-c8="" role="row" class="odd">
          <td>pixel</td>
          <td>`+element.SubjectName+`</td>
          <td>`+element.Id+`</td>
          <td>Time</td>
          <td>Date</td>
          <td>Location</td>
          <td>`+element.AlarmType+`</td>
          <td>RamPal</td>
          </tr>`;
        });
        alert(this.tablerow);
        $(this.tablerow).insertBefore('#DataTables_Table_0_wrapper>table>tbody>tr:first');
      }
      else
      {
       // alert('connected');
      }
  }
  
  ngOnInit() {
    
    this.service.getAlertData().subscribe(data => {
        
      this.alldatas.push(data);
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
    
    subject.subscribe(
        msg => this.adddata(msg), // Called whenever there is a message from the server.
        err => console.log(err), // Called if at any point WebSocket API signals some kind of error.
        () => console.log('complete') // Called when connection is closed (for whatever reason).
      );

     
    
  }

}
