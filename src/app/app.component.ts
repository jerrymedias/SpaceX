import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'SpaceX';
  filterYears: Array<number>;
  selectedYear: number;
  selectedLaunch: string;
  selectedLand: string;
  onPageReloadQuerySubscription: Subscription;

  constructor(
    private route: ActivatedRoute,
    private router: Router
    ) {
  }
  
  ngOnInit(): void {
    this.setFilterYearsLaunchLanState();
    this.onPageReloadQuerySubscription = this.route.queryParams.subscribe(queryParams => {
      this.selectFiltersOnRefresh(queryParams);
   });
  }

  setFilterYearsLaunchLanState(): void {
    this.filterYears = [];
    const firstYearOfFilter = 2006;
    for(let i = 0; i<=14; i++) {
      this.filterYears.push(firstYearOfFilter + i);
    }
  }

  selectFiltersOnRefresh(queryParams): void {
    for(let key in queryParams) {
        switch (key) {
          case 'land_success':
            this.selectedLand = queryParams[key];
            break;

          case 'launch_success':
            this.selectedLaunch = queryParams[key];
            break;

          case 'launch_year':
            this.selectedYear = queryParams[key];

          default:
            break;
        }
    }
  }

  getLaunchDataWithFilters(eventFromFilter, event): void {
    switch (eventFromFilter) {
      case 'year':
        this.selectedYear = this.selectedYear == event ? null : event; 
        this.setFilterQueryParams({launch_year: this.selectedYear});
        break;
      
      case 'launch':
        this.selectedLaunch = this.selectedLaunch == event ? null : event;
        this.setFilterQueryParams({launch_success: this.selectedLaunch == 'true' ? true : this.selectedLaunch == 'false' ? false : null });
        break;
      
      case 'land':
        this.selectedLand = this.selectedLand == event ? null : event;
        this.setFilterQueryParams({land_success: this.selectedLand == 'true' ? true : this.selectedLand == 'false' ? false : null});
        break;

      default:
        break;
    }
  }
  
  setFilterQueryParams(filterQueryParams): void {
    this.onPageReloadQuerySubscription && this.onPageReloadQuerySubscription.unsubscribe();
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: filterQueryParams,
      queryParamsHandling: 'merge',
    });  
  }
}
