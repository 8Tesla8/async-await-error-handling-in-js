import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable()
export class SomeService {

    private _url = "https://api.npms.io/v2/search?q=scope:angular";

    constructor(private http: HttpClient) { }

    getTestRequestObservable(): Observable<any> {
        return this.http.get<any>(this._url);
    }

    getTestRequestPromise(): Promise<any> {
        return this.http.get<any>(this._url).toPromise();
    }

    errorInPromise(): Promise<any> {
        return Promise.reject(new Error('Something went wrong'));
    }

    
    // 2
    getCatchError1() : Observable<any> {
        return this.http.get<any>(this._url).pipe(catchError((err, caught) => caught) );
    }

    getCatchError2() : Observable<any> {
        return this.http.get<any>(this._url).pipe(catchError(err => {
            throw 'Error in source. Details: ' + err;
          }));
    }
    // 2


    // 5
    getCatchPromise() : Promise<PromiseObject> {
        return this.http.get<any>(this._url).toPromise().then(data => ({ok: true, response: data, error: null}))
        .catch(error => Promise.resolve({ok: false, response: null, error: error}));
    }
    // 5


    private requestWithHeaders(){
        const headers = { 'Authorization': 'Bearer my-token', 'My-Custom-Header': 'foobar' }
        this.http.get<any>(this._url, { headers }).subscribe(data => {
            console.log(data);
        })
    }
}

export class PromiseObject {
    public ok: boolean;
    public response: any;
    public error: any;
}
