import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { forkJoin } from 'rxjs';

@Injectable()

export class RequestService {


    constructor(private http: HttpClient) { }

    getData() {
        // console.log('getDatea', this.http.get('https://testbankapi.firebaseio.com/clients.json'));
        // return forkJoin(
        //    return this.http.get('https://testbankapi.firebaseio.com/clients.json').pipe(map(data => { })).subscribe(result => {
        //         console.log('resultado', result);
        //     });
        return this.http.get('https://testbankapi.firebaseio.com/clients.json').pipe(map((response: any) => response));
    }


    requesPost(info: any) {
        const body = JSON.stringify(info);
        return this.http.post('https://testbankapi.firebaseio.com/clients.json', body).pipe(map((response: any) => response));
    }

    private extractData(response: any) {
        return response;
    }

}


