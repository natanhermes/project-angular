import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StakeholderListComponent } from './stakeholder-list/stakeholder-list.component';
import { StakeholderNewComponent } from './stakeholder-new/stakeholder-new.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: StakeholderListComponent
  },
  {
    path: 'new',
    component: StakeholderNewComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StakeholdersRoutingModule { }
