import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Process } from '../../../features/process/process';

@Component({
  selector: 'app-modal-process-details',
  standalone: false,
  templateUrl: './modal-process-details.component.html',
})
export class ModalProcessDetailsComponent {
  @Input() visible: boolean = false;
  @Input() process: Process | null = null;
  @Output() visibleChange = new EventEmitter<boolean>();
}
