import { Component, OnInit } from '@angular/core';
import { WeatherData } from '../weather-details.model';
import { WeatherDetailsService } from '../weather-details.service';
import { interval, Subscription } from 'rxjs';

@Component({
    selector: 'app-city-weather-details',
    templateUrl: './city-weather-details.component.html',
    styleUrls: ['./city-weather-details.component.css']
})
export class CityWeatherDetailsComponent implements OnInit {
    weatherData: WeatherData[] = [];

    constructor(
        private weatherDetailsService: WeatherDetailsService
    ) { }

    ngOnInit() {
        if (JSON.parse(window.localStorage.getItem('weatherAppDetails')) !== null) {
            this.weatherData = JSON.parse(window.localStorage.getItem('weatherAppDetails'));
            this.weatherData.forEach((data, index) => {
                if (data.details !== '') {
                    data.cityName = data.details.city;
                    data.intervalData = interval(300000);
                    data.subscription = data.intervalData.subscribe((val) => this.updateCityWeather(data.formId, val));
                }
            });
        } else {
            for (var i = 0; i < 9; i++) {
                this.weatherData.push({
                    details: '',
                    showWeatherForm: false,
                    showWeatherResult: false,
                    formId: i,
                    errorMessage: '',
                    intervalData: '',
                    subscription: Subscription,
                });
            }
        }
    }

    showInputBox(formId: any) {
        this.weatherData[formId].showWeatherForm = true;
    }

    searchCityWeather(formId) {
        this.weatherDetailsService.searchCityWeather(this.weatherData[formId].cityName).subscribe((res) => {
            this.weatherData[formId].details = {
                city: res.body.name,
                windSpeed: res.body.wind.speed,
                temp: res.body.main.temp,
                pressure: res.body.main.pressure,
                humidity: res.body.main.humidity,
                minTemp: res.body.main.temp_min,
                maxTemp: res.body.main.temp_max,
                cloud: res.body.weather[0].description,
                main: res.body.weather[0].main,
                backgroundImg: res.body.weather[0].main.toLowerCase(),
                sunrise: new Date(res.body.sys.sunrise * 1000),
                sunset: new Date(res.body.sys.sunset * 1000),
            };
            this.weatherData[formId].showWeatherResult = true;
            this.weatherData[formId].intervalData = interval(300000),
            this.weatherData[formId].subscription = Subscription,
            this.weatherData[formId].errorMessage = '';
            this.weatherData[formId].subscription = this.weatherData[formId].intervalData.subscribe((val) => this.updateCityWeather(formId, val));
            window.localStorage.setItem('weatherAppDetails', JSON.stringify(this.weatherData, this.getCircularReplacer()));
        }, error => {
            this.weatherData[formId].errorMessage = 'Please enter correct city name';
        });

    }

    updateCityWeather(formId, val) {
        console.log('updating weather on every 5 minutes');
        this.weatherDetailsService.searchCityWeather(this.weatherData[formId].cityName).subscribe((res) => {
            this.weatherData[formId].details = {
                city: res.body.name,
                windSpeed: res.body.wind.speed,
                temp: res.body.main.temp,
                pressure: res.body.main.pressure,
                humidity: res.body.main.humidity,
                minTemp: res.body.main.temp_min,
                maxTemp: res.body.main.temp_max,
                cloud: res.body.weather[0].description,
                main: res.body.weather[0].main,
                backgroundImg: res.body.weather[0].main.toLowerCase(),
                sunrise: new Date(res.body.sys.sunrise * 1000),
                sunset: new Date(res.body.sys.sunset * 1000),
            }
            this.weatherData[formId].errorMessage = '';
            this.weatherData[formId].showWeatherResult = true;
        }, error => {
            this.weatherData[formId].errorMessage = 'Please enter correct city name';
        });
    }

    onDestroyingIntervalWhileEditCity(index) {
        if (this.weatherData[index].intervalData && this.weatherData[index].subscription && this.weatherData[index].subscription.unsubscribe) {
            this.weatherData[index].subscription.unsubscribe();
        }
    }

    resetWeatherPanel(i) {
        if (this.weatherData[i].intervalData && this.weatherData[i].subscription && this.weatherData[i].subscription.unsubscribe) {
            this.onDestroyingIntervalWhileEditCity(i);
        }   
        this.weatherData[i] = {
            details: '',
            showWeatherForm: false,
            showWeatherResult: false,
            formId: i,
            errorMessage: '',
            intervalData: '',
            subscription: Subscription,
        };
        window.localStorage.setItem('weatherAppDetails', JSON.stringify(this.weatherData, this.getCircularReplacer()));
    }

    getCircularReplacer = () => {
        const seen = new WeakSet();
        return (key, value) => {
            if (typeof value === "object" && value !== null) {
                if (seen.has(value)) {
                    return;
                }
                seen.add(value);
            }
            return value;
        };
    };

    ngOnDestroy() {
        for (var i = 0; i < 9; i++) {
            if (this.weatherData[i].intervalData && this.weatherData[i].subscription && this.weatherData[i].subscription.unsubscribe) {
                this.weatherData[i].subscription.unsubscribe();
            }
        }
    }


}
