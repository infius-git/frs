import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { proximity, mapData } from '../proximity';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { CommonResponse } from "../model/commonresponse";
import { GlobalConstant } from "../Utils/global-constant";
import * as moment from 'moment';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({ providedIn: 'root' })
export class ProximityService {

    private proximityUrl = './assets/mock-data/staticroot.json';  // URL to web api
    private globalConstant: GlobalConstant = new GlobalConstant();
    // private pathUrl = './assets/mock-data/path.json';
    //  private pathUrl = this.globalConstant.BASE_URL + this.globalConstant.DATA_SERVICE_CONTEXT +
    // '/api/dashboard/map-by-visitIds?visitId=ffb70d1b-70cb-4715-ab97-42de362f78cf';
   // private pathUrl = 'https://qu2873cpck.execute-api.us-west-2.amazonaws.com/prod';
    private pathUrl = this.globalConstant.BASE_URL + this.globalConstant.DATA_SERVICE_CONTEXT +
    this.globalConstant.API_CONTEXT_DASHBOARD + this.globalConstant.PATH_MAP_BY_VISIT_ID;
   // private pathUrl = 'http://34.231.195.192:9090/services/proximity/api/dashboard/map-by-visitIds?visitId=';

   private urlRootRequest = this.globalConstant.BASE_URL + this.globalConstant.DATA_SERVICE_CONTEXT +
   this.globalConstant.API_CONTEXT_DASHBOARD_ROOT;
    // private urlRootRequest = './assets/mock-data/root.json';

    private urlRootPartial = this.urlRootRequest + '?isSendCompleteResponse=false&asOfTimestamp=';

    private urlGetAllRegisteredUsers = this.globalConstant.BASE_URL +
    this.globalConstant.DATA_SERVICE_CONTEXT +
    this.globalConstant.API_CONTEXT_REGISTERED_USER_DATA;

    constructor(private http: HttpClient) {
    }

    /** GET heroes from the server */
    getAllData(): Observable<CommonResponse> {
        return this.http.get<CommonResponse>(this.urlRootRequest +
            '?isSendCompleteResponse=true&asOfTimestamp=' + moment(new Date()).valueOf());
    }

    getPartialData(): Observable<CommonResponse> {
        let t = new Date();
        t.setSeconds(t.getSeconds() - 41);
        return this.http.get<CommonResponse>(this.urlRootPartial + moment(t).valueOf());
    }

    getStaticData(): Observable<proximity> {
        return this.http.get<proximity>(this.proximityUrl);
    }

    getPathData(visitId): Observable<any> {
        return this.http.get<any>(this.pathUrl + visitId);
    }

    getMapData(): Observable<mapData> {
        // return this.http.get<mapData>('https://s3.us-east-2.amazonaws.com/xtier/proximity/delhiOne/map.json')
        return this.http.get<mapData>('./assets/mock-data/map.json')
            .pipe(
                tap(_ => console.log('fetched heroes')),
                catchError(this.handleError<mapData>('getmapdata'))
            );
    }

    getFRSData(): Observable<any> {
       // return this.http.get<any>('./assets/mock-data/GetLiveAlarms_Identified.json');
        return this.http.get<any>('http://localhost:8080/app/api');
    }

    getAllUserData(): Observable<any> {
        return this.http.get<any>(this.urlGetAllRegisteredUsers);
    }

    handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {

            // TODO: send the error to remote logging infrastructure
            console.error(error); // log to console instead

            // TODO: better job of transforming error for user consumption
            console.log(`${operation} failed: ${error.message}`);

            // Let the app keep running by returning an empty result.
            return of(result as T);
        };
    }

    /**
     * Handle Http operation that failed.
     * Let the app continue.
     * @param operation - name of the operation that failed
     * @param result - optional value to return as the observable result
     */


}

