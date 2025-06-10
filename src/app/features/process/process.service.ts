import { Injectable } from '@angular/core';
import { Process } from './process';

@Injectable({
  providedIn: 'root'
})
export class ProcessService {
  process: Process[] = [];
  constructor() { }
}
