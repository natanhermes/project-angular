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

@NgModule({
  declarations: [
    HeadingComponent,
    FilterProcessComponent,
    JusticePipe
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SelectModule,
    InputTextModule,
    ButtonModule,
    CardModule,    
    FloatLabelModule
  ],
  exports: [
    HeadingComponent,
    FilterProcessComponent,
    JusticePipe
  ]
})
export class SharedModule { }
