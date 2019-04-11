import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, switchMap } from 'rxjs/operators';

@Injectable()

export class RequestService {


    constructor(private http: HttpClient) { }

    getData() {
        return this.http.get('https://testbankapi.firebaseio.com/clients.json').pipe(map((response: any) => response));
    }


    requesPost(info: any) {
        const body = JSON.stringify(info);
        return this.http.post('https://testbankapi.firebaseio.com/clients.json', body).pipe(map((response: any) => response));
    }

}


