import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ProcessResponse } from '../features/process/process';
import { Filter } from '../shared/components/filter-process/filter-process.component';

interface SearchPayload {
  size: number;
  sort: { "@timestamp": { order: string } }[];
  search_after?: number[];
  query?: {
    bool: {
      must: { match: { grau: string } }[];
    };
  };
}

@Injectable({
  providedIn: 'root'
})
export class CnjApiService {
  constructor(
    private http: HttpClient
  ) { }

  getDados(filter?: Filter, searchAfter?: number[]): Observable<ProcessResponse> {
    let payload: SearchPayload = {
      size: 100,
      "sort": [
        {
          "@timestamp": {
            "order": "asc"
          }
        }
      ]
    };

    if (filter?.degree) {
      payload = {
        ...payload,
        "query": {
          "bool": {
            "must": [
              { "match": { "grau": filter?.degree } },
            ]
          }
        },
      };
    }

    if (searchAfter) {
      payload = {
        ...payload,
        "search_after": searchAfter,
      };
    }

    return this.http
      .post<ProcessResponse>(`/api`, { court: filter?.court, payload })
  }
}
