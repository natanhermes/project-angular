import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProcessListComponent } from './process-list/process-list.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: ProcessListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProcessRoutingModule { }
