import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

interface LaunchApiQueryParams {
  limit: number;
  launch_success?: boolean;
  land_success?: string;
  launch_year?: number
}

@Injectable({
  providedIn: 'root'
})

export class LaunchService {

  constructor(private http: HttpClient) { }

  getLaunches(launchApiQueryParams: LaunchApiQueryParams): Observable<any> {
    let url = 'https://api.spacexdata.com/v3/launches';
    for(let param in launchApiQueryParams) {
      url += `${this.giveQuerySign(url)}${param}=${launchApiQueryParams[param] == 'true' ? true : launchApiQueryParams[param] == 'false' ? false : launchApiQueryParams[param]}`;
    }
    return this.http.get(url);
  }

  giveQuerySign(url: string): string {
    return url.includes('?') ? '&' : '?';
  }
}
