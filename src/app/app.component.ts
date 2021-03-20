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
  filterYears: Array<{year: number, selected: boolean}>;
  filterLaunch: Array<{successfullOrNot: string, selected: boolean}>;
  filterLand: Array<{successfullOrNot: string, selected: boolean}>;
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
      this.filterYears.push({year: firstYearOfFilter + i, selected: false});
    }
    this.filterLand = [{successfullOrNot: 'True', selected: false}, {successfullOrNot: 'False', selected: false}];
    this.filterLaunch = [{successfullOrNot: 'True', selected: false}, {successfullOrNot: 'False', selected: false}];
  }

  selectFiltersOnRefresh(queryParams): void {
    for(let key in queryParams) {
        switch (key) {
          case 'land_success':
            this.filterLand.forEach(eachFilter => {
              if(eachFilter.successfullOrNot.toLowerCase() == queryParams[key]) {
                eachFilter.selected = true;
              }
            });
            break;

          case 'launch_success':
            this.filterLaunch.forEach(eachFilter => {
              if(eachFilter.successfullOrNot.toLowerCase() == queryParams[key]) {
                eachFilter.selected = true;
              }
            });
            break;

          case 'launch_year':
            this.filterYears.forEach(eachFilter => {
              if(eachFilter.year == queryParams[key]) {
                eachFilter.selected = true;
              }
            });

          default:
            break;
        }
    }
  }

  getLaunchDataWithFilters(eventFromFilter, event, index): void {
    switch (eventFromFilter) {
      case 'year':
        this.setFilterSelection(this.filterYears, index, event);
        this.setFilterQueryParams({launch_year: event.selected ? event.year : null});
        break;
      
      case 'launch':
        this.setFilterSelection(this.filterLaunch, index, event);
        this.setFilterQueryParams({launch_success: event.selected ? event.successfullOrNot == 'True' ? true : false : null});
        break;
      
      case 'land':
        this.setFilterSelection(this.filterLand, index, event);
        this.setFilterQueryParams({land_success: event.selected ? event.successfullOrNot == 'True' ? true : false : null});
        break;

      default:
        break;
    }
  }

  setFilterSelection(filterList, index, event): void {
    filterList.forEach((eachFilter, i) => {
      if(index == i) {
        eachFilter.selected = !event.selected;
      } else {
        eachFilter.selected = false;
      }
    });
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
