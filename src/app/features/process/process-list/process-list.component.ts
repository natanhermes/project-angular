import { Component } from '@angular/core';
import { Process } from '../process';

@Component({
  selector: 'app-process-list',
  standalone: false,
  templateUrl: './process-list.component.html',
})
export class ProcessListComponent {
  process: Process[] = [];

  

}
