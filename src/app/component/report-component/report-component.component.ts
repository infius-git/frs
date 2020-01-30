import { ProximityService } from './../../service';
import { SecurityContext, Component, OnInit, OnChanges } from '@angular/core';
import * as moment from 'moment';
import {DomSanitizer, SafeStyle, SafeUrl, SafeHtml, SafeScript, SafeResourceUrl} from '@angular/platform-browser';
import { webSocket } from 'rxjs/webSocket';
import * as $ from 'jquery';

const subject = webSocket('ws://localhost:8081/');

@Component({
  selector: 'report-component',
  templateUrl: './report-component.component.html',
  styleUrls: ['./report-component.component.css']
})


export class ReportComponentComponent implements OnInit , OnChanges {
  displayedColumnsAlertReport: string[];
  dtOptions: any;
  alldatas: any ;
  mapIdCount: any;
  identifiedCount = 0;
  notIdentifiedCount = 0;
  tablearray: any;
  tablerow: any;
  openReportTbl = false;
  popUpData: any;
  genericUserImg = "http://localhost:8080/app/api/images/generic-user.png";
  constructor(private service: ProximityService, private _sanitizer: DomSanitizer) {}

  ngOnInit() {

    $('.tabitem').click(function(){
      $('.tabitem').removeClass('active');
      $(this).addClass('active');
      // $('.itemtabdiv').addClass('displaynone');
      // var itemtabdata=$(this).attr('data');
      // $('.itemtab'+itemtabdata).removeClass('displaynone');
    })
    
    this.service.getFRSData().subscribe(frsData => {
      this.alldatas = this.processData(frsData.data);
      this.mapIdCount = frsData.mapIdCount[0];
      this.identifiedCount = frsData.data.reduce((acc, cur) => cur.AlarmType === 'User Identified' ? ++acc : acc, 0);
      this.notIdentifiedCount = frsData.data.reduce((acc, cur) => cur.AlarmType === 'User Detected' ? ++acc : acc, 0);
    });

      this.dtOptions = {
        dom: 'Bfrtip',
        buttons: [
          'copy',
          'print',
          'excel',
          'pdf',
        ],
	      order:[3, 'desc']
      };
    this.displayedColumnsAlertReport = ['Image',
    'Name',
    'Emp Id',
    'Time',
    'Date',
    'Loc',
    'Identification',
    'Detections'];
    subject.subscribe(
      msg => this.adddata(msg), // alert('msg' + msg),  Called whenever there is a message from the server.
      err => console.log(err), // Called if at any point WebSocket API signals some kind of error.
      () => console.log('complete') // Called when connection is closed (for whatever reason).
      );
  }

  ngOnChanges() {
    this.service.getFRSData().subscribe(frsData => {
      this.alldatas = frsData.data;
      this.mapIdCount = frsData.mapIdCount[0];
      this.identifiedCount = frsData.data.filter((obj) => obj.AlarmType === 'User Identified').length;
      this.notIdentifiedCount = frsData.data.filter((obj) => obj.AlarmType === 'User Detected').length;
    });
  }

