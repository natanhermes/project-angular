import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ContentComponent } from './layout/content/content.component';
import { HeaderComponent } from './layout/header/header.component';

@NgModule({
  declarations: [
    HeaderComponent,
    ContentComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    NgxSpinnerModule
  ],
  exports: [
    HeaderComponent,
    ContentComponent
  ]
})
export class CoreModule { }
