import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LaunchService } from './launch.service';

@Component({
  selector: 'app-launch',
  templateUrl: './launch.component.html',
  styleUrls: ['./launch.component.scss']
})
export class LaunchComponent implements OnInit {
  launchData: Array<any>;

  constructor(private route: ActivatedRoute, private launchService: LaunchService) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(queryParams => {
      queryParams = {...queryParams};
      queryParams['limit'] = 100;
      this.getLaunchData(queryParams);
   });
  }

  getLaunchData(queryParams): void {
    this.launchService.getLaunches(queryParams).subscribe(launchData => {
      this.launchData = launchData;
    });
  }

}
