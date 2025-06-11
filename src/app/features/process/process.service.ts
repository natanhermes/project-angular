import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Process } from './process';
import { Filter } from '../../shared/components/filter-process/filter-process.component';
import { CnjApiService } from '../../services/cnj-api.service';

interface SearchResponse {
  hits: {
    hits: Array<{
      _source: Process;
      sort: any[];
    }>;
  };
}

@Injectable({ providedIn: 'root' })
export class ProcessService {
  private static readonly PAGE_SIZE = 10;
  private static readonly BACKEND_PAGE_SIZE = 100;
  private static readonly DEFAULT_FILTER: Filter = { court: 'api_publica_trf1' };

  private processesStack: Process[][] = [];
  private searchAfterStack: any[][] = [];
  private pageIndex = 0;
  private currentSearchAfter: any[] = [];
  private lastFilter: Filter = ProcessService.DEFAULT_FILTER;

  private readonly pagedProcessSubject = new BehaviorSubject<Process[]>([]);
  readonly pagedProcess$: Observable<Process[]> = this.pagedProcessSubject.asObservable();

  constructor(private readonly cnjApiService: CnjApiService) {
    this.loadInitial();
  }

  setFilter(filter: Filter): void {
    this.lastFilter = filter;
    this.loadInitial();
  }

  nextPage(): void {
    this.pageIndex++;
    const currentPage = this.getCurrentPage();

    if (this.shouldLoadNextPage()) {
      this.loadBackendPage();
    } else {
      this.updatePagedProcesses();
    }
  }

  previousPage(): void {
    if (this.pageIndex > 0) {
      this.pageIndex--;
      this.updatePagedProcesses();
    } else if (this.canNavigateToPreviousPage()) {
      this.navigateToPreviousPage();
    }
  }

  private loadInitial(): void {
    this.resetPagination();
    this.loadBackendPage();
  }

  private resetPagination(): void {
    this.pageIndex = 0;
    this.currentSearchAfter = [];
    this.searchAfterStack = [];
    this.processesStack = [];
    this.pagedProcessSubject.next([]);
  }

  private loadBackendPage(): void {
    const filter = this.buildFilter();
    
    this.cnjApiService.getDados(filter).subscribe((response: SearchResponse) => {
      if (!this.hasResults(response)) return;

      this.processResponse(response);
    });
  }

  private buildFilter(): Filter {
    return {
      ...this.lastFilter,
      size: ProcessService.BACKEND_PAGE_SIZE,
      ...(this.currentSearchAfter && { search_after: this.currentSearchAfter }),
    };
  }

  private hasResults(response: SearchResponse): boolean {
    return response.hits.hits.length > 0;
  }

  private processResponse(response: SearchResponse): void {
    const processes = this.extractProcesses(response);
    this.updateSearchAfter(response);
    this.updateStacks(processes);
    this.updatePagedProcesses();
  }

  private extractProcesses(response: SearchResponse): Process[] {
    return response.hits.hits.map(hit => hit._source);
  }

  private updateSearchAfter(response: SearchResponse): void {
    const lastHit = response.hits.hits[response.hits.hits.length - 1];
    this.currentSearchAfter = lastHit.sort;
  }

  private updateStacks(processes: Process[]): void {
    this.processesStack.push(processes);
    this.searchAfterStack.push(this.currentSearchAfter);
    this.pageIndex = 0;
  }

  private updatePagedProcesses(): void {
    const currentPage = this.getCurrentPage();
    const start = this.pageIndex * ProcessService.PAGE_SIZE;
    const end = start + ProcessService.PAGE_SIZE;
    this.pagedProcessSubject.next(currentPage.slice(start, end));
  }

  private getCurrentPage(): Process[] {
    return this.processesStack[this.processesStack.length - 1] || [];
  }

  private shouldLoadNextPage(): boolean {
    return this.pageIndex * ProcessService.PAGE_SIZE >= this.getCurrentPage().length;
  }

  private canNavigateToPreviousPage(): boolean {
    return this.searchAfterStack.length > 1;
  }

  private navigateToPreviousPage(): void {
    this.searchAfterStack.pop();
    this.processesStack.pop();
    this.currentSearchAfter = this.searchAfterStack[this.searchAfterStack.length - 1];
    this.pageIndex = ProcessService.PAGE_SIZE - 1;
    this.updatePagedProcesses();
  }
}
