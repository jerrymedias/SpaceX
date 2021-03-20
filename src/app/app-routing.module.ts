import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LaunchComponent } from './launch/launch.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'launch',
    pathMatch: 'full'
  },
  {
    path: 'launch',
    component: LaunchComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabled'
})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
