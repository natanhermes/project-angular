import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HeadingComponent } from './components/heading/heading.component';
import { FilterProcessComponent } from './components/filter-process/filter-process.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { SelectModule } from 'primeng/select';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { FloatLabelModule } from 'primeng/floatlabel';
import { JusticePipe } from './pipes/justice.pipe';
import { ModalProcessDetailsComponent } from './components/modal-process-details/modal-process-details.component';
import { DialogModule } from 'primeng/dialog';
import { TagModule } from 'primeng/tag';

@NgModule({
  declarations: [
    HeadingComponent,
    FilterProcessComponent,
    JusticePipe,
    ModalProcessDetailsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SelectModule,
    InputTextModule,
    ButtonModule,
    CardModule,    
    FloatLabelModule,
    DialogModule,
    TagModule
  ],
  exports: [
    HeadingComponent,
    FilterProcessComponent,
    JusticePipe,
    ModalProcessDetailsComponent
  ]
})
export class SharedModule { }
