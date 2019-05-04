import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

const apiUrl = environment.apiUrl;
const appId = environment.appId;

@Injectable()
export class WeatherDetailsService {

    constructor(
        private http: HttpClient
    ) {

    }

    searchCityWeather(cityName): Observable<any> {
        let filters = {
            q: cityName,
            appid: appId 
        };
        return this.http.get(apiUrl + this.getParametersFromObject(filters) , {
            observe: 'response'
        });
    }

    getParametersFromObject(paramsObject: any) {
        let parameters = '';
        Object.entries(paramsObject).map(([key, val]) => {
            if (val !== undefined && val !== null && val !== '') {
                parameters += (`${key}=${val}&`);
            }
        });
        parameters = parameters.substr(0, parameters.length - 1);
        return parameters;
    }

}