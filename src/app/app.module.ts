import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {AmChartsModule} from '@amcharts/amcharts3-angular';
import {ChartModule} from 'angular-highcharts';
import {MalihuScrollbarModule} from 'ngx-malihu-scrollbar';
import {NgxPopper} from 'angular-popper';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {MatTableModule, MatSortModule, MatPaginatorModule, MatInputModule, MatFormFieldModule} from '@angular/material';
import {FlexLayoutModule} from '@angular/flex-layout';
import {AppComponent} from './app.component';
import {ToolbarComponent} from './component/toolbar/toolbar.component';
import {sideBarComponent} from './component/sidebar/sideBar.component';
import {mapComponent} from './component/map/map.component';
import {securityOverviewComponent} from './component/securityOverview/securityOverview.component';
import {EventSummaryComponent} from './component/eventSummary/eventSummary.component';
import {GateMetricsComponent} from './component/gateMetrics/gateMetrics.component';
import {EntrySummaryComponent} from './component/entrySummary/entrySummary.component';
import {CctvCameraComponent} from './component/cctvCamera/cctvCamera.component';
import {FooterComponent} from './component/footer/footer.component';
import {TowerEntryComponent} from './component/towerEntry/towerEntry.component';
import {VisitorMetricsComponent} from './component/visitorMetrics/visitorMetrics.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import { MatButtonModule } from '@angular/material/button';
import { MatTableExporterModule } from 'mat-table-exporter';
import { MatSelectModule } from '@angular/material/select';
import { DataTablesModule } from 'angular-datatables';
import {VisitorsReportComponent} from './component/reports/visitorsReport/visitorsReport.component';
import {AlertReportComponent} from './component/reports/alertReport/alertReport.component';
import { VisitorPopupComponent } from './visitorMetrics/visitor-popup/visitor-popup.component';
import { VisitorDetailsComponent } from './component/visitorMetrics/visitorDetails/visitorDetails.component';
import { GateDetailsComponent } from './component/gateMetrics/gateDetails/gateDetails.component';
import { BlacklistedVisitorPopupComponent } from './component/footer/blacklistedVisitorPopup/blacklistedVisitorPopup.component';
import { ZonalDetailsComponent } from './component/map/zonalDetails/zonalDetails.component';
import { InterzonalVisitorPopupComponent } from './component/footer/interzonalVisitorPopup/interzonalVisitorPopup.component';
import { ReportComponentComponent } from './component/report-component/report-component.component';


@NgModule({
    declarations: [
        AppComponent,
        ToolbarComponent,
        sideBarComponent,
        mapComponent,
        securityOverviewComponent,
        EventSummaryComponent,
        GateMetricsComponent,
        EntrySummaryComponent,
        CctvCameraComponent,
        FooterComponent,
        TowerEntryComponent,
        VisitorMetricsComponent,
        VisitorsReportComponent,
        AlertReportComponent,
        DashboardComponent,
        VisitorPopupComponent,
        VisitorDetailsComponent,
        GateDetailsComponent,
        BlacklistedVisitorPopupComponent,
        ZonalDetailsComponent,
        InterzonalVisitorPopupComponent,
        ReportComponentComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        MalihuScrollbarModule.forRoot(),
        NgxPopper,
        NgbModule,
        AmChartsModule,
        ChartModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        MatInputModule,
        MatFormFieldModule,
        MatButtonModule,
        ReactiveFormsModule,
        FlexLayoutModule,
        HttpClientModule,
        MatTableExporterModule,
        MatSelectModule,
        DataTablesModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
