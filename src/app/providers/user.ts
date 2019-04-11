import { Injectable } from '@angular/core';


@Injectable()
export class UserProvider {
  userList: any[];

  constructor() { }

  public parseISOString(date) {
    const b = date.split(/\D+/);
    console.log('separado', b[0], b[1], b[2]);
    return {
      year: parseInt(b[0]),
      month: parseInt(b[1]),
      day: parseInt(b[2])
    };
  }



}
