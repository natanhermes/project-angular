import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'stakeholders',
    loadChildren: () => import('./features/stakeholders/stakeholders.module').then(m => m.StakeholdersModule)
  },
  {
    path: 'process',
    loadChildren: () => import('./features/process/process.module').then(m => m.ProcessModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
