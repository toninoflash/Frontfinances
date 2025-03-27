import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class BaseServiceService {
  constructor(private http: HttpClient) {}

  get token(): string {
    return sessionStorage.getItem('token') || '';
  }
  postItem(url: string, formData: any) {
    return this.http.post(url, formData, {
      headers: {
        'x-token': this.token,
      },
    });
  }
  postItemSinToken(url: string, formData: any) {
    return this.http.post(url, formData, {
    });
  }
  putItem(url:string,formData: any, ) {
    return this.http.put(url, formData,  {
      headers: {
        'x-token': this.token,
      }
    })
  }
  getItems(url:string) {
    return this.http.get(url, {
      headers: {
        'x-token': this.token,
      }
    })
  }

}
