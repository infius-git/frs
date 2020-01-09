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
  count = 0;
  tablearray: any;
  tablerow: any;
  openReportTbl = false;
  constructor(private service: ProximityService, private _sanitizer: DomSanitizer) {}

  ngOnInit() {
    this.service.getFRSData().subscribe(frsData => {
      this.alldatas = frsData.data;
      this.mapIdCount = frsData.mapIdCount[0];
      for (const key in this.mapIdCount) {
        if (this.mapIdCount.hasOwnProperty(key)) {
          this.count = this.count +  this.mapIdCount[key];
        }
      }
    });

      this.dtOptions = {
        dom: 'Bfrtip',
        buttons: [
          'copy',
          'print',
          'excel',
          'pdf',
        ]
      };
    this.displayedColumnsAlertReport = ['Image',
    'Name',
    'Id',
    'Time',
    'Date',
    'Location',
    'Detection status',
    'No of Detection'];
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
      for (const key in this.mapIdCount) {
        if (this.mapIdCount.hasOwnProperty(key)) {
          this.count = this.count +  this.mapIdCount[key];
        }
      }
    });
  }

 adddata(r) {
        this.tablearray = [];
        this.tablearray.push(r.message);
        this.tablearray.forEach(element => {
          if (this.mapIdCount !== undefined) {
            this.mapIdCount[element.Id] = this.mapIdCount[element.Id] +  1;
            this.count = this.count + 1;
          }
          const dateStr = moment(element.SubjectExpiryDate).format('ddd, MMM D, YYYY');
          const timeStr = moment(element.SubjectExpiryDate).format('h:mm:ss A');
          this.tablerow = `<tr _ngcontent-mib-c8="" role="row" class="odd">
          <td>
            <img width="51px"  src="` + element.SubjectFaceImage + `">
          </td>
          <td>` + element.SubjectName + `</td>
          <td>` + element.Id + `</td>
          <td>` + timeStr + `</td>
          <td>` + dateStr + `</td>
          <td>` + element.CameraId + `</td>
          <td>` + element.AlarmType + `</td>
          <td>` + ((this.mapIdCount !== undefined) ? this.mapIdCount[element.Id] : '-') + `</td>
          </tr>`;
        });
        $(this.tablerow).insertBefore('#DataTables_Table_0_wrapper>table>tbody>tr:first');
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
  }
  closePopUp() {
    this.openReportTbl = false;
  }
}
