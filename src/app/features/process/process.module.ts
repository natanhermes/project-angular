import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProcessRoutingModule } from './process-routing.module';
import { ProcessListComponent } from './process-list/process-list.component';
import { SharedModule } from '../../shared/shared.module';
import { TableModule } from 'primeng/table';
import { CardModule } from 'primeng/card';

@NgModule({
  declarations: [
    ProcessListComponent
  ],
  imports: [
    CommonModule,
    ProcessRoutingModule,
    CardModule,
    TableModule,
    SharedModule
  ]
})
export class ProcessModule { }
