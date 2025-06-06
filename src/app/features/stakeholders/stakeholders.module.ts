import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputMaskModule } from 'primeng/inputmask';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { SharedModule } from '../../shared/shared.module';
import { StakeholderListComponent } from './stakeholder-list/stakeholder-list.component';
import { StakeholderNewComponent } from './stakeholder-new/stakeholder-new.component';
import { StakeholdersRoutingModule } from './stakeholders-routing.module';

@NgModule({
  declarations: [
    StakeholderListComponent,
    StakeholderNewComponent,
  ],
  imports: [
    CommonModule,
    StakeholdersRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SelectModule,
    InputTextModule,
    InputMaskModule,
    FloatLabelModule,
    TableModule,
    ButtonModule,
    CardModule,
    SharedModule,
    RouterModule,
  ]
})
export class StakeholdersModule { }
