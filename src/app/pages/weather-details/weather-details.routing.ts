import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WeatherDetailsComponent } from './weather-details.component';
import { CityWeatherDetailsComponent } from './city-weather-details/city-weather-details.component';

const routes: Routes = [
    {
        path: '',
        component: WeatherDetailsComponent,
        children: [
            {
                path: 'cities',
                component: CityWeatherDetailsComponent
            },
            {
                path: '',
                redirectTo: 'cities',
                pathMatch: 'full'
            } 
        ]
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WeatherDetailsRoutingModule { }
