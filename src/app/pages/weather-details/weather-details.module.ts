import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { WeatherDetailsService } from './weather-details.service';
import { WeatherDetailsComponent } from './weather-details.component';
import { CityWeatherDetailsComponent } from './city-weather-details/city-weather-details.component';
import { WeatherDetailsRoutingModule } from './weather-details.routing';

@NgModule({
  declarations: [
    WeatherDetailsComponent,
    CityWeatherDetailsComponent
  ],
  imports: [
    CommonModule, FormsModule, WeatherDetailsRoutingModule
  ],
  providers: [WeatherDetailsService],
})
export class WeatherDetailsModule { }