 adddata(r) {
   console.log('Data Addition - '+ JSON.stringify(r.message));
   console.log('Data Old - '+ JSON.stringify(this.alldatas));
        this.tablearray = [];
        this.tablearray.push(r.message);
        this.tablearray.forEach(element => {
          if (this.mapIdCount !== undefined && this.mapIdCount[element.SubjectCode]) {
            this.mapIdCount[element.SubjectCode] = this.mapIdCount[element.SubjectCode] +  1;
         }

         if (this.mapIdCount && (this.mapIdCount[element.SubjectCode] === undefined || this.mapIdCount[element.SubjectCode] === null)) {
          this.mapIdCount[element.SubjectCode] = this.mapIdCount[element.SubjectCode] + 1;
         }

          if (element.AlarmType === 'User Identified') {
            this.identifiedCount = this.identifiedCount + 1;
         }
         if (element.AlarmType === 'User Detected') {
            this.notIdentifiedCount = this.notIdentifiedCount + 1;
            this.detectedPopup(element);
         }
         if (element.TimeStamp!==undefined && element.TimeStamp!== null) {
	          let utcDate =  new Date(parseInt(element.TimeStamp.substring(6, element.TimeStamp.slice(1, -1).length-4)));
            utcDate.setHours(utcDate.getHours() + 5);
            utcDate.setMinutes(utcDate.getMinutes() + 30);
            let dtValue = moment(utcDate); 
            element.dateStr = dtValue.format('ddd, MMM D, YYYY');
            element.timeStr = dtValue.format('h:mm:ss A');
          }

          if (this.alldatas) {
            this.alldatas.push(element);
          }

        //   this.tablerow=$('#example').DataTable();
        //   this.tablerow.row.add([
        //   '<img width="51px"  src="' + element.SubjectFaceImage + '">',
        //   element.SubjectName +' '+ element.SubjectLastName,
        //   element.SubjectCode,
        //   element.timeStr,
        //   element.dateStr,
        //   element.CameraId,
        //   (element && element.AlarmType === 'User Identified'? 'TRUE': 'FALSE'),
        //   ((this.mapIdCount !== undefined) ? this.mapIdCount[element.SubjectCode] : '-'),
        // ]).draw();
          // this.tablerow = `<tr _ngcontent-mib-c8="" role="row" class="odd">
          // <td>
          //   <img width="51px"  src="` + element.SubjectFaceImage + `">
          // </td>
          // <td>` + element.SubjectName +' '+ element.SubjectLastName+ `</td>
          // <td>` + element.SubjectCode + `</td>
          // <td>` + element.timeStr + `</td>
          // <td>` + element.dateStr + `</td>
          // <td>` + element.CameraId + `</td>
          // <td>` + (element && element.AlarmType === 'User Identified'? 'TRUE': 'FALSE') + `</td>
          // <td>` + ((this.mapIdCount !== undefined) ? this.mapIdCount[element.SubjectCode] : '-') + `</td>
          // </tr>`;
        });
        console.log('Data New - '+ JSON.stringify(this.alldatas));
        //$(this.tablerow).insertBefore('#DataTables_Table_0_wrapper>table>tbody>tr:first');
     
  }

  /* public transform(value: string, type: string): SafeHtml | SafeStyle | SafeScript | SafeUrl | SafeResourceUrl {
	const filePath =  `http://localhost:8080/app/api/images/${value}`;
  	switch (type) {
			case 'html':
				return this._sanitizer.bypassSecurityTrustHtml(value);
			case 'style':
				return this._sanitizer.bypassSecurityTrustStyle(value);
			case 'script':
				return this._sanitizer.bypassSecurityTrustScript(value);
			case 'url':
				return this._sanitizer.sanitize(SecurityContext.URL, filePath);
			case 'resourceUrl':
				return this._sanitizer.bypassSecurityTrustResourceUrl(filePath);
			default:
				throw new Error(`Unable to bypass security for invalid type: ${type}`);
		}
  } */
  openReportTable(data) {
    this.openReportTbl = true;
    $('#fullfade').show();
    this.popUpData = data;
  }
  closePopUp() {
    this.openReportTbl = false;
    $('#fullfade').hide();
    this.popUpData = null;
  }

  
  detectedPopup(data){
   this.openReportTbl=true;
   $('#fullfade').show();
   this.popUpData = data;
   window.setTimeout(function(){
    this.closePopUp();
  },5000);
  }

  processData(dataArr) {
    return dataArr.map((ele) => {
      if (ele.TimeStamp !== undefined && ele.TimeStamp !== null) {
     let utcDate =  new Date(parseInt(ele.TimeStamp.substring(6, ele.TimeStamp.slice(1, -1).length-4)));
     utcDate.setHours(utcDate.getHours() + 5);
     utcDate.setMinutes(utcDate.getMinutes() + 30);
     let dtValue = moment(utcDate);
      ele.dateStr = dtValue.format('ddd, MMM D, YYYY');
      ele.timeStr = dtValue.format('h:mm:ss A');
      return ele;
      }
    });
  }
}
