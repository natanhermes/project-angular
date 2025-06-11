import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProcessRoutingModule } from './process-routing.module';
import { ProcessListComponent } from './process-list/process-list.component';
import { SharedModule } from '../../shared/shared.module';
import { TableModule } from 'primeng/table';
import { CardModule } from 'primeng/card';
import { provideHttpClient } from '@angular/common/http';
import { ProcessService } from './process.service';
import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';

@NgModule({
  declarations: [
    ProcessListComponent
  ],
  imports: [
    CommonModule,
    ProcessRoutingModule,
    CardModule,
    TableModule,
    SharedModule,
    ButtonModule,
    TagModule,
  ],
  providers: [
    ProcessService
  ]
})
export class ProcessModule { }
