import { Component } from '@angular/core';
import { ProcessService } from '../process.service';
import { Filter } from '../../../shared/components/filter-process/filter-process.component';
import { Observable } from 'rxjs';
import { Process } from '../process';

@Component({
  selector: 'app-process-list',
  standalone: false,
  templateUrl: './process-list.component.html',
})
export class ProcessListComponent {
  process$: Observable<Process[]>;
  selectedProcess: Process | null = null;
  modalVisible = false;

  showModal() {
    this.modalVisible = true;
  }

  constructor(public processService: ProcessService) {
    this.process$ = this.processService.pagedProcess$;
  }

  onFilterChange(filter: Filter) {
    this.processService.setFilter(filter);
  }

  getMainTopics(mainTopics: { nome: string; codigo: number }[]): string {
    return mainTopics.map(topic => topic.nome).join(', ');
  }

  onNextPage() {
    this.processService.nextPage();
  }

  onPreviousPage() {
    this.processService.previousPage();
  }

  onRowSelect(process: Process) {
    this.selectedProcess = process;
    this.modalVisible = true;
  }
}
